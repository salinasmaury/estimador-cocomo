import React, { useState } from "react";
import Tooltip from "./Tooltip";

import {
  cocomoIntermedio,
  COST_DRIVERS,
  COST_DRIVER_LABELS,
  COST_DRIVER_OPTIONS,
} from "../utils/cocomoIntermedio";

// 🧠 Descripciones breves para los tooltips de cada factor EAF tuve que poner acá porque llamaba una funcion COST_DRIVER_OPTIONS
const TOOLTIP_TEXTS = {
  RELY: "Nivel de confiabilidad y tolerancia a fallos exigido por el cliente.",
  DATA: "Tamaño y volumen de datos que debe manejar el sistema.",
  CPLX: "Grado de dificultad técnica del software (lógica, cálculos, interfaces, etc.).",
  TIME: "Exigencia de velocidad de ejecución o respuesta del sistema.",
  STOR: "Limitaciones de memoria o espacio de almacenamiento disponible.",
  VIRT: "Estabilidad del hardware o entorno de ejecución del sistema.",
  TURN: "Disponibilidad del equipo para pruebas o ejecución.",
  ACAP: "Habilidad técnica y de análisis del personal que diseña el sistema.",
  AEXP: "Familiaridad del equipo con el dominio o área del software.",
  PCAP: "Competencia técnica del equipo de desarrollo en codificación.",
  PEXP: "Experiencia del equipo con la plataforma o entorno de desarrollo.",
  LTEX: "Conocimiento en los lenguajes y herramientas utilizadas.",
  MODP: "Nivel de aplicación de metodologías de desarrollo estructuradas o modernas.",
  TOOL: "Grado de soporte de herramientas CASE o automatizadas.",
  SCED: "Presión de calendario o reducción del tiempo de desarrollo.",
};

const MODOS = [
  { value: "organico", label: "Orgánico" },
  { value: "semiacoplado", label: "Semiacoplado" },
  { value: "empotrado", label: "Empotrado" },
];

