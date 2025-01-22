const alert = document.getElementById("alert");
let msgError = document.querySelector("#alert p");

export function alertaON(notification) {
  console.log("my firts funtion");
  alert.classList.add("show");
  msgError.textContent = notification;
}
