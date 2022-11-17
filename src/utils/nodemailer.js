import * as dotenv from 'dotenv'
dotenv.config()

import nodemailer from "nodemailer";

async function avisoNuevoUsuario(newUser) {
let transporter = nodemailer.createTransport({
service: "gmail",
port: 587,
auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
},
});

let info = await transporter.sendMail({
from: 'API notifications <NotificacionesAPI@backend.com>',
to: process.env.NODEMAILER_ADMIN_EMAIL,
subject: "Nuevo Registro",
text: "Nuevo registro",
html: `<div><h2>Se ha registrado un nuevo usuario</h2><h4>Nombre de Usuario: <span>${newUser.username}</span></h4><h4>Nombre completo: <span>${newUser.fullname}</span></h4><h4>Direccion: <span>${newUser.address}</span></h4><h4>Edad: <span>${newUser.age}</span></h4><h4>Telefono: <span>${newUser.phone}</span></h4></div>`,
});

console.log("Message sent: %s", info.messageId);
}

const stringCarrito = (cart) => {
    // TODO funcion de enlistado de productos de carrito y conversion a html para correo

return "<h1>Carrito</h1>"
}

async function avisoNuevoCarrito(user, cart) {

let transporter = nodemailer.createTransport({
service: "gmail",
port: 587,
auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
},
});

let info = await transporter.sendMail({
from: 'API notifications <NotificacionesAPI@backend.com>',
to: process.env.NODEMAILER_ADMIN_EMAIL,
subject: `Nuevo pedido de: ${user}`,
text: "Nuevo pedido",
html: stringCarrito,
});

console.log("Message sent: %s", info.messageId);
}

export { avisoNuevoUsuario, avisoNuevoCarrito };
