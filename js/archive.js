const filterData = [
    {
        label: 'Category',
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
        category: 'Residential',
        detail: ['Theological Seminary_Loft', 'Apartment Renovation', '2023'],
        year: '2023'
    },
    {
        cover: 'images/Archive/Residential/Bridgehampton/1.jpg',
        category: 'Residential',
        detail: ['Bridgehampton_ Luxury', 'Summer House', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Residential/Prolog/2.jpg',
        category: 'Residential',
        detail: ['Test Test', 'Test Test', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Pivot/1.jpg',
        category: 'Workplace',
        detail: ['Pivot_Studio', 'Apartment Renovation', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Transformer/1.jpg',
        category: 'Workplace',
        detail: ['Transformer_Studio', 'Apartment Renovation', '2026'],
        year: '2026'
    },
    {
        cover: 'images/Archive/Workplace/Fooddography/1.jpg',
        category: 'Workplace',
        detail: ['Test Test', 'Test Test', '2026'],
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
        data = data.filter((item) => item.category === filters.category);
    }

    if (filters.time === 'From new to old') {
        data.sort((a, b) => Number(b.year) - Number(a.year));
    } else if (filters.time === 'From Old to New') {
        data.sort((a, b) => Number(a.year) - Number(b.year));
    }

    archiveList.innerHTML = '';

    data.forEach(({ cover, detail }) => {
        const archiveItem = document.createElement('div');
        archiveItem.className = 'archive-item';
        archiveItem.style.backgroundImage = `url(${cover})`;

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
    toggle.textContent = label;

    const menu = document.createElement('div');
    menu.className = 'dropdown-menu';

    options.forEach((option) => {
        const item = document.createElement('div');
        item.className = 'dropdown-option';
        item.textContent = option;
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle.textContent = option;
            toggle.classList.add('underline');
            dropdown.classList.remove('open');

            if (key === 'category' || key === 'time') {
                filters[key] = option;
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


