var formulario = document.getElementById("forma");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  var datos = new FormData(formulario);

  // Verifica los valores del formulario en consola
  console.log(datos.get("usuario")); // Debe imprimir el valor del campo 'usuario'
  console.log(datos.get("password")); // Debe imprimir el valor del campo 'password'

  fetch("http://54.227.80.41:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: datos.get("usuario"), // Cambia a 'usuario' si el valor está en este campo
      password: datos.get("password"),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Muestra la respuesta del servidor
      if(data.ok ===true){
        window.location.href = "./perfil/perfil.html";
      }
    })
    .catch((error) => {
      console.log("Hubo un problema con la petición Fetch: " + error);
    });
});
