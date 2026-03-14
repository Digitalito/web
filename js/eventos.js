/**
 * js/eventos.js
 * Genera dinámicamente las cards de eventos, colaboradores y patrocinadores
 */

function renderEventCard(event) {
    const tagsHTML = (event.tags || [])
        .map(tag => `<span class="event-tag">${tag}</span>`)
        .join('');

    const btnText = event.videoAvailable ? 'Ver video' : 'Video no disponible';
    const btnClass = event.videoAvailable ? 'event-btn' : 'event-btn unavailable';
    const btnUrl = event.videoAvailable ? event.videoUrl : 'https://www.youtube.com/@TutoDigitall';

    return `
        <article class="event-card">
            <img src="${event.image}" alt="${event.title} - Evento de Minecraft" loading="lazy" class="event-card-image">
            <div class="event-card-info">
                <p class="event-card-date">${event.dateDisplay}</p>
                <h3 class="event-card-title">${event.title}</h3>
                <p class="event-card-desc">${event.description}</p>
                <div class="event-card-tags">${tagsHTML}</div>
                <div class="event-card-footer">
                    <a href="${btnUrl}" class="${btnClass}" target="_blank" rel="noopener noreferrer">${btnText}</a>
                </div>
            </div>
        </article>
    `;
}

function renderCollaboratorCard(collab) {
    const tagsHTML = (collab.tags || [])
        .map(tag => `<span class="collab-tag">${tag}</span>`)
        .join('');

    return `
        <div class="collab-card">
            <img src="${collab.avatar}" alt="${collab.name}" class="collab-avatar" loading="lazy" 
                 onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(collab.name)}&background=3d1a6e&color=fff&size=64&bold=true'">
            <h3 class="collab-name">${collab.name}</h3>
            <p class="collab-desc">${collab.description}</p>
            <div class="collab-tags">${tagsHTML}</div>
            <a href="${collab.channelUrl}" class="collab-btn" target="_blank" rel="noopener noreferrer">Ver canal</a>
        </div>
    `;
}

function renderEvents() {
    const container = document.getElementById('events-grid');
    if (container && typeof EVENTS_DATA !== 'undefined') {
        container.innerHTML = EVENTS_DATA.map(renderEventCard).join('');
    }
}

function renderCollaborators() {
    const container = document.getElementById('collaborators-grid');
    if (container && typeof COLLABORATORS_DATA !== 'undefined') {
        container.innerHTML = COLLABORATORS_DATA.map(renderCollaboratorCard).join('');
    }
}

function renderSponsors() {
    const container = document.getElementById('sponsors-grid');
    if (!container) return;

    if (typeof SPONSORS_DATA === 'undefined' || SPONSORS_DATA.length === 0) {
        container.innerHTML = `
            <div class="sponsors-empty">
                <p>¿Quieres patrocinar un evento o colaborar con Digital?</p>
                <a href="/contacto" class="event-btn">Contáctame</a>
            </div>
        `;
        return;
    }

    container.innerHTML = SPONSORS_DATA.map(sponsor => `
        <div class="event-card">
            <img src="${sponsor.logo}" alt="${sponsor.name}" class="event-card-image">
            <div class="event-card-info">
                <h3 class="event-card-title">${sponsor.name}</h3>
                <p class="event-card-date">${sponsor.type}</p>
                <div class="event-card-footer">
                    <a href="${sponsor.websiteUrl}" class="event-btn" target="_blank" rel="noopener noreferrer">Visitar web</a>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    renderCollaborators();
    renderSponsors();
});
