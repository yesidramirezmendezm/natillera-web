const token = JSON.parse(localStorage.getItem("token"));
console.log(token);

var container = document.getElementById("container");
var Saldo = document.getElementById("saldo");

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(valor);
}

fetch("http://54.227.80.41:3000/api/v1/users/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "ENTRO");
    if (data.ok === true) {
      let fullName = data.message.name + " " + data.message.last_name;
      container.textContent = fullName;
      Saldo.textContent = formatearMoneda(data.message.balance);
    }
  })
  .catch((error) => {
    console.log("Hubo un problema con la petición Fetch: " + error);
  });

fetch("http://54.227.80.41:3000/api/v1/transactions/get", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token.token}`,
  },
})
.then ((response)=> response.json() )
.then ((data) =>{
    console.log(data)
    mostrardata(data)
    
  })
.catch((error)=>console.log(error) )

const dateFormat =(fecha)=>{
  const date = new Date(fecha)
  console.log(date.getTime(), "formato de fecha")

  return date.getDate() + " / " +( date.getMonth()+1) +" / "+date.getFullYear()
}


const mostrardata = (data) => {
  let body = "";
  for (let i = 0;i < data.message.length;  i++){
    body +=` 
     <tr>
                <td>  ${ dateFormat(data.message[i].transaction_date)}</td>
                <td>${data.message[i].status}</td>
                <td>${data.message[i].type}</td>
                <td>${formatearMoneda(data.message[i].amount)}</td>
            </tr>
    `
  }
 console.log(body)
  document.getElementById("data").innerHTML = body;
}
