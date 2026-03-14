/**
 * js/portfolio.js
 * Genera dinámicamente las obras y testimonios del portafolio
 */

function renderWorks() {
    if (typeof WORKS_DATA === 'undefined') return;

    const sections = {
        miniaturas: document.getElementById('works-miniaturas'),
        banners: document.getElementById('works-banners'),
        logos: document.getElementById('works-logos')
    };

    // Limpiar contenedores
    Object.values(sections).forEach(container => {
        if (container) container.innerHTML = '';
    });

    WORKS_DATA.forEach(work => {
        const container = sections[work.category];
        if (!container) return;

        const item = document.createElement('div');
        item.className = 'gallery-item category-target';
        item.innerHTML = `
            <img src="${work.image}" alt="${work.alt}" loading="lazy" decoding="async" class="gallery-img">
        `;
        container.appendChild(item);
    });
}

function renderClients() {
    const container = document.getElementById('clients-grid');
    if (!container || typeof CLIENTS_DATA === 'undefined') return;

    // Usar la estructura de carrusel existente para mantener el estilo
    container.className = 'trust-carousel';
    container.innerHTML = `
        <div class="trust-carousel-track" id="trust-carousel-track"></div>
    `;

    const track = document.getElementById('trust-carousel-track');
    
    // Duplicar para el efecto de carrusel infinito (3 veces como en el original)
    const duplicatedClients = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA];
    
    duplicatedClients.forEach(client => {
        const card = document.createElement('div');
        card.className = 'trust-card';
        card.innerHTML = `
            <div class="trust-avatar">
                <img src="${client.avatar}" alt="Avatar de ${client.name}" loading="lazy" decoding="async">
            </div>
            <h4 class="trust-name">${client.name}</h4>
            <p class="trust-role">${client.role}</p>
            <p class="trust-quote">
                <i class="fas fa-quote-left" aria-hidden="true"></i>${client.quote}<i class="fas fa-quote-right" aria-hidden="true"></i>
            </p>
        `;
        track.appendChild(card);
    });

    // Ajustar el ancho del track para la animación
    const cardWidth = 180;
    const gap = 30;
    const totalWidth = (cardWidth + gap) * duplicatedClients.length;
    track.style.width = `${totalWidth}px`;
}

// Lógica de filtrado de categorías (adaptada de la lógica anterior)
function initCategoryFiltering() {
    const mainCategories = document.getElementById('main-categories');
    const categoryView = document.getElementById('category-view-container');
    const backBtn = document.getElementById('back-to-categories');
    const title = document.getElementById('current-category-title');

    if (!mainCategories || !categoryView || !backBtn) return;

    const categoryGrids = {
        miniaturas: document.getElementById('works-miniaturas'),
        banners: document.getElementById('works-banners'),
        logos: document.getElementById('works-logos')
    };

    mainCategories.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            const categoryLabel = item.querySelector('.gallery-caption').textContent;

            title.textContent = categoryLabel;
            mainCategories.classList.add('is-hidden');
            categoryView.classList.remove('is-hidden');

            // Ocultar todos los grids y mostrar el seleccionado
            Object.values(categoryGrids).forEach(grid => grid.classList.add('is-hidden'));
            if (categoryGrids[category]) {
                categoryGrids[category].classList.remove('is-hidden');
            }
            
            // Scroll al inicio de la sección
            categoryView.scrollIntoView({ behavior: 'smooth' });
        });
    });

    backBtn.addEventListener('click', () => {
        categoryView.classList.add('is-hidden');
        mainCategories.classList.remove('is-hidden');
        mainCategories.scrollIntoView({ behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderWorks();
    renderClients();
    initCategoryFiltering();
});