export default function ProjectFormIntermedio() {
  const [kloc, setKloc] = useState("");
  const [modo, setModo] = useState("organico");
  const [multiplicadores, setMultiplicadores] = useState(
    COST_DRIVERS.map(() => 1.0)
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  
  // 💰 Estados para cálculos de costos
  const [costoPersonaMes, setCostoPersonaMes] = useState("");
  const [personasEquipo, setPersonasEquipo] = useState("");

  const handleMultiplicadorChange = (idx, value) => {
    const nuevos = [...multiplicadores];
    nuevos[idx] = parseFloat(value);
    setMultiplicadores(nuevos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const klocNum = parseFloat(kloc);
    if (isNaN(klocNum) || klocNum <= 0) {
      setError("Por favor ingresa un número válido de KLOC (> 0)");
      return;
    }
    
    try {
      const res = cocomoIntermedio(klocNum, modo, multiplicadores);
      
      // 💰 Cálculos adicionales de costos y administración
      const costoPersonaMesNum = parseFloat(costoPersonaMes) || 0;
      const personasEquipoNum = parseFloat(personasEquipo) || 0;
      
      // Cálculos de costos financieros
      const costoTotal = res.esfuerzo * costoPersonaMesNum;
      const costoMensual = costoTotal / res.duracion;
      
      // Cálculos de administración de recursos
      const personasPromedio = res.esfuerzo / res.duracion;
      const duracionMinima = personasEquipoNum > 0 ? res.esfuerzo / personasEquipoNum : res.duracion;
      
      // Agregamos los nuevos cálculos al resultado
      const resultadoCompleto = {
        ...res,
        costos: {
          total: costoTotal,
          mensual: costoMensual,
          personaMes: costoPersonaMesNum
        },
        recursos: {
          personasPromedio: personasPromedio,
          duracionMinima: duracionMinima,
          equipoDefinido: personasEquipoNum
        }
      };
      
      setResult(resultadoCompleto);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="w-[90%] mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          COCOMO Intermedio
        </h2>
        <p className="text-gray-600 text-sm">
          Estimación con factores de costo (EAF) para mayor precisión
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 🧾 Sección básica */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Información Básica del Proyecto
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Tamaño del software (KLOC)
                <Tooltip texto="Cantidad de miles de líneas de código fuente estimadas del proyecto.">
                  <span className="text-gray-600 cursor-help text-lg">🛈</span>
                </Tooltip>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={kloc}
                onChange={(e) => setKloc(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                placeholder="Ej: 20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tipo de proyecto
                <Tooltip texto="Define cómo se distribuye el esfuerzo y tiempo en función de la naturaleza del proyecto.">
                  <span className="text-gray-600 cursor-help text-lg">🛈</span>
                </Tooltip>
              </label>
              <select
                value={modo}
                onChange={(e) => setModo(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
              >
                {MODOS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 💰 Sección de costos y recursos */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Administración de Costos y Recursos
            <Tooltip texto="Parámetros opcionales para calcular costos financieros y optimización de recursos humanos en el proyecto.">
              <span className="text-gray-600 cursor-help text-lg ml-1">🛈</span>
            </Tooltip>
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Información opcional para cálculos de presupuesto y planificación de recursos
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Costo por persona-mes (USD)
                <Tooltip texto="Costo promedio mensual de un desarrollador incluyendo salario, beneficios y gastos indirectos.">
                  <span className="text-gray-600 cursor-help text-lg">🛈</span>
                </Tooltip>
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={costoPersonaMes}
                onChange={(e) => setCostoPersonaMes(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                placeholder="Ej: 8000"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Personas disponibles en el equipo
                <Tooltip texto="Número máximo de desarrolladores disponibles para trabajar simultáneamente en el proyecto.">
                  <span className="text-gray-600 cursor-help text-lg">🛈</span>
                </Tooltip>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={personasEquipo}
                onChange={(e) => setPersonasEquipo(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                placeholder="Ej: 5"
              />
            </div>
          </div>
        </div>

        {/* ⚙️ Factores de costo */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Factores de Costo (Multiplicadores EAF)
            <Tooltip texto="Parámetros que ajustan el esfuerzo base del proyecto según la complejidad, el equipo y el entorno. El valor EAF es el producto de todos los factores seleccionados.">
              <span className="text-gray-600 cursor-help text-lg ml-1">🛈</span>
            </Tooltip>
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Selecciona el nivel de cada factor según las características de tu
            proyecto
          </p>

          {/* 📦 Drivers del Producto */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Drivers del Producto
            </h4>
            <div className="flex flex-wrap gap-4 text-black">
              {["RELY", "DATA", "CPLX"].map((driver) => {
                const idx = COST_DRIVERS.indexOf(driver);
                return (
                  <div key={driver} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow flex-1 min-w-[250px]">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700 block leading-tight">
                        {COST_DRIVER_LABELS[idx]}
                      </label>
                      <Tooltip texto={TOOLTIP_TEXTS[driver]}>
                        <span className="text-gray-500 cursor-help text-lg ml-1">🛈</span>
                      </Tooltip>
                    </div>
                    <select
                      value={multiplicadores[idx]}
                      onChange={(e) => handleMultiplicadorChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white"
                    >
                      {COST_DRIVER_OPTIONS[driver].map((opt) => (
                        <option key={opt.label} value={opt.value}>
                          {opt.label} ({opt.value})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🔧 Drivers de Hardware */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Drivers de Hardware
            </h4>
            <div className="flex flex-wrap gap-4 text-black">
              {["TIME", "STOR", "VIRT", "TURN"].map((driver) => {
                const idx = COST_DRIVERS.indexOf(driver);
                return (
                  <div key={driver} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow flex-1 min-w-[220px]">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700 block leading-tight">
                        {COST_DRIVER_LABELS[idx]}
                      </label>
                      <Tooltip texto={TOOLTIP_TEXTS[driver]}>
                        <span className="text-gray-500 cursor-help text-lg ml-1">🛈</span>
                      </Tooltip>
                    </div>
                    <select
                      value={multiplicadores[idx]}
                      onChange={(e) => handleMultiplicadorChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all bg-white"
                    >
                      {COST_DRIVER_OPTIONS[driver].map((opt) => (
                        <option key={opt.label} value={opt.value}>
                          {opt.label} ({opt.value})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* � Drivers de Personal */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              Drivers de Personal
            </h4>
            <div className="flex flex-wrap gap-4 text-black">
              {["ACAP", "AEXP", "PCAP", "PEXP", "LTEX"].map((driver) => {
                const idx = COST_DRIVERS.indexOf(driver);
                return (
                  <div key={driver} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow flex-1 min-w-[220px]">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700 block leading-tight">
                        {COST_DRIVER_LABELS[idx]}
                      </label>
                      <Tooltip texto={TOOLTIP_TEXTS[driver]}>
                        <span className="text-gray-500 cursor-help text-lg ml-1">🛈</span>
                      </Tooltip>
                    </div>
                    <select
                      value={multiplicadores[idx]}
                      onChange={(e) => handleMultiplicadorChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all bg-white"
                    >
                      {COST_DRIVER_OPTIONS[driver].map((opt) => (
                        <option key={opt.label} value={opt.value}>
                          {opt.label} ({opt.value})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🚀 Drivers del Proyecto */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              Drivers del Proyecto
            </h4>
            <div className="flex flex-wrap gap-4 text-black">
              {["MODP", "TOOL", "SCED"].map((driver) => {
                const idx = COST_DRIVERS.indexOf(driver);
                return (
                  <div key={driver} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow flex-1 min-w-[220px]">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700 block leading-tight">
                        {COST_DRIVER_LABELS[idx]}
                      </label>
                      <Tooltip texto={TOOLTIP_TEXTS[driver]}>
                        <span className="text-gray-500 cursor-help text-lg ml-1">🛈</span>
                      </Tooltip>
                    </div>
                    <select
                      value={multiplicadores[idx]}
                      onChange={(e) => handleMultiplicadorChange(idx, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 transition-all bg-white"
                    >
                      {COST_DRIVER_OPTIONS[driver].map((opt) => (
                        <option key={opt.label} value={opt.value}>
                          {opt.label} ({opt.value})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🔘 Botón principal */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <span className="flex items-center justify-center gap-2">
            Calcular Estimación Intermedia
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2z"
              />
            </svg>
          </span>
        </button>
      </form>

      {/* ⚠️ Mensaje de error */}
      {error && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* 📊 Resultados */}
      {result && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Resultados de la Estimación Intermedia
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Métricas básicas de COCOMO */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Esfuerzo */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Esfuerzo Estimado
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {result.esfuerzo.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">persona-mes</p>
            </div>

            {/* Duración */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Duración Estimada
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {result.duracion.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">meses</p>
            </div>

            {/* EAF */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Factor de Ajuste (EAF)
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {result.eaf.toFixed(3)}
              </p>
              <p className="text-sm text-gray-500">multiplicador</p>
            </div>
          </div>

          {/* Análisis de costos financieros */}
          {result.costos && result.costos.personaMes > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                💰 Análisis de Costos Financieros
              </h4>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Costo Total */}
                <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 border border-green-200 text-center">
                  <p className="text-xs font-medium text-green-700 mb-1">
                    Costo Total del Proyecto
                  </p>
                  <p className="text-xl font-bold text-green-800">
                    ${result.costos.total.toLocaleString('es-US', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-green-600">USD</p>
                </div>

                {/* Costo Mensual Óptimo */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                  <p className="text-xs font-medium text-blue-700 mb-1">
                    Presupuesto Mensual Óptimo
                  </p>
                  <p className="text-xl font-bold text-blue-800">
                    ${result.costos.mensual.toLocaleString('es-US', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-blue-600">para {result.recursos.personasPromedio.toFixed(1)} personas</p>
                </div>

                {/* Costo con tu equipo */}
                {result.recursos.equipoDefinido > 0 && (
                  <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl p-4 border border-amber-200 text-center">
                    <p className="text-xs font-medium text-amber-700 mb-1">
                      Costo Mensual Real
                    </p>
                    <p className="text-xl font-bold text-amber-800">
                      ${(result.recursos.equipoDefinido * result.costos.personaMes).toLocaleString('es-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-amber-600">con {result.recursos.equipoDefinido} personas</p>
                  </div>
                )}

                {/* Costo por Persona-Mes */}
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 border border-purple-200 text-center">
                  <p className="text-xs font-medium text-purple-700 mb-1">
                    Costo por Persona-Mes
                  </p>
                  <p className="text-xl font-bold text-purple-800">
                    ${result.costos.personaMes.toLocaleString('es-US', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-purple-600">USD/persona-mes</p>
                </div>
              </div>
              
              {/* Explicación de costos */}
              <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">💡 Diferencia entre costos:</p>
                    <p className="mb-1">
                      <strong>Presupuesto Mensual Óptimo:</strong> Lo que necesitas para completar el proyecto en tiempo óptimo ({result.duracion.toFixed(1)} meses)
                    </p>
                    {result.recursos.equipoDefinido > 0 && (
                      <p>
                        <strong>Costo Mensual Real:</strong> Lo que se paga con  {result.recursos.equipoDefinido} personas (duración: {result.recursos.duracionMinima.toFixed(1)} meses)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Administración de recursos humanos */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              👥 Administración de Recursos Humanos
            </h4>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personas Promedio */}
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-6 border border-orange-200 text-center">
                <p className="text-sm font-medium text-orange-700 mb-2">
                  Personal Promedio Requerido
                </p>
                <p className="text-2xl font-bold text-orange-800">
                  {result.recursos.personasPromedio.toFixed(1)}
                </p>
                <p className="text-sm text-orange-600">personas</p>
              </div>

              {/* Duración con equipo disponible */}
              {result.recursos.equipoDefinido > 0 && (
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl p-6 border border-indigo-200 text-center">
                  <p className="text-sm font-medium text-indigo-700 mb-2">
                    Duración con {result.recursos.equipoDefinido} personas
                  </p>
                  <p className="text-2xl font-bold text-indigo-800">
                    {result.recursos.duracionMinima.toFixed(2)}
                  </p>
                  <p className="text-sm text-indigo-600">meses</p>
                </div>
              )}

              {/* Eficiencia del equipo */}
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl p-6 border border-teal-200 text-center">
                <p className="text-sm font-medium text-teal-700 mb-2">
                  Productividad por Persona
                </p>
                <p className="text-2xl font-bold text-teal-800">
                  {(parseFloat(kloc) / result.esfuerzo).toFixed(2)}
                </p>
                <p className="text-sm text-teal-600">KLOC/persona-mes</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
