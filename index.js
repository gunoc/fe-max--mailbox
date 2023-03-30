import { customQuerySelector, customQuerySelectorAll } from './selector.js';
const root = document.body;

const VILLAGE = {
  minSize: 100,
  maxSize: 150,
  count: 10,
};

function generateVillage() {
  let villageList = [];

  return function () {
    const landArea = customQuerySelector(root, '.land-area');
    const newVillage = {
      id: String.fromCharCode(65 + villageList.length),
      x: Math.floor(Math.random() * (landArea.clientWidth - VILLAGE.maxSize)),
      y: Math.floor(Math.random() * (landArea.clientHeight - VILLAGE.maxSize)),
      width: Math.floor(Math.random() * VILLAGE.maxSize) + VILLAGE.minSize,
      height: Math.floor(Math.random() * VILLAGE.maxSize) + VILLAGE.minSize,
    };

    makeVillageList({ villageList, newVillage, landArea });

    return villageList;
  };
}

function isWithinLandArea({ newVillage, landArea }) {
  return (
    newVillage.x >= 0 &&
    newVillage.y >= 0 &&
    newVillage.x + newVillage.width <= landArea.clientWidth &&
    newVillage.y + newVillage.height <= landArea.clientHeight
  );
}

function checkOverlap(newVillage, existingVillages) {
  return existingVillages.some(village => {
    const xOverlap =
      newVillage.x + newVillage.width > village.x &&
      newVillage.x < village.x + village.width;
    const yOverlap =
      newVillage.y + newVillage.height > village.y &&
      newVillage.y < village.y + village.height;
    return xOverlap && yOverlap;
  });
}

function makeVillageList({ villageList, newVillage, landArea }) {
  if (
    !checkOverlap(newVillage, villageList) &&
    isWithinLandArea({ newVillage, landArea })
  ) {
    const element = createVillage({
      ...newVillage,
      x: newVillage.x + landArea.offsetLeft,
      y: newVillage.y + landArea.offsetTop,
    });
    villageList.push(newVillage);
    landArea.appendChild(element);
  }
}

function createVillage(village) {
  const villageDiv = document.createElement('div');
  villageDiv.classList.add('village');
  villageDiv.id = village.id;
  villageDiv.style.left = village.x + 'px';
  villageDiv.style.top = village.y + 'px';
  villageDiv.style.width = village.width + 'px';
  villageDiv.style.height = village.height + 'px';
  villageDiv.textContent = village.id;
  return villageDiv;
}

function getRandomMailboxSize(minSize, maxSize) {
  const size = Math.floor(Math.random() * maxSize) + minSize;
  return `${size}px`;
}

(function init() {
  const generateVillageFn = generateVillage();
  const villageList = generateVillageFn();

  for (let i = 0; i < VILLAGE.count; i++) {
    generateVillageFn();
  }
})();
