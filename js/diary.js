'use strict';

{ 

  document.querySelector('.day-btn-all').addEventListener('click', e => {
    let diaryContens;

    if (e.target.nodeName === 'BUTTON') {
      diaryContens = e.target.id;
      document.querySelectorAll('.diary').forEach((diary, index) => {
        diary.classList.add('done');
        if (diary.id === e.target.id) {
          diary.classList.remove('done');
        }
      });
    }
  });
}

