import fs from "fs";
class containerFs {
    constructor(path, model) {
        this.path = path;
        this.model = model;
        this.connect();
    }

    async connect() {
        console.log("File System Connected");
    }

    //Create file if not exists
    checkFile = async () => {
        if (!fs.existsSync(this.path)) {
            try {
                fs.promises.writeFile(this.path, JSON.stringify(this.model, null, 2));
            } catch (error) {
                throw new Error("Error al crear el archivo");
            }
        }
    };

    readFile = async () => {
        try {
            await this.checkFile()
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data)
        } catch (error) {
            throw new Error("Error al leer archivo");
        }
    };

    writeFile = async (data) => {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(data, null, 2)
            );

        } catch (error) {
            throw new Error("Error al escribir archivo");
        }
    }
}

export default containerFs;
