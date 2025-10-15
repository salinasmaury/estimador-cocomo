import React, { useState } from "react";
import { cocomoBasico } from "../utils/cocomo.js";
import Tooltip from "./Tooltip.jsx";

const MODOS = [
  { value: "organico", label: "Orgánico" },
  { value: "semiacoplado", label: "Semiacoplado" },
  { value: "empotrado", label: "Empotrado" },
];

export default function ProjectForm() {
  const [kloc, setKloc] = useState("");
  const [modo, setModo] = useState("organico");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // Validación simple
    const klocNum = parseFloat(kloc);
    if (isNaN(klocNum) || klocNum <= 0) {
      setError("Por favor ingresa un número válido de KLOC (> 0)");
      return;
    }
    try {
      const res = cocomoBasico(klocNum, modo);
      setResult(res);
    } catch (err) {
      setError("Error en el cálculo: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          COCOMO Básico
        </h2>
        <p className="text-gray-600 text-sm">
          Modelo de estimación de esfuerzo y duración de proyectos de software
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
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
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
            placeholder="Ej: 8.5"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tipo de proyecto
            <Tooltip texto="Define cómo se distribuye el esfuerzo y tiempo en función de la naturaleza del proyecto.">
              <span className="text-gray-600 cursor-help text-lg">🛈</span>
            </Tooltip>
          </label>
          <select
            value={modo}
            onChange={(e) => setModo(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 hover:bg-white"
          >
            {MODOS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            Calcular Estimación
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
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
        </button>
      </form>

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

      {result && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Resultados de la Estimación
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Esfuerzo Estimado
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {result.esfuerzo.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">persona-mes</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Duración Estimada
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {result.duracion.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">meses</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
