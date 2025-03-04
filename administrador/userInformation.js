const token = JSON.parse(localStorage.getItem("token"));
const urlParams = new URLSearchParams(window.location.search);
console.log(window)
const information = document.getElementById("information");

// Obtener los valores de los parámetros
const userName = urlParams.get("userName");
const lastName = urlParams.get("lastName");
const phone = urlParams.get("phone");
const email = urlParams.get("email");
const uid = urlParams.get("userId")
// Mostrar los valores en consola
console.log("Nombre:", userName);
console.log("Apellido:", lastName);
console.log("Teléfono:", phone);
console.log("Email:", email);
console.log("id:",uid);

information.innerHTML += `
    <p><strong>Nombre:</strong> ${userName}</p>
    <p><strong>Apellido:</strong> ${lastName}</p>
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>`

    fetch(`https://d2u0m9tidcq6y9.cloudfront.net/api/v1/transactions/get?uid=${uid}`, { 
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "invalid token") {
          window.location.href = "/login.html"; 
          return;
        }
        console.log(data);
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
      return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(cantidad);
    };
    
    
    const mostrardata = (data) => {
      let body = "";
      
      if (!Array.isArray(data.message) || data.message.length === 0) {
        noMovimientos.style.display = "flex";
      } else {
        noMovimientos.style.display = "none";
        data.message.forEach((item) => {
          body += ` 
           <tr>
              <td>${dateFormat(item.transaction_date)}</td>
              <td>${item.status}</td>
              <td>${item.type}</td>
              <td>${formatearMoneda(item.amount)}</td>
              <td><i class="bi bi-trash-fill"></i> <td>
              <td><i class="bi bi-pencil-fill"></i> <td>
           </tr>
          `;
        });
      }
    
      document.getElementById("data").innerHTML = body;
    };