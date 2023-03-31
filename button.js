import { customQuerySelector, customQuerySelectorAll } from './selector.js';
const root = document.body;

const checkMailboxBtn = customQuerySelector(root, '.mail-check-btn');
checkMailboxBtn.addEventListener('click', handleClickbutton);

function handleClickbutton() {
  const mailBoxes = customQuerySelectorAll(root, '.mail-box');

  changeStyleVillagesWithMailbox(mailBoxes);
}

function changeStyleVillagesWithMailbox(mailBoxes) {
  mailBoxes.forEach(mailbox => {
    mailbox.parentElement.style.borderColor = 'red';
  });
}
