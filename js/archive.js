const filterData = [
    {
        label: 'View',
        key: 'index',
        options: ['Index', 'Images']
    },
    {
        label: 'Services',
        key: 'category',
        options: ['Cultural', 'Institutional', 'Residential', 'Workplace']
    },
    {
        label: 'Location',
        key: 'location',
        options: ['New York', 'Paris']
    },
    {
        label: 'Time',
        key: 'time',
        options: ['Latest', 'Previous']
    },
];

const archiveData = [
    {
        cover: 'images/Archive/Residential/Seminary/1.jpg',
        hover: 'images/Archive/Residential/Seminary/2.jpg',
        category: 'Residential',
        detail: ['Theological Seminary', 'Loft Apartment Renovation', '2023'],
        location: 'New York',
        year: '2023'
    },
    {
        cover: 'images/Archive/Residential/Bridgehampton/1.jpg',
        hover: 'images/Archive/Residential/Bridgehampton/2.jpg',
        category: 'Residential',
        detail: ['Bridgehampton', 'Luxury Summer House', '2026'],
        location: 'Paris',
        year: '2026'
    },
    {
        cover: 'images/Archive/Residential/Prolog/2.jpg',
        hover: 'images/Archive/Residential/Prolog/3.jpg',
        category: 'Residential',
        detail: ['Prolog', 'Studio Apartment Renovation', '2026'],
        location: 'New York',
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Pivot/1.jpg',
        hover: 'images/Archive/Workplace/Pivot/2.jpg',
        category: 'Workplace',
        detail: ['Pivot', 'Studio Apartment Renovation', '2026'],
        location: 'New York',
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Transformer/1.jpg',
        hover: 'images/Archive/Workplace/Transformer/2.jpg',
        category: 'Workplace',
        detail: ['Transformer', 'Studio Apartment Renovation', '2026'],
        location: 'Paris',
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Fooddography/1.jpg',
        hover: 'images/Archive/Workplace/Fooddography/2.jpg',
        category: 'Workplace',
        detail: ['Fooddography', 'Studio Apartment Renovation', '2026'],
        location: 'New York',
        year: '2026'
    }
]

const archiveList = document.querySelector('.archive-list');
const archiveTextList = document.querySelector('.archive-text-list');
const actions = document.querySelector('.actions');
const dropdowns = [];
const filters = {
    category: null,
    time: null
};
let currentView = 'Images';

function syncBodyHeight() {
    const visibleList = currentView === 'Images' ? archiveList : archiveTextList;
    const listBottom = visibleList.getBoundingClientRect().bottom + window.scrollY;
    document.body.style.height = `${listBottom}px`;
}

function setArchiveView(view) {
    currentView = view;
    archiveList.style.display = view === 'Images' ? 'flex' : 'none';
    archiveTextList.style.display = view === 'Index' ? 'block' : 'none';
    syncBodyHeight();
}

const archiveListObserver = new ResizeObserver(syncBodyHeight);
archiveListObserver.observe(archiveList);
archiveListObserver.observe(archiveTextList);
window.addEventListener('resize', syncBodyHeight);

