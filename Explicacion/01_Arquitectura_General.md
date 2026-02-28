# 🏗️ 01 - Arquitectura General: ¿Cómo se conectan las piezas?

Antes, tu proyecto era **estático**. Tenías un archivo `index.html`, un poco de CSS para que se vea lindo, y todo el texto (como los precios) estaba escrito a mano (fijo o "quemado") dentro de ese mismo HTML.  
Para cambiar un precio, tenías que abrir tu código, buscar la línea exacta y modificarla.

## ✨ El Gran Cambio: Hacerlo Dinámico

Lo que hicimos fue agregar un **Backend (Base de Datos)**. Esto significa que los precios ya no viven en el archivo HTML, sino que viven en la "nube" (en nuestro caso, usamos un servicio de Google llamado **Firebase**).

Ahora, tu página web funciona como un televisor que sintoniza un canal para mostrar la información actualizada.

### 🧩 Las Tres Piezas Principales

Para que todo esto funcione de forma segura y ordenada, dividimos tu proyecto en 3 partes grandes:

#### 1. 🛒 El Frontend Público (Lo que ven los clientes)

- Archivos clave: `index.html` y `precios-publicos.js`.
- Es tu página web de toda la vida.
- Misión: Cuando un cliente entra, la página le dice a la base de datos: _"Che, pásame los precios actuales"_. La base de datos responde y la página los dibuja en la pantalla al instante.

#### 2. 🔐 El Panel de Administrador (Tu Centro de Control)

- Carpeta clave: `admin/` (contiene su propio `index.html` y `aplicacion-administrador.js`).
- Es una "segunda página web" escondida que solo tú conoces.
- Misión: Aquí tienes que iniciar sesión con un correo y contraseña. Una vez dentro, ves una lista de tus productos. Si escribes un nuevo precio y presionas "Guardar", este panel envía la orden a la base de datos para actualizar la información.

#### 3. ☁️ El Backend y los Servicios (El puente de comunicación)

- Carpeta clave: `modules/`.
- Aquí no hay diseño ni cosas visuales, solo **lógica pura**.
- Misión: Es el puente (el traductor) entre tus páginas (tanto la pública como la de administrador) y Firebase. Contiene las llaves secretas para hablar con Firebase y las funciones matemáticas/lógicas necesarias para pedir o guardar datos.

---

### 🔄 El Flujo de Trabajo (Historia de un Precio)

Para entenderlo mejor, imagina esta situación: **Quieres subir el precio del Ojo de Bife a $18.000.**

1. Entras a `/admin` (El Panel de Administrador).
2. Pones tu usuario y contraseña. El sistema verifica en **Firebase** si eres tú realmente.
3. El Panel te muestra los productos. Escribes `$18.000` en Ojo de Bife y le das a _Guardar_.
4. Por detrás, la carpeta `modules/` toma ese número y se lo envía a **Firebase** diciendo: _"Actualiza este dato"_.
5. Más tarde, un cliente (que no sabe nada de esto) entra a tu página principal (`index.html`).
6. El archivo `precios-publicos.js` entra en acción, va corriendo a **Firebase**, trae el nuevo precio de `$18.000` y lo inyecta en la tarjeta del Ojo de Bife.

¿Ves? Todo está separado por responsabilidades. Uno muestra, otro modifica y otro guarda.

---

👉 **Siguiente paso:** Ve al archivo **[02_Frontend_Publico.md](./02_Frontend_Publico.md)** para ver exactamente cómo hicimos la magia en tu página principal.
