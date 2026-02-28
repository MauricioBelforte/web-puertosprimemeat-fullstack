// Imprimo un mensaje oculto en la consola para confirmar que el archivo cargó bien
console.log("aplicacion-administrador.js cargado correctamente.");

// Importo herramientas de seguridad (iniciar sesion, cerrar sesion, verificar si estoy logueado)
import { iniciarSesionDelAdministrador, cerrarSesionDelAdministrador, vigilarEstadoDeLaSesion } from "../modules/services/servicio-autenticacion.js";
// Importo herramientas de base de datos (pedir productos a la nube, actualizarlos)
import { obtenerTodosLosProductosDeLaBaseDeDatos, actualizarProductoEspecificoPorId } from "../modules/services/servicio-datos.js";

// --- REFERENCIAS AL DOM (DOM = El documento HTML) ---
// Agarro partes específicas del archivo index.html del admin para poder manipularlas
const pantallaDeInicioDeSesionHtml = document.getElementById('pantalla-ingreso'); // La pantalla de iniciar sesión
const pantallaPrincipalDelPanelHtml = document.getElementById('pantalla-panel'); // La pantalla principal (donde ves los productos)
const formularioDeIngresoHtml = document.getElementById('formulario-ingreso'); // El formulario donde pones email y clave
const textoDeErrorDeIngresoHtml = document.getElementById('error-ingreso'); // Un texto en rojo para mostrar si te equivocas de clave
const botonParaCerrarSesionHtml = document.getElementById('boton-cerrar-sesion'); // El botón de "Cerrar sesión"
const contenedorDeLasTarjetasDeProductosHtml = document.getElementById('contenedor-productos'); // La caja gigante donde meteré los productos

// Aviso en consola si encontré o no el formulario
console.log("Referencia al formulario de ingreso:", formularioDeIngresoHtml);

// --- 1. LÓGICA DE AUTENTICACIÓN (Seguridad) ---

// Este es un "observador" o "espía". Está TODO EL TIEMPO mirando si hay un usuario conectado o no.
vigilarEstadoDeLaSesion((usuarioLogueadoActualmente) => {
    // Si la variable tiene datos, significa que SI hay alguien logueado correctamente
    if (usuarioLogueadoActualmente) {
        // Entonces: Oculto la pantalla de login agregando la clase CSS 'oculto' (que tiene display:none)
        pantallaDeInicioDeSesionHtml.classList.add('oculto');
        // Y muestro la pantalla principal (dashboard) quitándole la clase 'oculto'
        pantallaPrincipalDelPanelHtml.classList.remove('oculto');

        // Llamo a esta función para que vaya a Firebase a traer la lista de carnes
        pedirProductosYDibujarlosEnPantalla();
    } else {
        // Si no tiene nada, significa que NO estás logueado
        // Vuelvo a mostrar la pantalla de login
        pantallaDeInicioDeSesionHtml.classList.remove('oculto');
        // Y oculto el dashboard para que no veas los datos privados
        pantallaPrincipalDelPanelHtml.classList.add('oculto');

        // Mientras tanto, dejo un texto de carga en el contenedor por las dudas
        contenedorDeLasTarjetasDeProductosHtml.innerHTML = '<p class="texto-cargando">Cargando productos...</p>';
    }
});

// Manejo del formulario de Login (cuando haces click en "Ingresar")
// Primero me aseguro que el formulario de verdad existe en el HTML
if (formularioDeIngresoHtml) {
    // Le agrego un "escuchador de eventos" al formulario para cuando hagas "submit" (O sea, cuando envías los datos)
    formularioDeIngresoHtml.addEventListener('submit', async (eventoDeEnvioDelFormulario) => {
        console.log("Evento 'submit' del formulario capturado.");

        // 'preventDefault' frena que la página se recargue (que es lo que hacen los formularios por defecto)
        eventoDeEnvioDelFormulario.preventDefault();

        // Leo lo que escribiste en la cajita del email (su valor)
        const valorDelCorreoIngresado = document.getElementById('correo').value;
        // Leo lo que escribiste en la cajita de la clave
        const valorDeLaContraseniaIngresada = document.getElementById('contrasenia').value;

        // Si había un mensaje de error viejo en pantalla, lo borro
        textoDeErrorDeIngresoHtml.textContent = '';

        try {
            // Intento iniciar sesión enviando tu email y password a Firebase
            await iniciarSesionDelAdministrador(valorDelCorreoIngresado, valorDeLaContraseniaIngresada);
            // Si Firebase dice "OK, todo piola", no tengo que hacer nada más acá.
            // Porque el espía (arriba) se va a dar cuenta del cambio e ingresará al Dashboard por sí solo.
        } catch (errorAlIntentarIniciarSesion) {
            // Si Firebase dice "Clave incorrecta", ocurre un error que capturo acá.
            console.error("Error en el intento de inicio de sesión:", errorAlIntentarIniciarSesion);
            // Muestro el mensaje de error en la pantallita de login
            textoDeErrorDeIngresoHtml.textContent = "Error: Credenciales incorrectas o usuario no encontrado.";
        }
    });
} else {
    // Si faltara el formulario en el HTML, ayudo de la consola mostrando el error
    console.error("¡Error crítico! No se encontró el formulario con id 'formulario-ingreso'.");
}

