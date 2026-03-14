# 🎮 Digital — Sitio Web Personal

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://tutodigital.vercel.app/)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue.svg?style=flat)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Sitio web personal de **Digital** (TutoDigital), creador de contenido de Minecraft y videojuegos. Es un sitio tipo **Linktree** con múltiples subpáginas: redes sociales, eventos, portafolio de diseño y contacto.

---

## 🌐 Demo en vivo

👉 **[https://tutodigital.vercel.app/](https://tutodigital.vercel.app/)**

---

## 📁 Estructura del proyecto

```
web-main/
├── index.html           → Página principal: foto de perfil, tarjetas de redes sociales y botón de compartir
├── eventos.html         → Eventos destacados (Triarena Challenge, Escondite), colaboraciones y patrocinadores
├── portfolio.html       → Portafolio de diseño: miniaturas, banners y logos; carrusel de testimonios; servicios
├── contacto.html        → Canales de contacto: email, Discord, X/Twitter, Instagram con botones de acción
├── terms.html           → Términos y condiciones completos para comisiones de diseño
├── menu.html            → HTML del menú hamburguesa (solo referencia; el JS lo inyecta dinámicamente)
├── css/
│   ├── styles.css       → Estilos principales: variables CSS, todos los componentes, animaciones, responsive
│   └── menu.css         → Estilos del menú hamburguesa deslizante lateral
├── js/
│   ├── main.js          → Lógica principal: registro Service Worker, botón compartir, sistema de redirección, galería interactiva con lightbox
│   ├── menu.js          → Inyecta y controla el menú hamburguesa en todas las páginas
│   └── stars.js         → Genera 150 estrellas animadas en el fondo de forma dinámica
├── assets/images/
│   ├── icon.png         → Foto de perfil de Digital (512×512, usada como icono PWA)
│   ├── icon-192.png     → Ícono PWA 192×192 para Android/iOS
│   ├── kick_logo.png    → Logo de la plataforma Kick.com
│   └── screenshot1.png  → Captura para Open Graph (tarjetas en Discord, WhatsApp, etc.)
├── manifest.json        → Configuración PWA: nombre, tema, iconos, orientación
├── sw.js                → Service Worker: cache de assets estáticos, Stale-While-Revalidate, offline fallback
├── vercel.json          → Rutas amigables, headers Cache-Control y Service-Worker-Allowed
└── OLD/                 → Versiones antiguas (no en uso)
```

---

## 🛠️ Tecnologías usadas

- **HTML5** — Estructura semántica, meta tags Open Graph y Twitter Card, PWA (`<link rel="manifest">`)
- **CSS3 Vanilla** — Variables CSS (`--primary`, `--accent`, etc.), Flexbox, Grid, `backdrop-filter`, animaciones con `@keyframes`, media queries
- **JavaScript Vanilla** — Sin frameworks; DOM manipulation, Web Animations API (`element.animate()`), Navigator.share API, Clipboard API
- **Font Awesome 6.5.1** — Íconos de redes sociales y UI (vía CDN de cdnjs)
- **Google Fonts** — Fuente Montserrat (pesos 300–900) con preconnect
- **Service Worker** — Cache strategy: Stale-While-Revalidate para assets, Network First para navegación
- **Ko-fi Widget** — Widget flotante de donaciones/apoyo (`overlay-widget.js`)
- **Vercel** — Hosting con rewrites y headers personalizados

---

## ✨ Características

- **Linktree expandido**: Tarjetas interactivas para YouTube, TikTok, Instagram, X/Twitter, Discord, Twitch, Kick y Portafolio
- **Sistema de redirección**: URLs amigables (`/youtube`, `/discord`, etc.) que redirigen con una pantalla de carga animada
- **PWA instalable**: Se puede "instalar" en Android/iOS/escritorio gracias al `manifest.json` y Service Worker
- **Modo offline**: El SW cachea los assets principales para funcionar sin conexión
- **Menú hamburguesa**: Panel lateral deslizante con overlay, inyectado dinámicamente por JS en todas las páginas
- **Fondo animado de estrellas**: 150 partículas generadas por JS con posiciones, tamaños y velocidades aleatorias
- **Galería interactiva**: En el portafolio, las imágenes ciclan automáticamente cada ~4.5s con transición de opacidad; clic abre lightbox con navegación por teclado (←→ ESC)
- **Carrusel de testimonios**: Scroll infinito automático, pausable al hover
- **Animaciones de entrada**: Tarjetas y secciones aparecen con `fadeIn` escalonado al cargar la página
- **Efecto glassmorphism**: `backdrop-filter: blur()` en tarjetas y paneles
- **Open Graph / Twitter Cards**: Integración para previsualización en Discord, WhatsApp, Twitter
- **Botón de compartir**: Usa `navigator.share()` (móvil) o `clipboard.writeText()` (escritorio)
- **Transiciones suaves de navegación**: Fade out sutil al navegar entre páginas internas
- **Responsive**: Breakpoints en 1024px, 768px y 480px; tarjetas se apilan en móvil
- **`prefers-reduced-motion`**: Todas las animaciones se desactivan si el usuario lo prefiere

---

## 💻 Cómo correr localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/TutoDigital/web-main.git
cd web-main

# 2. Abrir con Live Server (recomendado para que el SW funcione)
#    Instala la extensión "Live Server" en VS Code y haz clic en "Go Live"
#    O usa cualquier servidor HTTP local:
npx serve .
# → http://localhost:3000
```

> **Nota**: El sitio funciona simplemente abriendo `index.html` en el navegador (doble clic), pero el Service Worker y algunas funcionalidades PWA requieren un servidor HTTP local.

---

## 🚀 Despliegue en Vercel

El archivo `vercel.json` configura dos cosas principales:

### Rewrites (URLs amigables)
Transforma rutas limpias en archivos HTML reales:

| URL visitada | Archivo servido |
|---|---|
| `/portafolio` | `portfolio.html` |
| `/contacto` | `contacto.html` |
| `/eventos-y-colaboraciones` | `eventos.html` |
| `/terms-of-service` | `terms.html` |
| `/youtube`, `/discord`, etc. | `index.html` (el JS hace la redirección externa) |

### Headers personalizados
- **`sw.js`**: `Cache-Control: no-cache` + `Service-Worker-Allowed: /` → Permite que el SW tenga scope en toda la raíz del sitio
- **`index.html`** y **`manifest.json`**: `Cache-Control: no-cache` → Siempre sirve la versión más reciente

Para desplegar:
1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Vercel detecta automáticamente que es un proyecto estático (sin build steps)
3. El dominio queda en `tutodigital.vercel.app`

---

## 📱 PWA (Progressive Web App)

### manifest.json
```json
{
  "name": "Digital | Redes",
  "short_name": "Digital",
  "description": "Enlaces a todas mis redes sociales de Digital",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0c0e1d",
  "theme_color": "#4800ff",
  "orientation": "portrait",
  "icons": [
    { "src": "assets/images/icon-192.png", "sizes": "192x192" },
    { "src": "assets/images/icon.png", "sizes": "512x512" }
  ]
}
```
- `display: "standalone"` → La app se abre sin barra de navegador
- `theme_color: "#4800ff"` → Color morado en la barra de estado del móvil
- `start_url: "/"` → Siempre abre la página principal al instalarse

### sw.js — Service Worker
Estrategia de cache en dos capas:
- **Navegación** (peticiones HTML): **Network First** → intenta la red; si falla, va al cache; si no hay cache, sirve `index.html`
- **Assets estáticos** (CSS, JS, imágenes): **Stale-While-Revalidate** → sirve del cache inmediatamente y actualiza el cache en segundo plano
- En `install`: precachea un listado de URLs críticas con `skipWaiting()` para activarse de inmediato
- En `activate`: limpia caches de versiones anteriores y llama `clients.claim()`

---

## 👤 Autor

**Digital / TutoDigital**

| Plataforma | Enlace |
|---|---|
| 🎥 YouTube | [@TutoDigitall](https://www.youtube.com/channel/UCXl48fi70tadw2BwzuU6DtQ) |
| 🎵 TikTok | [@tutodigital_](https://www.tiktok.com/@tutodigital_) |
| 📸 Instagram | [@TutoDigital_](https://www.instagram.com/TutoDigital_/) |
| 🐦 X/Twitter | [@tutodigital_](https://twitter.com/tutodigital_) |
| 💬 Discord | [Comunidad](https://dsc.gg/digitalgalaxy/) |
| 🟣 Twitch | [@tutodigital_](https://www.twitch.tv/tutodigital_) |
| 🟢 Kick | [@tutodigital](https://kick.com/tutodigital) |
| 🎨 Behance | [tutodigital](https://www.behance.net/tutodigital) |
| ☕ Ko-fi | [tutodigital](https://ko-fi.com/tutodigital) |

📧 **Email**: tutodigital@proton.me
