# 🔧 CÓDIGO HTML - CAMBIOS EXACTOS A REALIZAR

## 📄 Archivo: `index.html`

---

## ✏️ CAMBIO 1: META TITLE

**Ubicación:** Línea ~57

```html
<!-- ❌ ACTUAL (buscar esta línea) -->
<title>Puertos Prime Meat | Carne Premium de Exportación (Cuota 481)</title>

<!-- ✅ CAMBIAR A ESTA -->
<title>Puertos Prime Meat | Carne Cuota 481 en Escobar</title>
```

---

## ✏️ CAMBIO 2: META DESCRIPTION

**Ubicación:** Línea ~17-19

```html
<!-- ❌ ACTUAL -->
<meta name="description"
    content="Puertos Prime Meat te acerca carne de calidad exportación (Cuota 481). Descubrí cortes seleccionados con trazabilidad, sabor y terneza superior para tu asado gourmet.">

<!-- ✅ CAMBIAR A ESTA -->
<meta name="description"
    content="Puertos Prime Meat - Carne premium cuota 481 en Belén de Escobar (cabecera), Puertos (Ciudad-Pueblo: Araucarias, Acacias, Vistas, Riberas, Muelles, Nativas, Orillas, Ceibos, Marinas, Amarras), Ingeniero Maschwitz, San Matías, El Cantón, El Naudí, El Cazador. Trazabilidad y sabor superior.">
```

---

## ✏️ CAMBIO 3: META KEYWORDS

**Ubicación:** Línea ~20-22

```html
<!-- ❌ ACTUAL -->
<meta name="keywords"
    content="carne cuota 481, carnicería premium, cortes de carne premium, asado de tira, ojo de bife, entraña, vacío, carne de exportación, carne para asado, carnicería en Puertos, carne envasada al vacío, asado gourmet">

<!-- ✅ CAMBIAR A ESTA -->
<meta name="keywords"
    content="carne cuota 481 Escobar, carnicería premium Belén de Escobar, carne premium Puertos (Ciudad-Pueblo), carne Araucarias, carne Acacias, carne Vistas, carne Puertos del Lago, cortes carne Maschwitz, carne San Matías, carne El Cantón, carne El Naudí, carne El Cazador, asado de tira Escobar, ojo de bife Escobar, vacío Escobar, entraña cuota 481, carne de exportación Escobar, carnicería Escobar, carne envasada al vacío, asado gourmet">
```

---

## ✏️ CAMBIO 4: OPEN GRAPH TITLE

**Ubicación:** Línea ~24-25

```html
<!-- ❌ ACTUAL -->
<meta property="og:title" content="Puertos Prime Meat | Carne Premium de Exportación (Cuota 481)">

<!-- ✅ CAMBIAR A ESTA -->
<meta property="og:title" content="Puertos Prime Meat | Carne Premium en Belén de Escobar y Puertos del Lago">
```

---

## ✏️ CAMBIO 5: OPEN GRAPH DESCRIPTION

**Ubicación:** Línea ~26-28

```html
<!-- ❌ ACTUAL -->
<meta property="og:description"
    content="Descubrí carne de calidad exportación (Cuota 481) con trazabilidad, sabor y terneza superior para tu asado gourmet.">

<!-- ✅ CAMBIAR A ESTA -->
<meta property="og:description"
    content="Carne premium cuota 481 entregada en Escobar, Puertos del Lago, Maschwitz y zona norte. Cortes selectos para tu asado gourmet.">
```

---

## ✏️ CAMBIO 6: SCHEMA.ORG (CRÍTICO)

**Ubicación:** Línea ~50-60 (dentro de `<script type="application/ld+json">`)

```html
<!-- ❌ ACTUAL -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ButcherShop",
  "name": "Puertos Prime Meat",
  "image": "https://puertosprimemeat.ar/imagenes/logo.jpeg",
  "url": "https://puertosprimemeat.ar/",
  "telephone": "+5493484568338",
  "description": "Puertos Prime Meat te acerca carne de calidad exportación (Cuota 481). Descubrí cortes seleccionados con trazabilidad, sabor y terneza superior.",
  "priceRange": "$$$",
  "areaServed": "Puertos del Lago, Escobar"
}
</script>

<!-- ✅ CAMBIAR A ESTA -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ButcherShop",
  "name": "Puertos Prime Meat",
  "image": "https://puertosprimemeat.ar/imagenes/logo.jpeg",
  "url": "https://puertosprimemeat.ar/",
  "telephone": "+5493484568338",
  "description": "Puertos Prime Meat - Carne premium cuota 481 en Escobar",
  "priceRange": "$$$",
  "areaServed": [
    "Belén de Escobar",
    "Puertos del Lago",
    "Ingeniero Maschwitz",
    "San Matías",
    "El Cantón",
    "El Naudí",
    "El Cazador",
    "Araucarias",
    "Acacias",
    "Vistas",
    "Riberas",
    "Muelles",
    "Nativas",
    "Orillas",
    "Ceibos",
    "Marinas",
    "Amarras",
    "Escobar",
    "Buenos Aires"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Puertos del Lago",
    "addressLocality": "Escobar",
    "addressRegion": "Buenos Aires",
    "postalCode": "1625",
    "addressCountry": "AR"
  }
}
</script>
```

