# ✅ CHECKLIST: Sistema Híbrido (Tarjetas Dinámicas + Firebase Storage)

> **Instrucciones:** A medida que completemos cada paso, marcamos la casilla cambiando `[ ]` por `[x]`.  
> Esto nos sirve como mapa para no perder el hilo del trabajo.

---

## FASE 0: Preparación del Entorno

- [x] **0.1** Habilitar Firebase Storage en la consola de Firebase (Ir a consola → Storage → "Comenzar").
- [ ] **0.2** Configurar las Reglas de Seguridad de Storage (`allow read: if true; allow write: if request.auth != null;`).
- [ ] **0.3** Verificar que las Reglas de Seguridad de Firestore siguen correctas.

---

## FASE 1: Servicio de Almacenamiento (Backend)

- [ ] **1.1** Modificar `modules/config/configuracion-firebase.js`: Importar `getStorage` desde el CDN de Firebase y exportar la nueva constante `almacenamientoFirebase`.
- [ ] **1.2** Crear el archivo `modules/services/servicio-almacenamiento.js` con la función `subirImagenDelProducto(archivoDeImagen, nombreDelArchivo)` que suba la foto a Firebase Storage y devuelva la URL pública.
- [ ] **1.3** Probar manualmente que la función de subida funciona (desde la consola del navegador o un script de prueba).

---

## FASE 2: Servicio de Datos (Actualización)

- [ ] **2.1** Verificar que la función `crearOSobreescribirProductoPorId()` en `servicio-datos.js` acepta un campo `imagenUrl` dentro de los datos del producto.
- [ ] **2.2** Opcional: Agregar función `eliminarProductoDeLaBaseDeDatos(idDelProducto)` para poder borrar productos desde el panel en el futuro.

---

## FASE 3: Panel de Administrador (Formulario de Creación)

- [ ] **3.1** Modificar `admin/index.html`: Agregar una sección/formulario de "Agregar Nuevo Producto" con campos para: Nombre, Descripción, Presentación, Precio, y un input de tipo `file` para la foto.
- [ ] **3.2** Modificar `admin/estilo-administrador.css`: Estilar el nuevo formulario de creación para que se vea profesional y coherente con el resto del panel.
- [ ] **3.3** Modificar `admin/aplicacion-administrador.js`:
  - [ ] **3.3.1** Importar la función de subida desde `servicio-almacenamiento.js`.
  - [ ] **3.3.2** Agregar un listener al formulario de creación que: (a) suba la foto, (b) reciba la URL, (c) guarde el producto completo en Firestore con la URL de la imagen.
  - [ ] **3.3.3** Agregar feedback visual al crear (mensaje de éxito/error).
  - [ ] **3.3.4** Recargar la lista de productos del panel después de crear uno nuevo.
- [ ] **3.4** Probar la creación completa de un producto desde el panel admin.

---

## FASE 4: Frontend Público (Tarjetas Dinámicas)

- [ ] **4.1** Modificar `index.html`: Agregar un contenedor vacío `<div id="productos-dinamicos"></div>` debajo del `contenedor-tarjetas` existente.
- [ ] **4.2** Modificar `precios-publicos.js`:
  - [ ] **4.2.1** Después de actualizar las tarjetas existentes, identificar qué productos de Firebase NO tienen tarjeta en el HTML (son los "nuevos").
  - [ ] **4.2.2** Para cada producto nuevo, crear dinámicamente una tarjeta HTML completa (con imagen, nombre, descripción, precio) y agregarla al contenedor `#productos-dinamicos`.
  - [ ] **4.2.3** Asegurar que las tarjetas dinámicas usen las mismas clases CSS que las estáticas para mantener la coherencia visual.
  - [ ] **4.2.4** Agregar esqueleto de carga para las tarjetas dinámicas.
- [ ] **4.3** Probar que las tarjetas dinámicas se ven igual que las hardcodeadas.
- [ ] **4.4** Probar el fallback: desconectar internet y verificar que las tarjetas originales del HTML siguen visibles.

---

## FASE 5: Pruebas Finales y Deploy

- [ ] **5.1** Crear un producto de prueba desde el panel admin (con foto incluida).
- [ ] **5.2** Verificar que aparece correctamente en la web pública.
- [ ] **5.3** Editar el precio del producto de prueba desde el panel y verificar que se actualiza en la web.
- [ ] **5.4** Verificar que los productos originales (hardcodeados) siguen funcionando correctamente.
- [ ] **5.5** Verificar que si Firebase se cae, las tarjetas originales siguen visibles (fallback seguro).
- [ ] **5.6** Hacer commit y push a GitHub: `git add . && git commit -m "Implementar sistema híbrido con tarjetas dinámicas y Firebase Storage"`.
- [ ] **5.7** Verificar el deploy automático en Firebase Hosting.
- [ ] **5.8** Actualizar `agents.md` con las nuevas capacidades del sistema.

---

## 📊 Progreso General

| Fase                                  | Estado       |
| ------------------------------------- | ------------ |
| Fase 0: Preparación                   | 🔄 En curso  |
| Fase 1: Servicio de Almacenamiento    | ⬜ Pendiente |
| Fase 2: Servicio de Datos             | ⬜ Pendiente |
| Fase 3: Panel Admin (Creación)        | ⬜ Pendiente |
| Fase 4: Frontend (Tarjetas Dinámicas) | ⬜ Pendiente |
| Fase 5: Pruebas y Deploy              | ⬜ Pendiente |

---

> **Nota:** Este documento se actualiza en tiempo real a medida que avanzamos. Cada `[x]` es un paso completado y verificado.
