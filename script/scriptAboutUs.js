// Funcionalidad para el menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const mainContent = document.getElementById('mainContent');
    const menuItems = document.querySelectorAll('.menu-items li');
    
    // Función para reiniciar las animaciones del menú
    function resetMenuAnimations() {
        // Primero quitamos la clase active para ocultar el menú
        sideMenu.classList.remove('active');
        
        // Ajustamos el contenido principal
        mainContent.style.width = '100%';
        mainContent.style.marginRight = '0';
        
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
        
        // Ajustamos el contenido principal
        mainContent.style.width = 'calc(100% - 210px)';
        mainContent.style.marginRight = '210px';
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
    
    // Reiniciar animaciones cuando se recarga la página
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Si la página se carga desde la caché (al volver atrás)
            // Reiniciamos las animaciones
            const animateElements = document.querySelectorAll('.animate-element');
            animateElements.forEach(element => {
                element.style.animation = 'none';
                void element.offsetWidth;
                element.style.animation = '';
            });
        }
    });
});