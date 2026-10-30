
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
        indicator.textContent = `${pagePadding}px`;
        indicator.classList.add('visible');
    });

    clearTimeout(paddingTimer);
    paddingTimer = setTimeout(() => {
        paddingIndicators.forEach((indicator) => indicator.classList.remove('visible'));
    }, 1500);
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
    }
});