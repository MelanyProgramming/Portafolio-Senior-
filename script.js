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

  // Mostrar tablero de dibujo al presionar el botón
  const showDrawingBoardBtn = document.getElementById('showDrawingBoard');
  const drawingBoardContainer = document.getElementById('drawingBoardContainer');
  let drawingBoardInitialized = false;

  showDrawingBoardBtn.addEventListener('click', () => {
    drawingBoardContainer.classList.remove('d-none');
    showDrawingBoardBtn.classList.add('d-none');
    if (!drawingBoardInitialized) {
      initDrawingBoard();
      drawingBoardInitialized = true;
    }
  });

  function initDrawingBoard() {
    // Tablero de dibujo
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const clearCanvas = document.getElementById('clearCanvas');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configuración inicial del canvas
    function initCanvas() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setBrush();
    }

    function setBrush() {
      ctx.strokeStyle = colorPicker.value || '#3a3a3a';
      ctx.lineWidth = brushSize.value;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    // Inicializar canvas
    initCanvas();

    // Eventos del mouse
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      setBrush();
      lastX = e.offsetX;
      lastY = e.offsetY;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      setBrush();
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      lastX = e.offsetX;
      lastY = e.offsetY;
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Eventos táctiles para dispositivos móviles
    canvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      isDrawing = true;
      setBrush();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      lastX = (touch.clientX - rect.left) * (canvas.width / rect.width);
      lastY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    }, { passive: false });

    canvas.addEventListener('touchmove', function(e) {
      if (!isDrawing) return;
      e.preventDefault();
      setBrush();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x;
      lastY = y;
    }, { passive: false });

    canvas.addEventListener('touchend', () => isDrawing = false);

    // Controles del tablero
    colorPicker.addEventListener('change', () => setBrush());
    brushSize.addEventListener('input', (e) => {
      setBrush();
      brushSizeValue.textContent = e.target.value + 'px';
    });
    clearCanvas.addEventListener('click', () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  }

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}); 