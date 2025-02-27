let msgError = document.querySelector("#alert p");
var formulario = document.getElementById("forma");
const alert = document.getElementById("alert");
const x = document.getElementById("x");
var username=document.getElementById("usuario")
var contraseña =document.getElementById("password")




password.addEventListener("focus",function (e){
  alert.classList.remove("show")
})

username.addEventListener("focus", function (e){
  alert.classList.remove ("show")
})


function desaparecer(){
  setTimeout(() => {
    alert.classList.remove('show');
  }, 7000);
}

x.addEventListener("click", function (e) {
  
  alert.classList.toggle("show");
});


formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  var datos = new FormData(formulario);

 
  
  var usuario = datos.get("usuario");



  fetch("https://d2u0m9tidcq6y9.cloudfront.net/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      field_login: datos.get("usuario"), 
      password: datos.get("password"),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
     
      
      
      if (data.message ==="Username not found. Please check your username.") {
        
        msgError.textContent =
          "!Recorcholis¡ creo que ingrasaste un correo incorrecto ";
        alert.classList.add("show");
        desaparecer()
        
      
      } else if (data.message === "Invalid password") {
        msgError.textContent = "tu contraseña no es correcta";
        alert.classList.add("show");
       desaparecer()
      
      } else if (data.ok === true) {
        if (data.message.role == "admin") {
          const token = {
            admin: true,
            token: data.message,
          };
        
          localStorage.setItem("token", JSON.stringify(token));
           window.location.href = "./perfil/REDIRECCION.html"; 
        } else {
          
          const token = {
            admin: false,
            token: data.message,
          };
          localStorage.setItem("token", JSON.stringify(token));
           window.location.href = "./perfil/perfil.html"; 
        }
      }
    })
    .catch((error) => {
      console.log("Hubo un problema con la petición Fetch: " + error);
    });
});
