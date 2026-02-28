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

### RESUMEN PASO 1

### PASO 1: CONFIGURACIÓN DE FIREBASE (Proyecto Existente)

1.  Ir a [Firebase Console](https://console.firebase.google.com/).
2.  **Seleccionar el proyecto existente** (donde ya está alojada la web).
3.  **Authentication:** Ir al menú "Compilación" -> "Authentication" y activar el proveedor "Email/Password".
4.  **Firestore Database:** Ir al menú "Compilación" -> "Firestore Database" y crear la base de datos (comenzar en modo de prueba).
5.  **Configuración:** Ir a Configuración del Proyecto (engranaje) -> General -> Tus apps. Buscar la app web existente (o registrar una nueva si no aparece) y copiar el objeto `firebaseConfig` (`apiKey`, `authDomain`, etc.).

### PASO A PASO 1: CONFIGURACIÓN DETALLADA DE FIREBASE (PROYECTO EXISTENTE)

Esta guía detalla el proceso exacto para activar los servicios de Backend en un proyecto de Firebase que ya tiene un Frontend estático desplegado en Hosting.

**1.1: Activar Autenticación**

1.  En la Firebase Console, selecciona tu proyecto.
2.  En el menú de la izquierda, ve a **Compilación > Authentication**.
3.  Haz clic en **"Comenzar"**.
4.  En la lista de proveedores, selecciona **"Correo electrónico/contraseña"** y habilítalo.

**1.2: Crear Base de Datos (Firestore)**

1.  En el menú de la izquierda, ve a **Compilación > Firestore Database**.
2.  Haz clic en **"Crear base de datos"**.
3.  Selecciona **"Comenzar en modo de prueba"**. Esto nos da 30 días para desarrollar sin restricciones de seguridad, que ajustaremos más adelante.
4.  Elige la ubicación del servidor. Para Argentina, la opción óptima es **`southamerica-east1` (São Paulo)** para minimizar la latencia.
5.  Haz clic en **"Habilitar"**.

**1.3: Registrar la App Web para Obtener Credenciales**
Este es el paso crucial para conectar tu código JavaScript con Firebase. Aunque tu web ya esté en Hosting, necesitas "registrarla" para generar las claves de conexión (API Keys).

1.  Haz clic en el **ícono de engranaje (⚙️)** en la esquina superior izquierda, al lado de "Descripción general del proyecto".
2.  Selecciona **"Configuración del proyecto"**.
3.  En la pestaña "General", desplázate hacia abajo hasta la sección **"Tus apps"**.
4.  Haz clic en el ícono de web: **`</>`**.
5.  **Apodo de la app:** Dale un nombre descriptivo, como `Web Puertos Prime Meat`.
6.  **Hosting:** **NO** marques la casilla "Configura también Firebase Hosting para esta app", ya que tu sitio ya está desplegado.
7.  Haz clic en **"Registrar app"**.

**1.4: Copiar e Integrar las Credenciales (SDK)**

1.  Después de registrar, Firebase te mostrará cómo agregar el SDK. Verás dos opciones: "npm" y "Usar etiqueta `<script>`".
2.  Selecciona la opción **"Usar etiqueta `<script>`" (CDN)**.
3.  Busca dentro del código que aparece el objeto llamado `firebaseConfig`. Se verá así:
    ```javascript
    const firebaseConfig = {
      apiKey: "...",
      authDomain: "...",
      // ... y otras claves
    };
    ```
4.  **Copia este objeto completo.**
5.  Pega este objeto en tu archivo `modules/config/configuracion-firebase.js`, reemplazando el objeto de ejemplo. El archivo ahora está listo para conectar tu web a los servicios de Firebase.

### Nota Técnica: ¿Por qué usamos `<script>` y no Node.js (npm)?

Para este proyecto, elegimos el método de `<script>` (CDN) para importar Firebase por varias razones clave, pensando en la simplicidad y el mantenimiento a futuro:

- **Sin Compilación:** No necesitas instalar Node.js ni ejecutar comandos como `npm install` o `npm run build`. Simplemente editas tus archivos `.js`, guardas y recargas el navegador para ver los cambios.
- **Ligero y Rápido:** Es ideal para sitios estáticos o con funcionalidades de backend específicas como esta. Mantiene el proyecto sin dependencias pesadas.
- **Escalabilidad Futura:** Si en el futuro la aplicación crece mucho y requiere herramientas más complejas (como React, Vue, etc.), migrar a un entorno de Node.js es un paso lógico y bien documentado, pero no es necesario para el objetivo actual.

Este enfoque nos da la máxima velocidad de desarrollo para el requerimiento actual.

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

### DETALLE TÉCNICO: IMPLEMENTACIÓN DE SERVICIOS Y USUARIOS

A continuación se documentan los pasos manuales y el código exacto implementado para los servicios.

#### 1. Creación del Usuario Administrador (Manual)

1.  Ir a **Firebase Console** -> **Authentication**.
2.  Seleccionar la pestaña **"Users"** (Usuarios).
3.  Hacer clic en **"Agregar usuario"**.
4.  Ingresar el correo (ej: `admin@puertosprimemeat.com`) y una contraseña segura.
5.  Hacer clic en **"Agregar usuario"**.

#### 2. Código: Servicio de Autenticación (`modules/services/servicio-autenticacion.js`)

Este archivo maneja el inicio y cierre de sesión.

```javascript
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "../config/configuracion-firebase.js";

// Función para iniciar sesión
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logout = () => {
  return signOut(auth);
};

// Observador: Nos avisa si el usuario está logueado o no
export const checkAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
```

#### 3. Código: Servicio de Datos (`modules/services/servicio-datos.js`)

Este archivo conecta con Firestore para leer y escribir productos.

```javascript
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "../config/configuracion-firebase.js";

const productosCollection = collection(db, "productos");

export const getProductos = async () => {
  const querySnapshot = await getDocs(productosCollection);
  const productos = [];
  querySnapshot.forEach((doc) => {
    productos.push({ id: doc.id, ...doc.data() });
  });
  return productos;
};

export const updateProducto = (id, data) => {
  const productoDoc = doc(db, "productos", id);
  return updateDoc(productoDoc, data);
};
```

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
