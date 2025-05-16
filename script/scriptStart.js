// Función para la animación de escritura del texto WELCOME
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.getElementById("welcomeText").innerHTML = text.substring(0, i+1) + '<span class="cursor"></span>';
        
        // Velocidad aleatoria para que parezca más natural
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, Math.random() * 100 + 50);
    } else if (typeof fnCallback == 'function') {
        // Espera un poco antes de iniciar el borrado
        setTimeout(fnCallback, 5000);
    }
}

// Función para borrar el texto
function eraseText(text, i, fnCallback) {
    if (i >= 0) {
        document.getElementById("welcomeText").innerHTML = text.substring(0, i) + '<span class="cursor"></span>';
        
        setTimeout(function() {
            eraseText(text, i - 1, fnCallback)
        }, Math.random() * 50 + 30);
    } else if (typeof fnCallback == 'function') {
        // Espera un poco antes de iniciar la escritura de nuevo
        setTimeout(fnCallback, 1000);
    }
}

// Función para iniciar el ciclo de escritura-borrado
function startTextAnimation() {
    const text = "WELCOME..";
    
    // Inicia la escritura
    typeWriter(text, 0, function() {
        // Cuando termina de escribir, inicia el borrado
        eraseText(text, text.length, function() {
            // Cuando termina de borrar, inicia la escritura de nuevo
            startTextAnimation();
        });
    });
}

// Iniciar la animación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    startTextAnimation();
    
    // Funcionalidad para el menú hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.toggle('active');
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && sideMenu.classList.contains('active')) {
            sideMenu.classList.remove('active');
        }
    });
});