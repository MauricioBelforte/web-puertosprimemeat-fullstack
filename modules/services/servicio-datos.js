// Importo las herramientas específicas de Firebase que se encargan del manejo de bases de datos
import { collection, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// Importo mi conexión maestra configurada en archivo aparte
import { baseDeDatosFirestore } from "../config/configuracion-firebase.js";

// Creo un acceso directo o un "apuntador" a la parte de Firebase que guarda los productos
// Es como decirle: "Ubicame en el cajón etiquetado como 'productos'"
const coleccionDeProductosEnFormatoReferencia = collection(baseDeDatosFirestore, "productos");

// Función para pedirle TODOS los productos a Firebase de un saque.
export const obtenerTodosLosProductosDeLaBaseDeDatos = async () => {
    // getDocs es la herramienta de Firebase que literalmente significa "Obtener todos los documentos"
    // Freno y espero (await) hasta que Google me los envíe. Todos estos datos quedan almacenados aquí.
    const respuestaDeGoogleFirebase = await getDocs(coleccionDeProductosEnFormatoReferencia);

    // Creo una lista vacía para ir guardando lo que me llega
    const listaDeProductosFormateados = [];

    // Recorro caja por caja todo lo que me trajo Google
    respuestaDeGoogleFirebase.forEach((documentoFirebase) => {
        // Inyecto cada producto a la lista vacía creada arriba.
        // Firebase me tiene que dar por un lado la ID (documentoFirebase.id), y por otro la data interna como precios, nombre, etc (documentoFirebase.data())
        // Con ...documentoFirebase.data() le extraigo su contenido y lo unifico con la ID
        listaDeProductosFormateados.push({ id: documentoFirebase.id, ...documentoFirebase.data() });
    });

    // Entrego la lista completa llena a quien me haya llamado (al frontend o al admin)
    return listaDeProductosFormateados;
};

// Función para ir a Firestore y sobreescribir partes de un producto existente.
export const actualizarProductoEspecificoPorId = (idDeseadoDelProducto, nuevosDatosDelProductoCambiado) => {
    // Apunto y selecciono ESPECÍFICAMENTE a un producto individual.
    // Ej: "Entra a la base de datos, al cajón ('productos'), y busca la ficha con este ID exacto"
    const referenciaAlDocumentoDeseado = doc(baseDeDatosFirestore, "productos", idDeseadoDelProducto);

    // updateDoc es la instrucción directa de guardado de Firebase. Actualiza algo en esa ficha y listo.
    return updateDoc(referenciaAlDocumentoDeseado, nuevosDatosDelProductoCambiado);
};

// Función para CREAR un producto desde cero, o SOBREESCRIBIRLO entero en caso de que ya exista.
export const crearOSobreescribirProductoPorId = (idDeseadoDelProducto, todosLosDatosNuevosDelProducto) => {
    // Nuevamente, apunto al producto
    const referenciaAlDocumentoDeseado = doc(baseDeDatosFirestore, "productos", idDeseadoDelProducto);

    // setDoc funciona diferente, en vez de actualizar un dato puntual, machaca la ficha entera
    return setDoc(referenciaAlDocumentoDeseado, todosLosDatosNuevosDelProducto);
};