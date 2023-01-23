import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

const generateToken = username => {
    return jwt.sign({username: username}, process.env.JWT_SECRET,{ expiresIn: 60 * 60 })
}

const generateJWTCookie =(req, res, token) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        // signed: true,
        secure: false,
    });
}

const sendJWTCookie = (req, res, next) => {
    const token = generateToken(req.body.username);
    generateJWTCookie(req, res, token);
    next();
}

const sendJWT = (req, res) => {
    const token = generateToken(req.body.username);
    generateJWTCookie(req, res, token);
    res.json({ token });
}

const validateToken = async (req, res, next) =>{
let accessToken = req.headers['x-access-token'] || req.headers['authorization'] || req.cookies.jwt;
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

const logout = async (req, res, next) => {
    await res.clearCookie('jwt');
    next();
};

export {generateToken, validateToken, logout, sendJWTCookie, sendJWT}