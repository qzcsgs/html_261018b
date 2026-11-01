const homeImgData = [
    {
        img: 'images/1.jpg',
        detail: ['Lantern', 'Residential Renovation', '2022'],
        class: 'img-height'
    },
    {
        img: 'images/2.jpg',
        detail: ['Theological Seminary', 'Loft Aparment Renovation', '2023'],
        class: 'img-height'
    },
    {
        img: 'images/3.jpg',
        detail: ['Theological Seminary', 'Loft Aparment Renovation', '2023'],
        class: 'img-width'
    },
    {
        img: 'images/4.jpg',
        detail: ['Theological Seminary', 'Loft Aparment Renovation', '2023'],
        class: 'img-height'
    },
    {
        img: 'images/5.jpg',
        detail: ['Theological Seminary', 'Loft Aparment Renovation', '2023'],
        class: 'img-width'
    },
    {
        img: 'images/6.jpg',
        detail: ['Theological Seminary', 'Loft Aparment Renovation', '2023'],
        class: 'img-height'
    },
    {
        img: 'images/7.jpg',
        detail: ['Theological Seminary', 'Loft Aparment Renovation', '2023'],
        class: 'img-width'
    },
]

const homeImgList = document.querySelector('.home-img-list');

homeImgData.forEach(({ img, detail, class: imgClass }) => {
    const homeImg = document.createElement('div');
    homeImg.className = `home-img ${imgClass}`;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'img-wrap';
    imgWrap.style.backgroundImage = `url(${img})`;

    const homeImgDetail = document.createElement('div');
    homeImgDetail.className = 'home-img-detail';
    detail.forEach((text) => {
        const line = document.createElement('div');
        line.textContent = text;
        homeImgDetail.appendChild(line);
    });

    homeImg.append(imgWrap, homeImgDetail);
    homeImgList.appendChild(homeImg);
});
