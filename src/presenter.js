import { registrarIngreso, registrarSalida, calcularTarifaBasica, calcularDesglosePorDias, calcularMontoTotalFinal } from "./parqueo.js";

const inicioInput = document.getElementById("inicio");
const btnIngreso = document.getElementById("btnIngreso");
const finInput = document.getElementById("fin");
const btnSalida = document.getElementById("btnSalida");
const resultadoDiv = document.getElementById("resultado");
const montoDiv = document.getElementById("montoTotal");

let horaIngreso = null;

btnIngreso.addEventListener("click", () => {
  try {
    horaIngreso = registrarIngreso(inicioInput.value);
    resultadoDiv.innerText = `Ingreso registrado: ${horaIngreso}`;
    montoDiv.innerHTML = "";
  } catch (err) {
    resultadoDiv.innerText = err.message;
  }
});

btnSalida.addEventListener("click", () => {
  try {
    if (!horaIngreso) {
      resultadoDiv.innerText = "Primero debes registrar la hora de ingreso";
      return;
    }
    const horaSalida = registrarSalida(finInput.value, horaIngreso);
    resultadoDiv.innerText = `Salida registrada: ${horaSalida}`;
    const desglose = calcularDesglosePorDias(horaIngreso, horaSalida);
    const totalFinal = calcularMontoTotalFinal(horaIngreso, horaSalida);
    let html = `<h3>Desglose por día</h3>
      <table border="1" cellpadding="5">
        <tr>
          <th>Fecha</th>
          <th>Monto sin tope</th>
          <th>Monto con tope</th>
        </tr>`;
    desglose.forEach(d => {
      html += `
        <tr>
          <td>${d.fecha}</td>
          <td>Bs ${d.montoSinTope}</td>
          <td>Bs ${d.montoConTope}</td>
        </tr>`;
    });
    html += `</table>`;
    html += `<h3>Total final a pagar: Bs ${totalFinal}</h3>`;
    montoDiv.innerHTML = html;
  } catch (err) {
    resultadoDiv.innerText = err.message;
    montoDiv.innerHTML = "";
  }
});

