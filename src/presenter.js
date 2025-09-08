import { registrarIngreso, registrarSalida, calcularTarifaBasica, calcularDesglosePorDias } from "./parqueo.js";

const inicioInput = document.getElementById("inicio");
const btnIngreso = document.getElementById("btnIngreso");
const finInput = document.getElementById("fin");
const btnSalida = document.getElementById("btnSalida");
const resultadoDiv = document.getElementById("resultado");
const desgloseDiv = document.getElementById("desglose");

let horaIngreso = null;

btnIngreso.addEventListener("click", () => {
  try {
    horaIngreso = registrarIngreso(inicioInput.value);
    resultadoDiv.innerText = `Ingreso registrado: ${new Date(horaIngreso).toLocaleString()}`;
    desgloseDiv.innerHTML = "";
  } catch (err) {
    resultadoDiv.innerText = err.message;
    desgloseDiv.innerHTML = "";
  }
});

btnSalida.addEventListener("click", () => {
  try {
    if (!horaIngreso) {
      resultadoDiv.innerText = "Primero debes registrar la hora de ingreso";
      return;
    }
    const horaSalida = registrarSalida(finInput.value, horaIngreso);
    resultadoDiv.innerText = `Salida registrada: ${new Date(horaSalida).toLocaleString()}`;
    const desglose = calcularDesglosePorDias(horaIngreso, horaSalida);
    let desgloseHtml = "<h3>Desglose por día:</h3><ul>";
    desglose.forEach(d => {
      desgloseHtml += `<li>
        <b>${d.fecha}</b>: 
        Sin tope Bs ${d.montoSinTope.toFixed(2)} | 
        Con tope Bs ${d.montoConTope.toFixed(2)}
      </li>`;
    });
    desgloseHtml += "</ul>";
    desgloseDiv.innerHTML = desgloseHtml;
    const total = desglose.reduce((sum, d) => sum + d.montoConTope, 0);
  } catch (err) {
    resultadoDiv.innerText = err.message;
    desgloseDiv.innerHTML = "";
  }
});

