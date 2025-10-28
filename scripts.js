// Este archivo contiene el código JavaScript para la página de aterrizaje. Se encarga de la interactividad, como manejar eventos y manipular el DOM.

document.addEventListener('DOMContentLoaded', function () {
    // Carrusel de imágenes
    const imagenes = document.querySelectorAll('.carrusel-imagen img');
    const btnAnterior = document.querySelector('.carrusel-anterior');
    const btnSiguiente = document.querySelector('.carrusel-siguiente');
    let indiceActual = 0;

    function mostrarImagen(indice) {
        imagenes.forEach((img, i) => {
            img.style.display = (i === indice) ? 'block' : 'none';
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
    const button = document.getElementById('cta-button');
    if (button) {
        button.addEventListener('click', function () {
            alert('¡Gracias por tu interés!');
        });
    }

    // Barra de navegación sticky al hacer scroll
    const barraNav = document.querySelector('.barra-navegacion');
    const mainContent = document.querySelector('main');
    const navOffset = barraNav.offsetTop;
    const navHeight = barraNav.offsetHeight;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= navOffset) {
            barraNav.classList.add('barra-fija');
            /*   mainContent.style.paddingTop = `${navHeight}px`; */
        } else {
            barraNav.classList.remove('barra-fija');
            /*   mainContent.style.paddingTop = '0'; */
        }
    });
});