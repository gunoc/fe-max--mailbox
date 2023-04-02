import { customQuerySelector, customQuerySelectorAll } from './selector.js';
const root = document.body;

const VILLAGE = {
  minSize: 100,
  maxSize: 150,
  count: 10,
};

const MAILBOX = {
  icon: '📫',
  minSize: 1,
  maxSize: 50,
  percent: 0.5,
  sizes: new Set(),
};

function generateVillage() {
  const villageList = [];

  return villageCount => {
    const landArea = customQuerySelector(root, '.land-area');

    for (let i = 0; i < villageCount; i++) {
      const newVillage = {
        id: String.fromCharCode(65 + villageList.length),
        x: Math.floor(Math.random() * (landArea.clientWidth - VILLAGE.maxSize)),
        y: Math.floor(
          Math.random() * (landArea.clientHeight - VILLAGE.maxSize)
        ),
        width: Math.floor(Math.random() * VILLAGE.maxSize) + VILLAGE.minSize,
        height: Math.floor(Math.random() * VILLAGE.maxSize) + VILLAGE.minSize,
      };

      makeVillageList({ villageList, newVillage, landArea });
    }
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
    const newVillageElement = createVillage({
      ...newVillage,
      x: newVillage.x + landArea.offsetLeft,
      y: newVillage.y + landArea.offsetTop,
    });

    villageList.push(newVillage);
    landArea.appendChild(newVillageElement);

    if (Math.random() < MAILBOX.percent) {
      let mailboxSize = getRandomMailboxSize(MAILBOX.minSize, MAILBOX.maxSize);

      while (MAILBOX.sizes.has(mailboxSize)) {
        mailboxSize = getRandomMailboxSize(MAILBOX.minSize, MAILBOX.maxSize);
      }
      MAILBOX.sizes.add(mailboxSize);

      const mailbox = document.createElement('div');
      mailbox.classList.add('mail-box');
      mailbox.dataset.size = mailboxSize;
      mailbox.textContent = MAILBOX.icon;
      newVillageElement.appendChild(mailbox);
    }
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
  return size;
}

(function init() {
  const generateVillageFn = generateVillage();
  generateVillageFn(VILLAGE.count);
})();
