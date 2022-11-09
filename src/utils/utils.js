import bcrypt from 'bcrypt';


const isValidePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password )
}

const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null)
}


export {isValidePassword, createHash};
