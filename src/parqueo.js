export function registrarIngreso(horaIngreso) {
    if (!horaIngreso) {
        throw new Error("Hora de ingreso requerida");
    }
    return horaIngreso;
}

