import bcrypt from 'bcrypt';


const isValidePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password )
}

const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null)
}

const addQuantity = (products) => {
    return products.reduce((acc, product) => {
      const existingProduct = acc.find(p => JSON.stringify(p._id) === JSON.stringify(product._id));
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        acc.push({ ...product, quantity: 1 });
      }
      return acc;
    }, []);
  }

export {isValidePassword, createHash, addQuantity};
