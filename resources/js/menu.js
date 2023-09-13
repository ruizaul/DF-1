// Obtenemos una referencia al botón de menú móvil y a la navegación
const mobileMenuButton = document.getElementById("mobile-menu-button");
const navigation = document.querySelector("nav");

// Obtenemos todas las etiquetas 'a' dentro de la navegación
const navLinks = navigation.querySelectorAll("a");

// Función para manejar cambios en el tamaño de la ventana
function handleWindowResize() {
  const windowWidth = window.innerWidth;

  if (windowWidth > 768) {
    // Si la pantalla es mayor que 768px, ocultamos el menú móvil
    hideMobileMenu();

    // Además, eliminamos las clases show-menu y show-link
    navigation.classList.remove("show-menu");
    navLinks.forEach((link) => {
      link.classList.remove("show-link");
    });
  }
}

// Función para ocultar el menú móvil
function hideMobileMenu() {
  navigation.classList.remove("show-menu"); // Removemos la clase "show-menu"

  // Iteramos a través de todos los enlaces 'a' y removemos la clase "show-link"
  navLinks.forEach((link) => {
    link.classList.remove("show-link");
  });

  // Removemos el controlador de eventos de clic en el documento
  document.removeEventListener("click", checkClickOutside);
}

// Función para verificar si se hizo clic fuera del menú
function checkClickOutside(event) {
  if (
    !navigation.contains(event.target) &&
    !mobileMenuButton.contains(event.target)
  ) {
    // Si el clic ocurrió fuera del menú y del botón de menú móvil, ocultamos el menú móvil
    hideMobileMenu();
  }
}

// Agregamos un controlador de eventos para el clic en el botón de menú móvil
mobileMenuButton.addEventListener("click", function (event) {
  event.stopPropagation(); // Evitamos que el clic llegue al documento
  navigation.classList.toggle("show-menu"); // Alternamos la clase "show-menu"

  // Iteramos a través de todos los enlaces 'a' y alternamos su visibilidad
  navLinks.forEach((link) => {
    link.classList.toggle("show-link");
  });

  // Agregamos un controlador de eventos de clic en el documento para detectar clics fuera del menú
  document.addEventListener("click", checkClickOutside);
});

// Agregamos un controlador de eventos de clic a los enlaces show-link para cerrar el menú
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hideMobileMenu(); // Cierra el menú al hacer clic en un enlace show-link
  });
});

// Agregamos un controlador de eventos para el cambio en el tamaño de pantalla
window.addEventListener("resize", handleWindowResize);

// Llamamos a la función handleWindowResize inicialmente para manejar el estado inicial de la pantalla
handleWindowResize();
