# 🛒 02 - Frontend Público: Tu Tienda en Línea

Esta es la página que ven tus clientes cuando entran a `puertosprimemeat.com`. Tu archivo principal aquí es el **`index.html`** de siempre.

Antes, si vendías 1 kilo de Ojo de Bife a $15.000, tenías algo así en tu código:

```html
<h3>Ojo de Bife</h3>
<p class="precio-real">$ 15.000</p>
```

Si el precio subía, tenías que abrir este archivo y borrar el `15.000` para poner el número nuevo. ¡Un proceso manual y aburrido!

## 🪄 La Magia: Etiquetas Inteligentes

Lo que hicimos fue preparar tu HTML para que esté "listo" para recibir información. Para que nuestra nueva inteligencia (JavaScript) sepa **dónde** poner cada precio, nos aseguramos de que cada producto tuviera algo único.

En lugar de cambiar manualmente, ahora tu página hace esto automáticamente.

### El Archivo Estrella: `precios-publicos.js`

Este archivo es el **mensajero de los clientes**. Se carga al final de tu `index.html`. Funciona exactamente así (paso a paso, en idioma humano):

1. **La Llegada:** Cuando un cliente abre tu página, `precios-publicos.js` es lo primero en activarse ocultamente.
2. **La Petición:** Usa una función misteriosa llamada `obtenerTodosLosProductosDeLaBaseDeDatos()`. Esta función básicamente es un mensajero que viaja por internet, toca la puerta de Google Firebase (la base de datos) y le dice: _"Dame la lista de precios de hoy"_.
3. **La Base de Datos Responde:** Firebase le entrega un listado (como una tabla de Excel invisible) con los nombres de la carne, descripciones y, lo más importante, ¡los precios!
4. **Buscando en tu Página:** El archivo JavaScript mira tu diseño web. Busca cada cajita (tarjeta de producto) en la pantalla.
5. **El Emparejamiento:** Lee el título del producto en tu página ("Ojo de Bife"). Genera un ID, un identificador, único como "ojo-de-bife". Busca ese "ojo-de-bife" en la lista nueva que trajo Firebase.
6. **La Actualización (El truco de magia):** Cuando encuentra la pareja, toma el precio de la base de datos (digamos $18.000), le da un formato bonito de moneda argentina (`$ 18.000`) y lo **escribe** en la pantalla del cliente, borrando cualquier otro número viejo que hubiera debajo.

¡Todo esto parece larguísimo pero ocurre en una fracción de segundo! El usuario solo ve los precios actuales.

### Resumen de `precios-publicos.js`

1. **Importa la herramienta de red:** Trae la función `obtenerTodosLosProductosDeLaBaseDeDatos` de un lugar secreto (`servicio-datos.js`, nuestro traductor con la nube).
2. **Encuentra tarjetas:** Usa `document.querySelectorAll('.tarjeta-producto')` para hallar todas las carnes.
3. **Pide datos:** `await obtenerTodosLosProductosDeLaBaseDeDatos()` consigue los precios frescos.
4. **Reemplaza:** Toma el elemento `<p class="precio-real">` de cada tarjeta y lo rellena con `producto.precio`.

Ese es todo el secreto de tu portada pública. Ella no edita, no guarda contraseñas, no hace nada peligroso. Solo **lee** lo que hay en internet y lo muestra bonito.

---

👉 **Siguiente paso:** Para entender de dónde saca los precios cuando los cambias tú, vamos a ver el archivo **[03_Panel_Admin.md](./03_Panel_Admin.md)**.
