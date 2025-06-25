// Proyectos de ejemplo para la galería con imágenes de Pixabay
const projects = [
  {
    title: 'Landing Page Creativa',
    image: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/ux-1992443_1280.jpg',
    description: 'Landing page moderna y responsiva para una startup.',
    link: '#'
  },
  {
    title: 'Dashboard Interactivo',
    image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg',
    description: 'Dashboard con visualizaciones y animaciones.',
    link: '#'
  },
  {
    title: 'E-commerce Elegante',
    image: 'https://cdn.pixabay.com/photo/2017/08/10/03/47/ecommerce-2619823_1280.jpg',
    description: 'Tienda online con carrito y pagos integrados.',
    link: '#'
  }
];

function renderPortfolio() {
  const gallery = document.getElementById('portfolio-gallery');
  gallery.innerHTML = '';
  projects.forEach(project => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${project.image}" class="card-img-top" alt="${project.title}">
        <div class="card-body">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <a href="${project.link}" class="btn btn-outline-dark btn-sm" target="_blank">Ver proyecto</a>
        </div>
      </div>
    `;
    gallery.appendChild(col);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();

  // Manejo del formulario de contacto
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alertBox.classList.remove('d-none', 'alert-danger', 'alert-success');
    alertBox.classList.add('alert-success');
    alertBox.textContent = '¡Gracias por tu mensaje! Pronto me pondré en contacto contigo.';
    form.reset();
  });
}); 