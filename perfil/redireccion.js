const token = JSON.parse(localStorage.getItem("token"));
console.log(token);
var container =document.getElementById("container")
fetch("http://54.227.80.41:3000/api/v1/users/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.msg}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "ENTRO");
    if (data.ok===true){
        container.textContent=data.msg.username
  } })   
.catch((error) => {
    console.log("Hubo un problema con la petición Fetch: " + error);
  });
