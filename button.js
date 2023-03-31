import { customQuerySelector, customQuerySelectorAll } from './selector.js';
const root = document.body;

const checkMailboxBtn = customQuerySelector(root, '.mail-check-btn');
checkMailboxBtn.addEventListener('click', handleClickbutton);

function handleClickbutton() {
  const mailBoxes = customQuerySelectorAll(root, '.mail-box');

  showInfoTextBox(mailBoxes);
  changeStyleVillagesWithMailbox(mailBoxes);
}

function showInfoTextBox(mailBoxes) {
  const [villageInfo, mailInfo] = customQuerySelectorAll(root, '.info-text');
  villageInfo.classList.remove('hide');
  mailInfo.classList.remove('hide');
  mailboxInfo(mailBoxes);
}

function mailboxInfo(mailBoxes) {
  const mailboxsData = setVillagesWithMailbox(mailBoxes);
  totalVillagesWithMailbox(mailboxsData);
  sortVillagesWithMailbox(mailboxsData);
}

function setVillagesWithMailbox(mailBoxes) {
  const mailboxsWithIdAndSize = [];

  mailBoxes.forEach(mailBox => {
    const size = parseInt(mailBox.dataset.size);
    const id = mailBox.parentElement.id;
    mailboxsWithIdAndSize.push({ id, size });
  });

  return mailboxsWithIdAndSize;
}

function totalVillagesWithMailbox(mailBoxes) {
  const villageInfoEl = customQuerySelector(root, '.village-info-text');
  const villageCount = mailBoxes.length;
  const villageNames = mailBoxes.map(box => box.id).join(', ');
  villageInfoEl.textContent = `${villageNames} 총 ${villageCount}개의 마을 입니다.`;
}

function sortVillagesWithMailbox(mailBoxes) {
  const mailInfoEl = customQuerySelector(root, '.mail-info-text');
  const sortedSize = sortSize(mailBoxes)
    .map(box => box.id)
    .join(', ');
  mailInfoEl.textContent = `우체통의 크기는 ${sortedSize} 순입니다.`;
}

function changeStyleVillagesWithMailbox(mailBoxes) {
  mailBoxes.forEach(mailbox => {
    mailbox.parentElement.style.borderColor = 'red';
  });
}

function sortSize(mailBoxes) {
  for (let i = 1; i < mailBoxes.length; i++) {
    let current = mailBoxes[i];
    let j = i - 1;
    while (j >= 0 && mailBoxes[j].size < current.size) {
      mailBoxes[j + 1] = mailBoxes[j];
      j--;
    }
    mailBoxes[j + 1] = current;
  }
  return mailBoxes;
}
