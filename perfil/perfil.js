const token = JSON.parse(localStorage.getItem("token"));
console.log(token);

var container = document.getElementById("container");
var Saldo = document.getElementById("saldo");
var administrar = document.getElementById("administrar")
function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(valor);
}


fetch("https://d2u0m9tidcq6y9.cloudfront.net/api/v1/users/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "ENTRO");
    if (data.ok === true) {
      let fullName = data.message.name + " " + data.message.last_name;
      container.textContent = fullName;
      Saldo.textContent = formatearMoneda(data.message.balance);
    } if (data.message.role ==='admin') {
      console.log(data.message.role)
      administrar.style.display = 'block'; // Mostrar el botón
    console.log("patron")
    
    } else  {
    
      administrar.style.display = 'none'; // Ocultar el botón o enlace de administración.
      console.log('Rol no reconocido. El botón no cambiará.');}

   
  })
  .catch((error) => {
    console.log("Hubo un problema con la petición Fetch: " + error);
  });

fetch("https://d2u0m9tidcq6y9.cloudfront.net/api/v1/transactions/get", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    mostrardata(data);
   

  })
  
  .catch((error) => console.log(error));

const dateFormat = (fecha) => {
  const date = new Date(fecha);
  console.log(date.getTime(), "formato de fecha");

  return (
    date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear()
  );
};
var noMovimientos=document.getElementById("noMovimientos")
const mostrardata = (data) => {
  let body = "";
  if (data.message.length==0){
    console.log("cero pollito")
    noMovimientos.style.display ='flex';
  }else{
    noMovimientos.style.display ='none';
    for (let i = 0; i < data.message.length; i++) {
    
      body += ` 
       <tr>
                  <td>  ${dateFormat(data.message[i].transaction_date)}</td>
                  <td>${data.message[i].status}</td>
                  <td>${data.message[i].type}</td>
                  <td>${formatearMoneda(data.message[i].amount)}</td>
              </tr>
      `;
    }
  }
  
  console.log(body);
  document.getElementById("data").innerHTML = body;
};
