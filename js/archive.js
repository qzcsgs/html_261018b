const filterData = [
    {
        label: 'Category',
        options: ['Cultural', 'Hospitality', 'Institutional', 'Residential', 'Workplace']
    },
    {
        label: 'Time',
        options: ['From new to old', 'From Old to New']
    },
    {
        label: 'Images/Index',
        options: ['12345', '23456', '34567']
    }
];

const actions = document.querySelector('.actions');
const dropdowns = [];

filterData.forEach(({ label, options }) => {
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
