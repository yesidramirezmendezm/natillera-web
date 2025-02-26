const alert = document.getElementById("alert");
let msgError = document.querySelector("#alert p");



export function alertaON(notification) {
  
  msgError.textContent = notification;
  alert.classList.add("show");
  setTimeout(() => {
    alert.classList.remove('show');
  }, 3000);

}