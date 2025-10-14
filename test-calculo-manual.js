// Test manual para verificar cálculos de COCOMO Intermedio
import { cocomoIntermedio } from './src/utils/cocomoIntermedio.js';

// Definimos los modelos localmente ya que no están exportados
const MODELS = {
    organico: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
    semiacoplado: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
    empotrado: { a: 3.6, b: 1.20, c: 2.5, d: 0.32 },
};

console.log('=== TEST MANUAL COCOMO INTERMEDIO ===');
console.log('Parámetros del test:');
console.log('- KLOC: 20');
console.log('- Modo: orgánico');
console.log('- TIME: Extra alto (1.66)');
console.log('- Todos los demás: Nominal (1.00)');
console.log('- Costo por persona: $499');
console.log('- Equipo: 3 personas');
console.log('');

// Parámetros del modelo orgánico
const modelo = MODELS.organico;
console.log('Coeficientes del modelo orgánico:', modelo);

// Multiplicadores (TIME = 1.66, resto = 1.0)
const multiplicadores = [
    1.00, // RELY
    1.00, // DATA
    1.00, // CPLX
    1.66, // TIME (Extra alto)
    1.00, // STOR
    1.00, // VIRT
    1.00, // TURN
    1.00, // ACAP
    1.00, // PCAP
    1.00, // AEXP
    1.00, // LEXP
    1.00, // MODP
    1.00, // TOOL
    1.00, // SCED
    1.00  // TEAM
];

console.log('Multiplicadores:', multiplicadores);

// Cálculo manual
const kloc = 20;
const eaf = multiplicadores.reduce((acc, val) => acc * val, 1);
console.log('EAF calculado:', eaf);

const esfuerzoBase = modelo.a * Math.pow(kloc, modelo.b);
console.log('Esfuerzo base (sin EAF):', esfuerzoBase);

const esfuerzoFinal = esfuerzoBase * eaf;
console.log('Esfuerzo final (con EAF):', esfuerzoFinal);

const duracion = modelo.c * Math.pow(esfuerzoFinal, modelo.d);
console.log('Duración:', duracion);

// Cálculos de costos
const costoPersonaMes = 499;
const equipoPersonas = 3;

const costoTotal = esfuerzoFinal * costoPersonaMes;
const costoMensual = costoTotal / duracion;
const personasPromedio = esfuerzoFinal / duracion;
const duracionConEquipo = esfuerzoFinal / equipoPersonas;
const productividad = kloc / esfuerzoFinal;

console.log('');
console.log('=== RESULTADOS CALCULADOS MANUALMENTE ===');
console.log('Esfuerzo:', esfuerzoFinal.toFixed(2), 'persona-mes');
console.log('Duración:', duracion.toFixed(2), 'meses');
console.log('EAF:', eaf.toFixed(3));
console.log('Costo total: $', costoTotal.toFixed(0));
console.log('Costo mensual: $', costoMensual.toFixed(0));
console.log('Personas promedio:', personasPromedio.toFixed(1));
console.log('Duración con 3 personas:', duracionConEquipo.toFixed(1), 'meses');
console.log('Productividad:', productividad.toFixed(2), 'KLOC/persona-mes');

// Usando la función
console.log('');
console.log('=== RESULTADOS DE LA FUNCIÓN ===');
const resultado = cocomoIntermedio(kloc, 'organico', multiplicadores);
console.log('Esfuerzo:', resultado.esfuerzo.toFixed(2), 'persona-mes');
console.log('Duración:', resultado.duracion.toFixed(2), 'meses');
console.log('EAF:', resultado.eaf.toFixed(3));