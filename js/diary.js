'use strict';

{ 
  // 初回表示のインデックスは0番目
  let disp_index = 0;
  let diaryId;
  let timerId;
  // タイマ停止中で初期化
  let gbExe = 0;
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const hedContents = document.querySelector('.hedContents');
  const overlay = document.querySelector('.overlay');
  const good = document.querySelector('.good');
  const bad = document.querySelector('.bad');
  const gbmsg = document.querySelector('.gb-msg');
  
    // ハンバーガーメニュークリック時の動作
  let showHmenu = function() {
    // タイマ停止とメッセージ消去
    clearInterval(timerId);
    gbmsg.textContent = '';
    gbExe = 0;
    // 日付メニューを前面に表示
    overlay.classList.add('show');
    // ヘッダ部分を非表示とする
    hedContents.classList.add('done');
    // 現在表示している日記画面を非表示とする
    const diary = document.querySelectorAll('.diary');
    diary[disp_index].classList.add('done');
    // IMG画像のとき
    if (diary[disp_index].children[1].nodeName === 'IMG') {
      // 表示画像を透過ありに戻す
      diary[disp_index].children[1].classList.remove('changed');
    } else {
      // 動画のとき停止
      diary[disp_index].children[1].pause();
      // 再生を先頭に戻す
      diary[disp_index].children[1].currentTime = 0;
    }
    // 日記画面が2画面
    if (diary[disp_index].childElementCount === 5) {
      // IMG画像のとき
      if (diary[disp_index].children[3].nodeName === 'IMG') {
        // 表示画像を透過ありに戻す
        diary[disp_index].children[3].classList.remove('changed');
      } else {
        // 動画のとき停止
        diary[disp_index].children[1].pause();
        // 再生を先頭に戻す
        diary[disp_index].children[1].currentTime = 0;
      }
    }
  }
  // ハンバーガーメニューボタンのクリックを待ち受ける
  open.addEventListener('click', showHmenu);

  // クローズボタンのクリックを待ち受ける
  close.addEventListener('click', () => {
    // 日付メニューを消す
    overlay.classList.remove('show');
    // ヘッダ部分表示とする
    hedContents.classList.remove('done');
    // 日記画面を表示とする
    const diary = document.querySelectorAll('.diary');
    diary[disp_index].classList.remove('done');
    // 日記画面が1画面
    if (diary[disp_index].childElementCount === 3) {
      // IMG画像のとき
      if (diary[disp_index].children[1].nodeName === 'IMG') {
        // トランジション動作が終わるまでハンバーガーメニューボタン非表示[初回表示用]
        open.textContent = '';
        // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
        setTimeout(imgchange, 100);
      }
    // 日記画面が2画面
    } else if (diary[disp_index].childElementCount === 5) {
      // IMG画像が含まれるとき
      if (diary[disp_index].children[1].nodeName === 'IMG' || diary[disp_index].children[3].nodeName === 'IMG') {
        // トランジション動作が終わるまでハンバーガーメニューボタン非表示[初回表示用]
        open.textContent = '';
        // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
        setTimeout(imgchange, 100);
      }
    }
  });

  // トランジション動作が完全に終わってから
  let opendisp = function() {
    // ハンバーガーメニューボタンを表示
    open.textContent = 'menu';
  }

  // タイマのコールバック関数 日記画面表示0.1秒後に実施
  let imgchange = function() {
    document.querySelectorAll('img').forEach((img) => {
      // 日付のIDが一致したら
      if (img.getAttribute('alt') === diaryId) {
        // 表示する日記画像を透過無しにする(CSSの設定で透過無し完了まで2秒かける)
        img.classList.add('changed');
        // トランジション動作が完全に終わるまで待つ
        setTimeout(opendisp, 2500);
      } else {
        // 表示画像以外は透過ありにする
        img.classList.remove('changed');
      }
    });
  }

  // 日付ボタンのクリックを待ち受ける
  document.querySelector('.day-btn').addEventListener('click', e => {
    // 押されたのがボタンの時
    if (e.target.nodeName === 'LI') {
      // 日付メニューを消す
      overlay.classList.remove('show');
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diary, index) => {
        // 押されたボタンの日記画面なら
        if (diary.id === e.target.id) {
          // インデックスを保存
          disp_index = index;
          // 日付のIDを保存
          diaryId = diary.id;
          // 日記画面を表示する
          diary.classList.remove('done');
          // ヘッダ部分を表示する
          hedContents.classList.remove('done');
          // 日記画面が1画面
          if (diary.childElementCount === 3) {
            // IMG画像のとき
            if (diary.children[1].nodeName === 'IMG') {
              // トランジション動作が終わるまでハンバーガーメニューボタン非表示[初回表示用]
              open.textContent = '';
              // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
              setTimeout(imgchange, 100);
            }
          // 日記画面が2画面
          } else if (diary.childElementCount === 5) {
            // IMG画像が含まれるとき
            if (diary.children[1].nodeName === 'IMG' || diary.children[3].nodeName === 'IMG') {
              // トランジション動作が終わるまでハンバーガーメニューボタン非表示[初回表示用]
              open.textContent = '';
              // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
              setTimeout(imgchange, 100);
            }
          }
          // 動画のみの場合はハンバーガーメニューボタンも表示しないし、画像も透過しない。
        }
        // 押されたボタンの日記画面以外
        else {
          // 日記画面を非表示にする
          diary.classList.add('done');
        }
      });
    }
  });

  let msgErase = function() {
    // タイマ停止中
    gbExe = 0;
    // メッセージクリア
    gbmsg.textContent = '';
  }

    // いいねボタンのクリックを待ち受ける
  good.addEventListener('click', () => {
    // 実行中は受付けない
    if (gbExe === 0) {
      // タイマ実行中
      gbExe = 1;
      // メッセージを表示
      gbmsg.textContent = 'ありがとう！';
      // 表示時間
      timerId = setTimeout(msgErase, 4000);
    }
  });

  // よくないねボタンのクリックを待ち受ける
  bad.addEventListener('click', () => {
    // 実行中は受付けない
    if (gbExe === 0) {
      // タイマ実行中
      gbExe = 1;
      // メッセージを表示
      gbmsg.textContent = 'なんだとぉ！';
      // 表示時間
      timerId = setTimeout(msgErase, 4000);
    }
  });



  // 先頭日付画面
  let diary = document.querySelector('.diary');
  // 日付IDを先頭日記画面のIDで初期化
  diaryId = diary.getAttribute('id');
  // 日記画面が1画面
  if (diary.childElementCount === 3) {
    // IMG画像のとき
    if (diary.children[1].nodeName === 'IMG') {
      // トランジション動作が終わるまでハンバーガーメニューボタン非表示[初回表示用]
      open.textContent = '';
      // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
      setTimeout(imgchange, 100);
    }
  // 日記画面が2画面
  } else if (diary.childElementCount === 5) {
    // IMG画像が含まれるとき
    if (diary.children[1].nodeName === 'IMG' || diary.children[3].nodeName === 'IMG') {
      // トランジション動作が終わるまでハンバーガーメニューボタン非表示[初回表示用]
      open.textContent = '';
      // 一旦透過画像表示し、0.1秒後に透過無し画像にする[初回表示用]
      setTimeout(imgchange, 100);
    }
  }
  // 動画のみの場合はハンバーガーメニューボタンも表示しないし、画像も透過しない。

}
