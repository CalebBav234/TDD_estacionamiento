import { registrarIngreso, registrarSalida, calcularTarifaBasica  } from "./parqueo.js";

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
  it("deberia lanzar error si la hora de salida es anterior a la de ingreso", () => {
    const ingreso = registrarIngreso("2025-09-07T08:30");
    expect(() => registrarSalida("2025-09-07T07:30", ingreso)).toThrow(
      "La hora de salida no puede ser anterior a la de ingreso"
    );
  });
   it("deberia lanzar error si no se proporciona hora de salida", () => {
    const ingreso = registrarIngreso("2025-09-07T08:30");
    expect(() => registrarSalida("", ingreso)).toThrow(
      "Hora de salida requerida"
    );
  });
});
describe("Funcionalidad 3 - Calcular tarifa básica por hora (sin redondeo)", () => {
    it("debería cobrar 10 Bs por 1 hora completa", () => {
        const ingreso = registrarIngreso("2025-09-08T09:00");
        const salida = registrarSalida("2025-09-08T10:00", ingreso);
        expect(calcularTarifaBasica(ingreso, salida)).toBe("10.00");
    });
    /*it("debería cobrar 5 Bs si la estadía fue de 0.5 horas", () => {
        const ingreso = registrarIngreso("2025-09-08T09:00");
        const salida = registrarSalida("2025-09-08T09:30", ingreso);
        expect(calcularTarifaBasica(ingreso, salida)).toBe(5);
    });*/
});
describe("Funcionalidad 4 - Redondeo por fracción de hora", () => {
    it("debería cobrar 10 Bs por 30 minutos (redondea hacia arriba)", () => {
        const ingreso = registrarIngreso("2025-09-08T09:00");
        const salida = registrarSalida("2025-09-08T09:30", ingreso);
        expect(calcularTarifaBasica(ingreso, salida)).toBe("10.00");
    });
    it("debería redondear siempre hacia arriba y mostrar con 2 decimales", () => {
        const ingreso = registrarIngreso("2025-09-08T09:00");
        const salida = registrarSalida("2025-09-08T10:01", ingreso);
        expect(calcularTarifaBasica(ingreso, salida)).toBe("20.00");
    });
});
describe("Funcionalidad 5 - Aplicar tarifa nocturna", () => {
     it("debería cobrar Bs 6 por hora si toda la estadía es nocturna", () => {
        const ingreso = registrarIngreso("2025-09-08T23:00");
        const salida = registrarSalida("2025-09-09T01:00", ingreso);
        expect(calcularTarifaBasica(ingreso, salida)).toBe("12.00"); 
    });
    it("debería calcular correctamente cuando la estadía cruza franja diurna y nocturna", () => {
        const ingreso = registrarIngreso("2025-09-08T21:00"); 
        const salida = registrarSalida("2025-09-08T23:00", ingreso); 
        expect(calcularTarifaBasica(ingreso, salida)).toBe("16.00"); 
    });
    it("debería cobrar Bs 10 por hora si toda la estadía es diurna", () => {
        const ingreso = registrarIngreso("2025-09-08T09:00");
        const salida = registrarSalida("2025-09-08T11:00", ingreso);
        expect(calcularTarifaBasica(ingreso, salida)).toBe("20.00"); 
    });

});
describe("Funcionalidad 6 - Tope máximo diario", () => {
  it("debería aplicar tope de 50 Bs si en un mismo día se supera ese monto", () => {
    const ingreso = registrarIngreso("2025-09-08T08:00");
    const salida = registrarSalida("2025-09-08T20:30", ingreso);
    expect(calcularTarifaBasica(ingreso, salida)).toBe("50.00");
  });
  it("debería aplicar tope separado por cada día calendario", () => {
    const ingreso = registrarIngreso("2025-09-08T08:00");
    const salida = registrarSalida("2025-09-09T10:00", ingreso);
    expect(calcularTarifaBasica(ingreso, salida)).toBe("100.00"); 
  });
});
