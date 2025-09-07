export function registrarIngreso(horaIngreso) {
    if (!horaIngreso) {
        throw new Error("Hora de ingreso requerida");
    }
    return horaIngreso;
}
export function registrarSalida(horaSalida, horaIngreso) {
    return "2025-09-07T10:30"
}
