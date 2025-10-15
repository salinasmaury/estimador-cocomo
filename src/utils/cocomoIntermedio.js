// src/utils/cocomoIntermedio.js

const MODELS = {
    organico: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
    semiacoplado: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
    empotrado: { a: 3.6, b: 1.20, c: 2.5, d: 0.32 },
};

// Nombres de los 15 factores de costo
export const COST_DRIVERS = [
    "RELY", "DATA", "CPLX", "TIME", "STOR",
    "VIRT", "TURN", "ACAP", "PCAP", "AEXP",
    "LEXP", "MODP", "TOOL", "SCED", "TEAM"
];

// Etiquetas descriptivas para cada factor de costo
export const COST_DRIVER_LABELS = [
    "Fiabilidad requerida (RELY)",
    "Tamaño de base de datos (DATA)",
    "Complejidad del producto (CPLX)",
    "Restricción de tiempo (TIME)",
    "Restricción de almacenamiento (STOR)",
    "Volatilidad del entorno (VIRT)",
    "Tiempo de uso de la máquina (TURN)",
    "Capacidad del analista (ACAP)",
    "Capacidad del programador (PCAP)",
    "Experiencia en la aplicación (AEXP)",
    "Experiencia en lenguaje y herramientas (LEXP)",
    "Uso de métodos modernos (MODP)",
    "Uso de herramientas software (TOOL)",
    "Restricción de programación múltiple (SCED)",
    "Experiencia del equipo (TEAM)"
];

// Opciones y valores sugeridos para cada factor (puedes expandir según tu tabla)
export const COST_DRIVER_OPTIONS = {
    RELY: [
        { label: "Muy bajo", value: 0.75 },
        { label: "Bajo", value: 0.88 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.15 },
        { label: "Muy alto", value: 1.40 },
    ],
    DATA: [
        { label: "Bajo", value: 0.94 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.08 },
        { label: "Muy alto", value: 1.16 },
    ],
    CPLX: [
        { label: "Muy bajo", value: 0.70 },
        { label: "Bajo", value: 0.85 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.15 },
        { label: "Muy alto", value: 1.30 },
        { label: "Extra alto", value: 1.65 },
    ],
    TIME: [
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.11 },
        { label: "Muy alto", value: 1.30 },
        { label: "Extra alto", value: 1.66 },
    ],
    STOR: [
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.06 },
        { label: "Muy alto", value: 1.21 },
        { label: "Extra alto", value: 1.56 },
    ],
    VIRT: [
        { label: "Bajo", value: 0.87 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.15 },
        { label: "Muy alto", value: 1.30 },
    ],
    TURN: [
        { label: "Muy bajo", value: 0.87 },
        { label: "Bajo", value: 0.94 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.07 },
        { label: "Muy alto", value: 1.15 },
    ],
    ACAP: [
        { label: "Muy bajo", value: 1.46 },
        { label: "Bajo", value: 1.19 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.86 },
        { label: "Muy alto", value: 0.71 },
    ],
    PCAP: [
        { label: "Muy bajo", value: 1.42 },
        { label: "Bajo", value: 1.17 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.86 },
        { label: "Muy alto", value: 0.70 },
    ],
    AEXP: [
        { label: "Muy bajo", value: 1.29 },
        { label: "Bajo", value: 1.13 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.91 },
        { label: "Muy alto", value: 0.82 },
    ],
    LEXP: [
        { label: "Muy bajo", value: 1.20 },
        { label: "Bajo", value: 1.09 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.91 },
    ],
    MODP: [
        { label: "Muy bajo", value: 1.24 },
        { label: "Bajo", value: 1.10 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.91 },
        { label: "Muy alto", value: 0.82 },
    ],
    TOOL: [
        { label: "Muy bajo", value: 1.24 },
        { label: "Bajo", value: 1.10 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.91 },
        { label: "Muy alto", value: 0.83 },
    ],
    SCED: [
        { label: "Muy bajo", value: 1.23 },
        { label: "Bajo", value: 1.08 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 1.04 },
        { label: "Muy alto", value: 1.10 },
    ],
    TEAM: [
        { label: "Muy bajo", value: 1.10 },
        { label: "Bajo", value: 1.06 },
        { label: "Nominal", value: 1.00 },
        { label: "Alto", value: 0.95 },
        { label: "Muy alto", value: 0.91 },
    ],
};

/**
 * Calcula esfuerzo y duración COCOMO I Intermedio
 * @param {number} kloc
 * @param {'organico'|'semiacoplado'|'empotrado'} modo
 * @param {number[]} multiplicadores - array de 15 multiplicadores
 * @returns {object} { esfuerzo, duracion, eaf }
 */
export function cocomoIntermedio(kloc, modo, multiplicadores) {
    const coef = MODELS[modo];
    if (!coef) throw new Error("Modo inválido");
    if (!Array.isArray(multiplicadores) || multiplicadores.length !== 15) {
        throw new Error("Debes pasar un array de 15 multiplicadores");
    }
    const eaf = multiplicadores.reduce((acc, val) => acc * val, 1);
    const esfuerzo = coef.a * Math.pow(kloc, coef.b) * eaf;
    const duracion = coef.c * Math.pow(esfuerzo, coef.d);
    return { esfuerzo, duracion, eaf };
}