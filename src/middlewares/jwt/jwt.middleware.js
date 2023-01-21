import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

const generateToken = username => {
    return jwt.sign(username, process.env.JWT_SECRET,{ expiresIn: '30m' })
}
const validateToken = async (req, res, next) =>{
let accessToken = req.headers['x-access-token'] || req.headers['authorization'];
accessToken = accessToken.replace(/^Bearer\s+/, "");
if(!accessToken){ res.send('Acceso denegado')}

jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if(err){
        res.send("Acceso denegado, token incorrecto o vencido")
    }else{
        next()
    }
})
} 

export {generateToken, validateToken}