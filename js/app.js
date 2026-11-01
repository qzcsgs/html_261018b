const toastEl = document.createElement('div');
toastEl.className = 'toast';
document.body.appendChild(toastEl);
let toastTimer;

function toast(message, duration = 1500) {
    toastEl.textContent = message;
    toastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastEl.classList.remove('visible');
    }, duration);
}

const grid = document.querySelector('.grid');

let pagePadding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--page-padding'), 10);
let paddingTimer;

const paddingIndicators = ['left', 'right'].map((side) => {
    const indicator = document.createElement('div');
    indicator.className = `page-padding-indicator ${side}`;
    document.body.appendChild(indicator);
    return indicator;
});

function updatePagePadding(delta) {
    pagePadding = Math.max(0, pagePadding + delta);
    document.documentElement.style.setProperty('--page-padding', `${pagePadding}px`);

    paddingIndicators.forEach((indicator) => {
        indicator.textContent = `${pagePadding}`;
        indicator.classList.add('visible');
    });

    clearTimeout(paddingTimer);
    paddingTimer = setTimeout(() => {
        paddingIndicators.forEach((indicator) => indicator.classList.remove('visible'));
    }, 1500);
}

let globalFs = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--global-fs'), 10);

function updateGlobalFs(delta) {
    globalFs = Math.max(1, globalFs + delta);
    document.documentElement.style.setProperty('--global-fs', `${globalFs}px`);
    toast(`${globalFs}px`);
}

document.addEventListener('keydown', (e) => {
    if (e.key == '1') {
        grid.classList.toggle('h');
        grid.classList.remove('w');
    } else if (e.key == '2') {
        grid.classList.toggle('w');
        grid.classList.remove('h');
    } else if (e.key === 'ArrowLeft') {
        updatePagePadding(-1);
    } else if (e.key === 'ArrowRight') {
        updatePagePadding(1);
    } else if (e.key.toLowerCase() === 'q') {
        updateGlobalFs(1);
    } else if (e.key.toLowerCase() === 'a') {
        updateGlobalFs(-1);
    }
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

function observeReveal(el) {
    if (!el.classList.contains('empty')) {
        revealObserver.observe(el);
    }
}

document.querySelectorAll('.home-img, .archive-item').forEach(observeReveal);

new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.matches('.home-img, .archive-item')) {
                observeReveal(node);
            }
            node.querySelectorAll('.home-img, .archive-item').forEach(observeReveal);
        });
    });
}).observe(document.body, { childList: true, subtree: true });
