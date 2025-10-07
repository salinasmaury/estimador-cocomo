// src/utils/cocomo.js

// Factores COCOMO I básico según el tipo de proyecto
const MODELS = {
  organico:   { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
  semiacoplado: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
  empotrado:    { a: 3.6, b: 1.20, c: 2.5, d: 0.32 },
};

/**
 * Calcula esfuerzo y duración COCOMO I Básico
 * @param {number} kloc - Miles de líneas de código
 * @param {'organico'|'semiacoplado'|'empotrado'} modo - Tipo de proyecto
 * @returns {object} { esfuerzo, duracion }
 */
export function cocomoBasico(kloc, modo) {
  const coef = MODELS[modo];
  if (!coef) throw new Error("Modo inválido");
  const esfuerzo = coef.a * Math.pow(kloc, coef.b); // persona-mes
  const duracion = coef.c * Math.pow(esfuerzo, coef.d); // meses
  return { esfuerzo, duracion };
}