import { registrarIngreso, registrarSalida  } from "./parqueo.js";

describe("Funcionalidad 1 - Registrar hora de ingreso",  () => {
  it("deberia mostrar la hora de ingreso y devolverlo en formato valido", () => {
    const ingreso = registrarIngreso('2025-09-07T08:30');
    expect(ingreso).toBe('2025-09-07T08:30');
  });
  it("deberia mostrar cualquier hora de ingreso y devolverlo en formato valido", () => {
    const ingreso = registrarIngreso('2025-09-07T10:30');
    expect(ingreso).toBe('2025-09-07T10:30');
  });
  it("deberia lanzar error si la hora de ingreso está vacía", () => {
    expect(() => registrarIngreso("")).toThrow("Hora de ingreso requerida");
  });
});
describe("Funcionalidad 2 - Registrar hora de salida", () => {
  it("deberia registrar y devolver una hora de salida", () => {
    const ingreso = registrarIngreso("2025-09-07T08:30");
    const salida = registrarSalida("2025-09-07T10:30", ingreso);
    expect(salida).toBe("2025-09-07T10:30");
  });
  it("deberia registrar y devolver cualquier hora de salida", () => {
    const ingreso = registrarIngreso("2025-09-07T10:30");
    const salida = registrarSalida("2025-09-07T12:30", ingreso);
    expect(salida).toBe("2025-09-07T12:30");
  });

});