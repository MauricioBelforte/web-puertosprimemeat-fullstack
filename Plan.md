# 🚀 PLAN DE IMPLEMENTACIÓN: SISTEMA DE GESTIÓN DE PRECIOS CON FIREBASE

## 🎯 OBJETIVO

Implementar un sistema backend "Serverless" utilizando **Firebase** que permita al administrador autenticarse y modificar los precios de los productos en tiempo real, reflejándose automáticamente en el sitio web público.

## 🏗️ ARQUITECTURA MODULAR

Para cumplir con el requisito de desacoplamiento, utilizaremos **ES Modules** nativos de JavaScript. Esto nos permite separar la lógica de base de datos, autenticación y renderizado en carpetas distintas.

### Estructura de Carpetas Propuesta

```text
web-puertosprimemeat-desarrollo/
│
├── admin/                      # 🔒 Módulo del Panel de Administración
│   ├── index.html              # Login y Dashboard (protegido)
│   ├── estilo-administrador.css         # Estilos específicos del admin
│   └── aplicacion-administrador.js            # Lógica principal del admin
│
├── modules/                    # 🧩 Módulos Reutilizables (Backend)
│   ├── config/
│   │   └── configuracion-firebase.js  # Inicialización de Firebase
│   ├── services/
│   │   ├── servicio-autenticacion.js     # Login/Logout/Observadores
│   │   └── servicio-datos.js     # CRUD (Leer y Actualizar precios)
│   └── utils/
│       └── dom-helpers.js      # Ayudas para manipular el DOM
│
├── index.html                  # Sitio público existente
└── ...
```

---

## 📅 PASO A PASO

### PASO 1: CONFIGURACIÓN DE FIREBASE (Proyecto Existente)

1.  Ir a [Firebase Console](https://console.firebase.google.com/).
2.  **Seleccionar el proyecto existente** (donde ya está alojada la web).
3.  **Authentication:** Ir al menú "Compilación" -> "Authentication" y activar el proveedor "Email/Password".
4.  **Firestore Database:** Ir al menú "Compilación" -> "Firestore Database" y crear la base de datos (comenzar en modo de prueba).
5.  **Configuración:** Ir a Configuración del Proyecto (engranaje) -> General -> Tus apps. Buscar la app web existente (o registrar una nueva si no aparece) y copiar el objeto `firebaseConfig` (`apiKey`, `authDomain`, etc.).

### PASO 2: ESTRUCTURA DE DATOS (Firestore)

Definiremos una colección llamada `productos`. Cada documento tendrá un ID único (ej: `ojo-bife`) para facilitar la búsqueda.

**Esquema del Documento:**

```json
{
  "id": "ojo-bife",
  "nombre": "Ojo de Bife",
  "precio": 15000,
  "unidad": "kg",
  "categoria": "premium",
  "activo": true
}
```

### PASO 3: DESARROLLO DE LA CAPA DE SERVICIOS (`modules/`)

#### 3.1. Configuración (`configuracion-firebase.js`)

Archivo único donde se inicializa la app. Exporta las instancias de `db` y `auth`.

#### 3.2. Servicio de Autenticación (`servicio-autenticacion.js`)

Funciones exportables:

- `login(email, password)`
- `logout()`
- `onAuthStateChanged(callback)` (para proteger rutas).

#### 3.3. Servicio de Datos (`servicio-datos.js`)

Funciones exportables:

- `obtenerProductos()`: Devuelve lista completa.
- `actualizarPrecio(idProducto, nuevoPrecio)`: Escribe en Firestore.

### PASO 4: INTEGRACIÓN EN EL SITIO PÚBLICO (`index.html`)

No tocaremos el HTML estructuralmente, solo agregaremos atributos de datos para identificar qué precio actualizar.

1.  **HTML:** Agregar `data-id="ojo-bife"` a las etiquetas de precio.

    ```html
    <!-- Antes -->
    <p class="precio">$15.000 / kg</p>

    <!-- Después -->
    <p class="precio" data-id="ojo-bife">Cargando...</p>
    ```

2.  **Script:** Crear un script `precios-publicos.js` que importe `obtenerProductos` y actualice el DOM al cargar la página.

### PASO 5: CREACIÓN DEL PANEL DE ADMINISTRADOR (`admin/`)

Una interfaz sencilla y segura.

1.  **Login:** Formulario simple. Si el usuario no está logueado, mostrar esto.
2.  **Dashboard:** Si está logueado:
    - Lista de productos traída de Firestore.
    - Un `input` numérico al lado de cada producto con el precio actual.
    - Un botón "Guardar Cambios".
3.  **Lógica:** Al dar click en guardar, llama a `actualizarPrecio` del servicio de datos.

### PASO 6: SEGURIDAD (Reglas de Firestore)

Fundamental para que nadie pueda cambiar precios desde la consola del navegador en el sitio público.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{producto} {
      allow read: if true; // Cualquiera puede ver los precios
      allow write: if request.auth != null; // Solo el admin puede editar
    }
  }
}
```

### PASO 7: DESPLIEGUE

1.  Instalar Firebase CLI: `npm install -g firebase-tools`.
2.  `firebase login`.
3.  `firebase init` (Seleccionar Hosting).
4.  Configurar `public` directory (usualmente la raíz `.` o una carpeta `dist` si usaras build, en este caso `.`).
5.  `firebase deploy`.

---

## ⏱️ ESTIMACIÓN DE TIEMPO

| Tarea                              | Tiempo Estimado |
| ---------------------------------- | --------------- |
| Configuración Firebase             | 30 min          |
| Estructura de Carpetas y Config JS | 30 min          |
| Servicios (Auth + Data)            | 1 hora          |
| Panel Admin (UI + Lógica)          | 2 horas         |
| Integración Sitio Público          | 1 hora          |
| Pruebas y Ajustes                  | 1 hora          |
| **TOTAL**                          | **~6 Horas**    |

## 💡 VENTAJAS DE ESTE ENFOQUE

1.  **Desacoplado:** Si mañana quieres cambiar Firebase por Supabase o una API propia, solo cambias los archivos en `modules/services`. El frontend y el admin no se enteran.
2.  **Económico:** El plan gratuito de Firebase sobra para este tráfico.
3.  **Seguro:** La lógica de negocio está protegida por las reglas de seguridad de Google.
