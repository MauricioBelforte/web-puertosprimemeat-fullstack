# 🚀 05 - Evolución: El Sistema Híbrido (Tarjetas Dinámicas + Firebase Storage)

¡Felicitaciones! Si llegaste hasta acá, ya tenés un sitio web conectado a la nube que actualiza precios solos. Pero ahora vamos a dar **el siguiente gran salto profesional**: que el administrador pueda **crear productos nuevos y subir fotos** directamente desde el panel, sin tocar una sola línea de código nunca más.

## 🤔 ¿Por qué necesitamos evolucionar?

Hasta ahora, nuestro sistema tiene una limitación importante:

- Las tarjetas de los productos (Ojo de Bife, Bife de Chorizo, etc.) están **escritas a mano** en el `index.html`.
- Firebase solo les **actualiza** el precio y la descripción, pero no puede crear tarjetas nuevas.
- Si mañana querés vender "Chorizo de Cerdo", alguien tiene que abrir el código, escribir el bloque HTML de la tarjeta nueva, subir la foto a la carpeta `imagenes/`, y hacer un `git push`. ¡Eso no es profesional!

**La meta:** Que el administrador entre al panel, complete un formulario con el nombre, precio, descripción y foto del producto nuevo, le dé a "Crear Producto", y la tarjeta aparezca automáticamente en la web pública.

---

## 🧠 La Estrategia Híbrida: Lo Mejor de Dos Mundos

En vez de tirar a la basura todo lo que hicimos (las tarjetas escritas en el HTML), vamos a usar una estrategia inteligente que combina **seguridad y flexibilidad**:

### ¿Cómo funciona?

```
┌─────────────────────────────────────────────┐
│     ZONA SEGURA (Tarjetas del HTML)         │
│                                             │
│  🥩 Ojo de Bife     🥩 Bife de Chorizo     │
│  🥩 Lomo            🥩 Cuadril             │
│                                             │
│  ✅ Siempre visibles, incluso sin internet  │
│  ✅ Firebase les actualiza precios y datos  │
│  ✅ Son tu "red de seguridad"               │
├─────────────────────────────────────────────┤
│     ZONA DINÁMICA (Tarjetas de Firebase)    │
│                                             │
│  🆕 Chorizo de Cerdo   🆕 Matambre         │
│                                             │
│  ⚡ Se crean solas desde el panel admin     │
│  ⚡ Las fotos vienen de Firebase Storage    │
│  ⚡ Si Firebase se cae, no se muestran      │
│     (pero las de arriba siguen firmes)      │
└─────────────────────────────────────────────┘
```

**¿Por qué es genial esta estrategia?**

1. **Si Firebase se cae o hay un error de internet**, los clientes siguen viendo tus productos principales (los que están escritos en el HTML). Tu negocio no se frena.
2. **Los productos nuevos** se agregan debajo, en una zona dinámica que el JavaScript dibuja automáticamente al cargar la página.
3. **No perdés nada** de lo que ya funciona. Es una evolución, no una revolución.

---

## 🆕 ¿Qué es Firebase Storage?

Hasta ahora usábamos **dos servicios** de Firebase:

- **Authentication** (el guardia de seguridad que verifica tu login).
- **Firestore** (la libreta de anotaciones donde guardamos nombres, precios y descripciones).

Ahora vamos a agregar un **tercer servicio**: **Firebase Storage**.

Pensalo como un **pendrive gigante en la nube** donde podés subir archivos (en nuestro caso, fotos de los productos). Funciona así:

1. El administrador elige una foto desde su computadora en el panel.
2. El código JavaScript la "sube" a Firebase Storage (como si la copiaras a un pendrive remoto).
3. Firebase Storage te devuelve una **URL pública** (un enlace de internet hacia esa foto).
4. Esa URL se guarda junto con el producto en Firestore (en la misma ficha/documento del producto).
5. Cuando la web pública dibuja la tarjeta dinámica, usa esa URL como el `src` de la etiqueta `<img>`.

