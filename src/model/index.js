import * as dotenv from 'dotenv'
dotenv.config()
import productsFactoryDAO from "./DaoProducts/productsFactoryDao.js"
import cartFactoryDAO from "./DaoCarts/cartsFactoryDao.js"
import OrdersFactoryDAO from "./DaoOrders/OrdersFactoryDAO.js"

let productsDao = productsFactoryDAO.get(process.env.DB_SERVICE)
let cartsDao = cartFactoryDAO.get(process.env.DB_SERVICE)
let ordersDao = OrdersFactoryDAO.get(process.env.DB_SERVICE)

export { productsDao, cartsDao, ordersDao }
