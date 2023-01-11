const { productsDao: fileContainer } =  await import("../model/index.js")

class productsApiContainer {

getAllFile = async () => {
    try {
        let products = await fileContainer.getAllFile();
        return products
    } catch (error) {
        res.send(error);
    }
}

getById = async (id) => {
  try {
    let foundElement = await fileContainer.getById(id);
        return foundElement;
} catch (error) {
    throw new Error("Error al obtener id");
}
}

saveProduct = async (product) => {
    try{
      const objectToAdd = await fileContainer.saveInFile(product)
        return objectToAdd;
    } catch (error) {
      throw new Error("Error al guardar archivo");
    }
}

deleteProduct = async (id) => {
    try {
      await fileContainer.deleteById(id);
      return "Producto eliminado correctamente"
    } catch (error) {
      throw new Error("Error al eliminar el producto");
  }
}

updateById = async (id, newValues) => {
  try {
    let productToUpdate = await fileContainer.updateById(id, newValues);
        return productToUpdate
  } catch {
    throw new Error("Error al actualizar el producto");
  }
}

}


export default productsApiContainer