**¿Es gratis?** ¡Sí! El plan gratuito de Firebase te da **5 GB de almacenamiento**. Con 10 fotos de productos (que pesan aprox. 2 MB cada una), estarías usando apenas el 0.4% del espacio disponible. Es como tener un galpón enorme para guardar una cajita.

---

## 🔧 ¿Qué archivos vamos a tocar o crear?

### Archivos Nuevos:

| Archivo                                       | Descripción                                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| `modules/services/servicio-almacenamiento.js` | El "encargado de depósito". Sube fotos a Firebase Storage y devuelve la URL. |

### Archivos a Modificar:

| Archivo                                    | Qué le agregamos                                                                                                                                                                                           |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modules/config/configuracion-firebase.js` | Importar y exportar la conexión a Firebase Storage (similar a como hicimos con Firestore y Auth).                                                                                                          |
| `admin/index.html`                         | Un formulario nuevo: "Agregar Producto" con campos para nombre, descripción, precio y un botón de "Subir Foto".                                                                                            |
| `admin/aplicacion-administrador.js`        | Lógica para crear productos nuevos y subir fotos usando los servicios.                                                                                                                                     |
| `admin/estilo-administrador.css`           | Estilos para el nuevo formulario de creación.                                                                                                                                                              |
| `index.html`                               | Agregar un contenedor vacío (`<div id="productos-dinamicos">`) debajo de las tarjetas existentes.                                                                                                          |
| `precios-publicos.js`                      | Nueva lógica: después de actualizar las tarjetas existentes, revisar si hay productos en Firebase que NO tienen tarjeta en el HTML. Para esos, crear tarjetas dinámicas y meterlas en el contenedor nuevo. |
| `modules/services/servicio-datos.js`       | Agregar función para crear productos nuevos desde cero (ya existe `crearOSobreescribirProductoPorId`, pero vamos a adaptarla).                                                                             |

---

## 🔄 El Nuevo Flujo de Trabajo

### Escenario 1: Crear un producto nuevo desde el panel

1. El admin entra al panel (`/admin`) e inicia sesión.
2. Ve un botón o sección que dice **"Agregar Nuevo Producto"**.
3. Completa: Nombre: "Chorizo de Cerdo", Descripción: "Ideal para la parrilla", Precio: 8500.
4. Hace clic en **"Subir Foto"** → Elige `chorizo.jpg` desde su computadora.
5. El JS del admin sube la foto a Firebase Storage → Recibe la URL.
6. Guarda el producto completo (nombre, descripción, precio, URL de la foto) en Firestore.
7. ¡Listo! La próxima vez que alguien entre a la web, `precios-publicos.js` detecta ese producto nuevo, crea una tarjeta dinámica con la foto y la muestra debajo de las existentes.

### Escenario 2: Un cliente visita la web

1. Se cargan las tarjetas hardcodeadas del HTML (las de siempre, instantáneas).
2. `precios-publicos.js` viaja a Firebase y trae **todos** los productos.
3. Actualiza precios/descripciones de las tarjetas existentes (como ya hacía).
4. **NUEVO:** Detecta que "Chorizo de Cerdo" no tiene tarjeta en el HTML.
5. Crea una tarjeta nueva dinámicamente y la inyecta en `#productos-dinamicos`.
6. El esqueleto de carga se disipa y todo se ve uniforme y profesional.

---

## 🛡️ Seguridad de Firebase Storage

Al igual que con Firestore, Firebase Storage tiene sus propias **Reglas de Seguridad**. Las configuraremos así:

```javascript
// Cualquiera puede VER las fotos (porque los clientes necesitan cargarlas en la web)
allow read: if true;

// Solo el administrador logueado puede SUBIR o BORRAR fotos
allow write: if request.auth != null;
```

Esto significa que un hacker podría ver las fotos (lo cual es irrelevante, ya que son públicas en tu web), pero **jamás** podría subir fotos basura ni borrar las tuyas sin tu contraseña.

---

👉 **¿Listo para implementarlo?** Consultá la checklist paso a paso en **[documentacion/sistema_hibrido.md](../documentacion/sistema_hibrido.md)** para ver el progreso en tiempo real.
