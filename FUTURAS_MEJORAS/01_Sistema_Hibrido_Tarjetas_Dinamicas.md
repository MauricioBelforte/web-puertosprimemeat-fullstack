# 💡 FUTURAS MEJORAS
## 01 - Sistema Híbrido: Tarjetas Dinámicas y Almacenamiento

*Estado: ⏸️ Pausado (Pendiente de configuración de método de pago en Firebase o decisión de alternativa).*

### 🎯 Objetivo Principal
Permitir que el administrador pueda **crear productos nuevos** y **subir fotos** directamente desde el Panel de Administrador, sin necesidad de tocar el código HTML ni subir archivos manualmente.

### 🧠 La Estrategia Híbrida
Para mantener la seguridad y el rendimiento, el sistema convivirá en dos partes:
1. **Zona Segura (HTML):** Los productos actuales siguen "hardcodeados" en el `index.html`. Son la base y aseguran que la web siempre tenga contenido, incluso si Firebase falla.
2. **Zona Dinámica (JS + Firebase):** Debajo de las tarjetas estáticas, un script de JavaScript creará tarjetas nuevas al vuelo para cada producto extra que el admin haya creado en la base de datos (y que no esté en el HTML).

### 🛠️ Pasos de Implementación (Checklist)
1. **Activación de Almacenamiento (Storage)**
   - Activar Firebase Storage en plan Blaze (requiere tarjeta como garantía, aunque sea gratis por volumen).
   - Configurar reglas de seguridad (`allow read; allow write if auth != null;`).

2. **Backend (Servicios)**
   - Importar `getStorage` en `configuracion-firebase.js`.
   - Crear `servicio-almacenamiento.js` con la función para subir imágenes y obtener su URL pública.

3. **Frontend: Panel Administrador**
   - Modificar `admin/index.html` para agregar un formulario de "Nuevo Producto" con input tipo `file` para la imagen.
   - Enlazar la subida de la imagen y la creación del documento Firestore en `aplicacion-administrador.js`.

4. **Frontend: Web Pública**
   - Agregar el `<div id="productos-dinamicos"></div>` en el index original.
   - Modificar `precios-publicos.js` para detectar productos "nuevos" en BD y dibujarlos con el mismo HTML/CSS de una tarjeta normal.

---
*Nota: Retomar esta lista cuando tengamos tiempo de ver la configuración de Firebase Storage o decidamos hacer una versión "Plan B" (donde las fotos suben a la carpeta local `imagenes/`).*
