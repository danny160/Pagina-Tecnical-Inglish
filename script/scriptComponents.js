// Funcionalidad para el menú hamburguesa y modales
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input")
  const componentItems = document.querySelectorAll(".component-item")
  const rows = document.querySelectorAll(".components-grid .row")

  // Función para filtrar y reorganizar componentes según la búsqueda
  function filterComponents(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim()

    // Si no hay término de búsqueda, mostrar todos los componentes
    if (searchTerm === "") {
      // Restaurar la estructura original
      rows[0].innerHTML = ""
      rows[1].innerHTML = ""

      // Distribuir los componentes en las filas originales (4 en cada fila)
      componentItems.forEach((item, index) => {
        if (index < 4) {
          rows[0].appendChild(item)
        } else {
          rows[1].appendChild(item)
        }
        item.style.display = "flex" // Asegurar que todos sean visibles
      })
      return
    }

    // Filtrar componentes según coincidencia
    const matchedComponents = []

    componentItems.forEach((item) => {
      const componentText = item.querySelector("p").textContent.toLowerCase()
      if (componentText.includes(searchTerm)) {
        matchedComponents.push(item)
        item.style.display = "flex" // Mostrar componentes que coinciden
      } else {
        item.style.display = "none" // Ocultar componentes que no coinciden
      }
    })

    // Reorganizar solo los componentes coincidentes
    rows[0].innerHTML = ""
    rows[1].innerHTML = ""

    // Distribuir solo los componentes coincidentes
    matchedComponents.forEach((item, index) => {
      if (index < 4) {
        rows[0].appendChild(item)
      } else {
        rows[1].appendChild(item)
      }
    })
  }

  // Evento para capturar la entrada en la barra de búsqueda
  searchInput.addEventListener("input", function () {
    filterComponents(this.value)
  })

  // Inicializar placeholder
  searchInput.placeholder = "Search components..."

  const menuToggle = document.getElementById("menuToggle")
  const sideMenu = document.getElementById("sideMenu")
  const mainContent = document.getElementById("mainContent")
  const menuItems = document.querySelectorAll(".menu-items li")
  const modalOverlay = document.getElementById("modal-overlay")

  // Función para reiniciar las animaciones del menú
  function resetMenuAnimations() {
    sideMenu.classList.remove("active")
    mainContent.style.width = "100%"
    mainContent.style.marginRight = "0"
  }

  // Función para abrir el menú
  function openMenu() {
    sideMenu.classList.add("active")
    mainContent.style.width = "calc(100% - 210px)"
    mainContent.style.marginRight = "210px"
  }

  // Manejador de eventos para el botón de menú
  menuToggle.addEventListener("click", () => {
    if (sideMenu.classList.contains("active")) {
      resetMenuAnimations()
    } else {
      openMenu()
    }
  })

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = sideMenu.contains(event.target)
    const isClickOnToggle = menuToggle.contains(event.target)

    if (!isClickInsideMenu && !isClickOnToggle && sideMenu.classList.contains("active")) {
      resetMenuAnimations()
    }
  })

  // IMPORTANTE: Cerrar modal al hacer clic en el overlay
  // Este es el evento que cierra el modal cuando haces clic fuera de él
  modalOverlay.addEventListener("click", (event) => {
    // Asegurarse de que el clic fue directamente en el overlay y no en un elemento hijo
    if (event.target === modalOverlay) {
      const activeModal = document.querySelector(".component-modal.active")
      if (activeModal) {
        closeModal(activeModal.id)
      }
    }
  })

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal = document.querySelector(".component-modal.active")
      if (activeModal) {
        closeModal(activeModal.id)
      }
    }
  })

  // IMPORTANTE: Añadir evento de clic directamente al documento
  // Este es un enfoque alternativo que puede funcionar mejor
  document.addEventListener("click", closeModalOnClickOutside)
})

// Función para manejar el cierre del modal al hacer clic fuera
function closeModalOnClickOutside(event) {
  const activeModal = document.querySelector(".component-modal.active")
  if (!activeModal) return

  const modalContent = activeModal.querySelector(".modal-content")

  // Si el clic fue fuera del contenido del modal, cerrarlo
  if (activeModal.contains(event.target) && !modalContent.contains(event.target)) {
    closeModal(activeModal.id)
  }
}

// Función para abrir un modal con animación simple
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  const overlay = document.getElementById("modal-overlay")

  // Mostrar el overlay
  overlay.style.display = "block"
  setTimeout(() => {
    overlay.style.opacity = "1"
  }, 10)

  // Mostrar el modal con animación
  modal.style.display = "flex"
  setTimeout(() => {
    modal.classList.add("active")
  }, 10)

  // Bloquear el scroll del body
  document.body.style.overflow = "hidden"
}

// Función para cerrar un modal con animación simple
function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  const overlay = document.getElementById("modal-overlay")

  // Añadir clase para animación de cierre
  modal.classList.add("closing")
  modal.classList.remove("active")

  // Ocultar el overlay con animación
  overlay.style.opacity = "0"

  // Esperar a que termine la animación
  setTimeout(() => {
    modal.style.display = "none"
    overlay.style.display = "none"
    modal.classList.remove("closing")

    // Restaurar el scroll del body
    document.body.style.overflow = "auto"
  }, 500)
}
