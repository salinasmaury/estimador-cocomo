import React, { useState } from "react";
import {
    cocomoIntermedio,
    COST_DRIVERS,
    COST_DRIVER_LABELS,
    COST_DRIVER_OPTIONS,
} from "../utils/cocomoIntermedio";

const MODOS = [
    { value: "organico", label: "Orgánico" },
    { value: "semiacoplado", label: "Semiacoplado" },
    { value: "empotrado", label: "Empotrado" },
];

export default function ProjectFormIntermedio() {
    const [kloc, setKloc] = useState("");
    const [modo, setModo] = useState("organico");
    // Inicializa cada multiplicador en "Nominal" (valor 1.00)
    const [multiplicadores, setMultiplicadores] = useState(
        COST_DRIVERS.map((driver) => 1.0)
    );
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    // Cambiar un multiplicador individualmente
    const handleMultiplicadorChange = (idx, value) => {
        const nuevos = [...multiplicadores];
        nuevos[idx] = parseFloat(value);
        setMultiplicadores(nuevos);
    };

    // Enviar formulario
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
            setResult(res);
        } catch (err) {
            setError("Error: " + err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">COCOMO I Intermedio</h2>
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
                        placeholder="Ej: 20"
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
                <div>
                    <div className="block mb-1 font-medium">Factores de costo (multiplicadores)</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {COST_DRIVERS.map((driver, idx) => (
                            <div key={driver} className="flex flex-col">
                                <label className="text-sm font-medium mb-1">
                                    {COST_DRIVER_LABELS[idx]}
                                </label>
                                <select
                                    value={multiplicadores[idx]}
                                    onChange={e => handleMultiplicadorChange(idx, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {COST_DRIVER_OPTIONS[driver].map(opt => (
                                        <option key={opt.label} value={opt.value}>
                                            {opt.label} ({opt.value})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
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
                    <div>
                        <span className="font-medium">EAF:</span>{" "}
                        {result.eaf.toFixed(3)}
                    </div>
                </div>
            )}
        </div>
    );
}