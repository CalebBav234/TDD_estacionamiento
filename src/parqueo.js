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
export function calcularDesglosePorDias(horaIngreso, horaSalida) {
  const ingresoDate = new Date(horaIngreso);
  const salidaDate = new Date(horaSalida);
  const desglose = [];
  let actual = new Date(ingresoDate);
  while (actual < salidaDate) {
    let finDia = new Date(actual);
    finDia.setHours(23, 59, 59, 999);
    if (salidaDate < finDia) finDia = salidaDate;
    let montoDia = 0;
    let temp = new Date(actual);
    while (temp < finDia) {
      let siguienteHora = new Date(temp);
      siguienteHora.setHours(temp.getHours() + 1);
      if (siguienteHora > finDia) siguienteHora = new Date(finDia);
      const diffHoras = (siguienteHora - temp) / (1000 * 60 * 60); 
      const horasACobrar = Math.ceil(diffHoras); 
      const hora = temp.getHours();
      const tarifa = (hora >= 22 || hora < 6) ? 6 : 10;
      montoDia += tarifa * horasACobrar;
      temp = siguienteHora;
    }
    const montoConTope = montoDia > 50 ? 50 : montoDia;
    const fecha = actual.getFullYear() + '-' +String(actual.getMonth() + 1).padStart(2, '0') + '-' +String(actual.getDate()).padStart(2, '0');
    desglose.push({
      fecha: fecha,
      montoSinTope: montoDia,
      montoConTope: montoConTope
    });
    actual = new Date(finDia.getTime() + 1);
  }
  return desglose;
}
export function calcularMontoTotalFinal(horaIngreso, horaSalida) {
  const desglose = calcularDesglosePorDias(horaIngreso, horaSalida);
  const total = desglose.reduce((suma, d) => suma + d.montoConTope, 0);
  return parseFloat(total.toFixed(2));
}









