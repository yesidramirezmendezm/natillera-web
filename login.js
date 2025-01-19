let msgError = document.querySelector("#alert p");
var formulario = document.getElementById("forma");
const alert = document.getElementById("alert");
const x = document.getElementById("x");

console.log(msgError);

x.addEventListener("click", function (e) {
  console.log(x);
  alert.classList.toggle("show");
});
console.log(alert);

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  var datos = new FormData(formulario);

  // Verifica los valores del formulario en consola
  console.log(datos.get("usuario")); // Debe imprimir el valor del campo 'usuario'
  console.log(datos.get("password")); // Debe imprimir el valor del campo 'password'
  var usuario = datos.get("usuario");

  fetch("http://54.227.80.41:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      field_login: datos.get("usuario"), // Cambia a 'usuario' si el valor está en este campo
      password: datos.get("password"),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Muestra la respuesta del servidor
      if (data.message === "User not found") {
        msgError.textContent =
          "!Recorcholis¡ creo que ingrasaste un correo incorrecto ";
        alert.classList.toggle("show");
      } else if (data.message === "Invalid password") {
        msgError.textContent = "tu contraseña no es correcta";
        alert.classList.toggle("show");
      } else if (data.ok === true) {
        if (data.message.role == "admin") {
          const token = {
            admin: true,
            token: data.message,
          };
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = "./perfil/REDIRECCION.html";
        } else {
          console.log("hasta aqui te trajo el rio");
          const token = {
            admin: false,
            token: data.message,
          };
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = "./perfil/REDIRECCION.html";
        }
      }
    })
    .catch((error) => {
      console.log("Hubo un problema con la petición Fetch: " + error);
    });
});
