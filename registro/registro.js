


var formulario = document.getElementById("formaNueva");
const container = document.getElementById("container");
var texpassword = document.getElementById("password");
const alert = document.getElementById("alert");
var email =document.getElementById("email")

email.addEventListener("focus", function (e) {
  container.classList.remove("show");
  container.textContent="";
})


texpassword.addEventListener("focus", function (e) {
  container.classList.remove("show");
  container.textContent = "";
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  var datos = new FormData(formulario);

  console.log(datos.get("usuario"));
  console.log(datos.get("password"));
  console.log(datos.get("passwordConfirm"));
  console.log(datos.get("email"));
  console.log(datos.get("name"));
  console.log(datos.get("lastName"));
  console.log(datos.get("phone_number"));

  var password = datos.get("password");
  var passwordConfirm = datos.get("passwordConfirm");

  if (password == passwordConfirm) {
    console.log("contraseña valida");
    fetch("http://54.145.241.75:3000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: datos.get("name"),
        last_name: datos.get("lastName"),
        username: datos.get("usuario"),
        password: datos.get("password"),
        email: datos.get("email"), 
        phone_number: datos.get("phone_number"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "respuesta");

        if (data.message === "Email already exists") {
          container.textContent = "El email ya existe";
          container.classList.add("show");
          return
        }
        if (data.message === 'Internal server error'){
          container.textContent = " Chanfle!  ese nombre de usuario ya existe  pero puedes intentar con otro";
          container.classList.add("show");
          return;
        }
           
        if ((data.ok === true)) {
          const token = {
            admin: false,
            token: data.message,
          };
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = "../perfil/perfil.html";
        }
      })
      .catch((error) => {
        console.log("Hubo un problema con la petición Fetch: " + error);
      });
  } else {
    console.log("contraseña invalida");
    container.textContent = "las contraseñas no coinsiden";
    container.classList.add("show");
  }
});
