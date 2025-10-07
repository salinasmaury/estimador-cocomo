import React, { useState } from "react";
import { cocomoBasico } from "../utils/cocomo.js";

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
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">COCOMO I Básico</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tamaño del software (KLOC)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={kloc}
            onChange={(e) => setKloc(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 8.5"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tipo de proyecto</label>
          <select
            value={modo}
            onChange={(e) => setModo(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {MODOS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Calcular
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-600 font-medium">{error}</div>
      )}
      {result && (
        <div className="mt-6 bg-gray-100 rounded p-4 text-center">
          <div className="mb-2 text-lg font-semibold">Resultados:</div>
          <div>
            <span className="font-medium">Esfuerzo estimado:</span>{" "}
            {result.esfuerzo.toFixed(2)} persona-mes
          </div>
          <div>
            <span className="font-medium">Duración estimada:</span>{" "}
            {result.duracion.toFixed(2)} meses
          </div>
        </div>
      )}
    </div>
  );
}