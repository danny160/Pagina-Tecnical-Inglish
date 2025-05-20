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
    const menuItems = document.querySelectorAll('.menu-items li');
    
    // Función para reiniciar las animaciones del menú
    function resetMenuAnimations() {
        // Primero quitamos la clase active para ocultar el menú
        sideMenu.classList.remove('active');
        
        // Esperamos a que termine la transición de cierre
        setTimeout(() => {
            // Reiniciamos el estado de cada elemento del menú
            menuItems.forEach(item => {
                // Reseteamos la opacidad y posición para que la animación se ejecute de nuevo
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                
                // Eliminamos cualquier animación anterior
                item.style.animation = 'none';
                
                // Forzamos un reflow para que los cambios surtan efecto inmediatamente
                void item.offsetWidth;
                
                // Eliminamos el estilo inline para que las reglas CSS tomen efecto de nuevo
                item.style.animation = '';
            });
        }, 300); // 300ms es la duración de la transición del menú
    }
    
    // Función para abrir el menú
    function openMenu() {
        sideMenu.classList.add('active');
    }
    
    // Manejador de eventos para el botón de menú
    menuToggle.addEventListener('click', function() {
        if (sideMenu.classList.contains('active')) {
            // Si el menú está abierto, lo cerramos y reiniciamos las animaciones
            resetMenuAnimations();
        } else {
            // Si el menú está cerrado, lo abrimos
            openMenu();
        }
    });
    
    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && sideMenu.classList.contains('active')) {
            // Si el clic fue fuera del menú y del botón, y el menú está abierto, lo cerramos
            resetMenuAnimations();
        }
    });
    
    // Añadir efecto de rebote al final de la animación para cada elemento del menú
    menuItems.forEach(item => {
        item.addEventListener('animationend', function(e) {
            // Solo aplicamos el rebote cuando termina la animación de entrada
            if (e.animationName === 'fadeInItems') {
                // Aplicamos un pequeño rebote
                this.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-5px)' },
                    { transform: 'translateX(3px)' },
                    { transform: 'translateX(-2px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 400,
                    easing: 'ease-out'
                });
            }
        });
    });
});


