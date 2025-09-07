import { registrarIngreso } from "./parqueo.js";

describe("Funcionalidad 1 - Registrar hora de ingreso",  () => {
  it("deberia mostrar la hora de ingreso y devolverlo en formato valido", () => {
    const ingreso = registrarIngreso('2025-09-07T08:30');
    expect(ingreso).toBe('2025-09-07T08:30');
  });
});