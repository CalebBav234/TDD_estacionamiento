import { 
  registrarIngreso, 
  registrarSalida, 
  calcularTarifaBasica, 
  calcularDesglosePorDias, 
  calcularMontoTotalFinal, 
  calcularMontoTicketPerdido 
} from "./parqueo.js";

const inicioInput = document.getElementById("inicio");
const finInput = document.getElementById("fin");
const btnIngreso = document.getElementById("btnIngreso");
const btnSalida = document.getElementById("btnSalida");
const ticketPerdidoChk = document.getElementById("ticketPerdido");
const resultadoDiv = document.getElementById("resultado");
const montoDiv = document.getElementById("montoTotal");

let horaIngreso = null;

ticketPerdidoChk.addEventListener("change", () => {
  if (ticketPerdidoChk.checked) {
    inicioInput.disabled = true;
    finInput.disabled = true;
    btnIngreso.disabled = true;
    btnSalida.disabled = true;
    const monto = calcularMontoTicketPerdido().toFixed(2);
    resultadoDiv.innerText = "Ticket marcado como perdido.";
    montoDiv.innerHTML = `<h3>Monto a pagar: Bs ${monto}</h3>`;
  } else {
    inicioInput.disabled = false;
    finInput.disabled = false;
    btnIngreso.disabled = false;
    btnSalida.disabled = false;
    resultadoDiv.innerText = "";
    montoDiv.innerHTML = "";
    horaIngreso = null;
  }
});

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
          <td>Bs ${d.montoSinTope.toFixed(2)}</td>
          <td>Bs ${d.montoConTope.toFixed(2)}</td>
        </tr>`;
    });
    html += `</table>`;
    html += `<h3>Total final a pagar: Bs ${totalFinal.toFixed(2)}</h3>`;
    montoDiv.innerHTML = html;
  } catch (err) {
    resultadoDiv.innerText = err.message;
    montoDiv.innerHTML = "";
  }
});

