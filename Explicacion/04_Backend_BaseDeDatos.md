# ☁️ 04 - El Backend: Firebase y la Carpeta `modules/`

Hasta ahora hemos hablado de quién lee los precios (el cliente) y quién los escribe (tú, el administrador). Pero, ¿dónde viven esos datos? ¿Quién anota en la libreta que el vacío cuesta más hoy que ayer?  
Ese trabajo lo hace **Firebase**, nuestro "Backend" (lo que pasa detrás de escena).

## ¿Qué es Firebase?

Es una computadora gigante de Google. Nos regalan un pedacito de espacio para que hagamos dos cosas:

1. **Authentication:** Nos prestan un "guardia de seguridad" para que nos avise si el correo y la clave que pusiste en el Panel Admin son los correctos.
2. **Firestore (Base de Datos):** Nos prestan una libreta de anotaciones o tabla de Excel gigante llamada "productos" donde guardamos el precio de cada corte.

---

## La Carpeta `modules/` (El Traductor)

Toda la comunicación de nuestro sistema hacia Google Firebase pasa por los archivos dentro de la carpeta `modules/`. Sin esta carpeta todo estaría desconectado.

### 1. `config/configuracion-firebase.js` (Las Llaves de tu Casa)

Si tu sitio web intenta leer o enviar datos a Google, Google diría: _"¿Y tú quién eres? No te conozco"_.
Para que nos reconozcan, dentro de este archivo colocamos tus **credenciales de Firebase** (`apiKey`, `authDomain`, etc). Es como llevar la llave y la credencial que da el ID de tu proyecto. Cuando el código Javascript inicia, primero muestra este carnet.

### 2. `services/servicio-autenticacion.js` (El Departamento de Recursos Humanos)

Aquí viven 3 funciones cortitas pero muy importantes para la página del Panel de Administrador:

- `iniciarSesionDelAdministrador(correoElectronico, contraseniaAdministrador)`: Viaja a Firebase, le pasa esos datos y pregunta: _"¿Son válidos?"_. Si lo son, abre la puerta.
- `cerrarSesionDelAdministrador()`: Le dice a Firebase: _"Este usuario ya se fue a dormir, ciérrale la sesión"_.
- `vigilarEstadoDeLaSesion()`: Un vigilante 24/7. Está todo el tiempo revisando: _"¿Sigue con la sesión abierta? ¿Sí? Dale, déjale ver los precios"_.

### 3. `services/servicio-datos.js` (El Empleado de Archivo)

Es el que hace el trabajo pesado. Solo tiene dos tareas:

- `obtenerTodosLosProductosDeLaBaseDeDatos()` (Traer los precios): Va a la base de datos de Firestore en Google, fotocopia toda la lista de carnes, vuelve rapidísimo y se la entrega a quien se la pidió (al `precios-publicos.js` para los clientes o al `aplicacion-administrador.js` para ti).
- `actualizarProductoEspecificoPorId(id, datos-nuevos)` (Guardar los precios): Cuando tú en el admin das click a "Guardar", esta función envuelve ese número nuevo en un paquete seguro de datos, viaja a Firestore, busca el producto y reescribe lo que estaba anotado.

---

## 🛡️ La Regla de Oro (Seguridad)

Seguro te preguntaste: _Si el archivo `servicio-datos.js` puede cambiar los precios y está dentro de los archivos de mi página web... ¿Qué impide que un hacker modifique el precio y ponga un corte de carne a 1 peso?_

El último nivel de seguridad no está en nuestra página web, está en la misma configuración escondida que hicimos directamente entrando a la consola de Google Firebase para programar un candado inquebrantable llamado **Firestore Rules** (Reglas de Firestore).
Pusimos una regla parecida a esta:

```javascript
/* EN IDIOMA MÁQUINA DICE: */
allow read: if true; // Traducción: Deja que el MUNDO ENTERO lea todo aquí (porque si no, los clientes no ven los precios)
allow write: if request.auth != null; // Traducción: Solo deja ESCRIBIR / BORRAR / MODIFICAR algo SOLAMENTE SI EL USUARIO DEMUESTRA ESTAR LOGUEADO.
```

Por lo tanto, la base de datos sabe si el que envía la petición `actualizarProductoEspecificoPorId()` está logueado en tiempo real. Si no es así, envía un enorme error rojo: "Permiso denegado".

🥳 **¡Felicidades, lograste pasar de un sitio web estático a una aplicación (App Web) real conectada a la nube!**

👉 **Siguiente paso:** Si querés llevar tu proyecto al siguiente nivel (crear productos nuevos y subir fotos desde el panel admin), seguí con **[05_Evolucion_Sistema_Hibrido.md](./05_Evolucion_Sistema_Hibrido.md)**.
