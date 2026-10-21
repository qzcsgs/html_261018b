/* 数据 */
const ITEMS = [
  {
    name: "Ammunition_Clerestory_©Architecture-Workshop",
    text: [
      "Robert Eric<br>2024",
      `Lantern is an 1800s Tribeca loft with 12ft concrete ceilings and windows on both ends of the 100ft long space. The client needed to accommodate a growing family with three kids.
      The first action was to replace it with new windows tripled in size to let in more sunlight.
      The primary design intent was to highlight and bring daylight deep into the middle of the apartment by maximizing the flow of light through all the rooms. The solution was to limit walls to 8ft and add a ribbon of clerestory above to let light permeate throughout. Continuous LED lighting along the glass creates a soft lantern glow bringing the impression of daylight. 
      `,
      `The master suite includes built-in storage along all the walls, some painted white to recede, others showcased in rift Oak The bathroom has a walk-in shower with frosted glass partitions also used to make an enclosable toilet.`,
      `A secondary bedroom has floor to ceiling open storage to display toys and books; the room also features a play-nook loft area above the walk-in-closet.`,
      `In the large common living space a pair of pivoting walls open to accommodate overnight guests with a wall-bed and a closet, as well as a concealed play area.`,
    ],
    img: "images/1.jpg",
    detailImgs: ["images/1/1.jpg", "images/1/2.jpg"],
    gridImgs: ["images/1/grid/1.jpg", "images/1/grid/2.jpg", "images/1/grid/3.jpg", "images/1/grid/4.jpg", "images/1/grid/5.jpg", "images/1/grid/6.jpg"]
  },
  {
    name: "Foodography_Kitchen Adrienne_©Architecture-Workshop",
    text: "Foodography_Kitchen Adrienne_©Architecture-Workshop",
    img: "images/2.jpg",
    detailImgs: [],
    gridImgs: []
  },
  {
    name: "Prolog_Living-Room-day_©Architecture-Workshop",
    text: "Prolog_Living-Room-day_©Architecture-Workshop",
    img: "images/3.jpg",
    detailImgs: [],
    gridImgs: []
  },
  {
    name: "Pivot_Side-pivoting_©Architecture-Workshop",
    text: "Pivot_Side-pivoting_©Architecture-Workshop",
    img: "images/4.jpg",
    detailImgs: [],
    gridImgs: []
  },
];

/* 可配置参数 */
let SPEED = 300; // 横移动画时长(ms)，可通过左下角滑块调整

/* 构建 3 份循环轨道 */
const N = ITEMS.length;
const track = document.getElementById("track");
const slides = [];

for (let copy = 0; copy < 3; copy++) {
  ITEMS.forEach((item, i) => {
    const img = document.createElement("img");
    img.className = "slide";
    img.src = item.img;
    img.alt = item.title;
    img.draggable = false;
    track.appendChild(img);
    slides.push(img);
  });
}

let index = N; // 从中间一份的第 0 张开始

function applyTransition() {
  track.style.transition = `transform ${SPEED}ms cubic-bezier(.25,.8,.25,1)`;
}

function position(animate = true) {
  const target = slides[index];
  const itemCenter = target.offsetLeft + target.offsetWidth / 2;
  const x = -(itemCenter - window.innerWidth / 2);
  if (!animate) track.classList.add("no-anim");
  track.style.transform = `translate3d(${x}px,0,0)`;
  if (!animate) {
    track.getBoundingClientRect(); // 强制回流
    track.classList.remove("no-anim");
  }
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  const textUI = document.querySelector(".text-ui");
  const nameDom = document.getElementById("name");
  textUI.style.width = target.offsetWidth + "px";
  textUI.style.height = target.offsetHeight + "px";
  nameDom.style.width = target.offsetWidth + "px";
  document.querySelector(".content").style.width = target.offsetWidth + "px";
}

/* loop：动画结束后，若越过中间副本边界则无声跳回 */
track.addEventListener("transitionend", (e) => {
  if (e.propertyName !== "transform") return;
  if (index >= 2 * N) { index -= N; position(false); }
  else if (index < N) { index += N; position(false); }
  updateContent();
});

function go(dir) {
  index += dir;
  applyTransition();
  position(true);
}

/* 自定义鼠标 */
const label = document.getElementById("cursorLabel");
const hero = document.querySelector(".hero");
let zone = 0; // -1 prev, 0 none, 1 next

