var formulario = document.getElementById("formaNueva");
const container = document.getElementById("container");
var texpassword =document.getElementById("password")

texpassword.addEventListener("focus", function (e){
    container.textContent= ""
    
})


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

  var password= datos.get("password")
  var passwordConfirm= datos.get("passwordConfirm")

  if(password==passwordConfirm){
      console.log("contraseña valida")
      fetch("http://54.227.80.41:3000/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: datos.get("name"),
          last_name: datos.get("lastName"),
          username: datos.get("usuario"),
          password: datos.get("password"),
          email: datos.get("email"), // Cambia a 'usuario' si el valor está en este campo
          phone_number: datos.get("phone_number")

        }),
    
      }).then((res)=>res.json())
        .then((data)=>{
            console.log(data, "respuesta")

            if(data.message=== "Email already exists"){
                container.textContent= "el usuario ya existe"
               
            }
            if (data.ok=true){
              localStorage.setItem("token",JSON.stringify(data))
              window.location.href = "./bienvenida.html";
            }
            
        }).catch((error) => {
            console.log("Hubo un problema con la petición Fetch: " + error);
          });
    

  } else{
console.log("contraseña invalida")
 container.textContent= "las contraseñas no coinsiden"

  }
});