---

## ✏️ CAMBIO 7: H1 PRINCIPAL (OPCIÓN A - Más agresivo)

**Ubicación:** Línea ~97 (dentro de `<h1>`)

```html
<!-- ❌ ACTUAL -->
<h1 class="libre-baskerville">PUERTOS PRIME MEAT</h1>

<!-- ✅ CAMBIAR A ESTA (OPCIÓN A) -->
<h1 class="libre-baskerville">Puertos Prime Meat - Carne Premium en Escobar</h1>
```

---

## ✏️ CAMBIO 7B: H1 PRINCIPAL (OPCIÓN B - Menos invasivo, mantiene diseño)

**Ubicación:** Línea ~97-98 (mantén H1, agrega párrafo después)

```html
<!-- ✅ OPCIÓN B: Mantén H1, agrega párrafo debajo -->
<h1 class="libre-baskerville">PUERTOS PRIME MEAT</h1>
<p class="subtitulo-hero" style="font-size: 1.2em; margin: 10px 0 20px 0;">
  Carne Premium Cuota 481 en Belén de Escobar, Puertos del Lago e Ingeniero Maschwitz
</p>
```

---

## ✏️ CAMBIO 8: SECCIÓN SOBRE NOSOTROS

**Ubicación:** Línea ~131-145 (dentro de `<section class="seccion-presentacion">`)

```html
<!-- ❌ ACTUAL -->
<section class="seccion-presentacion" id="sobre-nosotros">
    <h2>Sobre Nosotros</h2>
    <p>Puertos Prime Meat acerca la carne de calidad exportación a un público exigente.
        Trabajamos bajo Cuota 481, la misma categoría que se exporta a la Unión Europea, garantizando
        trazabilidad, bienestar animal y cortes seleccionados de excelencia.</p>
    <p>Carne alimentada a pasto y terminada a grano, con marmoleo perfecto, sabor intenso y terneza
        excepcional, envasada al vacío para conservar su calidad original.</p>
    <p>Una experiencia de asado gourmet, con origen controlado y presentación de nivel internacional.</p>
</section>

<!-- ✅ CAMBIAR A ESTA -->
<section class="seccion-presentacion" id="sobre-nosotros">
    <h2>Sobre Nosotros</h2>
    <p>Puertos Prime Meat acerca la carne de calidad exportación a un público exigente en Escobar y 
    alrededores. Operamos en Belén de Escobar, Puertos del Lago, Ingeniero Maschwitz y barrios 
    como San Matías, El Cantón, El Naudí, El Cazador, Araucarias, Acacias, Vistas, Riberas, 
    Muelles, Nativas, Orillas, Ceibos, Marinas y Amarras.</p>
    
    <p>Trabajamos bajo Cuota 481, la misma categoría que se exporta a la Unión Europea, garantizando
    trazabilidad, bienestar animal y cortes seleccionados de excelencia.</p>
    
    <p>Carne alimentada a pasto y terminada a grano, con marmoleo perfecto, sabor intenso y terneza
    excepcional, envasada al vacío para conservar su calidad original.</p>
    
    <p>Una experiencia de asado gourmet, con origen controlado y presentación de nivel internacional,
    entregada en tu zona de Escobar.</p>
</section>
```

---

## ✏️ CAMBIO 9: SECCIÓN H2 PRODUCTOS

**Ubicación:** Línea ~157

```html
<!-- ❌ ACTUAL -->
<h2>CORTES PUERTOS PRIME MEAT</h2>

<!-- ✅ CAMBIAR A ESTA -->
<h2>Cortes Premium Cuota 481 - Escobar</h2>
```

---

## ✏️ CAMBIO 10: SECCIÓN CONTACTO (NUEVA)

**Ubicación:** Línea ~430-434 (reemplazar sección completa)

