//TODO Aca va el Switch con los cases de los diferentes Daos// 
let productsDao
let cartDao

switch (process.env.DB_SERVICE){
    case 'mongodb':

        break;

    case 'fs':
        const { default: ProductsDaoFs } = await import('../daos/products/ProductsDaoFs.js')
        const { default: CartDaoFs } =  await import('../daos/carts/CartsDaoFs.js')
        productsDao = new ProductsDaoFs();
        cartDao = new CartDaoFs();
    
        break;

    case 'firebase':

        break;

    default:
        break;
}

export { productsDao, cartDao }
