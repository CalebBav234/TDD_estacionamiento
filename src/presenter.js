import { registrarIngreso, registrarSalida, calcularTarifaBasica } from "./parqueo.js";


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
    const monto = calcularTarifaBasica(horaIngreso, horaSalida);
    montoDiv.innerText = `Monto a pagar: Bs ${monto}`;
  } catch (err) {
    resultadoDiv.innerText = err.message;
    montoDiv.innerText = "";
  }
});


