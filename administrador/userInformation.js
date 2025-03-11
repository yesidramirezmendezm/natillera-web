const token = JSON.parse(localStorage.getItem("token"));
const urlParams = new URLSearchParams(window.location.search);
console.log(window);
const information = document.getElementById("information");
const botonwatsapp = document.getElementById("botonWhatsapp");

var container = document.getElementById("container"); 



function redirigirWhatsApp () {
  if (!phone || isNaN(phone)) {
    console.error("Número de teléfono inválido:", phone);
    alert("Número de teléfono no válido para WhatsApp.");
    return;
  }
  window.open(`https://wa.me/${phone}`, '_blank');
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

const formatearMoneda = (cantidad) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
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
              <td><i class="bi bi-pencil-fill"></i></td>
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
