# 📊 Estimador COCOMO I Intermedio

Una aplicación web desarrollada en React para realizar estimaciones precisas de proyectos de software utilizando el modelo COCOMO I Intermedio de Barry Boehm. La aplicación incluye tanto los cálculos oficiales del modelo como extensiones prácticas para la gestión moderna de proyectos.

## 🏗️ Arquitectura de la Aplicación

### 📁 Estructura del Proyecto
```
src/
├── components/
│   ├── Layout.jsx              # Layout principal con navegación horizontal
│   ├── Sidebar.jsx             # Navegación horizontal (convertida desde sidebar)
│   ├── ProjectForm.jsx         # Formulario COCOMO I Básico
│   ├── ProjectFormIntermedio.jsx # Formulario COCOMO I Intermedio ⭐
│   └── Tooltip.jsx             # Componente de ayuda contextual
├── utils/
│   ├── cocomo.js               # Lógica COCOMO I Básico
│   └── cocomoIntermedio.js     # Lógica COCOMO I Intermedio ⭐
└── main.jsx                    # Punto de entrada de la aplicación
```

### 🧠 **Componentes Clave del Sistema**

#### **Lógica del Modelo: `src/utils/cocomoIntermedio.js`**
- Implementación oficial del modelo COCOMO I Intermedio de Barry Boehm
- Coeficientes del modelo para 3 tipos de proyecto (Orgánico, Semiacoplado, Empotrado)
- 15 cost drivers agrupados en 4 categorías (Producto, Hardware, Personal, Proyecto)
- Función principal de cálculo: `cocomoIntermedio(kloc, modo, multiplicadores)`

#### **Interfaz de Usuario: `src/components/ProjectFormIntermedio.jsx`**
- Formulario interactivo con validación en tiempo real
- Inputs agrupados por categorías de cost drivers con tooltips explicativos
- Cálculo automático de resultados oficiales COCOMO I + extensiones prácticas
- Visualización responsiva optimizada para diferentes tamaños de pantalla

#### **Navegación y Layout: `src/components/Layout.jsx`**
- Navegación horizontal entre COCOMO Básico e Intermedio
- Layout responsivo con Tailwind CSS
- Componentes de ayuda contextual integrados

## � **Documentación Detallada**

Para información completa sobre el modelo COCOMO I y cómo interpretar los resultados:

### 📖 **[Funcionamiento del Modelo COCOMO](./FUNCIONAMIENTO_COCOMO.md)**
- Explicación completa de la teoría COCOMO I
- Diferencias entre COCOMO Básico e Intermedio
- Tipos de proyecto (Orgánico, Semiacoplado, Empotrado)
- Implementación detallada del código
- Los 15 factores de costo y sus valores
- Ejemplos prácticos y consejos de uso

### 📊 **[Interpretación de Resultados](./INTERPRETACION_RESULTADOS.md)**
- Significado detallado de cada métrica COCOMO I oficial
- Diferenciación entre teoría original y extensiones prácticas
- Ejemplos de cálculo paso a paso
- Decisiones gerenciales basadas en los resultados
- Análisis financiero y optimización de recursos
- Casos de uso para diferentes audiencias (técnica vs gerencial)

## 🎯 **Resultados que Proporciona la Calculadora**

### 📐 **Métricas Oficiales COCOMO I**
1. **Esfuerzo (PM)** - Persona-meses de trabajo total requerido
2. **Duración (TDEV)** - Meses cronológicos óptimos del proyecto  
3. **Tamaño del Equipo (SS)** - Número promedio de desarrolladores
4. **Factor de Ajuste (EAF)** - Multiplicador de complejidad del proyecto

### 💼 **Extensiones Prácticas Agregadas**
1. **Análisis de Costos** - Presupuestos y flujo de caja
2. **Administración de Recursos** - Optimización con equipos limitados
3. **Métricas de Productividad** - Benchmarking y comparaciones

## ⭐ **Características Principales**

### 🎯 **Funcionalidades**
- ✅ **Modelo COCOMO I Básico** - Estimación rápida con parámetros mínimos
- ✅ **Modelo COCOMO I Intermedio** - Estimación precisa con 15 factores de costo
- ✅ **Cálculos Financieros** - Presupuestos, costos mensuales y análisis de viabilidad
- ✅ **Optimización de Recursos** - Planificación con equipos de diferentes tamaños
- ✅ **Interfaz Responsiva** - Optimizada para desktop, tablet y móvil
- ✅ **Tooltips Explicativos** - Ayuda contextual para cada parámetro
- ✅ **Validación en Tiempo Real** - Feedback inmediato sobre inputs
- ✅ **Resultados Detallados** - Separación clara entre teoría oficial y extensiones

### 💼 **Casos de Uso**
- **Gerentes de Proyecto:** Planificación temporal, presupuestaria y de recursos
- **Arquitectos de Software:** Evaluación de complejidad y factibilidad técnica
- **Consultores IT:** Elaboración de propuestas comerciales fundamentadas
- **Estudiantes/Académicos:** Aprendizaje del modelo COCOMO I con ejemplos prácticos
- **Equipos de Desarrollo:** Autoevaluación y mejora continua de estimaciones

## 🚀 **Tecnologías Utilizadas**

- **React 19.1.1** - Framework de interfaz de usuario
- **Vite 7.1.9** - Herramienta de desarrollo y build
- **Tailwind CSS v4** - Framework de estilos utility-first
- **React Router DOM** - Navegación entre componentes
- **JavaScript ES6+** - Lenguaje de programación

## 🛠️ **Instalación y Ejecución**

### **Prerrequisitos**
- Node.js 16.0 o superior
- npm o yarn

### **Pasos de instalación**
```bash
# Clonar el repositorio
git clone https://github.com/salinasmaury/estimador-cocomo.git

# Entrar al directorio
cd estimador-cocomo

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### **Scripts disponibles**
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa del build
npm run lint     # Linter ESLint
```

## 🎯 **Resumen**

**Estimador COCOMO I Intermedio** es una herramienta moderna que combina:
- 📐 **Fidelidad académica** al modelo original de Barry Boehm
- 💼 **Valor gerencial** con extensiones prácticas para gestión de proyectos
- 🎨 **Experiencia de usuario** intuitiva y responsiva
- 📚 **Documentación completa** para diferentes niveles de expertise

Ideal para profesionales que necesitan estimaciones fundamentadas y gestores que requieren análisis financiero detallado.
