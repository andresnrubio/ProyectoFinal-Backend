const fs = await import("fs");

class ContainerFs {
  constructor(path) {
    this.path = path;
  }

idAvailable(array){
    const sortedArray = array
      .slice() 
      .sort(function (a, b) {return a.id - b.id});
    let previousId = 0;
    for (let element of sortedArray) {
      if (element.id != (previousId + 1)) {
        return previousId + 1;
      }
      previousId = element.id;
    }
    return previousId + 1;
  }

  async readFile() {
    if (fs.existsSync(this.path)) {
      try {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw new Error("Error al leer archivo");
      }
    } else {

      try {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw new Error("Error al escribir el archivo");
      }
    }
  }

  async getAllFile() {
    try {
      const data = await this.readFile();
      return data;
    } catch (error) {
      throw new Error("Error al obtener archivo");
    }
  }

  async saveInFile(element) {
    if(element.id){
      const data = await this.readFile();
      const newData = [...data, element];
      newData.sort((a, b) => a.id - b.id)
      await fs.promises.writeFile(this.path, JSON.stringify(newData, null, 2));
    }else{
      try {
        const data = await this.readFile();
      const available = this.idAvailable(data);
      const id = available

      const objectToAdd = { ...element, id: id};
      const newData = [...data, objectToAdd];
      await fs.promises.writeFile(this.path, JSON.stringify(newData, null, 2));
      return objectToAdd;
    } catch (error) {
      throw new Error("Error al guardar archivo");
    }}
  }

  async deleteAllFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error al borrar archivo");
    }
  }

  async getById(id) {
    try {
      let elementsArray = await this.readFile();
      const foundElement = elementsArray.find((elem) => elem.id === Number(id));
      if (foundElement !== undefined) {
        return foundElement;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error al obtener id");
    }
  }

  async deleteById(id) {
    try {
      let foundProduct = await this.getById(id);
        if (!foundProduct) {
          res.status(404).json({
            error: "NOT FOUND 404!!! producto no encontrado",
          });
        } else {
      let dataArch = await this.readFile();
      let element = dataArch.find((elem) => elem.id === Number(id));
         if (element) {
        const dataArchFiltrado = dataArch.filter((elem) => elem.id !== Number(id));
        await this.saveInFile(dataArchFiltrado);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(dataArchFiltrado, null, 2),
          "utf-8"
        );
      } else {
        throw new Error("Elemento no encontrado");
      }}
    } catch (error) {
      throw new Error("Error al eliminar id");
    }
  }

  async updateById(id, newValues) {
    let foundProduct = await this.getById(id);
    if (!foundProduct) {
        res.status(404).json({
            error: "NOT FOUND 404!! producto no encontrado!!",
        });
    } else {
        
        for (const element in foundProduct) {
            for (const elem in newValues) {
                if (element === elem) {
                    foundProduct[element] = newValues[elem];
                }
            }
        }
        foundProduct.timestamp = Date.now()
        await this.deleteById(id);
        await this.saveInFile(foundProduct);
    }
}



}

export default ContainerFs;
