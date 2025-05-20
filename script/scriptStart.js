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



// implementacion del chat bot --------------------------------------------------------------------------------------------------------------------------------------

const messagesEl = document.getElementById('messages');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const themeToggle = document.getElementById('theme-toggle');
const chatContainer = document.getElementById('chat-container');
const body = document.body;
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const closeChatBtn = document.getElementById('close-chat-btn');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = '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';

// pront incial del sistema
const systemPrompt = {
    "role": "system",
    "content": "Act as an information searcher about computer parts, only answer questions specifically about this topic; if you don't know the answer, respond 'I don't know'; all answers and questions must be strictly in English, if received in Spanish respond that you only answer questions in English."
};


let messageHistory = [systemPrompt];

function appendMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = content;
    messagesEl.appendChild(messageDiv);
    messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
}

function setInputDisabled(disabled) {
    inputField.disabled = disabled;
    sendBtn.disabled = disabled;
}

// detectar mensajes en español
function containsSpanish(text) {
    const spanishRegex = /[áéíóúñ¡¿ÁÉÍÓÚÑ]|(\b(hola|qué|qué tal|cómo|dónde|cuándo|por qué|gracias|mañana|adiós|sí|no|entonces|porque|tú|usted|ustedes|vosotros|vosotras)\b)/i;
    return spanishRegex.test(text);
}

// quitar botones temporalmente mientras se procesa la respuesta
function openChat() {
    chatContainer.classList.add('visible');
    chatToggleBtn.style.display = 'none';
    inputField.focus();
}

// boton de cerrar el chat
function closeChat() {
    chatContainer.classList.remove('visible');
    chatToggleBtn.style.display = 'flex';
    chatToggleBtn.focus();
}

// eventos para abrir y cerrar el chat
chatToggleBtn.addEventListener('click', openChat);
closeChatBtn.addEventListener('click', closeChat);

// cerrar el chat con el boton de escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (chatContainer.classList.contains('visible')) {
            closeChat();
        }
    }
});



// intercambiar entre el tema claro y oscuro
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        chatContainer.classList.add('dark');
        messagesEl.classList.add('dark');
        inputForm.classList.add('dark');
        themeToggle.innerHTML = '<img src="/Pagina-Tecnical-Inglish/csr/Img/sol_dia.png" style="display:flex; width: 20px;" alt="">'; // Cambia el icono por una imagen personalizada
        closeChatBtn.classList.add('dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        chatContainer.classList.remove('dark');
        messagesEl.classList.remove('dark');
        inputForm.classList.remove('dark');
        themeToggle.innerHTML = '<img src="/Pagina-Tecnical-Inglish/csr/Img/luna_noche.png" style="display:flex; width: 20px;" alt="">'; // Cambia el icono por una imagen personalizada
        closeChatBtn.classList.remove('dark');
    }
});

// Process form submission
inputForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let userInput = inputField.value.trim();
    if (!userInput) return;

    appendMessage(userInput, 'user');
    inputField.value = '';
    setInputDisabled(true);

    if (containsSpanish(userInput)) {
        appendMessage("I only answer questions in English.", 'bot');
        setInputDisabled(false);
        return;
    }

    messageHistory.push({ role: 'user', content: userInput });

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
                "X-Title": "<YOUR_SITE_NAME>" // Optional
            },
            body: JSON.stringify({
                model: "qwen/qwen3-235b-a22b",
                messages: messageHistory
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const botMessage = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
            ? data.choices[0].message.content.trim()
            : 'I don\'t know';

        messageHistory.push({ role: 'assistant', content: botMessage });

        appendMessage(botMessage, 'bot');
    } catch (error) {
        appendMessage("Sorry, there was an error connecting to the AI API.", 'bot');
        console.error('Error fetching from OpenRouter API:', error);
    }

    setInputDisabled(false);
});

// Cargar el mensaje del sistema al inicio
window.addEventListener('DOMContentLoaded', () => {
    appendMessage(systemPrompt.content, 'bot');
});