'use strict';

{ 
  // 初回表示のインデックスは0番目
  let disp_index = 0;
  // いいね数
  let gnum = [];
  // よくないね数
  let bnum = [];
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const hedContents = document.querySelector('.hedContents');
  const overlay = document.querySelector('.overlay');
  const good = document.querySelector('.good');
  const bad = document.querySelector('.bad');
  const container = document.querySelector('.container');
  const gCounter = document.querySelector('.g-cnt');
  const bCounter = document.querySelector('.b-cnt');
  
  // ハンバーガーメニュークリック時の動作
  let showHmenu = function() {
    // 日付メニューを前面に表示
    overlay.classList.add('show');
    // ヘッダ部分を非表示とする
    hedContents.classList.add('done');
    // 現在表示している日記画面を非表示とする
    const diary = document.querySelectorAll('.diary');
    diary[disp_index].classList.add('done');
    // いいね。よくないね。を非表示
    container.classList.add('done');
    // 動画のとき
    if (diary[disp_index].children[1].nodeName === 'VIDEO') {
      // 動画停止
      diary[disp_index].children[1].pause();
      // 再生を先頭に戻す
      diary[disp_index].children[1].currentTime = 0;
    }
    // 日記画面が2画面
    if (diary[disp_index].childElementCount === 5) {
      // IMG画像のとき
      if (diary[disp_index].children[3].nodeName === 'VIDEO') {
        // 動画停止
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
    // いいね/よくないねを非示
    container.classList.remove('done');
  });

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
          // diaryId = diary.id;
          // 日記画面を表示する
          diary.classList.remove('done');
          // ヘッダ部分を表示する
          hedContents.classList.remove('done');
          // いいね/よくないねを非示する
          container.classList.remove('done');
          // いいね/よくないね数を設定
          gCounter.textContent = gnum[disp_index];
          bCounter.textContent = bnum[disp_index];
        }
        // 押されたボタンの日記画面以外
        else {
          // 日記画面を非表示にする
          diary.classList.add('done');
        }
      });
    }
  });

  // いいね/よくないね数初期化
  for (let i = 0;  i < 10; i++) {
    gnum[i] = 0;
    bnum[i] = 0;
  }
    // いいねボタンのクリックを待ち受ける
  good.addEventListener('click', () => {
    // いいね。カウントアップ
    gnum[disp_index]++;
    // いいね。カウント数表示
    gCounter.textContent = `${gnum[disp_index]}`;
  });

    // よくないねボタンのクリックを待ち受ける
  bad.addEventListener('click', () => {
    // よくないね。カウントアップ
    bnum[disp_index]++;
    // よくないね。カウント数表示
    bCounter.textContent = `${bnum[disp_index]}`;
  });

}
