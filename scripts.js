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


    // Animación de aparición en scroll para la sección de presentación
    const seccionPresentacion = document.querySelector('.seccion-presentacion');
    if (seccionPresentacion) {
        const observador = new IntersectionObserver((entradas, observadorDeEntradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    const elementosParaAnimar = [
                        entrada.target.querySelector('h2'),
                        ...entrada.target.querySelectorAll('p')
                    ];

                    elementosParaAnimar.forEach((elemento, indice) => {
                        if (elemento) {
                            setTimeout(() => {
                                elemento.classList.add('is-visible');
                            }, indice * 1000); // 400ms de retraso entre elementos
                        }
                    });

                    observadorDeEntradas.unobserve(entrada.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.5 // Inicia la animación cuando el 20% de la sección es visible
        });

        observador.observe(seccionPresentacion);
    }
});

