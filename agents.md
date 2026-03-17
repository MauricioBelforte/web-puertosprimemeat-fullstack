# 🤖 MASTER PROMPT: ARQUITECTURA FULLSTACK FIREBASE (ESTILO MAURICIO)

## 📋 OBJETIVO PRINCIPAL

Transformar un proyecto puramente "Frontend Estático" en una aplicación "FullStack" usando Firebase (Firestore y Auth), manteniendo la elegancia visual, incorporando un Panel de Administrador aislado y dotando al frontend público de carga dinámica de datos sin afectar la experiencia del usuario (cero saltos visuales).

---

## 🎩 ESTILO DE TRABAJO Y FILOSOFÍA (REGLAS ESTRICTAS)

1. **Idioma y Nomenclatura (CRÍTICO):**
   - Todo el código (HTML, CSS, JS), así como los nombres de constantes,variables, clases y funciones, debe estar **estrictamente en Español**.
   - Usa nombres **muy explícitos y descriptivos**, sin abreviaturas raras.
   - _Ejemplo Incorrecto:_ `fetchData()`, `updateProd(id)`
   - _Ejemplo Correcto:_ `obtenerPreciosDesdeBaseDeDatos()`, `actualizarProductoPorId(identificadorDelProducto)`

2. **Arquitectura "Zero-Build" (Módulos Nativos / CDN):**
   - NO usar Node.js, Webpack, Vite ni NPM para gestionar el JavaScript del Frontend.
   - Usar módulos ES Nativos (`<script type="module">`).
   - Importar las librerías de Firebase directamente mediante enlaces CDN (versión modular 10+).

3. **UX/UI Premium y Fallbacks (Skeleton Loaders):**
   - El frontend público JAMÁS debe mostrar "saltos" (layout shifts o FOUC) cuando cargan los datos de la Base de Datos.
   - **Obligatorio:** Implementar un esqueleto de carga visual (clase CSS con gradiente animado) sobre los elementos que van a recibir datos dinámicos (como los precios).
   - El HTML debe conservar los valores "hardcodeados" como _Fallback_ (Plan B).
   - Solo en el bloque `finally` de la promesa de JS se debe remover la clase del esqueleto. Si Firebase falla o no hay internet, el diseño revela el HTML estático original sanamente.

4. **Experiencia del Administrador (Admin Panel):**
   - El Panel de Admin debe heredar los estilos base del sitio (`styles.css`) pero debe **sobrescribir características en su propio CSS (`estilo-administrador.css`)** para priorizar la funcionalidad de edición.
   - **Reglas del Admin:** Textos de los inputs SIEMPRE legibles (ej. negros). Textareas altas que se adapten al contenido (mínimo `180px` para descripciones). Botón de Guardar con alto contraste (ej. fondo negro puro y letras del color primario/acento).
   - Anular cualquier animación de interface intrusiva en el admin (ej: quitar efectos `hover` que levanten o agranden la tarjeta mientras se intenta editar).

5. **Autonomía del Agente:**
   - El agente informático debe crear las carpetas, archivos, y realizar las inyecciones de código necesarias de forma _completamente autónoma_, respetando esta estrategia punto por punto.

6. **Bitácora de Sesión (MANDATORIO AL CIERRE):**
   - Cuando el usuario indique que termina la sesión (frases como: "seguimos después", "chau", "me voy", "cortamos acá", "lo dejamos acá", etc.), el agente **DEBE** crear obligatoriamente un archivo de bitácora antes de despedirse.
   - **Ubicación:** `bitacoras/`
   - **Nombre del archivo:** `YYYY-MM-DD_resumen_sesion.md` (usando la fecha del día actual).
   - **Si ya existe un archivo con esa fecha** (porque hubo dos sesiones el mismo día), agregar un sufijo incremental: `YYYY-MM-DD_resumen_sesion_2.md`.
   - **Estructura obligatoria del archivo:**
     ```
     # 📋 Bitácora de Sesión — [FECHA]

     ## ✅ Lo que se logró en esta sesión
     - (Lista de logros concretos)

     ## 🚧 Bloqueos o pendientes
     - (Problemas encontrados, decisiones sin tomar)

     ## 👉 Próximo paso exacto para retomar
     - (Descripción clara y concisa del primer paso que hay que hacer en la próxima sesión)

     ## 📂 Archivos modificados
     - (Lista de archivos tocados con descripción breve)
     ```
   - **El agente NO debe preguntar** si el usuario quiere la bitácora. Debe crearla automáticamente como parte del cierre.

---

## 🛠️ ESTRATEGIA DE IMPLEMENTACIÓN (PASO A PASO PARA EL AGENTE)

### FASE 1: ANÁLISIS Y PREPARACIÓN DE CARPETAS

1. **Analizar el Frontend Local:** Lee `index.html` y `styles.css`. Identifica la clase principal de las "tarjetas" (cards) y los selectores para los datos que serán dinámicos (Título, Descripción, Precio, etc.).
2. **Armar el Árbol de Directorios:**
   - `modules/config/` (Configuración de conexión)
   - `modules/services/` (Servicios de conexión a BD y Auth)
   - `admin/` (Entorno privado)

