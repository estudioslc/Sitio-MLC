// Menú móvil
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Formulario de contacto -> arma un mensaje y lo envía por WhatsApp
const WHATSAPP_NUMBER = '5493517872515'; // +54 9 351 787-2515

const form = document.getElementById('contact-form');
const fallbackMessage = document.getElementById('form-fallback-message');
const submitButton = document.getElementById('submit-contact-btn');
const privacyCheckbox = form ? form.querySelector('input[name="privacy"]') : null;

if (form && submitButton && privacyCheckbox) {
  const toggleSubmitState = () => {
    submitButton.disabled = !privacyCheckbox.checked;
  };

  toggleSubmitState();
  privacyCheckbox.addEventListener('change', toggleSubmitState);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!privacyCheckbox.checked) {
      return;
    }

    const nombre = form.nombre.value.trim();
    const contacto = form.contacto.value.trim();
    const mensaje = form.mensaje.value.trim();

    const texto =
      `Hola Miguel, te escribo desde tu sitio web.\n\n` +
      `Nombre: ${nombre}\n` +
      `Contacto: ${contacto}\n` +
      `Situación: ${mensaje}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    const popup = window.open(url, '_blank', 'noopener');

    if (!popup && fallbackMessage) {
      fallbackMessage.classList.add('is-visible');
    }
  });
}
