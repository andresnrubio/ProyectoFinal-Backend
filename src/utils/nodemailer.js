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

const stringCarrito = (order) => {
    // TODO funcion de enlistado de productos de carrito y conversion a html para correo
let cartShow=""
order.items.forEach((producto)=>{
cartShow += `              
<tr class="text-center align-middle">
<td class="text-center align-middle">${producto.title}</td>
<td class="text-center align-middle">$ ${producto.price}</td>
<td class="text-center align-middle"><img src="${producto.thumbnail}" alt="{{title}}" style="width:3rem"></td>
</tr>
`
})

return `
<h3>Nueva Orden</h3>
<p>${order.buyer} ingreso una nueva orden</p>
<table class="table tablaProductos col-md-4 ">
<thead>
<tr>
<tr class="table-dark">
<th scope="col" class="text-center align-middle">Nombre</th>
<th scope="col" class="text-center align-middle">Precio</th>
<th scope="col" class="text-center align-middle" >Foto</th>
</tr>
</tr>
</thead>${cartShow}</tbody>
</table>
<p>Direccion de entrega ${order.address}</p>`
}

async function avisoNuevaOrden(order) {
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
subject: `Nueva orden de: ${order.buyer}`,
text: "Nuevo orden",
html: stringCarrito(order),
});

console.log("Message sent: %s", info.messageId);
}

export { avisoNuevoUsuario, avisoNuevaOrden };
