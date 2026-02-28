# 🤖 GUÍA DE EJECUCIÓN PARA AGENTE: PANEL DE ADMINISTRACIÓN

## 📋 OBJETIVO PRINCIPAL

Desarrollar un **Panel de Administración (SPA)** seguro y modular conectado a Firebase.
**Requisito Clave:** El diseño debe replicar la estética del sitio público (`index.html` y `styles.css`) pero eliminando efectos interactivos como `hover` en las tarjetas, enfocándose en la funcionalidad de edición.

## ⚙️ REGLAS DE DOCUMENTACIÓN (Y CÓDIGO)

1. **Registro de pasos:** Cada paso completado debe registrarse en `documentacion.md` con el formato:
   - **[FECHA/HORA]**: Tarea realizada.
   - **Archivos modificados**: Lista de archivos.
   - **Notas**: Decisiones técnicas tomadas.

2. **Idioma y Nomenclatura (CRÍTICO):**
   - **Todo el código** (variables, constantes, funciones) debe escribirse en **Español** usando nombres **extremadamente descriptivos y explícitos**, incluso si resultan largos.
   - _Ejemplo incorrecto:_ `const prod = getProd(id);`
   - _Ejemplo correcto:_ `const productoEncontrado = obtenerProductoPorId(idProducto);`
   - Esto aplica a todo JavaScript, tanto frontend (`precios-publicos.js`) como backend (`modules/`, `admin/`).

3. **Comentarios Didácticos:**
   - El código debe estar fuertemente comentado línea por línea (usando `//`).
   - Las explicaciones deben ser sencillas, evitando tecnicismos complejos, pensadas para que un usuario principiante pueda usarlas como material de estudio.
   - Explicar el _qué_ hace esa línea y el _por qué_ es necesaria.

---

## 🛠️ CHECKLIST DE DESARROLLO (PASO A PASO)

### 1. CAPA DE CONFIGURACIÓN Y SERVICIOS (BACKEND)

**Ubicación:** `modules/`

- [ ] **Configuración Firebase:**
  - Crear `modules/config/configuracion-firebase.js`.
  - Importar `initializeApp` de Firebase.
  - Exportar `baseDeDatosFirestore` (Firestore) y `servicioDeAutenticacion` (Authentication).
  - _Nota:_ Dejar el objeto de configuración listo para que el usuario pegue sus credenciales.

- [ ] **Servicio de Autenticación (`servicio-autenticacion.js`):**
  - Crear `modules/services/servicio-autenticacion.js`.
  - Implementar y exportar:
    - `iniciarSesionDelAdministrador(correoElectronico, contraseniaAdministrador)`
    - `cerrarSesionDelAdministrador()`
    - `vigilarEstadoDeLaSesion(funcionAEjecutarConElUsuario)`: Observador para redirigir si no hay usuario.

- [ ] **Servicio de Datos (`servicio-datos.js`):**
  - Crear `modules/services/servicio-datos.js`.
  - Implementar y exportar:
    - `obtenerTodosLosProductosDeLaBaseDeDatos()`: Debe traer toda la colección.
    - `actualizarProductoEspecificoPorId(idDeseadoDelProducto, nuevosDatosDelProductoCambiado)`: Debe permitir actualizar `nombre`, `descripcion` y `precio`.

---

### 2. INTERFAZ DE USUARIO (FRONTEND ADMIN)

**Ubicación:** `admin/`

- [ ] **Estructura HTML (`admin/index.html`):**
  - Crear archivo base.
  - **Importante:** Vincular el CSS principal: `<link rel="stylesheet" href="../styles.css">`.
  - Vincular CSS específico: `<link rel="stylesheet" href="estilo-administrador.css">`.
  - Crear dos contenedores principales ocultos por defecto:
    1.  `#pantalla-ingreso`: Formulario centrado (Email/Pass).
    2.  `#pantalla-panel`: Lista de productos editables.
  - Importar el script como módulo: `<script type="module" src="aplicacion-administrador.js"></script>`.

- [ ] **Estilos Específicos (`admin/estilo-administrador.css`):**
  - Heredar variables de `../styles.css`.
  - **Regla "Sin Hover":** Sobrescribir comportamientos de tarjetas para que sean estáticas.
  - Estilar los `input` y `textarea` para que parezcan parte del diseño original (bordes sutiles, misma tipografía `Roboto` o `Libre Baskerville`).
  - Estilar botón de "Guardar" (verde/positivo) y "Cerrar Sesión" (rojo/alerta).

---

### 3. LÓGICA DE APLICACIÓN (CONEXIÓN)

**Ubicación:** `admin/aplicacion-administrador.js`

- [ ] **Inicialización:**
  - Importar servicios de `../modules/services/`.
  - Verificar estado de autenticación al cargar.
  - Si no logueado -> Mostrar `#pantalla-ingreso`.
  - Si logueado -> Mostrar `#pantalla-panel` y cargar productos.

- [ ] **Renderizado de Productos (Dashboard):**
  - Consumir `obtenerTodosLosProductosDeLaBaseDeDatos()`.
  - Generar HTML dinámico por cada producto.
  - **Diferencia con el sitio público:**
    - En lugar de `<p>`, usar `<input type="text">` para el Nombre.
    - En lugar de texto plano, usar `<textarea>` para la Descripción.
    - En lugar de precio fijo, usar `<input type="number">` para el Precio.
  - Agregar un botón "Guardar" por cada tarjeta (o uno global, preferible por tarjeta para atomicidad).

- [ ] **Manejo de Eventos:**
  - `formulario-ingreso.addEventListener('submit')` -> Llamar a `iniciarSesionDelAdministrador`.
  - `boton-cerrar-sesion.addEventListener('click')` -> Llamar a `cerrarSesionDelAdministrador`.
  - Botones "Guardar" -> Capturar los valores de los inputs de ESA tarjeta y llamar a `actualizarProductoEspecificoPorId`.
  - Mostrar feedback visual (ej: "Guardado correctamente" o cambiar borde a verde momentáneamente).

---

## 🧪 CRITERIOS DE ACEPTACIÓN

1.  **Modularidad:** El código JS no debe estar todo en un archivo; debe usar `import/export`.
2.  **Edición Completa:** El administrador puede cambiar el texto de la descripción, el título del producto y el precio.
3.  **Diseño:** Se ve como "Puertos Prime Meat" pero con inputs editables.
4.  **Persistencia:** Al recargar la página (o ir al sitio público), los cambios se mantienen (gracias a Firestore).
5.  **Seguridad:** No se puede ver el dashboard sin loguearse.
