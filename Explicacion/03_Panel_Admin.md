# 🔐 03 - Panel de Administrador: Tu Centro de Control

Para cambiar los precios sin tocar código nunca más, creamos una carpeta especial llamada **`admin/`**.
Ahí dentro vive una aplicación web completamente independiente.

Esta carpeta tiene sus propios archivos básicos: `index.html` (para la estructura visual), `estilo-administrador.css` (para que se vea bonito y como un panel corporativo) y la gran estrella de la fiesta, `aplicacion-administrador.js`.

## ¿Cómo funciona visualmente?

1. **La Puerta Cerrada (Login):** Si alguien entra a la dirección `/admin`, no ve los productos. Solo ve un formulario pidiendo **Email** y **Contraseña**.
2. **El Cuarto Trasero (Dashboard):** Si las credenciales son correctas (las que definiste tú), la pantalla cambia. Muestra una tabla o lista hermosa con todos tus productos.
   - Cada producto tiene una caja de texto con su **precio actual**.
   - Tiene botones para **"Guardar"** cambios.
   - Un botón gigante arriba para **"Cerrar Sesión"**.

## El Cerebro del Admin: `aplicacion-administrador.js`

Este archivo JavaScript es mucho más complicado que el publico, porque este archivo **SÍ** tiene permisos para modificar cosas.

### 1. El Portero de Discoteca (Autenticación)

Al principio del código vas a ver que importa `vigilarEstadoDeLaSesion`, `iniciarSesionDelAdministrador`, y `cerrarSesionDelAdministrador`.  
El archivo siempre está escuchando.
Si intentas entrar "de colado" sin clave, oculta toda la lista de precios y te escupe el formulario de login.  
Cuando llenas el formulario y le das "Ingresar", toma tu email y clave y viaja rápido a Firebase: _"¿Este usuario existe y su clave es correcta?"_. Firebase dice "Sí". Entonces, el portero te deja pasar, oculta el login y te muestra la lista de carnes.

### 2. Cargar la Tabla (Lectura)

Al igual que el frontend público, este panel necesita saber qué productos hay. Usa la función `obtenerTodosLosProductosDeLaBaseDeDatos()` para traer la lista. Luego, a través de código (`innerHTML` o creación de elementos), dibuja las filas de la tabla de inventario en tu pantalla.

### 3. El Momento Clave: "Guardar Cambios"

Supongamos que cambias el precio del "Tomahawk" de 20.000 a 25.000. Y le das al botón _Guardar_.
Aquí pasa la verdadera magia que justifica todo el proyecto:

1. El botón de guardar se da cuenta del click.
2. Lee el nuevo número que escribiste: `25000`.
3. Llama a una función muy importante: **`actualizarProductoEspecificoPorId(idProducto, nuevoPrecio)`**.
4. Esta función (que viaja desde la carpeta secreta `modules/`) recibe la orden. Va hasta la base de datos de Google en la nube.
5. Abre la ficha del producto "tomahawk" en la nube.
6. Sobreescribe el precio viejo con el `25000` nuevo de forma permanente.
7. Te avisa en la pantalla: _"¡Precio guardado con éxito!"_.

A partir de este instante, el nuevo precio ya está en la nube. Si refrescas la página pública, ya aparecerá a $25.000.  
**Si cierras el administrador, no pasa nada, el precio quedó grabado en los servidores de Google para siempre.**

### ¿Por qué esta carpeta es segura?

Porque, como veremos en el último paso, le dimos órdenes estrictas a Firebase (en sus **Reglas de Seguridad**).
Si alguien malicioso, desde su casa, descubre la función `actualizarProductoEspecificoPorId` e intenta cambiar el "Asado" a $1 para estafarte, Firebase lo frenará en seco y le dirá:
_"Alto ahí. Este comando está llegando desde un usuario que NO INICIÓ SESIÓN con contraseña. Rebotado."_

Solo el código ejecutado después del Login de Administrador tiene las llaves para poder alterar la base de datos.

---

👉 **Siguiente paso:** Ahora que entiendes quién lee (clientes) y quién escribe (tú), vamos a entender qué es ese puente que sirve de comunicación para ambos: **[04_Backend_BaseDeDatos.md](./04_Backend_BaseDeDatos.md)**.
