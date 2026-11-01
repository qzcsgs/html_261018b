const filterData = [
    {
        label: 'Services',
        key: 'category',
        options: ['Cultural', 'Hospitality', 'Institutional', 'Residential', 'Workplace']
    },
    {
        label: 'Time',
        key: 'time',
        options: ['From new to old', 'From Old to New']
    },
    {
        label: 'Images/Index',
        key: 'images',
        options: ['12345', '23456', '34567']
    }
];

const archiveData = [
    {
        cover: 'images/Archive/Residential/Seminary/1.jpg',
        hover: 'images/Archive/Residential/Seminary/2.jpg',
        category: 'Residential',
        detail: ['Theological Seminary', 'Loft Apartment Renovation', '2023'],
        year: '2023'
    },
    {
        cover: 'images/Archive/Residential/Bridgehampton/1.jpg',
        hover: 'images/Archive/Residential/Bridgehampton/2.jpg',
        category: 'Residential',
        detail: ['Bridgehampton', 'Luxury Summer House', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Residential/Prolog/2.jpg',
        hover: 'images/Archive/Residential/Prolog/3.jpg',
        category: 'Residential',
        detail: ['Prolog', 'Studio Apartment Renovation', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Pivot/1.jpg',
        hover: 'images/Archive/Workplace/Pivot/2.jpg',
        category: 'Workplace',
        detail: ['Pivot', 'Studio Apartment Renovation', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Transformer/1.jpg',
        hover: 'images/Archive/Workplace/Transformer/2.jpg',
        category: 'Workplace',
        detail: ['Transformer', 'Studio Apartment Renovation', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Fooddography/1.jpg',
        hover: 'images/Archive/Workplace/Fooddography/2.jpg',
        category: 'Workplace',
        detail: ['Fooddography', 'Studio Apartment Renovation', '2026'],
        year: '2026'
    }
]

const archiveList = document.querySelector('.archive-list');
const actions = document.querySelector('.actions');
const dropdowns = [];
const filters = {
    category: null,
    time: null
};

function renderArchiveList() {
    let data = archiveData.slice();

    if (filters.category) {
        data = data.filter((item) => item.category == filters.category);
    }

    if (filters.time == 'From new to old') {
        data.sort((a, b) => Number(b.year) - Number(a.year));
    } else if (filters.time == 'From Old to New') {
        data.sort((a, b) => Number(a.year) - Number(b.year));
    }

    archiveList.innerHTML = '';

    data.forEach(({ cover, hover, detail }) => {
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

            if (key == 'category' || key == 'time') {
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

            if (key == 'category' || key == 'time') {
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
    dropdownWrap.className = 'dropdown-wrap';
    dropdownWrap.appendChild(dropdown);
    actions.appendChild(dropdownWrap);
    dropdowns.push(dropdown);
});

renderArchiveList();
syncArchiveLabelWidth();
