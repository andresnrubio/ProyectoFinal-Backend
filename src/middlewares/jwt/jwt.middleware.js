import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

const generateToken = username => {
    return jwt.sign(username, process.env.JWT_SECRET,{ expiresIn: '10m' })
}
const validateToken = async (req, res, next) =>{
let accessToken = req.headers['x-access-token'] || req.headers['authorization'];
console.log(!accessToken)
console.log(accessToken)
if(!accessToken){
    res.send('Acceso denegado')
}else{
accessToken = accessToken.replace(/^Bearer\s+/, "");
jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if(err){
        res.send("Acceso denegado, token incorrecto o vencido")
    }else{
        next()
    }
})}
} 

// function generateJWTCookie(req, res, token) {
//     res.cookie('jwt', token, {
//         httpOnly: true,
//         sameSite: true,
//         signed: true,
//         secure: false,
//     });
// }

// function sendJWTCookie(req, res, next) {
//     const token = generateToken(req, res);
//     generateJWTCookie(req, res, token);
//     next();
// }

export {generateToken, validateToken}