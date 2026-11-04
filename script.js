document.documentElement.classList.remove('no-js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Aparición al hacer scroll, revelado del retrato y contador de años.
// El retrato arranca recortado al 100% y el navegador no lo detecta como visible:
// por eso se observa su contenedor (#about-aside) y al entrar se le agrega .in a la foto.
const photo = document.getElementById('photo');
const stampNum = document.getElementById('stamp-num');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('in');
    revealObserver.unobserve(el);

    if (el.id === 'about-aside' && photo) photo.classList.add('in');
    if (el.id === 'stamp-card' && stampNum && !reduceMotion) {
      const target = Number(stampNum.textContent) || 10;
      let n = 0;
      const timer = setInterval(() => {
        stampNum.textContent = ++n;
        if (n >= target) clearInterval(timer);
      }, 70);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 70}ms`;
  revealObserver.observe(el);
});
const aboutAside = document.getElementById('about-aside');
if (aboutAside) revealObserver.observe(aboutAside);

// Paralaje: el fondo del hero y el retrato se mueven más lento que la página
const heroBg = document.getElementById('hero-bg');
const photoMove = document.getElementById('photo-move');

function updateParallax() {
  if (heroBg && window.scrollY < window.innerHeight * 1.2) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
  if (photo && photoMove) {
    const r = photo.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) {
      const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      photoMove.style.transform = `translateY(${progress * -24}px)`;
    }
  }
}
if (!reduceMotion) {
  window.addEventListener('scroll', () => requestAnimationFrame(updateParallax), { passive: true });
  updateParallax();
}

// Papelitos que caen en el hero (cantidad media, viento suave, el mouse los aparta).
// Los cercanos se dibujan en el canvas de adelante y pasan por delante del texto.
(() => {
  const hero = document.getElementById('hero');
  const back = document.getElementById('papeles-fondo');
  const front = document.getElementById('papeles-frente');
  if (!hero || !back || !front || reduceMotion) return;

  const cb = back.getContext('2d');
  const cf = front.getContext('2d');
  const WIND = 0.6;
  const BASE_COUNT = 70;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const rnd = (a, b) => a + Math.random() * (b - a);
  let W = 0, H = 0, lastW = 0, parts = [];
  let mx = -9999, my = -9999, visible = true;

  function make(initial) {
    const z = Math.random();            // profundidad: 0 lejos, 1 cerca
    const w = 6 + z * 14;
    return {
      z, w, h: w * rnd(0.55, 0.8),
      x: rnd(-50, W + 50), y: initial ? rnd(-H * 0.2, H) : rnd(-120, -20),
      vy: 0.35 + z * 1.1,
      rot: rnd(0, 6.28), vr: rnd(-0.02, 0.02),
      flip: rnd(0, 6.28), vf: rnd(0.02, 0.07),
      sway: rnd(0, 6.28), vs: rnd(0.008, 0.02),
      front: z > 0.82
    };
  }

  function resize() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    for (const c of [back, front]) {
      c.width = W * DPR;
      c.height = H * DPR;
      c.getContext('2d').setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    // En celular la barra del navegador cambia el alto al hacer scroll: sólo se regenera si cambia el ancho
    if (W === lastW && parts.length) return;
    lastW = W;
    const count = Math.round(BASE_COUNT * Math.max(0.4, (W * H) / (1280 * 800)));
    parts = Array.from({ length: count }, () => make(true));
  }

  function step(p) {
    p.sway += p.vs;
    p.flip += p.vf * (WIND + 0.4);
    p.rot += p.vr * (1 + WIND);
    p.x += WIND * (0.6 + p.z * 1.4) + Math.sin(p.sway) * (0.4 + p.z * 0.8);
    p.y += p.vy * (0.7 + WIND * 0.5) + Math.cos(p.flip) * 0.25;

    const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy, R = 140;
    if (d2 < R * R) {
      const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 3.2;
      p.x += (dx / d) * f;
      p.y += (dy / d) * f;
      p.vr += 0.002 * Math.sign(dx);
    }
    p.vr *= 0.995;

    if (p.y > H + 120 || p.x > W + 140) {
      Object.assign(p, make(false));
      if (Math.random() < 0.35) { p.x = -40; p.y = rnd(0, H * 0.7); }
    }
  }

  function draw(ctx, p) {
    const c = Math.cos(p.flip);
    const light = (205 + Math.abs(c) * 45) | 0;   // se aclara al quedar de frente
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(1, Math.max(0.08, Math.abs(c)));
    ctx.globalAlpha = 0.25 + p.z * 0.6;
    ctx.fillStyle = `rgb(${light},${light - 5},${light - 16})`;
    if (p.front) { ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 6; }
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }

  function frame() {
    if (visible) {
      cb.clearRect(0, 0, W, H);
      cf.clearRect(0, 0, W, H);
      for (const p of parts) {
        step(p);
        draw(p.front ? cf : cb, p);
      }
    }
    requestAnimationFrame(frame);
  }

  // Se pausa cuando el hero no está en pantalla
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(hero);
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => { mx = my = -9999; });
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  frame();
})();

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

// Política de privacidad en un diálogo mediano.
const privacyModal = document.getElementById('privacy-modal');
const privacyLinks = document.querySelectorAll('[data-privacy-modal]');
const closePrivacyButton = document.querySelector('[data-close-privacy]');

if (privacyModal) {
  privacyLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      privacyModal.showModal();
    });
  });

  closePrivacyButton?.addEventListener('click', () => privacyModal.close());

  privacyModal.addEventListener('click', (event) => {
    if (event.target === privacyModal) {
      privacyModal.close();
    }
  });
}
