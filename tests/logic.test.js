const {
  kmRestante,
  estadoDe,
  esKmValido,
  contarUrgentes,
  validarRegistro,
  parseKm
} = require('../src/logic');

/**
 * UT-01: calcularKmRestante() — caso normal
 */
test('UT-01 kmRestante calcula la diferencia entre km próximo y km actual', () => {
  expect(kmRestante(45000, 45100)).toBe(100);
});

/**
 * UT-02: estadoDe() — valor límite (boundary) en 500 km exactos.
 * Regla de negocio: "Si faltan MENOS de 500 km, activar Alerta Urgente".
 * A exactamente 500 km restantes, el estado NO debería ser urgente.
 */
test('UT-02 estadoDe() a exactamente 500 km restantes NO debería ser urgente', () => {
  const esperado = 'warn'; // 500 km restantes: aún no es "menos de 500"
  const obtenido = estadoDe(49500, 50000);
  expect(obtenido).toBe(esperado); // Falla con la implementación actual -> Bug detectado
});

/**
 * UT-03: esKmValido() — el km próximo no puede ser igual al actual.
 */
test('UT-03 esKmValido() rechaza km próximo igual al km actual', () => {
  expect(esKmValido(50000, 50000)).toBe(false);
});

/**
 * UT-04: consistencia entre estadoDe() y contarUrgentes() en el límite de 500 km.
 * Ambas funciones califican el mismo caso de negocio y deberían coincidir.
 */
test('UT-04 estadoDe() y contarUrgentes() deben coincidir en el límite de 500 km', () => {
  const registros = [{ kmActual: 49500, kmProximo: 50000 }]; // 500 km restantes
  const marcadoUrgentePorEstado = estadoDe(49500, 50000) === 'urgent';
  const marcadoUrgentePorContador = contarUrgentes(registros) === 1;
  expect(marcadoUrgentePorEstado).toBe(marcadoUrgentePorContador); // Falla -> Bug detectado (lógica duplicada e inconsistente)
});

/**
 * UT-05: validarRegistro() — la categoría es obligatoria también al editar.
 */
test('UT-05 validarRegistro() exige categoría también en modo edición', () => {
  const registro = { kmActual: 1000, kmProximo: 2000, categoria: '' };
  const resultado = validarRegistro(registro, true); // isEditing = true
  expect(resultado.valid).toBe(false); // Falla con la implementación actual -> Bug detectado
});

/**
 * UT-06: parseKm() — entradas no numéricas no deberían producir NaN silencioso.
 */
test('UT-06 parseKm() no debería devolver NaN para una entrada no numérica', () => {
  const resultado = parseKm('abc');
  expect(Number.isNaN(resultado)).toBe(false); // Falla -> Bug detectado (sin manejo de NaN)
});

/**
 * UT-07: esKmValido() — no debería aceptar kilometrajes negativos.
 */
test('UT-07 esKmValido() rechaza kilometraje actual negativo', () => {
  expect(esKmValido(-100, 500)).toBe(false); // Falla -> Bug detectado (sin validación de límites/negativos)
});

/**
 * UT-08: validarRegistro() — caso feliz, no debería reportar errores.
 */
test('UT-08 validarRegistro() acepta un registro correcto', () => {
  const registro = { kmActual: 40000, kmProximo: 45000, categoria: 'aceite' };
  const resultado = validarRegistro(registro, false);
  expect(resultado.valid).toBe(true);
});
