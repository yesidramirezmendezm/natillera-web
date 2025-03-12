const token = JSON.parse(localStorage.getItem("token"));


var container = document.getElementById("container");
var Saldo = document.getElementById("saldo");
var administrar = document.getElementById("administrar")
function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
    
    if (data.message==='Invalid token')
      window.location.href = "../index.html"; 
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
  console.log(data.message)
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
                  <td>
                   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop-${data.message[i].id}">
                      <i class="bi bi-chat-left-dots"></i>
                   </button>

               </td>
               <!-- Modal -->
<div class="modal fade" id="staticBackdrop-${data.message[i].id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel-${data.message[i].id}" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Mensaje</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      ${data.message[i].description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>



              </tr>
      `;
    }
  }
  
  
  document.getElementById("data").innerHTML = body;
};
