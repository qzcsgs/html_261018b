const track = document.querySelector('.carousel-track');
const slides = [...track.children];
const firstSlideClone = slides[0].cloneNode(true);
track.appendChild(firstSlideClone);

let currentIndex = 0;

setInterval(() => {
    currentIndex += 1;
    track.style.transition = 'transform 0.8s ease';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateHomeDetails(currentIndex % homePageData.length);
}, 3000);

track.addEventListener('transitionend', () => {
    if (currentIndex === slides.length) {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = 'translateX(0)';
    }
});

const homePageData = [
    ["Pivot", "1/3", "Workplace", "New York", "2024"],
    ["Prolog", "2/3", "Residential", "New York", "2025"],
    ["Amangiri", "3/3", "Residential", "Utah", "2023"],
];

const homeDetailsFields = document.querySelectorAll('.home-details > div');

function updateHomeDetails(index) {
    const detail = homePageData[index];
    homeDetailsFields.forEach((field, fieldIndex) => {
        field.textContent = detail[fieldIndex];
    });
}

updateHomeDetails(0);