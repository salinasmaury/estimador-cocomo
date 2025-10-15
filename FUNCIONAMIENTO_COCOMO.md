# Cómo Funciona COCOMO

## ¿Qué es COCOMO?

COCOMO es una forma de calcular cuánto va a costar y cuánto tiempo va a tomar hacer un programa. Es como cuando vas a construir una casa: necesitas saber cuántos trabajadores, cuánto tiempo y cuánto dinero. COCOMO hace lo mismo pero para software.

## Los Tres Niveles de COCOMO

### COCOMO Básico
Solo necesitas saber qué tan grande va a ser tu programa (en miles de líneas de código) y qué tipo de proyecto es. Es rápido pero no muy exacto.

### COCOMO Intermedio
Además del tamaño, también considera 15 factores que afectan el desarrollo. Por ejemplo: si tu equipo tiene experiencia, si tienes buenas herramientas, si el proyecto es complicado, etc. Mucho más exacto que el básico.

### COCOMO Detallado
El más completo y exacto, pero necesitas mucha más información.

## ¿Cómo Funciona en la Práctica?

### Tipos de Proyecto

Primero, necesitas clasificar tu proyecto en una de estas categorías:

**Orgánico**: Proyectos pequeños y fáciles. Como una app para hacer listas de tareas. Equipo pequeño que sabe lo que hace, y si hay que cambiar algo, no hay problema.

**Semiacoplado**: Proyectos medianos con algo de complejidad. Como un sistema para una empresa pequeña. Es una mezcla entre orgánico y empotrado.

**Empotrado**: Proyectos grandes y complicados con reglas estrictas. Como software para hospitales o aviones. No puedes cambiar nada fácilmente y el equipo es grande.

### El Cálculo Básico

La fórmula básica es sorprendentemente simple:

```
Esfuerzo = a × (KLOC)^b
Tiempo = c × (Esfuerzo)^d
```

Donde `a`, `b`, `c` y `d` son constantes que cambian según el tipo de proyecto. Es como una receta de cocina: los ingredientes son siempre los mismos, pero las proporciones cambian según lo que quieres cocinar.

## Implementación en Nuestro Código

### COCOMO Básico - La Simplicidad en Acción

```javascript
// src/utils/cocomo.js
const MODELS = {
    organico: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
    semiacoplado: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
    empotrado: { a: 3.6, b: 1.20, c: 2.5, d: 0.32 },
};

export function cocomoBasico(kloc, modo) {
    const model = MODELS[modo];
    const esfuerzo = model.a * Math.pow(kloc, model.b);
    const duracion = model.c * Math.pow(esfuerzo, model.d);
    
    return { esfuerzo, duracion };
}
```

Este código es la esencia de COCOMO. Tomas el tamaño (KLOC), eliges tu tipo de proyecto (modo), y aplicas las fórmulas matemáticas. Simple pero efectivo.

### COCOMO Intermedio - Donde la Magia Sucede

```javascript
// src/utils/cocomoIntermedio.js
export function cocomoIntermedio(kloc, modo, multiplicadores) {
    // Primero calculamos como en el básico
    const model = MODELS[modo];
    const esfuerzoNominal = model.a * Math.pow(kloc, model.b);
    
    // Aquí está la diferencia: aplicamos los factores de ajuste
    const eaf = multiplicadores.reduce((acc, mult) => acc * mult, 1.0);
    const esfuerzoAjustado = esfuerzoNominal * eaf;
    
    const duracion = model.c * Math.pow(esfuerzoAjustado, model.d);
    
    return { 
        esfuerzo: esfuerzoAjustado, 
        duracion, 
        eaf 
    };
}
```

Aquí es donde COCOMO realmente brilla. El EAF (Factor de Ajuste del Esfuerzo) es el resultado de multiplicar todos los factores individuales. Si tu equipo es muy experimentado (multiplicador 0.82), pero el proyecto es muy complejo (multiplicador 1.15), estos factores se balancean matemáticamente.

### Los 15 Factores de Costo

Cada factor representa un aspecto real del desarrollo de software:

```javascript
export const COST_DRIVERS = [
    "RELY", // ¿Qué tan crítico es que funcione perfectamente?
    "DATA", // ¿Manejas grandes cantidades de información?
    "CPLX", // ¿Qué tan complicado es el código?
    "TIME", // ¿Tienes restricciones de tiempo de ejecución?
    "STOR", // ¿Tienes limitaciones de memoria?
    // ... y 10 más
];
```

Cada factor tiene valores que van desde "Muy Bajo" (0.75) hasta "Muy Alto" (1.40 o más). Es como un sistema de puntuación donde 1.00 significa "normal" o "promedio".

## Interfaz de Usuario - Haciendo lo Complejo Simple

### Formulario Básico
```jsx
// Un formulario minimalista para COCOMO básico
<input 
    type="number" 
    value={kloc} 
    placeholder="Ej: 8.5"
/>
<select value={modo}>
    <option value="organico">Orgánico</option>
    <option value="semiacoplado">Semiacoplado</option>
    <option value="empotrado">Empotrado</option>
</select>
```

### Formulario Intermedio
```jsx
// Para cada factor de costo, un selector
{COST_DRIVERS.map((driver, idx) => (
    <select 
        value={multiplicadores[idx]}
        onChange={e => handleMultiplicadorChange(idx, e.target.value)}
    >
        <option value={0.75}>Muy bajo (0.75)</option>
        <option value={1.00}>Nominal (1.00)</option>
        <option value={1.15}>Alto (1.15)</option>
    </select>
))}
```

## ¿Por Qué Funciona?

COCOMO funciona porque se basa en datos reales de cientos de proyectos de software. Se analizaron proyectos que salieron bien y mal, se encontraron patrones y se hicieron fórmulas matemáticas.

Es como tener la experiencia de miles de programadores en unas pocas ecuaciones. No es perfecto, pero te da una buena base para planificar.

## Limitaciones

**No es magia**: COCOMO te da estimaciones, no verdades absolutas. Los proyectos de software siempre tienen sorpresas.

**Necesitas experiencia**: Los resultados dependen de qué tan bien llenes los datos. Si te equivocas en la complejidad o experiencia del equipo, el resultado estará mal.

**Depende del contexto**: Un proyecto "orgánico" en una startup es diferente a uno en una empresa grande.

## Consejos

1. **Empieza simple**: Si es tu primera vez, usa el modelo básico primero.

2. **Mejor de más que de menos**: Es mejor calcular un poco más tiempo y dinero que quedarte corto.

3. **Actualiza**: Mientras avanza el proyecto, vuelve a calcular con nueva información.

4. **Usa varias formas**: No te quedes solo con COCOMO, úsalo junto con otras formas de estimar.

5. **Anota todo**: Escribe por qué elegiste cada valor. Te va a servir para próximos proyectos.

## Conclusión

COCOMO te ayuda a estimar proyectos de software de forma más científica en lugar de adivinar. No elimina todas las sorpresas, pero las reduce mucho y te da una base sólida para tomar decisiones.

Con esta calculadora que hicimos, tienes una herramienta fácil de usar para planificar mejor tus proyectos. Recuerda: la mejor estimación es la que usas datos reales y la actualizas con nueva información.