'use strict';

{ 
  // 初回表示のインデックスは0番目
  let img_index = 0;
  let hmavAilable = 1;
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const hedContents = document.querySelector('.hedContents');
  const overlay = document.querySelector('.overlay');

    // ハンバーガーメニュークリック時の動作
  let showHmenu = function() {
    // ハンバーガーメニュー有効の時のみ。それ以外はイベント破棄。
    if (hmavAilable === 0) {
      // 日付メニューを前面に表示
      overlay.classList.add('show');
      // ヘッダ部分を非表示とする
      hedContents.classList.add('done');
      // 現在表示している日記画面を非表示とする
      document.querySelectorAll('.diary')[img_index].classList.add('done');
      // 表示画像を透過ありにする
      document.querySelectorAll('img')[img_index].classList.remove('changed');
    }
  }
  // ハンバーガーメニューボタンのクリックを待ち受ける
  open.addEventListener('click', showHmenu);

  // クローズメニューボタンのクリックを待ち受ける
  close.addEventListener('click', () => {
    // 日付メニューを消す
    overlay.classList.remove('show');
    // ヘッダ部分表示とする
    hedContents.classList.remove('done');
    // 日記画面を表示とする
    document.querySelectorAll('.diary')[img_index].classList.remove('done');
    // ハンバーガーメニュー押下無効にする。
    hmavAilable = 1;
    // 0.1秒後に透過無し画像にする
    setTimeout(imgchange, 100);
  });

  // トランジション動作が完全に終わってから
  let opendisp = function() {
    // ハンバーガーメニュー押下有効にする。
    hmavAilable = 0;
  }

  // タイマのコールバック関数 日記画面表示0.1秒後に実施
  let imgchange = function() {
    document.querySelectorAll('img').forEach((img_diary, index) => {
      if (img_index === index) {
        // 表示する日記画像を透過無しにする(CSSの設定で透過無し完了まで2秒かける)
        img_diary.classList.add('changed');
        // トランジション動作が完全に終わるまで待つ
        setTimeout(opendisp, 2000);
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
    if (e.target.nodeName === 'LI') {
      // 日付メニューを消す
      overlay.classList.remove('show');
      // ハンバーガーメニューボタンを非表示にする
      // open.classList.add('hide');
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diary, index) => {
        // 押されたボタンの日記画面なら
        if (diary.id === e.target.id) {
          // インデックスを保存
          img_index = index;
          // 日記画面を表示する
          diary.classList.remove('done');
          // ヘッダ部分を表示する
          hedContents.classList.remove('done');
          // ハンバーガーメニュー押下無効にする。
          hmavAilable = 1;
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
