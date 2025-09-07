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
    return 10;
}
