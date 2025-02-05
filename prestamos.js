const alert = document.getElementById("alert");
let msgError = document.querySelector("#alert p");

function alertaON(notification,) {

  msgError.textContent = notification + mesesRestantesDelAño;
  alert.classList.add("show");
  setTimeout(() => {
    alert.classList.remove('show');
  }, 7000);
}

console.log(alertaON)
window.formatearMoneda = function (input) {

  let valor = input.value.replace(/\D/g, '');


  let numeroFormateado = new Intl.NumberFormat('es-ES').format(valor);


  input.value = numeroFormateado;
}

function formatMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(valor);
}

function mesesRestantes() {
  let fechaActual = new Date();  // Obtener la fecha actual
  let mesActual = fechaActual.getMonth() + 1; // Obtener el mes actual (0 = Enero, por eso sumamos 1)
  let mesesFaltantes = 12 - mesActual; // Calcular los meses restantes
  return mesesFaltantes;
}

console.log("Meses restantes en el año:", mesesRestantes());
let mesesRestantesDelAño = mesesRestantes();

function gen_table() {
  document.getElementById("tab").innerHTML = "";
  let capitalInput = document.getElementById("capital").value;
  let n = Number(capitalInput.replace(/\./g, '')); // Bug: Antipatron, el nombre de las varaibles deben ser descriptivas, deben ser en ingles y deben ser camelCase
  let n2 = Number(document.getElementById("couta").value); // Bug: Antipatron, el nombre de las varaibles deben ser descriptivas, deben ser en ingles y deben ser camelCase
  let n3 = Number(document.getElementById("interes").value); // Bug: Antipatron, el nombre de las varaibles deben ser descriptivas, deben ser en ingles y deben ser camelCase

  console.log("valor ", n)

  if (n2 > mesesRestantesDelAño) {
    console.log()

    let textAlert = "el numero maximo de cuotas no  puede superar los meses restantes del año"

    alertaON(textAlert, mesesRestantesDelAño) // Bug: Se le esta enviando dos parametros a la función, y esta solo esta usando uno
    return
  }

  if (n > 0) {
    for (i = 1; i <= n2; i++) {
      ca = n / n2;
      d1 = ca.toFixed(2);
      i2 = (n * n3) / 100 / n2;
      d2 = i2.toFixed(2);
      r = ca + i2;
      d3 = r.toFixed(2);
      document.getElementById("tab").innerHTML =
        document.getElementById("tab").innerHTML +
        `<tr>
            <td> ${i}</td>
            <td> ${formatMoneda(d1)}</td>
            <td> ${formatMoneda(d2)}</td>
            <td> ${formatMoneda(d3)}</td>
        </tr>`;
    }
    n1 = n.toFixed(2);
    t_i = i2 * n2;
    d4 = t_i.toFixed(2);
    t_p = r * n2;
    d5 = t_p.toFixed(2);
    document.getElementById("t1").innerHTML = formatMoneda(n1);
    document.getElementById("t2").innerHTML = formatMoneda(d4);
    document.getElementById("t3").innerHTML = formatMoneda(d5);
  } else {
    alert("Falta ingresar un Número");
  }
}