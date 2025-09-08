export function registrarIngreso(horaIngreso) {
    if (!horaIngreso) {
        throw new Error("Hora de ingreso requerida");
    }
    return horaIngreso;
}
export function registrarSalida(horaSalida, horaIngreso) {
    if (!horaSalida) {
        throw new Error("Hora de salida requerida");
    }
    const ingresoDate = new Date(horaIngreso);
    const salidaDate = new Date(horaSalida);

    if (salidaDate < ingresoDate) {
        throw new Error("La hora de salida no puede ser anterior a la de ingreso");
    }

    return horaSalida;
}
export function calcularTarifaBasica(horaIngreso, horaSalida) {
  const ingresoDate = new Date(horaIngreso);
  const salidaDate = new Date(horaSalida);

  let total = 0;
  let actual = new Date(ingresoDate);

  while (actual < salidaDate) {
    let finDia = new Date(actual);
    finDia.setHours(23, 59, 59, 999);
    
    const siguienteHora = new Date(actual);
    siguienteHora.setHours(siguienteHora.getHours() + 1);
    const hora = actual.getHours();
    const tarifa = (hora >= 22 || hora < 6) ? 6 : 10;
    total += tarifa;
    actual = siguienteHora;
  }
  if (total>50){
    total=50;
    return total.toFixed(2);
  }
  return total.toFixed(2);
}