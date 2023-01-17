const socket = io.connect();

const authorSchema = new normalizr.schema.Entity("authors", {}, {
  idAttribute: "email"
})
const mensajeSchema = new normalizr.schema.Entity("mensaje", {
  author: authorSchema
})
const chatSchema = new normalizr.schema.Entity("chat", {
  mensajes: [mensajeSchema]
})

// const btnEnviar = document.getElementById("btnEnviar");

// btnEnviar.addEventListener("click", (event) => {
//   event.preventDefault();
//   let email = document.getElementById("email").value;
//   let userName = document.getElementById("userName").value;
//   let userSurname = document.getElementById("userSurname").value;
//   let userAge = document.getElementById("userAge").value;
//   let userNickname = document.getElementById("userNickname").value;
//   let avatar = document.getElementById("avatar").value;
//   let text = document.getElementById("text").value;
  
//   if (email && text && userAge && userName && userNickname && avatar && userSurname) {
//     socket.emit("nuevoMensaje", { author: { email, userName, userSurname, userAge, userNickname, avatar }, text});
//   }
// });

socket.on("chat", (mensajesNormalized) => {

  // const denormalizedData = normalizr.denormalize(mensajesNormalized.result, chatSchema, mensajesNormalized.entities)

  // const originalLength = JSON.stringify(denormalizedData).length;
  // const normalizedLength= JSON.stringify(mensajesNormalized).length;
  // const lengthReduction = ((originalLength-normalizedLength) /  originalLength) * 100
  
  // const mensajes = denormalizedData.mensajes
  const mensajes = []
  let chat = "";
  mensajes.forEach((mensaje) => {
    chat += `<li><p>
    <span class="fw-bold" style="color: blue">${mensaje.author.userNickname}:</span>
    <span style="color: green" class="fst-italic">${mensaje.text}</span> 
    </p>
    </li>
    `;
  });
  // document.getElementById("mensajes").innerHTML = chat;
  // document.getElementById("compresion").innerHTML = `Compresion: ${lengthReduction.toFixed(2)}%`
});


