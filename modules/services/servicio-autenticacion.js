// Importo las herramientas de contraseñas y cuentas desde los servidores de Firebase
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// Importo mi cuenta maestra vinculada a mi web que hice en la configuración
import { servicioDeAutenticacion } from "../config/configuracion-firebase.js";

// Función para iniciar sesión (mandarle usuario y contraseña a google a ver si me aprueba)
export const iniciarSesionDelAdministrador = (correoElectronico, contraseniaAdministrador) => {
    // signInWith... es como tocar el timbre de la casa y mostrar el DNI. Automáticamente intenta loguearte revisando si coincide el mail y clave.
    return signInWithEmailAndPassword(servicioDeAutenticacion, correoElectronico, contraseniaAdministrador);
};

// Función para cerrar sesión y matar el acceso guardado
export const cerrarSesionDelAdministrador = () => {
    // signOut es cortar la credencial. Le avisa a Firebase que esta compu ya no tiene permisos temporales.
    return signOut(servicioDeAutenticacion);
};

// Este es un espía que trabaja las 24 horas...
// Su trabajo es avisarnos CADA VEZ que alguien entra a la cuenta o sale, o cada vez que recargas la paginas si es que dejaste guardado
export const vigilarEstadoDeLaSesion = (funcionAEjecutarConElUsuario) => {
    // onAuthStateChanged (al cambiar el estado de la autenticación)...
    onAuthStateChanged(servicioDeAutenticacion, (usuarioLogueado) => {
        // Se ejecuta repetidamente entregando la variable 'usuarioLogueado' a nuestro admin
        // Si tiene contenido es porque estás adentro; si es nulo es porque no.
        funcionAEjecutarConElUsuario(usuarioLogueado);
    });
};