// Manejo del botón de Cerrar Sesión (Logout)
botonParaCerrarSesionHtml.addEventListener('click', async () => {
    try {
        // Le aviso a Firebase que rompa tu sesión actual
        await cerrarSesionDelAdministrador();
        // El espía notará que te fuiste, y volverá a mostrarte el login solo.
    } catch (errorAlCerrarSesion) {
        console.error("Error al cerrar sesión", errorAlCerrarSesion);
    }
});

// --- 2. LÓGICA DE DATOS (DASHBOARD) ---

// Función para pedir los productos a la nube
async function pedirProductosYDibujarlosEnPantalla() {
    // Pongo un texto temporal para que no se vea vacía la pantalla
    contenedorDeLasTarjetasDeProductosHtml.innerHTML = '<p class="texto-cargando">Cargando productos...</p>';

    try {
        // Freno acá y le pido la lista a Firebase
        const todosLosProductosDeFirebase = await obtenerTodosLosProductosDeLaBaseDeDatos();

        // Cuando Firebase me entrega la lista, llamo a otra función para dibujarlos en la pantalla
        dibujarLasTarjetasDeLosProductosEnElHtml(todosLosProductosDeFirebase);
    } catch (errorAlCargarLosProductosDesdeLaBase) {
        // Si algo falla al traer datos (ej: la regla de seguridad nos bloquea, no hay internet, etc)
        console.error("Error al cargar productos:", errorAlCargarLosProductosDesdeLaBase);
        contenedorDeLasTarjetasDeProductosHtml.innerHTML = '<p class="mensaje-error">Error al cargar los productos. Verifica tu conexión.</p>';
    }
}

// Función que toma la lista de Firebase y DIBUJA cajas HTML en el panel
function dibujarLasTarjetasDeLosProductosEnElHtml(listaDePorductosTraidaDeFirebase) {
    // Vacío completamente el contenedor (borro el texto temporal de "cargando...")
    contenedorDeLasTarjetasDeProductosHtml.innerHTML = '';

    // Si Firebase dice que hay 0 productos en la base de datos...
    if (listaDePorductosTraidaDeFirebase.length === 0) {
        contenedorDeLasTarjetasDeProductosHtml.innerHTML = '<p>No hay productos cargados en la base de datos.</p>';
        return; // Termino acá
    }

    // Recorro la lista producto por producto
    listaDePorductosTraidaDeFirebase.forEach(productoIndividual => {
        // Creo un objeto HTMl <article> en la memoria (todavía no se ve en pantalla)
        const tarjetaHtmlCreadaEnMemoria = document.createElement('article');
        // Le pongo una clase CSS a ese article para que reciba los estilos
        tarjetaHtmlCreadaEnMemoria.className = 'tarjeta-producto';

        // Saco los valores del producto actual.
        // Si no tiene nombre en la bd, uso un texto vacío '' (el || significa "o")
        const nombreDelProductoRecibido = productoIndividual.nombre || '';
        // Limpiamos los saltos de línea y espacios gigantes que se colaron durante la migración desde el HTML
        const descripcionDelProductoRecibida = (productoIndividual.descripcion || '').replace(/\s+/g, ' ').trim();
        const presentacionDelProductoRecibida = (productoIndividual.presentacion || '').replace(/\s+/g, ' ').trim();
        const precioDelProductoRecibido = productoIndividual.precio || 0;
        const idDelProductoAsignado = productoIndividual.id;

        // "Relleno" ese <article> con todo este HTML gigante.
        // Fíjate que le inyecto las variables donde corresponde.
        // A los inputs les pongo un ID dinámico (ej: id="precio-ojo-de-bife") para saber exactamente a quién pertenece ese input
        tarjetaHtmlCreadaEnMemoria.innerHTML = `
            <div class="info-producto" style="width: 100%;">
                <label>Nombre del Producto:</label>
                <input type="text" class="input-edicion nombre" value="${nombreDelProductoRecibido}" id="nombre-${idDelProductoAsignado}">
                
                <label>Descripción:</label>
                <textarea class="input-edicion descripcion" id="desc-${idDelProductoAsignado}">${descripcionDelProductoRecibida}</textarea>
                
                <label>Presentación (Formato):</label>
                <textarea class="input-edicion presentacion" id="pres-${idDelProductoAsignado}">${presentacionDelProductoRecibida}</textarea>
                
                <label>Precio ($):</label>
                <input type="number" class="input-edicion precio" value="${precioDelProductoRecibido}" id="precio-${idDelProductoAsignado}">
                
                <!-- Este botón tiene un evento onclick en el propio HTML que le dice: "Llama la función de guardar y pasale qué ID de carne voy a guardar" -->
                <button class="boton-guardar" onclick="enviarCambiosALaBaseDeDatos('${idDelProductoAsignado}')">Guardar Cambios</button>
                
                <!-- Un mensajito verde de éxito que pongo oculto por defecto (display:none) -->
                <p class="estado-guardado" id="status-${idDelProductoAsignado}" style="display:none; color: #2e7d32; margin-top: 5px; font-weight: bold;">¡Guardado correctamente!</p>
            </div>
        `;

        // Ahora sí, inyecto este <article> completo al documento real para que aparezca en pantalla
        contenedorDeLasTarjetasDeProductosHtml.appendChild(tarjetaHtmlCreadaEnMemoria);
    });
}

