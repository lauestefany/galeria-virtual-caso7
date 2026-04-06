// Espero a que toda la página cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

  // Selecciono todas las obras de la galería
  const items = document.querySelectorAll('.gallery__item');

  // Las pongo invisibles al inicio para que aparezcan con animación
  // cuando el usuario haga scroll y las vea
  items.forEach(item => {
    item.style.animation = 'none';
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
  });

  // Uso un observador que detecta cuando una obra entra en pantalla
  // y en ese momento le activo la animación de aparición
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || '0s';
        el.style.animation = `fadeInUp 0.6s ease-out ${delay} forwards`;
        // Dejo de observar la obra una vez ya apareció
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  // Le asigno un pequeño retraso a cada obra para que
  // aparezcan una tras otra, no todas al mismo tiempo
  items.forEach((item, i) => {
    item.dataset.delay = `${i * 0.12}s`;
    observer.observe(item);
  });

  // Hago que los enlaces internos (como el botón "Ver obras")
  // lleven al usuario con un scroll suave en vez de un salto brusco
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
