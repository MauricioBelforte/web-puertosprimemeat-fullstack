// Importamos la herramienta maestra para inicializar una conexión entre JS puro y los servidores de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// Importo el paquete especial para Base de Datos
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// Importo el paquete especial para Usuario y Clave (Autenticación)
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ⚠️ Este objeto son TODAS TUS "LLAVES SECRETAS" y DNIs técnicos de tu aplicación. 
// Cuando el código hace una petición de Login, le pone una "etiqueta" con todas estas llaves
// Si no las tuviera, Firebase diría: "¿De qué proyecto de todos los millones que tengo vienes?". 
// Así Firebase sabe que esta web con este script pertenece a la base de datos de Puertos Prime Meat
const configuracionSecretaDeFirebase = {
    apiKey: "AIzaSyBwW6Zij54roTGGbg7a2kkGxn5UjJa0CJc", // Clave de identificación pública de seguridad
    authDomain: "puertosprimemeat.firebaseapp.com", // El link donde funciona tu seguridad
    projectId: "puertosprimemeat", // El nombre oficial de tu proyecto
    storageBucket: "puertosprimemeat.firebasestorage.app", // Nombre del "disco duro" para subir imágenes
    messagingSenderId: "784181182095", // Id de mensajería u optimización
    appId: "1:784181182095:web:fbf4a71b66a039790a3afa" // Tu DNI de aplicación web
};

// Llamamos a initializeApp pasándole nuestras llaves recién configuradas.
// Esto es literalmente prender el motor. El objeto "aplicacionFirebaseIniciada" guardará el motor prendido.
const aplicacionFirebaseIniciada = initializeApp(configuracionSecretaDeFirebase);

// Ahora de ese motor prendido derivamos y le extraemos los dos sistemas que vamos a usar:
// Extraigo la base de datos conectada 
const baseDeDatosFirestore = getFirestore(aplicacionFirebaseIniciada);
// Extraigo el servicio de cuentas 
const servicioDeAutenticacion = getAuth(aplicacionFirebaseIniciada);

// Exporto estas dos herramientas para que OTROS de mis archivos (auth-service, data-service) puedan pedirlas e importarlas cuando necesiten hablar con Firebase
export { baseDeDatosFirestore, servicioDeAutenticacion };