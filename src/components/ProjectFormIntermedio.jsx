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
        COST_DRIVERS.map(() => 1.0)
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
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50 mb-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    COCOMO I Intermedio
                </h2>
                <p className="text-gray-600 text-sm">
                    Estimación con factores de costo (EAF) para mayor precisión
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Sección básica */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Básica del Proyecto</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Tamaño del software (KLOC)
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
                            </label>
                            <select
                                value={modo}
                                onChange={(e) => setModo(e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                            >
                                {MODOS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Sección de factores de costo */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Factores de Costo (Multiplicadores EAF)
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Selecciona el nivel de cada factor según las características de tu proyecto
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {COST_DRIVERS.map((driver, idx) => (
                            <div key={driver} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    {COST_DRIVER_LABELS[idx]}
                                </label>
                                <select
                                    value={multiplicadores[idx]}
                                    onChange={e => handleMultiplicadorChange(idx, e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all bg-white"
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
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99]"
                >
                    <span className="flex items-center justify-center gap-2">
                        Calcular Estimación Intermedia
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2z" />
                        </svg>
                    </span>
                </button>
            </form>
            
            {error && (
                <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-700 font-medium">{error}</span>
                    </div>
                </div>
            )}
            
            {result && (
                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Resultados de la Estimación Intermedia</h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 mb-2">Esfuerzo Estimado</p>
                                <p className="text-2xl font-bold text-gray-800">{result.esfuerzo.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">persona-mes</p>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 mb-2">Duración Estimada</p>
                                <p className="text-2xl font-bold text-gray-800">{result.duracion.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">meses</p>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 mb-2">Factor de Ajuste (EAF)</p>
                                <p className="text-2xl font-bold text-gray-800">{result.eaf.toFixed(3)}</p>
                                <p className="text-sm text-gray-500">multiplicador</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}