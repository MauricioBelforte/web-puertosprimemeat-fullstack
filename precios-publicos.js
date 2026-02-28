// Importo la función getProductos desde el servicio de datos (que a su vez habla con Firebase)
import { obtenerTodosLosProductosDeLaBaseDeDatos } from './modules/services/servicio-datos.js';

// Función para agarrar el nombre de un producto (ej. "Ojo de Bife") y convertirlo en un ID (ej. "ojo-de-bife")
// Esto es super necesario porque en la base de datos de Firebase guardamos los productos bajo esos IDs.
function generarId(nombre) {
    return nombre.toLowerCase() // Convierto todo el texto a minúsculas
        .replace(/ñ/g, 'n') // Cambio las 'ñ' por 'n' para evitar problemas técnicos en la web
        .replace(/ /g, '-') // Cambio los espacios vacíos por guiones medios
        .replace(/[^\w-]+/g, ''); // Elimino cualquier otro símbolo raro (tildes, comas, etc.) dejando solo letras, números y guiones
}

// Función principal asíncrona (async significa que puede esperar procesos lentos como pedir cosas a internet)
async function init() {
    // 1. Busco TODOS los elementos en tu index.html que tengan la clase CSS '.tarjeta-producto'
    // 'querySelectorAll' me devuelve una lista (como un array) de esas cajas HTML
    const tarjetasHtml = document.querySelectorAll('.tarjeta-producto');

    // 2. Si la lista está vacía (tarjetas.length === 0), significa que no hay productos en la pantalla,
    // así que detengo la función haciendo un "return" para no gastar memoria a lo tonto.
    if (tarjetasHtml.length === 0) return;

    try {
        // 3. Acá ocurre la magia: le pido los productos a Firebase.
        // 'await' significa: "Frena la ejecución acá y ESPERA hasta que Firebase te devuelva la información".
        const todosLosProductosDeFirebase = await obtenerTodosLosProductosDeLaBaseDeDatos();

        // 4. Creo un objeto vacío llamado 'diccionarioDeProductos' (funciona como un diccionario).
        // Lo uso para buscar rapidísimo los productos por su ID en lugar de recorrer la lista una y otra vez.
        const diccionarioDeProductos = {};

        // Recorro la lista de productos que me dio Firebase...
        todosLosProductosDeFirebase.forEach(productoFirebase => {
            // ...y meto cada producto en el diccionario usando su ID como "llave"
            // Ejemplo: diccionarioDeProductos["ojo-de-bife"] = { nombre: "Ojo de Bife", precio: 15000, ... }
            diccionarioDeProductos[productoFirebase.id] = productoFirebase;
        });

        // 5. Ahora recorro CADA TARJETA HTML que encontré en la página al principio (la lista 'tarjetas')
        tarjetasHtml.forEach(tarjeta => {

            // Busco el título del producto dentro de esta tarjeta específica (la etiqueta <h3>)
            const tituloHtml = tarjeta.querySelector('h3');

            // Si por algún error de diseño esta tarjeta no tiene un <h3>, la ignoro y paso a la siguiente.
            if (!tituloHtml) return;

            // Tomo el texto que está dentro del <h3> (ej: "  Ojo de Bife  ")
            // .trim() le quita los espacios en blanco que sobran al principio y al final ("Ojo de Bife")
            const tituloHtmlLimpio = tituloHtml.textContent.trim();

            // Transformo ese título limpio en un ID usando la función de arriba ("Ojo de Bife" -> "ojo-de-bife")
            const id = generarId(tituloHtmlLimpio);


            // Una vez que formatie el titulo del HTML, si diccionarioDeProductos[id] se 
            // lo asigno a producto y producto existe entonces es que esta en el diccionario de 
            // productos que vienen de firebase
            const producto = diccionarioDeProductos[id];

            // Si producto existe entonces es que esta en el diccionario de productos que vienen de firebase
            if (producto) {
                // Entonces aca estamos en condiciones de modificar los datos de la tarjeta que esta en el HTML
                // ...busco el lugar en el HTML donde va la descripción (la etiqueta <p> dentro del contenedor)
                const descripcionHtml = tarjeta.querySelector('.contenedor-descripcion p');
                // ...busco el lugar del HTML donde va la presentación
                const presentacionHtml = tarjeta.querySelector('.presentacion-producto');
                // ...y busco el lugar en el HTML donde va el precio (el elemento con clase '.precio-real')
                const precioHtml = tarjeta.querySelector('.precio-real');

                // A ese <h3> que agarré arriba, le pongo el nombre exacto que me trajo Firebase
                tituloHtml.textContent = producto.nombre;

                // Si de verdad encontré el párrafo de la descripción en el HTML...
                if (descripcionHtml) {
                    // ...le inyecto el texto de la descripción que vino desde Firebase
                    descripcionHtml.textContent = producto.descripcion;
                }

                // Si encuentro la presentación y Firebase tiene una guardada...
                if (presentacionHtml && producto.presentacion) {
                    // La inyecto respetando etiquetas HTML porque nuestra estructura usa <br>
                    presentacionHtml.innerHTML = producto.presentacion;
                }

                // Si de verdad encontré el párrafo del precio en el HTML...
                if (precioHtml) {
                    // ...le inyecto el precio de Firebase.
                    // .toLocaleString('es-AR') sirve para ponerle el puntito de los miles (ej: 15000 se vuelve "15.000")
                    precioHtml.textContent = `$ ${producto.precio.toLocaleString('es-AR')}`;
                }
            }
        });
    } catch (error) {
        // Si ALGO falla en todo este proceso (ej: se cae internet), lo anoto en la consola oculta del navegador
        console.error("Error al cargar precios:", error);
    } finally {
        // --- FINALLY SE EJECUTA SIEMPRE (Sea que haya andado bien o haya fallado Firebase) ---
        // Le quita la animación de carga gris a TODOS los precios al mismo tiempo.
        // Si Firebase funcionó: revelará los números actualizados.
        // Si Firebase se cayó: revelará los números de emergencia viejos que están escritos en el index.html.
        const preciosAnimadosHtml = document.querySelectorAll('.precio-esqueleto');
        preciosAnimadosHtml.forEach(precio => {
            precio.classList.remove('precio-esqueleto');
        });
    }
}

// Finalmente, llamo a la función init() para que todo el código de arriba comience a trabajar ni bien carga la página.
init();