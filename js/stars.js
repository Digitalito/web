function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const duration = (Math.random() * 3 + 1).toFixed(1);
        const moveDuration = (Math.random() * 30 + 20).toFixed(1);
        const moveX = (Math.random() * 100 - 50).toFixed(0) + 'px';
        const moveY = (Math.random() * 100 - 50).toFixed(0) + 'px';
        const brightness = 0.3 + Math.random() * 0.5;
        
        star.style.left = posX + 'vw';
        star.style.top = posY + 'vh';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.opacity = brightness;
        star.style.setProperty('--duration', duration);
        star.style.setProperty('--move-duration', moveDuration);
        star.style.setProperty('--move-x', moveX);
        star.style.setProperty('--move-y', moveY);
        
        starsContainer.appendChild(star);
    }
}

window.addEventListener('load', createStars);
