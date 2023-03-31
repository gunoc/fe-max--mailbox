import { customQuerySelector } from './selector.js';
//미션 축소
//셀렉터를 만든다
//개수를 5개로 제한하고, 마을의 depth는 1개로, 우체통은 고정 크기로 1개, 정렬을 위해 크기를 다르게 부여한다
//프로미스, then체이닝 등을 공부한다

//마을 5개를 랜덤한 위치에, 랜덤한 크기로 생성한다
//위치는 land area를 기준으로 제한하고, 크기는 영역안에 배치될 적당한 크기인 50~250px로 제한한다
//land area를 relative로 설정한다
//div 끼리 영역이 겹치지 않는다면 생성하는 조건으로  5개를 생성한다
//land area에 노드 append

const clickInfoBtn = () => {
  const root = document.body;
  const mailCheckBtn = customQuerySelector(root, '.mail-check-btn');
  mailCheckBtn.addEventListener('click', function () {
    let quiz = prompt('클릭이벤트');
    if (quiz === '조건') {
      alert('달아주기');
    }
  });
};

const app = () => {
  const maxtownAreaCount = 5;
  const root = document.body;
  const landArea = customQuerySelector(root, '.land-area');
  const townAreaDivs = [];

  for (let i = 0; i < maxtownAreaCount; i++) {
    const townArea = document.createElement('div');
    let townAreaWidth, townAreaHeight, townAreaTop, townAreaLeft;

    do {
      townAreaWidth = Math.floor(Math.random() * 200) + 50;
      townAreaHeight = Math.floor(Math.random() * 200) + 50;
      townAreaTop = Math.floor(Math.random() * 500) + 50;
      townAreaLeft = Math.floor(Math.random() * 700) + 50;
    } while (
      isOverlap({
        townAreaDivs,
        townAreaWidth,
        townAreaHeight,
        townAreaTop,
        townAreaLeft,
      })
    );

    townArea.classList.add('town-area');
    townArea.textContent = String.fromCharCode(65 + townAreaDivs.length);
    townArea.style.position = 'absolute';
    townArea.style.width = `${townAreaWidth}px`;
    townArea.style.height = `${townAreaHeight}px`;
    townArea.style.top = `${townAreaTop}px`;
    townArea.style.left = `${townAreaLeft}px`;
    townArea.style.border = `1px solid black`;

    landArea.appendChild(townArea);
    townAreaDivs.push({
      id: townArea.textContent,
      top: townAreaWidth,
      left: townAreaLeft,
      width: townAreaWidth,
      height: townAreaHeight,
    });
  }
};

const isOverlap = ({
  townAreaDivs,
  townAreaWidth,
  townAreaHeight,
  townAreaTop,
  townAreaLeft,
}) => {
  for (const div of townAreaDivs) {
    if (
      townAreaTop + townAreaHeight < div.top ||
      townAreaTop > div.top + div.height ||
      townAreaLeft + townAreaWidth < div.left ||
      townAreaLeft > div.left + div.width
    ) {
      continue;
    }
    return true;
  }
  return false;
};

app();
clickInfoBtn();
