// Este archivo contiene el código JavaScript para la página de aterrizaje. Se encarga de la interactividad, como manejar eventos y manipular el DOM.

document.addEventListener('DOMContentLoaded', function () {
    // Carrusel de imágenes
    const imagenes = document.querySelectorAll('.carrusel-imagen img');
    const btnAnterior = document.querySelector('.carrusel-anterior');
    const btnSiguiente = document.querySelector('.carrusel-siguiente');
    let indiceActual = 0;

    function mostrarImagen(indiceAMostrar) {
        imagenes.forEach((imagen, indice) => {
            imagen.style.display = (indice === indiceAMostrar) ? 'block' : 'none';
        });
    }

    if (imagenes.length > 0) {
        mostrarImagen(indiceActual);

        btnAnterior.addEventListener('click', function () {
            indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
            mostrarImagen(indiceActual);
        });

        btnSiguiente.addEventListener('click', function () {
            indiceActual = (indiceActual + 1) % imagenes.length;
            mostrarImagen(indiceActual);
        });
    }

    // Ejemplo de otro botón (puedes eliminar si no lo usas)
    const botonCta = document.getElementById('cta-button');
    if (botonCta) {
        botonCta.addEventListener('click', function () {
            alert('¡Gracias por tu interés!');
        });
    }

    // Barra de navegación sticky al hacer scroll
    const barraNav = document.querySelector('.barra-navegacion');
    if (barraNav) {
        const posicionBarraNav = barraNav.offsetTop;
        window.addEventListener('scroll', function () {
            if (window.pageYOffset >= posicionBarraNav) {
                barraNav.classList.add('barra-fija');
            } else {
                barraNav.classList.remove('barra-fija');
            }
        });
    }


    // --- ANIMACIÓN UNIVERSAL EN SCROLL ---
    // Este código busca cualquier elemento con la clase "revelar" y lo hace aparecer cuando entra en pantalla
    const elementosParaRevelar = document.querySelectorAll('.revelar');

    const observadorUniversal = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada, indice) => {
            if (entrada.isIntersecting) {
                // Le damos un pequeño retraso basado en el orden para que la aparición sea escalonada y premium
                // Pero solo si están cerca uno del otro (como las tarjetas)
                setTimeout(() => {
                    entrada.target.classList.add('is-visible');
                }, 200); // 200ms de base para que sea lento y elegante

                // Una vez que ya se mostró, dejamos de observarlo para ahorrar batería/recursos
                observadorUniversal.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1, // Se activa apenas asoma un 10% del elemento
        rootMargin: "0px 0px -50px 0px" // Se activa un poquito antes de llegar para que sea fluido
    });

    elementosParaRevelar.forEach(el => observadorUniversal.observe(el));

    // Animación de desvanecimiento para el texto adornado al hacer scroll
    /*    const textoAdornado = document.querySelector('.texto-adornado');
       if (textoAdornado) {
           const handleScrollFade = () => {
               // Si el usuario ha hecho un poco de scroll (más de 300px), oculta el texto
               if (window.scrollY > 300) {
                   textoAdornado.classList.add('fade-out');
                   // Para optimizar, eliminamos el listener una vez que la clase ha sido añadida
                   window.removeEventListener('scroll', handleScrollFade);
               }
           };
   
           window.addEventListener('scroll', handleScrollFade);
       } */
});