function renderArchiveList() {
    let data = archiveData.slice();

    if (filters.category) {
        data = data.filter((item) => item.category == filters.category);
    }

    if (filters.time == 'Latest') {
        data.sort((a, b) => Number(b.year) - Number(a.year));
    } else if (filters.time == 'Previous') {
        data.sort((a, b) => Number(a.year) - Number(b.year));
    } else {
        data.sort((a, b) => a.detail[0].localeCompare(b.detail[0]));
    }

    archiveList.innerHTML = '';
    archiveTextList.innerHTML = '';

    data.forEach(({ cover, hover, category, detail, year, location }) => {
        const archiveItem = document.createElement('div');
        archiveItem.className = 'archive-item';
        const archiveImg = document.createElement('img');
        archiveImg.src = cover;
        archiveImg.className = 'cover';
        archiveItem.appendChild(archiveImg);

        const hoverWrap = document.createElement('div');
        hoverWrap.className = 'hover-img';
        const hoverImg = document.createElement('img');
        hoverImg.src = hover;
        hoverWrap.appendChild(hoverImg);
        archiveItem.appendChild(hoverWrap);

        const archiveItemDetail = document.createElement('div');
        archiveItemDetail.className = 'archive-item-detail';
        detail.forEach((text) => {
            const line = document.createElement('div');
            line.textContent = text;
            archiveItemDetail.appendChild(line);
        });

        archiveItem.appendChild(archiveItemDetail);
        archiveList.appendChild(archiveItem);

        const textItem = document.createElement('div');
        textItem.className = 'a-t-item';
        const textImage = document.createElement('div');
        textImage.className = 'a-t-image';
        const textImg = document.createElement('img');
        textImg.src = cover;
        textImg.alt = detail[0];
        textImage.appendChild(textImg);

        const textDetail = document.createElement('div');
        textDetail.className = 'a-t-detail';
        const textFields = [
            ['a-t-name', detail[0]],
            ['a-t-service', category],
            ['a-t-location', location || ''],
            ['a-t-year', year || detail[2]]
        ];
        textFields.forEach(([className, text]) => {
            const field = document.createElement('div');
            field.className = className;
            field.textContent = text;
            textDetail.appendChild(field);
        });

        const updateImagePosition = () => {
            const detailRect = textDetail.getBoundingClientRect();
            const imageHeight = textImg.offsetHeight;
            const spaceBelow = window.innerHeight - detailRect.top;
            const spaceAbove = detailRect.bottom;
            const useTop = spaceBelow >= imageHeight || spaceBelow >= spaceAbove;
            textImg.classList.toggle('top', useTop);
            textImg.classList.toggle('bottom', !useTop);
        };

        textDetail.addEventListener('mouseenter', () => {
            textImg.classList.add('visible');
            updateImagePosition();
        });
        textDetail.addEventListener('mouseleave', () => {
            textImg.classList.remove('visible');
        });
        textImg.addEventListener('load', () => {
            if (textImg.classList.contains('visible')) {
                updateImagePosition();
            }
        });

        textItem.append(textImage, textDetail);
        archiveTextList.appendChild(textItem);
    });

    const emptyCount = 4 - (data.length % 4);
    for (let i = 0; i < emptyCount; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'archive-item empty';
        archiveList.appendChild(emptyItem);
    }
}

filterData.forEach(({ label, key, options }) => {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const toggle = document.createElement('div');
    toggle.className = 'dropdown-toggle';

    const roll = document.createElement('span');
    roll.className = 'toggle-roll';
    const rollText = document.createElement('span');
    rollText.textContent = label;
    const rollCopy = document.createElement('span');
    rollCopy.className = 'toggle-copy';
    rollCopy.textContent = label;
    roll.append(rollText, rollCopy);
    toggle.appendChild(roll);

    const menu = document.createElement('div');
    menu.className = 'dropdown-menu';

    options.forEach((option) => {
        const item = document.createElement('div');
        item.className = 'dropdown-option';

        const text = document.createElement('span');
        text.className = 'option-text';
        text.textContent = option;
        const clear = document.createElement('span');
        clear.className = 'clear-selection';
        clear.textContent = 'x';
        item.append(text, clear);

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            rollText.textContent = option;
            rollCopy.textContent = option;
            toggle.classList.add('underline');
            menu.querySelectorAll('.dropdown-option').forEach((el) => el.classList.remove('selected'));
            item.classList.add('selected');
            dropdown.classList.remove('open');

            if (key === 'index') {
                setArchiveView(option);
            } else if (key == 'category' || key == 'time') {
                filters[key] = option;
                renderArchiveList();
            }
        });

        clear.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.remove('selected');
            rollText.textContent = label;
            rollCopy.textContent = label;
            toggle.classList.remove('underline');
            dropdown.classList.remove('open');

            if (key === 'index') {
                setArchiveView('Index');
            } else if (key == 'category' || key == 'time') {
                filters[key] = null;
                renderArchiveList();
            }
        });

        menu.appendChild(item);
    });

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdowns.forEach((other) => {
            if (other !== dropdown) {
                other.classList.remove('open');
            }
        });
        dropdown.classList.toggle('open');
    });

    dropdown.append(toggle, menu);
    const dropdownWrap = document.createElement('div');
    dropdownWrap.className = 'dropdown-wrap ' + key;
    dropdownWrap.appendChild(dropdown);
    actions.appendChild(dropdownWrap);
    dropdowns.push(dropdown);
});

renderArchiveList();
setArchiveView('Images');
