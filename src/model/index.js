import * as dotenv from 'dotenv'
dotenv.config()
import productsFactoryDAO from "./DaoProducts/productsFactoryDao.js"
import cartFactoryDAO from "./DaoCarts/cartsFactoryDao.js"

let productsDao = productsFactoryDAO.get(process.env.DB_SERVICE)
let cartsDao = cartFactoryDAO.get(process.env.DB_SERVICE)
// let messagesDao = cartFactoryDat.get(process.env.DB_SERVICE)

export { productsDao, cartsDao }
