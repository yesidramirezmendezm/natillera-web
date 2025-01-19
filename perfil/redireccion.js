const token = JSON.parse(localStorage.getItem("token"));
console.log(token);
var container =document.getElementById("container")
var administrar =document.getElementById("administrar")



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
  }
  if (data.message.role === "admin") {
    administrar.style.display = 'block'; // Mostrar el botón
  } else if (data.message.role === "user") {
  } else {
    administrar.style.display = 'none'; // Ocultar el botón o enlace de administración.
    console.log('Rol no reconocido. El botón no cambiará.');
  }
  }
)

.catch((error) => {
  console.log("Hubo un problema con la petición Fetch: " + error);
});