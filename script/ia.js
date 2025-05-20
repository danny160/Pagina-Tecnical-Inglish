// Chat Box Component - Componente reutilizable de chat
;(() => {
  // Crear el HTML del chat box
  function createChatBoxHTML() {
    return `
        <button id="chat-toggle-btn" aria-label="Open chat"><img src="../csr/Img/chat_bot_icon.png" style="display: flex; width: 30px; filter: brightness(0) invert(1);" alt=""></button>

        <div id="chat-container" role="main" aria-label="Computer Parts Chatbot">
            <div id="header-chat">
                <button id="close-chat-btn" aria-label="Close chat" title="Close chat">×</button>
                DEEP TECH IA
                <button id="theme-toggle" aria-label="Toggle dark/light mode" title="Toggle dark/light mode"><img src="../csr/Img/luna_noche.png" style="display:flex; width: 20px;" alt=""></button>
            </div>
            <div id="messages" aria-live="polite" aria-relevant="additions"></div>
            <form id="input-form">
                <input type="text" id="user-input" autocomplete="off" placeholder="Ask about computer parts in English..."
                    aria-label="Type your message here" required />
                <button type="submit" id="send-btn" aria-label="Send message">Send</button>
            </form>
        </div>
        `
  }

  // Crear el CSS del chat box
  function createChatBoxCSS() {
    return `
        #chat-container {
            width: 90vw;
            max-width: 600px;
            height: 80vh;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 16px 30px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            transform: translateY(120%);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1001;
        }

        #chat-container.dark {
            background: #0a2e38;
        }

        #chat-container.visible {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        #header-chat {
            background: #3a0a2e;
            color: #fff;
            padding: 1rem 1.5rem;
            font-weight: 700;
            font-size: 1.25rem;
            text-align: center;
            position: relative;
            user-select: none;
        }

        #theme-toggle {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            background: #fff;
            border: none;
            border-radius: 50%;
            padding: 0.5rem;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 1.1rem;
            line-height: 1;
        }

        #close-chat-btn {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 1rem;
            left: 1.5rem;
            background: rgba(255 255 255 / 0.8);
            border: none;
            border-radius: 100%;
            padding: 0.5rem 0.55rem 0.25rem 0.55rem;
            cursor: pointer;
            font-size: 1.25rem;
            line-height: 1;
            color: #3a0a2e;
            transition: background-color 0.3s;
        }

        #close-chat-btn:hover {
            background: rgba(255 255 255 / 1);
        }

        #close-chat-btn.dark {
            background: rgba(255 255 255 / 0.1);
            color: #bbb;
        }

        #close-chat-btn.dark:hover {
            background: rgba(255 255 255 / 0.3);
        }

        /* area de mensajes */
        #messages {
            flex-grow: 1;
            padding: 1rem 1.5rem;
            overflow-y: auto;
            background: #f7f9fc;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            transition: background-color 0.3s;
            user-select: text;
        }

        #messages.dark {
            background: #0a2e38;
        }

        /* mensajes individuales */
        .message {
            max-width: 75%;
            padding: 0.75rem 1rem;
            border-radius: 16px;
            line-height: 1.4;
            font-size: 1rem;
            word-wrap: break-word;
            white-space: pre-wrap;
            opacity: 0;
            transform: translateY(20px);
            animation: slideInUp 0.3s ease forwards;
        }

        @keyframes slideInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* mensajes del usuario */
        .message.user {
            background: #3a0a2e;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            animation-delay: 0.05s;
        }

        /* mensajes de bot */
        .message.bot {
            background: #e1e7f7;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            animation-delay: 0.05s;
        }

        /* escribir mensajes */
        #input-form {
            display: flex;
            border-top: 1px solid #ddd;
            padding: 0.75rem 1rem;
            background: #fff;
            transition: background-color 0.3s;
        }

        #input-form.dark {
            background: #0a2e38;
        }

        #input-form input[type="text"] {
            flex-grow: 1;
            font-size: 1rem;
            padding: 0.5rem 1rem;
            border: 1.8px solid #3a0a2e;
            border-radius: 24px;
            outline: none;
            transition: border-color 0.2s ease-in-out;
        }

        #input-form input[type="text"]:focus {
            border-color: #3a0a2e;
        }

        #input-form button {
            background: #3a0a2e;
            color: white;
            border: none;
            margin-left: 0.75rem;
            padding: 0 1.5rem;
            border-radius: 24px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.25s ease-in-out;
        }

        #input-form button:hover:not(:disabled) {
            background: #3a0a2e;
        }

        #input-form button:disabled {
            background: #a7c3f8;
            cursor: not-allowed;
        }

        /* barra de scroll */
        #messages::-webkit-scrollbar {
            width: 8px;
        }

        #messages::-webkit-scrollbar-track {
            background: #f7f9fc;
        }

        #messages::-webkit-scrollbar-thumb {
            background-color: #3a0a2e;
            border-radius: 20px;
        }

        /* barra de scroll en modo oscuro */
        body.dark #messages::-webkit-scrollbar-track {
            background: #3a3a3a;
        }

        body.dark #messages::-webkit-scrollbar-thumb {
            background-color: #3a0a2e;
        }

        /* boton flotante del chat */
        #chat-toggle-btn {
            position: fixed;
            bottom: 1.5rem;
            left: 1.5rem;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #3a0a2e;
            border: none;
            box-shadow: 0 4px 10px rgba(47, 128, 237, 0.6);
            cursor: pointer;
            color: white;
            font-size: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1100;
            transition: background-color 0.3s, box-shadow 0.3s;
        }

        #chat-toggle-btn:hover {
            background: rgb(90, 0, 68);
            box-shadow: 0 6px 20px rgba(20, 93, 191, 0.8);
        }

        #chat-toggle-btn:focus {
            outline: 2px solid #3a0a2e;
            outline-offset: 2px;
        }
        `
  }

  // Inyectar el HTML y CSS en la página
  function injectChatBox() {
    // Crear un div para el chat box
    const chatBoxDiv = document.createElement("div")
    chatBoxDiv.id = "deep-tech-chat-box"
    chatBoxDiv.innerHTML = createChatBoxHTML()
    document.body.appendChild(chatBoxDiv)

    // Crear un estilo para el chat box
    const style = document.createElement("style")
    style.textContent = createChatBoxCSS()
    document.head.appendChild(style)
  }

  // Inicializar la funcionalidad del chat box
  function initChatBox() {
    const messagesEl = document.getElementById("messages")
    const inputForm = document.getElementById("input-form")
    const inputField = document.getElementById("user-input")
    const sendBtn = document.getElementById("send-btn")
    const themeToggle = document.getElementById("theme-toggle")
    const chatContainer = document.getElementById("chat-container")
    const body = document.body
    const chatToggleBtn = document.getElementById("chat-toggle-btn")
    const closeChatBtn = document.getElementById("close-chat-btn")

    // Iniciar en modo oscuro por defecto
    body.classList.add("dark")
    chatContainer.classList.add("dark")
    messagesEl.classList.add("dark")
    inputForm.classList.add("dark")
    closeChatBtn.classList.add("dark")
    themeToggle.innerHTML = '<img src="../csr/Img/sol_dia.png" style="display:flex; width: 20px;" alt="">'

    const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
    const OPENROUTER_API_KEY = "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"

    // pront incial del sistema
    const systemPrompt = {
      role: "system",
      content:
        "Act as an information searcher about computer parts, only answer questions specifically about this topic; if you don't know the answer, respond 'I don't know'; all answers and questions must be strictly in English, if received in Spanish respond that you only answer questions in English.",
    }

    const messageHistory = [systemPrompt]

    function appendMessage(content, sender) {
      const messageDiv = document.createElement("div")
      messageDiv.classList.add("message", sender)
      messageDiv.textContent = content
      messagesEl.appendChild(messageDiv)
      messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: "smooth" })
    }

    function setInputDisabled(disabled) {
      inputField.disabled = disabled
      sendBtn.disabled = disabled
    }

    // detectar mensajes en español
    function containsSpanish(text) {
      const spanishRegex =
        /[áéíóúñ¡¿ÁÉÍÓÚÑ]|(\b(hola|qué|qué tal|cómo|dónde|cuándo|por qué|gracias|mañana|adiós|sí|no|entonces|porque|tú|usted|ustedes|vosotros|vosotras)\b)/i
      return spanishRegex.test(text)
    }

    // quitar botones temporalmente mientras se procesa la respuesta
    function openChat() {
      chatContainer.classList.add("visible")
      chatToggleBtn.style.display = "none"
      inputField.focus()
    }

    // boton de cerrar el chat
    function closeChat() {
      chatContainer.classList.remove("visible")
      chatToggleBtn.style.display = "flex"
      chatToggleBtn.focus()
    }

    // eventos para abrir y cerrar el chat
    chatToggleBtn.addEventListener("click", openChat)
    closeChatBtn.addEventListener("click", closeChat)

    // cerrar el chat con el boton de escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (chatContainer.classList.contains("visible")) {
          closeChat()
        }
      }
    })

    // Cerrar el chat al hacer clic fuera de él
    document.addEventListener("click", (e) => {
      // Verificar si el chat está visible
      if (chatContainer.classList.contains("visible")) {
        // Verificar si el clic fue dentro del chat o en el botón de toggle
        const isClickInsideChat = chatContainer.contains(e.target)
        const isClickOnToggleBtn = chatToggleBtn.contains(e.target)

        // Si el clic fue fuera del chat y no fue en el botón de toggle, cerrar el chat
        if (!isClickInsideChat && !isClickOnToggleBtn) {
          closeChat()
        }
      }
    })

    // intercambiar entre el tema claro y oscuro
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("light")) {
        body.classList.remove("light")
        body.classList.add("dark")
        chatContainer.classList.add("dark")
        messagesEl.classList.add("dark")
        inputForm.classList.add("dark")
        themeToggle.innerHTML = '<img src="../csr/Img/sol_dia.png" style="display:flex; width: 20px;" alt="">' // Cambia el icono por una imagen personalizada
        closeChatBtn.classList.add("dark")
      } else {
        body.classList.remove("dark")
        body.classList.add("light")
        chatContainer.classList.remove("dark")
        messagesEl.classList.remove("dark")
        inputForm.classList.remove("dark")
        themeToggle.innerHTML = '<img src="../csr/Img/luna_noche.png" style="display:flex; width: 20px;" alt="">' // Cambia el icono por una imagen personalizada
        closeChatBtn.classList.remove("dark")
      }
    })

    // Process form submission
    inputForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const userInput = inputField.value.trim()
      if (!userInput) return

      appendMessage(userInput, "user")
      inputField.value = ""
      setInputDisabled(true)

      if (containsSpanish(userInput)) {
        appendMessage("I only answer questions in English.", "bot")
        setInputDisabled(false)
        return
      }

      messageHistory.push({ role: "user", content: userInput })

      try {
        const response = await fetch(OPENROUTER_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
            "X-Title": "<YOUR_SITE_NAME>", // Optional
          },
          body: JSON.stringify({
            model: "qwen/qwen3-235b-a22b",
            messages: messageHistory,
          }),
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        const botMessage =
          data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
            ? data.choices[0].message.content.trim()
            : "I don't know"

        messageHistory.push({ role: "assistant", content: botMessage })

        appendMessage(botMessage, "bot")
      } catch (error) {
        appendMessage("Sorry, there was an error connecting to the AI API.", "bot")
        console.error("Error fetching from OpenRouter API:", error)
      }

      setInputDisabled(false)
    })

    // Cargar el mensaje del sistema al inicio
    window.addEventListener("DOMContentLoaded", () => {
      appendMessage(systemPrompt.content, "bot")
    })
  }

  // Inyectar el chat box cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    injectChatBox()
    initChatBox()
  })
})()
