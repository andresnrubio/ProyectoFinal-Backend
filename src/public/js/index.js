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

const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  let email = document.getElementById("email").value;
  // let avatar = document.getElementById("avatar").value;
  let text = document.getElementById("text").value;
  
  if (email && text) {
    socket.emit("nuevoMensaje", { author: { email }, text});
  }
});

socket.on("chat", (dataMessages) => {
  let chat = "";
  dataMessages[0].messages.forEach((mensaje) => {
    chat += `<li><p>
    <span class="fw-bold" style="color: blue">${mensaje.author.email}:</span>
    <span style="color: green" class="fst-italic">${mensaje.text}</span> 
    </p>
    </li>
    `;
  });
  
  document.getElementById("mensajes").innerHTML = chat;
  // document.getElementById("compresion").innerHTML = `Compresion: ${lengthReduction.toFixed(2)}%`
});

const addToCart = ($this) =>{
  const {value: cartId} = document.getElementById("cart")
  const id = $this.id
  const data = JSON.stringify({id: id})
  fetch(`/api/cart/${cartId}/productos`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: data,
})
  .then((response) => response)
  .catch((error) => {
    console.error('Error:', error);
  });
}

const deleteFromCart = ($this) =>{
  const {value: cartId} = document.getElementById("cart")
  const id = $this.id
  fetch(`/api/cart/${cartId}/productos/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then((response) => response)
  .catch((error) => {
    console.error('Error:', error);
  });
}