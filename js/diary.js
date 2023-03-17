'use strict';

{ 
  // 初回表示のインデックスは0番目
  let img_index = 0;  

  let imgchange = function() {
    document.querySelectorAll('img').forEach((img_diary, index) => {
      if (img_index === index) {
        // 表示する日記画像を透過無しにする(CSSの設定で透過無し完了まで2秒かける)
        img_diary.classList.add('changed');
      }
      else {
        // 表示画像以外は透過ありにする
        img_diary.classList.remove('changed');
      }
    });
  }

  // 日付ボタンのクリックを待ち受ける
  document.querySelector('.day-btn-all').addEventListener('click', e => {
    // 押されたのがボタンの時
    if (e.target.nodeName === 'BUTTON') {
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diary, index) => {
        // 押されたボタンの日記画面なら
        if (diary.id === e.target.id) {
          // インデックスを保存
          img_index = index;
          // 日記画面を表示する
          diary.classList.remove('done');
          //  0.1秒後に透過無し画像にする
          setTimeout(imgchange, 100);
        }
        // 押されたボタンの日記画面以外
        else {
          // 日記画面を非表示にする
          diary.classList.add('done');
        }
      });
    }
  });

  // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
  setTimeout(imgchange, 100);

}
