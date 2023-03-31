// 젤첨에 뽑혔던거 벌써 머리 아픔
function handleClickbutton() {
    const mailboxEl = customQuerySelectorAll(root, '.mail-box');
    console.log(mailboxEl);
  
    changeStyleVillagesWithMailbox(mailboxEl);
  
    // Promise를 사용하여 1초 후에 renderMailboxInfo 함수 실행
    const renderMailboxInfoPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        renderMailboxInfo(mailboxEl);
        resolve();
      }, 1000);
    });
  
    // Promise를 사용하여 2초 후에 changeStyleVillagesWithMailbox 함수 실행
    const changeStyleVillagesPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        changeStyleVillagesWithMailbox(mailboxEl);
        resolve();
      }, 2000);
    });
  
    // 두 Promise를 병렬로 실행하고 끝날 때까지 기다림
    Promise.all([renderMailboxInfoPromise, changeStyleVillagesPromise]).then(
      () => {
        console.log('done');
      }
    );
  }
  
  // 두번째
  function handleClickbutton() {
    const mailboxEl = customQuerySelectorAll(root, '.mail-box');
    console.log(mailboxEl);
  
    // 1초 후에 정보 표시
    showMailboxInfo().then(() => {
      // 1초 후에 테두리 색상 변경
      return new Promise(resolve => {
        setTimeout(() => {
          changeStyleVillagesWithMailbox(mailboxEl);
          resolve();
        }, 1000);
      });
    });
  }
  
  function showMailboxInfo() {
    return new Promise(resolve => {
      setTimeout(() => {
        const mailboxEl = customQuerySelectorAll(root, '.mail-box');
        const mailboxsWithIdAndSize = setVillagesWithMailbox(mailboxEl);
  
        totalVillagesWithMailbox(mailboxsWithIdAndSize);
        sortVillagesWithMailbox(mailboxsWithIdAndSize);
        resolve();
      }, 1000);
    });
  }
  
  // 체이닝을 물어보니까
  function handleClickbutton() {
    const mailboxEl = customQuerySelectorAll(root, '.mail-box');
    console.log(mailboxEl);
  
    changeStyleVillagesWithMailbox(mailboxEl)
      .then(() => renderMailboxInfo(mailboxEl))
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
      .then(() => console.log('1초 뒤에 정보가 표시됩니다.')) //
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
      .then(() => console.log('2초 뒤에 테두리가 표시됩니다.')); //
  }
  
  function changeStyleVillagesWithMailbox(villages) {
    return new Promise(resolve => {
      villages.forEach(village => {
        village.parentElement.style.borderColor = 'red';
      });
      resolve();
    });
  }
  
  //
  function handleClickbutton() {
    const mailboxEl = customQuerySelectorAll(root, '.mail-box');
    console.log(mailboxEl);
  
    changeStyleVillagesWithMailbox(mailboxEl)
      .then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      })
      .then(() => {
        renderMailboxInfo(mailboxEl);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      })
      .then(() => {
        console.log('finished');
      });
  }
  
  function changeStyleVillagesWithMailbox(villages) {
    return new Promise(resolve => {
      villages.forEach((village, index) => {
        setTimeout(() => {
          village.parentElement.style.borderColor = 'red';
          if (index === villages.length - 1) {
            resolve();
          }
        }, index * 100);
      });
    });
  }
  