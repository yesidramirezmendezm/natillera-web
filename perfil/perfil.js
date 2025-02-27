const token = JSON.parse(localStorage.getItem("token"));


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
    
    if (data.ok === true) {
      let fullName = data.message.name + " " + data.message.last_name;
      container.textContent = fullName;
      Saldo.textContent = formatearMoneda(data.message.balance);
    } if (data.message.role ==='admin') {
      
      administrar.style.display = 'block'; 
    
    
    } else  {
    
      administrar.style.display = 'none'; 
      }
      
   
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
    
    if (data.message==='invaled token')
      window.location
    mostrardata(data);
   

  })
  
  .catch((error) => console.log(error));

const dateFormat = (fecha) => {
  const date = new Date(fecha);
  
  return (
    date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear()
  );
};
var noMovimientos=document.getElementById("noMovimientos")
const mostrardata = (data) => {
  let body = "";
  if (data.message.length==0){
   
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
  
  
  document.getElementById("data").innerHTML = body;
};
