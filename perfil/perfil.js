const token = JSON.parse(localStorage.getItem("token"));
console.log(token);

var container =document.getElementById("container")
var Saldo =document.getElementById("saldo")

function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(valor);
}

fetch("http://54.227.80.41:3000/api/v1/users/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "ENTRO");
    if (data.ok===true){
      let fullName= data.message.name + ' ' + data.message.last_name
      container.textContent=fullName
      Saldo.textContent=formatearMoneda (data.message.balance)
   }})   
.catch((error) => {
    console.log("Hubo un problema con la petición Fetch: " + error);
  });