### FASE 2: CONFIGURACIÓN DEL BACKEND (FIREBASE VÍA CDN)

1. **`modules/config/configuracion-firebase.js`**:
   - Inicializar la app usando e importando `initializeApp`, `getFirestore`, `getAuth` desde *https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js* (y sus respectivos módulos).
   - Exportar constantes: `baseDeDatos` y `autenticador`.
2. **`modules/services/servicio-autenticacion.js`**:
   - Exportar procesos en español: `iniciarSesionAdministrador(correo, clave)`, `cerrarSesionAdministrador()`, `vigilarEstadoSesion(callback)`.
3. **`modules/services/servicio-datos.js`**:
   - Exportar procesos: `obtenerTodosLosProductos()`, `actualizarDatosDelProducto(id, datosNuevos)`.
   - Diseñar las funciones para que manejen errores educadamente usando bloques `try/catch`.

### FASE 3: DESARROLLO DEL PANEL DE ADMINISTRADOR

1. **Estructura: `admin/index.html`**:
   - Crear formulario de inicio de sesión centrado.
   - Crear un div contenedor para el Dashboard (lista de tarjetas a editar).
   - Importar estilos: Primero `../styles.css` (para herencia corporativa) y luego `estilo-administrador.css` (para pisar estilos funcionales).
2. **Estética Funcional: `admin/estilo-administrador.css`**:
   - Anular `.revelar` o animaciones de cascada para el admin.
   - Convertir etiquetas de texto (p, h3, span) en `<input type="text">`, `<textarea>` y `<input type="number">`.
   - Ajustar el color de texto de los inputs para máxima legibilidad.
3. **Lógica Privada: `admin/aplicacion-administrador.js`**:
   - Manejar el enrutamiento visual (ocultar login / mostrar dashboard basándose en `vigilarEstadoSesion`).
   - Al renderizar tarjetas, añadir un **botón Guardar por cada tarjeta** para asegurar "Atomicidad" (guardar cambios independientes).
   - Enganchar eventos a los botones Guardar para que capturen los `.value` de los inputs y manden esa data a la función de Firebase.
   - Brindar retroalimentación visual al guardar (ej: alerta verde o JS `alert`).

### FASE 4: INTEGRACIÓN PÚBLICA (ILUSIÓN DE VELOCIDAD UX)

1. **Refactor CSS (`styles.css`): Efecto Esqueleto**:
   - Crear una regla `.precio-esqueleto` con un fondo lineal tipo degradado (usando los colores corporativos) y una animación `infinite` deslizando el tamaño del fondo de 200% a -200%.
   - Darle a esa regla `color: transparent !important;` para que el número original no se vea mientras carga.
2. **Inyección en `index.html` (Front-end Público)**:
   - A todos los `<span>` o `<p>` que ahora son dinámicos, agregarles la clase `.precio-esqueleto` manualmente en el HTML. (Así nacen cargando desde el segundo 0).
3. **Lógica Pública (`precios-publicos.js`)**:
   - Enlazar este JS al final del body en el `index.html` como `type="module"`.
   - Llamar a la función de leer toda la base de datos de Firebase.
   - Cruzar los datos de Firebase con las tarjetas del HTML (por ejemplo, usando los H3 como identificadores únicos si no hay IDs predefinidos).
   - Reemplazar el `textContent` de los elementos dinámicos mediante JS.
   - **CRÍTICO:** Utilizar una promesa con `.finally()`. Dentro de ese _finally_, barrer el DOM buscando todos los elementos `.precio-esqueleto` y **quitarles esa clase**. De este modo, tanto si el precio se cargó con éxito, como si falló y quedó atrapado en el `.catch()`, el esqueleto se disipa y deja a la vista el número correcto (actualizado o el hardcodeado como salvavidas).

### FASE 5: REVISIÓN DE DETALLES PREMIUM Y SEO

- Revisar que la semántica HTML quede limpia (usar correctos imports y paths relativos).
- Asegurarse de que no haya consolas (console.logs) de debug sueltas que denoten falta de profesionalismo.
- Si hay animaciones delicadas (como _IntersectionObserver_ o apariciones en scroll con _Cubic-Bezier_), comprobar que funcionen armoniosamente junto a los tiempos de carga de la Base de Datos.
- Respetar cada una de las decisiones del desarrollador sin proponer tecnologías ajenas a esta estructura (No React, No JSX, No configuraciones complejas).

---

🚀 **NOTA FINAL PARA EL AGENTE:** Si un usuario te solicita _"Implementar la estrategia del archivo agents.md para este proyecto"_, asume tu rol sin hacer preguntas obvias y ejecuta estas 5 Fases implementando el código de una. Y recordá: **al finalizar cada sesión, dejá la bitácora en `bitacoras/` sin que te lo pidan.**
