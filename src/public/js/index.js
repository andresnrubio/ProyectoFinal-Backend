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