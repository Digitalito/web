// Función para cargar el menú hamburguesa
function loadMenu() {
    // Crear elementos del menú
    // Used relative paths for local dev compatibility
    const menuHTML = `
        <button class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
        </button>
        
        <div class="menu-panel" id="menuPanel">
            <div class="menu-header">
                <button class="menu-close" id="menuClose">
                    <i class="fas fa-times"></i>
                </button>
                <h2 class="menu-title">Menú Digital</h2>
                <p>Explora más contenido</p>
            </div>
            <nav class="menu-nav">
                <ul class="menu-list">
                    <li class="menu-item">
                        <a href="/" class="menu-link">
                            <i class="fas fa-user"></i> Biografía
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="/eventos-y-colaboraciones" class="menu-link">
                            <i class="fas fa-calendar-alt"></i> Eventos
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="/contacto" class="menu-link">
                            <i class="fas fa-envelope"></i> Contacto
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="/portafolio" class="menu-link">
                            <i class="fas fa-briefcase"></i> Comisiones
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        
        <div class="menu-overlay" id="menuOverlay"></div>
    `;
    
    // Inyectar el menú al inicio del body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    
    // Funcionalidad del menú hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const menuPanel = document.getElementById('menuPanel');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menuPanel.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuPanel.classList.contains('active') ? 'hidden' : '';
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace (solo en móviles)
    if (window.innerWidth <= 768) {
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
}

// Cargar el menú cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMenu);
} else {
    loadMenu();
}