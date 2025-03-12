

const token = JSON.parse(localStorage.getItem("token"));
const urlParams = new URLSearchParams(window.location.search);
console.log(window);
const information = document.getElementById("information");
const botonwatsapp = document.getElementById("botonWhatsapp");

var container = document.getElementById("container"); 
const alert = document.getElementById("alert");
let msgError = document.querySelector("#alert p");

function alertaON(notification) {
  
  msgError.textContent = notification;
  alert.classList.add("show");
  setTimeout(() => {
    alert.classList.remove('show');
  }, 3000);

}

window.editDataModal = (id) => {
  const amount = document.querySelector(`#amount-${id}`);
  const paymentMethod = document.querySelector(`#payment-method-${id}`);
  const description = document.querySelector(`#floatingTextarea2-${id}`);
  
  const amountValue = amount.value.replace(/\$/g, "").replace(/\./g, "").replace(",", ".");
  const amountNumber = parseFloat(amountValue);

  
console.log(amountValue)
if (!amount.value || isNaN(amountNumber) || amountNumber <= 0) {
  console.log("Valor ingresado:", amount.value);
  console.log("Número procesado:", amountNumber);
  alertaON("Ingrese un monto válido");
  return;
}
  if (!paymentMethod.value) {
    alertaON("Seleccione una forma de pago");
    return;
  }

  if (!paymentMethod.value) {
    alertaON("Seleccione una forma de pago");
    return;
  }
  if (!description.value) {
    alertaON("haga una breve descripcion de la transaccion");
    return;
  }

  fetch(`https://d2u0m9tidcq6y9.cloudfront.net/api/v1/transactions/update/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: id,
      amount: amountNumber,
      type: paymentMethod.value,
      status: "completed",
      description: description.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.ok === true) {
        window.location.reload();
      }
    })

    .catch((error) => {
      console.log("Hubo un problema con la petición Fetch: " + error);
    });
};

function redirigirWhatsApp () {console.log(phone)
  if (!phone || isNaN(phone)) {
    console.error("Número de teléfono inválido:", phone);
    alert("Número de teléfono no válido para WhatsApp.");
    return;
  }
  window.open(`https://wa.me/+57${phone}`, '_blank');
};


const userName = urlParams.get("userName");
const lastName = urlParams.get("lastName");
const phone = urlParams.get("phone");
const email = urlParams.get("email");
const uid = urlParams.get("userId");


if (container) {

  container.textContent = userName+" "+lastName;
  
}



information.innerHTML += `
  
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>`;

fetch(
  `https://d2u0m9tidcq6y9.cloudfront.net/api/v1/transactions/get?uid=${uid}`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    if (data.message==='Invalid token')
      window.location.href = "../index.html"; 
    mostrardata(data);
    
    console.log("aqui esttoy",data);
    mostrardata(data);
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

var noMovimientos = document.getElementById("noMovimientos");

const dateFormat = (fecha) => {
  const date = new Date(fecha);
  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
};
function formatearMoneda_input(input) {
  let valor = input.value.replace(/[^0-9]/g, ""); // Solo números

  let numero = parseInt(valor, 10);
  if (!isNaN(numero)) {
    input.value = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(numero);
  } else {
    input.value = "";
  }
}

const formatearMoneda = (cantidad) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cantidad);
};

const borrartransaccion = (id) => {
  const userResponse = window.confirm("¿Estás seguro de que quieres eliminar esta transacción?");

  if (userResponse) {
    console.log(`Eliminando transacción con ID: ${id}`);

    fetch(`https://d2u0m9tidcq6y9.cloudfront.net/api/v1/transactions/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
        console.log("Respuesta del servidor:", data);
        if (data.ok) {
          alert("Transacción eliminada con éxito");
          location.reload();
        } else {
          alert("No se pudo eliminar la transacción");
        }
        
      })
      .catch((error) => {
        console.error("Error al eliminar la transacción:", error);
      });
  } else {
    console.log("El usuario canceló la eliminación");
  }
};

const mostrardata = (data) => {
  console.log(data.data)
  let body = "";

  if (!Array.isArray(data.message) || data.message.length === 0) {
    noMovimientos.style.display = "flex";
  } else {
    noMovimientos.style.display = "none";
    data.message.forEach((item,i) => {
      
      body += ` 
           <tr>
              <td>${dateFormat(item.transaction_date)}</td>
              <td>${item.status}</td>
              <td>${item.type}</td>
              <td>${formatearMoneda(item.amount)}</td>
              <td><i class="bi bi-trash-fill" onclick="borrartransaccion(${item.id})"></i></td> 
              
              
              <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${item.id}">
            <i class="bi bi-pencil-fill"></i>
          </button>
              
                      
                  
              </td>


               <td>
                   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${item.id}">
                      <i class="bi bi-chat-left-dots"></i>
                   </button>

               </td>

                
<!-- Modal -->
<div class="modal fade" id="staticBackdrop${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel${item.id}" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Mensaje</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      ${item.description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="modal-${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel-${item.id}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
               
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="formModal-${item.id}">
                  <div class="mb-3">
                    <label for="amount-${item.id}" class="col-form-label">Depositar abono:</label>
                    <input type="text" class="form-control" id="amount-${item.id}" name="amount" value="${formatearMoneda(item.amount)}"
                      placeholder="Cantidad" required oninput="formatearMoneda_input(this)" maxlength="10">
                  </div>
                   <div class="form-floating mb-3">
            <select class="form-select" id="payment-method-${item.id}" name="payment_method">
              <option value="" disabled>Forma de pago</option>
              <option value="cash" ${item.type === "cash" ? "selected" : ""}>Efectivo</option>
              <option value="transfer" ${item.type === "transfer" ? "selected" : ""}>Transferencia</option>
            </select>
            <label for="payment-method-${item.id}">Forma de pago</label>
          </div>

                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" value=""
                      id="floatingTextarea2-${item.id}" style="height: 100px" required >${item.description}</textarea>
                    <label for="floatingTextarea2">Comments</label>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary"
                      onclick="editDataModal(${item.id})">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>




 


           </tr>
          `;
          
          
         
    });
    
  }

  document.getElementById("data").innerHTML = body;
};



const borrarUsuario=()=>{
  const userResponse = window.confirm("¿Estás seguro de que quieres continuar?");

  if (userResponse) {
      console.log("El usuario hizo clic en OK");
      fetch(`https://d2u0m9tidcq6y9.cloudfront.net/api/v1/users/delete/${uid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.ok === true) {
            window.location.href = "/administrador1.html";
            return;
          }
        
      })
     
  } else {
      console.log("El usuario canceló la acción");
     
  
}
}
