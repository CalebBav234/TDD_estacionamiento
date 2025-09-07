import { registrarIngreso } from "./parqueo.js";


const inicioInput = document.getElementById("inicio");
const btnIngreso = document.getElementById("btnIngreso");
const resultadoDiv = document.getElementById("resultado");

let horaIngreso = null;


btnIngreso.addEventListener("click", () => {
  try {
    horaIngreso = registrarIngreso(inicioInput.value);
    resultadoDiv.innerText = `Ingreso registrado: ${horaIngreso}`;
  } catch (err) {
    resultadoDiv.innerText = err.message;
  }
});
