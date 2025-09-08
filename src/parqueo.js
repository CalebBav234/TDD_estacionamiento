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
     if (salidaDate < finDia) {
      finDia = salidaDate;
    }
    let montoDia = 0;
    let horaActual = new Date(actual);
    while (horaActual < finDia) {
      const siguienteHora = new Date(horaActual);
      siguienteHora.setHours(siguienteHora.getHours() + 1);
      const hora = horaActual.getHours();
      const tarifa = (hora >= 22 || hora < 6) ? 6 : 10;
      montoDia += tarifa;
      horaActual = siguienteHora;
    }
    if (montoDia > 50){
        montoDia = 50;
    }
    total += montoDia;
    actual = new Date(finDia);
    actual.setDate(actual.getDate() + 1);
    actual.setHours(0, 0, 0, 0);
  }
  return total.toFixed(2);
}