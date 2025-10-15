# 📊 Estimador COCOMO I Intermedio

App web en React para calcular estimaciones de proyectos de software usando el modelo COCOMO I Intermedio. Incluye los cálculos del modelo original más nuevas variables de resultados para gestión de proyectos.

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
- Código del modelo COCOMO I Intermedio
- 3 tipos de proyecto: Orgánico, Semiacoplado, Empotrado
- 15 factores de costo en 4 grupos
- Función principal: `cocomoIntermedio(kloc, modo, multiplicadores)`

#### **Interfaz: `src/components/ProjectFormIntermedio.jsx`**  
- Formulario con validación en tiempo real
- Inputs organizados por grupos con ayuda
- Cálculo automático de resultados del modelo + nuevas variables
- Diseño que se adapta a cualquier pantalla

## � **Documentación Detallada**

Para información completa sobre el modelo COCOMO I y cómo interpretar los resultados:

### 📖 **[Cómo Funciona COCOMO](./FUNCIONAMIENTO_COCOMO.md)**
- Qué es COCOMO I y cómo usarlo
- Diferencias entre Básico e Intermedio
- Los 3 tipos de proyecto
- Código JavaScript explicado paso a paso
- Los 15 factores y sus valores

### 📊 **[Qué Significan los Resultados](./INTERPRETACION_RESULTADOS.md)**
- Qué significa cada número que te da la calculadora
- Cuáles son del modelo original y cuáles son nuevas variables
- Ejemplos con números reales
- Cómo tomar decisiones con los resultados
- Cálculos de costos y optimización de equipos

## 🎯 **Resultados que Proporciona la Calculadora**

### 📐 **Resultados del Modelo Original**
1. **Esfuerzo** - Cuántos meses-persona necesitas
2. **Duración** - Cuántos meses va a durar el proyecto  
3. **Tamaño del Equipo** - Cuántas personas trabajando
4. **Factor de Ajuste** - Qué tan complejo es tu proyecto

### 💼 **Nuevas Variables de Resultados**
1. **Costos Totales** - Cuánto dinero vas a necesitar
2. **Costos Mensuales** - Cuánto pagas cada mes
3. **Optimización de Equipos** - Qué pasa si tienes menos gente
4. **Productividad** - Qué tan eficiente es tu equipo

## ⭐ **Características Principales**

### 🎯 **Qué Puedes Hacer**
- ✅ **COCOMO Básico** - Cálculo rápido con pocos datos
- ✅ **COCOMO Intermedio** - Cálculo detallado con 15 factores
- ✅ **Costos en Dinero** - Cuánto va a costar tu proyecto
- ✅ **Equipos Diferentes** - Qué pasa si tienes más o menos gente
- ✅ **Ayuda Incluida** - Cada campo tiene explicación
- ✅ **Validación Automática** - Te avisa si algo está mal

### 💼 **Para Quién es Útil**
- **Jefes de Proyecto:** Para planificar tiempo y presupuesto
- **Desarrolladores:** Para saber qué tan grande es un proyecto
- **Consultores:** Para hacer propuestas de trabajo
- **Estudiantes:** Para aprender cómo se estiman proyectos

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

**Estimador COCOMO I Intermedio** te ayuda a:
- 📐 **Usar el modelo COCOMO** tal como fue diseñado originalmente
- 💼 **Calcular costos** y planificar equipos de trabajo
- 🎨 **Trabajar fácil** con una interfaz simple
- 📚 **Entender todo** con documentación clara

Perfecto si necesitas estimar proyectos de software de forma seria y con números reales.