```html
<!-- ❌ ACTUAL -->
<section class="seccion-contacto">
    <h2>Contactanos</h2>
    <p>Si tenés alguna pregunta, no dudes en ponerte en contacto con nosotros.</p>
</section>

<!-- ✅ CAMBIAR A ESTA -->
<section class="seccion-contacto" id="contacto">
    <h2>Contáctanos - Servicio en Escobar y Zona Norte</h2>
    
    <p>Puertos Prime Meat atiende en Belén de Escobar, Puertos del Lago, Ingeniero Maschwitz y barrios de alrededor.</p>
    
    <h3>Zonas de Cobertura</h3>
    <div class="zonas-cobertura">
        <h4>Zonas Principales:</h4>
        <ul style="margin-left: 20px;">
            <li>✓ Belén de Escobar</li>
            <li>✓ Puertos del Lago</li>
            <li>✓ Ingeniero Maschwitz</li>
        </ul>
        
        <h4>Barrios y Urbanizaciones:</h4>
        <ul style="margin-left: 20px;">
            <li>✓ San Matías</li>
            <li>✓ El Cantón</li>
            <li>✓ El Naudí</li>
            <li>✓ El Cazador</li>
            <li>✓ Araucarias</li>
            <li>✓ Acacias</li>
            <li>✓ Vistas</li>
            <li>✓ Riberas</li>
            <li>✓ Muelles</li>
            <li>✓ Nativas</li>
            <li>✓ Orillas</li>
            <li>✓ Ceibos</li>
            <li>✓ Marinas</li>
            <li>✓ Amarras</li>
        </ul>
    </div>
    
    <p style="margin-top: 20px;"><strong>¿Tu barrio no está listado? ¡Contactanos igual!</strong></p>
    
    <p style="font-size: 1.1em; margin-top: 15px;">
        <strong>📱 WhatsApp: <a href="tel:+5493484568338">+54 9 3484-568338</a></strong>
    </p>
</section>
```

---

## ✏️ CAMBIO 11: FOOTER (OPCIONAL PERO RECOMENDADO)

**Ubicación:** Línea ~455 (al final del documento)

```html
<!-- ❌ ACTUAL -->
<footer>
    <p>&copy; Design by Mauricio Belforte || Copyright ©2025 todos los derechos reservados</p>
</footer>

<!-- ✅ CAMBIAR A ESTA -->
<footer>
    <div style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 15px;">
        <p style="margin: 5px 0;"><strong>Puertos Prime Meat</strong> - Carne Premium Cuota 481</p>
        <p style="margin: 5px 0;">📍 Escobar, Buenos Aires (Puertos del Lago, Belén de Escobar, Maschwitz y alrededores)</p>
        <p style="margin: 5px 0;">📱 +54 9 3484-568338</p>
        <p style="margin: 5px 0;">🌐 www.puertosprimemeat.ar</p>
    </div>
    <p>&copy; Design by Mauricio Belforte || Copyright ©2025 todos los derechos reservados</p>
</footer>
```

---

## 📋 RESUMEN DE CAMBIOS

| # | Elemento | Línea Aprox. | Prioridad |
|---|----------|-------------|-----------|
| 1 | Title | ~57 | 🔴 CRÍTICO |
| 2 | Meta Description | ~17-19 | 🔴 CRÍTICO |
| 3 | Meta Keywords | ~20-22 | 🟡 IMPORTANTE |
| 4 | OG Title | ~24-25 | 🟡 IMPORTANTE |
| 5 | OG Description | ~26-28 | 🟡 IMPORTANTE |
| 6 | Schema.org | ~50-60 | 🔴 CRÍTICO |
| 7 | H1 Principal | ~97 | 🟡 IMPORTANTE |
| 8 | Sobre Nosotros | ~131-145 | 🟡 IMPORTANTE |
| 9 | H2 Productos | ~157 | 🟢 RECOMENDADO |
| 10 | Sección Contacto | ~430-434 | 🔴 CRÍTICO |
| 11 | Footer | ~455 | 🟢 RECOMENDADO |

---

## ⏱️ TIEMPO DE IMPLEMENTACIÓN

- **Cambios 1-6 (meta tags):** 10 minutos
- **Cambios 7-8 (textos):** 10 minutos
- **Cambio 10 (Contacto):** 15 minutos
- **Cambios 9, 11 (opcionales):** 5 minutos

**Total:** ~40 minutos

---

## 🔍 CÓMO BUSCAR LAS LÍNEAS

En VS Code, usa `Ctrl+F` (o `Cmd+F` en Mac):

1. Busca: `<title>Puertos Prime Meat`
2. Busca: `<meta name="description"`
3. Busca: `"areaServed"`
4. etc.

---

## ✅ VERIFICACIÓN FINAL

Después de hacer los cambios:

- [ ] Abre el archivo en navegador (F5 para refrescar)
- [ ] La página se ve bien (no debe romper nada)
- [ ] Usa Google Inspect (F12) para verificar meta tags:
  - Abre Devtools
  - Busca `<title>` (debe tener "Escobar")
  - Busca `<meta name="description"` (debe tener ubicaciones)
  - Busca `areaServed` (debe ser un array con todas las zonas)

---

## 🎯 NEXT STEPS

1. ✅ Implementa estos cambios en `index.html`
2. ✅ Haz commit en Git
3. ✅ Despliega a producción
4. ✅ Espera 24-48 horas para que Google reindex
5. ✅ Chequea en Google Search Console
6. ✅ Registrate en Google My Business

