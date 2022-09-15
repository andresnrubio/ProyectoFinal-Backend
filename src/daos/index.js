let productsDao
let cartDao

//! FALTA PARA LA ENTREGA HACER ESTO!!!
//TODO Realizar switch con process.env.DB_SERVICE

switch ('fs'){
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
