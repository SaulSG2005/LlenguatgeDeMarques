

(function () {
    'use strict';

    // --- Comentaris en català ---
    // Aquest fitxer agrupa petites funcionalitats de la web:
    // 1) initTimer(): compta els segons que l'usuari passa a la pàgina principal.
    // 2) initPasswordValidation(): comprova que les dues contrasenyes del formulari coincideixin.
    // 3) Efectes sobre imatges de fruita (hover) per ampliar-les temporalment.
    // 4) openLightbox(): obre una capa (overlay) amb la imatge ampliada i la seva descripció.
    // Els comentaris afegits expliquen en català què fa cada bloc, sense canviar la lògica.

    // --- Timer per la pàgina principal (index.html) ---
    // initTimer(): actualitza cada segon el contingut de l'element amb id "timer".
    function initTimer() {
        const timerEl = document.getElementById('timer');
        if (!timerEl) return; // Only run if timer element exists
        
        let seconds = 0;
        setInterval(() => {
            seconds++;
            timerEl.textContent = `Temps a la pàgina: ${seconds}s`;
        }, 1000); // Update every second
    }

    // --- Validació de contrasenyes per al formulari de registre ---
    // initPasswordValidation(): intercepta l'enviament del formulari i comprova
    // que els camps 'password' i 'passwordConfirm' tinguin el mateix valor.
    // Si no coincideixen, evita l'enviament i posa el focus al camp de confirmació.
    function initPasswordValidation() {
        const form = document.getElementById('bookingForm');
        if (!form) return; // Only run if form exists on this page
        
        form.addEventListener('submit', function(e) {
            const pwd = document.querySelector('input[name="password"]');
            const pwdConfirm = document.querySelector('input[name="passwordConfirm"]');

            if (pwd && pwdConfirm && pwd.value !== pwdConfirm.value) {
                e.preventDefault();
                alert('Les contrasenyes no coincideixen. Si us plau, comprova que siguin iguals.');
                pwdConfirm.focus();
                return false;
            }
        });
    }

    function init() {
        // funció d'inicialització que crida tots els mòduls si existeixen a la pàgina
        // Inicia el comptador si estem a index.html
        initTimer();

        // Activa la validació de contrasenyes si existeix el formulari corresponent
        initPasswordValidation();

        // --- Efectes d'imatge i lightbox per a la llista de productes ---
        // Selecciona totes les imatges amb la classe .fruit-image i afegeix
        // handlers per mouseenter/mouseleave, focus/blur i click (obrir lightbox).
        const imgs = Array.from(document.querySelectorAll('.fruit-image'));

        function enlarge() {
            this.style.transition = 'transform 220ms ease';
            this.style.transform = 'scale(1.6)';
        }

        function restore() {
            this.style.transform = '';
        }

        imgs.forEach(img => {
            if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
            img.addEventListener('mouseenter', enlarge);
            img.addEventListener('mouseleave', restore);
            img.addEventListener('focus', enlarge);
            img.addEventListener('blur', restore);
            img.addEventListener('click', function (e) {
                openLightbox(this);
            });
        });
    }

    // Assegura que s'executi init() quan el DOM estigui carregat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // --- Implementació del lightbox ---
    // openLightbox(imgEl): crea una capa overlay, hi posa la imatge ampliada
    // i una capsa amb la descripció. Permet tancar prement Escape o fent
    // clic fora de la imatge (a l'overlay).
    function openLightbox(imgEl) {
        // crea l'overlay (fons fosc que cobreix tota la finestra)
        let overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.tabIndex = -1;

        // contenidor central on anirà la imatge i el peu de foto
        const container = document.createElement('div');
        container.className = 'lightbox-container';

        // imatge gran
        const bigImg = document.createElement('img');
        bigImg.className = 'lightbox-img';
        bigImg.src = imgEl.src;
        bigImg.alt = imgEl.alt || '';

        // peu de foto: usa l'atribut data-desc si existeix, sinó l'alt
        const caption = document.createElement('div');
        caption.className = 'lightbox-caption';
        caption.textContent = imgEl.getAttribute('data-desc') || imgEl.alt || '';

        // muntatge al DOM
        container.appendChild(bigImg);
        container.appendChild(caption);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // mostra l'overlay afegint la classe que activa la transició CSS
        requestAnimationFrame(() => overlay.classList.add('visible'));

        // tancament segur: elimina els listeners i la capa del DOM quan hagi
        // acabat la transició d'opacitat
        function close() {
            overlay.classList.remove('visible');
            overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
            document.removeEventListener('keydown', onKey);
        }

        // tancament amb tecla Escape
        function onKey(e) {
            if (e.key === 'Escape') close();
        }

        // si es clica a l'overlay (fora del contenidor), tancar
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) close();
        });
        document.addEventListener('keydown', onKey);
    }

})();