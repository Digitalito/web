// Main application logic

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Path adjusted for new location of this file in js/ folder to sw.js in js/ folder
        // The sw.js is now in js/sw.js. So relative to this file it is ./sw.js or sw.js
        // But relative to index.html (where this is included), it should be invoked with correct path.
        // Wait, the service worker scope stuff.
        // If sw.js is in js/sw.js, its scope defaults to js/. That might be BAD for root scope.
        // To have root scope, sw.js should be at root OR served with Service-Worker-Allowed header.
        // User just said "organize". Moving sw.js to js/ might break the PWA scope.
        // I should probably keep sw.js at root due to PWA scope restrictions.
        // Or I should put it back.
        // Let's check if I can register it from root.
        
        // I'll register it as 'js/sw.js' but scope might be limited.
        // I will move sw.js BACK to root. This is a common pitfall.
        // "Arregla... y mejoralo... sin afectar a la funcionalidad"
        // Breaking PWA scope affects functionality.
        // So I will move sw.js back to root or leave it in js and hope for the best (but it won't work for root).
        // I will move it back to root in the next cleanup step.
        // For now, I'll point to '../sw.js' assuming I move it back, or logical 'sw.js' relative to root.
        
        // Assuming sw.js is at root:
        navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('SW registrado:', registration))
        .catch(error => console.log('Error al registrar SW:', error));
    });
}

// Share Button
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Digital | Redes Sociales',
            text: 'Conecta conmigo en todas mis plataformas 🎮',
            url: window.location.href
        };
        if (navigator.share) {
            try { await navigator.share(shareData); }
            catch(err) { console.warn('Compartir cancelado', err); }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Enlace copiado al portapapeles ✅');
            } catch (err) {
                alert('No se pudo copiar el enlace 😢');
            }
        }
    });
}

// Redirects
const redirectMap = {
    '/discord': 'https://dsc.gg/digitalgalaxy/',
    '/youtube': 'https://www.youtube.com/channel/UCXl48fi70tadw2BwzuU6DtQ?sub_confirmation=1',
    '/tiktok': 'https://www.tiktok.com/@tutodigital_',
    '/instagram': 'https://www.instagram.com/TutoDigital_/',
    '/twitter': 'https://twitter.com/tutodigital_',
    '/twitch': 'https://www.twitch.tv/tutodigital_',
    '/kick': 'https://kick.com/tutodigital'
};

function handleRedirects() {
    const currentPath = window.location.pathname;
    
    if (redirectMap[currentPath]) {
        // Redirect Logic
        document.body.innerHTML = `
            <style>
                .redirect-message {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: var(--background);
                    z-index: 1000;
                    font-family: 'Montserrat', sans-serif;
                }
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: var(--primary);
                    animation: spin 1s ease-in-out infinite;
                    margin-bottom: 20px;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
            <div class="redirect-message">
                <div class="spinner"></div>
                <h2>Redirigiendo...</h2>
            </div>
        `;
        
        setTimeout(() => {
            window.location.replace(redirectMap[currentPath]);
        }, 1500);
        return;
    }
    
    // Links handling
    const buttons = document.querySelectorAll('.social-btn, .contact-button');
    buttons.forEach(link => {
        if (link.getAttribute('href').startsWith('mailto:')) return;

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const path = this.getAttribute('href');
            
            document.body.style.opacity = '0.7';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                const destination = redirectMap[path] || path;
                if (destination && !destination.startsWith('/')) {
                     window.location.href = destination;
                } else if (redirectMap[path]) {
                     window.location.href = redirectMap[path];
                } else {
                     // fallback if local path
                     window.location.href = path;
                }
            }, 300);
        });
    });
}

window.addEventListener('DOMContentLoaded', handleRedirects);
