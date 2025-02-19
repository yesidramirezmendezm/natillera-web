import { alertaON } from "./utills/funtions.js";
var container = document.getElementById("container");
const token = JSON.parse(localStorage.getItem("token"));


window.formatearMoneda = function (input) {
  
  let valor = input.value.replace(/[^0-9,.]/g, '');

  
  valor = valor.replace(/,/g, '.');

  
  let numero = parseFloat(valor);

  
  if (!isNaN(numero)) {
    input.value = new Intl.NumberFormat('es-ES').format(numero);
  } else {
    input.value = '';
  }
};

fetch("http://54.145.241.75:3000/api/v1/users/profile", {
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
    }
  });

window.handleDataModal = (id) => {
  const amount = document.querySelector(`#amount-${id}`);
  const paymentMethod = document.querySelector(`#payment-method-${id}`);

  
  const amountValue = amount.value.replace(/\./g, '').replace(',', '.');
  const amountNumber = parseFloat(amountValue);

  console.log({
    user_id: id,
    amount: amountNumber || "No se ingresó cantidad",
    type: paymentMethod?.value || "No se seleccionó forma de pago",
    status: "completed",
  });

  if (amount.value === "" || isNaN(amountNumber) || amountNumber <= 0) {
    console.log(amount.value, "reque");
    alertaON("Ingrese un monto válido");
    return;
  }
  if (paymentMethod.value === "") {
    console.log("Forma de pago no seleccionada");
    alertaON("Seleccione una forma de pago");
    return;
  }

  fetch("https://d2u0m9tidcq6y9.cloudfront.net/api/v1/transactions/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: id,
      amount: amountNumber,
      type: paymentMethod?.value,
      status: "completed",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Respuesta de la API");

      if (data.ok === true) {
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log("Hubo un problema con la petición Fetch: " + error);
    });
};

fetch("https://d2u0m9tidcq6y9.cloudfront.net/api/v1/users/users", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
})
  .then((response) => response.json())
  .then((data) => mostrardata(data))
  .catch((error) => console.log(error));

const mostrardata = (data) => {
  let body = "";
  console.log(data);
  for (let i = 0; i < data.data.length; i++) {
    body += `
      <tr>
        <td>${data.data[i].uid}</td>
        <td>${data.data[i].name} ${data.data[i].last_name}</td>
        <td>
<button type="button" class= "ojo" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">
  <img src="/watch-dark-eye_icon-icons.com_53840.png" alt="ojo">
</button>

 </td>

 <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel${i}">info</h1>Informacion del usuario
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Nombre:${data.data[i].name}
        Apellido:${data.data[i].last_name}

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



 <td>${data.data[i].balance}</td>



 <td>
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${i}">
     <img src="/perfil/hucha.png" alt="Hucha">
   </button>
 </td>
 <div class="modal fade" id="modal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel-${i}" aria-hidden="true">
 <div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="exampleModalLabel-${i}">${data.data[i].name}</h1>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
       <form id="formModal-${data.data[i].uid}">
       <div class="mb-3">
       <label for="amount-${i}" class="col-form-label">Depositar abono:</label>
       <input type="text" class="form-control" id="amount-${data.data[i].uid}" name="amount" placeholder="Cantidad" required oninput="formatearMoneda(this)">
       </div>
       <div class="form-floating">
       <select class="form-select" id="payment-method-${data.data[i].uid}" name="payment_method">
       <option selected value="">Forma de pago</option>
       <option value="cash">Efectivo</option>
       <option value="transfer">Transferencia</option>
       </select>
       <label for="payment-method-${i}">Forma de pago</label>
       </div>
       <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
       <button type="submit" class="btn btn-primary" onclick="handleDataModal(${data.data[i].uid})">Enviar</button>
       </div>
       </form>
       
       
       </div>
       </div>
       </div>
       </tr>
       </div>`;
  }
  document.getElementById("data").innerHTML = body;
};

