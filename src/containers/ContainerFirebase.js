//* Conection to Firebase */
import admin from 'firebase-admin'
import serviceAcount from "../databases/firebase/ecommerce-1950a-firebase-adminsdk-fxl4z-61219de2da.json" assert {
    type: 'json'
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAcount)
})
console.log("Firestore connected")

class ContainerFirebase {
    constructor(name) {
        const db = admin.firestore()
        this.query = db.collection(name)
    }

    async getAllFile() {
        try {
            const data = await this.query.get()
            const response = data.docs.map(document => ({
                id: document.id,
                ...document.data()
            }))
            return response
        } catch (error) {
            throw new Error("Error al realizar lectura" + error)
        }
    }

    async getById(id) {
        try {
            const doc = this.query.doc(id)
            const response = await doc.get()
            return response.data()
        } catch (error) {
            throw new Error("Error al realizar lectura" + error)
        }
    }

    async saveInFile(element) {
        try {
            const data = await this.query.doc()
            await data.create(element).then(
                res=>console.log(res)
            )
            return "Prueba"
        } catch (error) {
            throw new Error("Error al guardar en base de datos" + error)
        }
    }

    async updateById(id, newValues) {
        try {
            const doc = this.query.doc(id)
            const modifiedDoc = await doc.update(newValues)
            return modifiedDoc
        } catch (error) {
            throw new Error("Error al actualizar base de datos" + error)
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(id)
            const delDoc = await doc.delete()
            return "Documento eliminado correctamente"
        } catch (error) {
            throw new Error("Error al eliminar id");
        }
    }


}



export default ContainerFirebase;