document.addEventListener("mousemove", (e) => {
  const w = window.innerWidth;
  const overHero = view === "top" && e.clientY <= hero.getBoundingClientRect().bottom && e.clientY >= 0;
  if (overHero && e.clientX < w / 8) zone = -1;
  else if (overHero && e.clientX > (w * 7) / 8) zone = 1;
  else zone = 0;

  if (zone !== 0) {
    label.textContent = zone === -1 ? "Previous" : "Next";
    label.style.left = e.clientX + "px";
    label.style.top = e.clientY + "px";
    label.classList.add("show");
    document.body.classList.add("zone-cursor");
  } else {
    label.classList.remove("show");
    document.body.classList.remove("zone-cursor");
  }
});

let lastClick = 0;
document.addEventListener("click", (e) => {
  if (e.target instanceof Element && e.target.closest(".speed-ctrl")) return;
  const now = performance.now();
  if (now - lastClick < 150) return; // 防止异常连发
  lastClick = now;
  if (zone === -1) go(-1);
  else if (zone === 1) go(1);
});

/* 滚动闸口：顶部下滑直接滑到 70vh 详情位；70vh 区域内上滑直接回顶；其余自由滚动 */
let view = "top";
let wheelLock = false;

window.addEventListener("wheel", (e) => {
  const detailY = window.innerHeight * 0.7;
  const y = window.scrollY;

  if (wheelLock) { e.preventDefault(); return; }

  if (e.deltaY > 0 && y <= 1) {
    // 顶部向下滑：直接滑动 70vh 进入详情
    e.preventDefault();
    wheelLock = true;
    view = "bottom";
    document.body.classList.add("detail");
    window.scrollTo({ top: detailY, behavior: "smooth" });
    setTimeout(() => (wheelLock = false), 800);
  } else if (e.deltaY < 0 && y > 1 && y <= detailY) {
    // 上滑进入 70vh 区域：直接回顶
    e.preventDefault();
    wheelLock = true;
    view = "top";
    document.body.classList.remove("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => (wheelLock = false), 800);
  }
  /* 其余情况不拦截，页面正常滚动 */
}, { passive: false });

/* 点击 Next Project：回顶并切换下一张主图 */
document.addEventListener("click", (e) => {
  if (!(e.target instanceof Element) || !e.target.closest(".text-next")) return;
  wheelLock = true;
  view = "top";
  document.body.classList.remove("detail");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => (wheelLock = false), 800);
  go(1);
});

/* 下方内容 */
const contentInner = document.getElementById("contentInner");
const contentTextWrapper = document.getElementById("contentTextWrapper");
const grids = document.getElementById("grids");
const cName = document.getElementById("name");
const cImgs = document.getElementById("contentImg");

function updateContent() {
  const real = ((index % N) + N) % N;
  const item = ITEMS[real];
  contentInner.classList.remove("visible");
  setTimeout(() => {
    cName.textContent = item.name;
    contentInner.classList.add("visible");
    cImgs.innerHTML = "";
    item.detailImgs.forEach((img) => {
      const imgElement = document.createElement("img");
      imgElement.src = img;
      imgElement.alt = item.title;
      imgElement.draggable = false;
      cImgs.appendChild(imgElement);
    });
    grids.innerHTML = item.gridImgs.map((img) => `<img src="${img}">`).join("");
    contentTextWrapper.querySelectorAll("p.contentText").forEach((p) => p.remove());
    contentTextWrapper.querySelectorAll("br").forEach((p) => p.remove());
    const texts = Array.isArray(item.text) ? item.text : [item.text];
    let centerIndex = Math.floor(texts.length / 2);
    texts.forEach((text, i) => {
      const pElement = document.createElement("p");
      pElement.classList.add("contentText");
      if (i == 0) {
        pElement.classList.add("first");
      }
      if (i == centerIndex) {
        pElement.innerHTML = text;
      } else {
        pElement.innerHTML = text;
      }
      contentTextWrapper.appendChild(pElement);
      contentTextWrapper.appendChild(document.createElement("br"));
    });
  }, 100);
}

/* 初始化 */
history.scrollRestoration = "manual"; // 禁止浏览器恢复上次滚动位置
window.scrollTo(0, 0);
window.addEventListener("resize", () => position(false));
applyTransition();
// 等图片加载出宽度后定位
window.addEventListener("load", () => position(false));
position(false);
updateContent();