// Función global para agarrar los datos que modificaste y enviarlos a la base de datos
// Uso "window.enviarCambiosALaBaseDeDatos" para que el botón de arriba (que está inyectado directamente en el HTML de la tarjeta) la vea
window.enviarCambiosALaBaseDeDatos = async (idDelProductoQueQuieroGuardar) => {
    // Busco exactamente EL botón que clickeaste usando herramientas avanzadas de selectores
    const botonDeGuardarEspecificoHtml = document.querySelector(`button[onclick="enviarCambiosALaBaseDeDatos('${idDelProductoQueQuieroGuardar}')"]`);
    // Busco exactamente EL mensajito verde que corresponde a este producto
    const mensajeDeEstatusDeGuardadoHtml = document.getElementById(`status-${idDelProductoQueQuieroGuardar}`);

    // Leo qué escribiste en las cajitas en este preciso instante
    // Uso el ID dinámico para no equivocarme de carne. ".value" me trae el texto real que escribiste
    const textoDelNuevoNombre = document.getElementById(`nombre-${idDelProductoQueQuieroGuardar}`).value;
    const textoDeLaNuevaDescripcion = document.getElementById(`desc-${idDelProductoQueQuieroGuardar}`).value;
    const textoDeLaNuevaPresentacion = document.getElementById(`pres-${idDelProductoQueQuieroGuardar}`).value;
    const numeroDelNuevoPrecio = Number(document.getElementById(`precio-${idDelProductoQueQuieroGuardar}`).value); // Number() lo convierte en un número matemático, no en un texto de caracteres

    // Le cambio el texto al botón para dar sensación de que estoy trabajando
    botonDeGuardarEspecificoHtml.textContent = "Guardando...";
    // Desactivo el botón para que no sigas haciendo click mil veces seguidas mientras se guarda
    botonDeGuardarEspecificoHtml.disabled = true;

    try {
        // Le envío la orden al archivo que viaja a Firebase
        // Diciéndole: "Che, en este ID, guardame este paquete de datos nuevos (nombre, desc, precio)"
        await actualizarProductoEspecificoPorId(idDelProductoQueQuieroGuardar, {
            nombre: textoDelNuevoNombre,
            descripcion: textoDeLaNuevaDescripcion,
            presentacion: textoDeLaNuevaPresentacion,
            precio: numeroDelNuevoPrecio
        });

        // Si pasó el await, significa que Firebase guardó bien. 
        // Muestro el mensajito de éxito pasándolo de 'none' (oculto) a 'block' (visible)
        mensajeDeEstatusDeGuardadoHtml.style.display = 'block';

        // Pongo una cuenta regresiva (un temporizador) de 3000 milisegundos (3 segundos)...
        setTimeout(() => {
            // ...para que vuelva a quedar oculto cuando pasen.
            mensajeDeEstatusDeGuardadoHtml.style.display = 'none';
        }, 3000);

    } catch (errorAlIntentarActualizarDatos) {
        // En caso de fallar esto tiro una alerta fea en la web
        console.error("Error al actualizar:", errorAlIntentarActualizarDatos);
        alert("Hubo un error al guardar los cambios. Revisa la consola.");
    } finally {
        // Por último (haya fallado o no), restauro el texto original del botón
        botonDeGuardarEspecificoHtml.textContent = "Guardar Cambios";
        // Vuelvo a activar el click
        botonDeGuardarEspecificoHtml.disabled = false;
    }
};