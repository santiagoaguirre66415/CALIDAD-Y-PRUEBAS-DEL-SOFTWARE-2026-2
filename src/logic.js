/**
 * logic.js
 * Lógica de negocio de la Bitácora de Mantenimiento Vehicular.
 * Se comparte entre index.html (navegador) y la suite de pruebas (Node/Jest).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MaintenanceLogic = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // Convierte un valor de formulario a entero.
  function parseKm(value) {
    return parseInt(value);
  }

  // Kilómetros restantes hasta el próximo mantenimiento.
  function kmRestante(kmActual, kmProximo) {
    return kmProximo - kmActual;
  }

  // Clasifica el estado del vehículo según los km restantes.
  function estadoDe(kmActual, kmProximo) {
    var diff = kmRestante(kmActual, kmProximo);
    if (diff <= 500) return 'urgent';
    if (diff <= 1500) return 'warn';
    return 'ok';
  }

  // Regla: el km próximo debe ser mayor al km actual.
  function esKmValido(kmActual, kmProximo) {
    return kmProximo > kmActual;
  }

  // Cuenta cuántos vehículos están en alerta urgente (< 500 km restantes).
  function contarUrgentes(records) {
    return records.filter(function (r) {
      return kmRestante(r.kmActual, r.kmProximo) < 500;
    }).length;
  }

  // Valida un registro antes de guardarlo.
  function validarRegistro(record, isEditing) {
    var errors = {};

    if (!esKmValido(record.kmActual, record.kmProximo)) {
      errors.km = 'El kilometraje próximo debe ser mayor al actual.';
    }

    if (!isEditing && !record.categoria) {
      errors.categoria = 'Debe seleccionar una categoría de servicio.';
    }

    return { valid: Object.keys(errors).length === 0, errors: errors };
  }

  return {
    parseKm: parseKm,
    kmRestante: kmRestante,
    estadoDe: estadoDe,
    esKmValido: esKmValido,
    contarUrgentes: contarUrgentes,
    validarRegistro: validarRegistro
  };
});
