'use strict';

{ 
  // 初回表示のインデックスは0番目
  let disp_index = 0;
  // いいね数
  let gnum = [];
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const good = document.getElementById('good');
  const bad = document.getElementById('bad');
  const gCounter = document.getElementById('g-cnt');
  const bCounter = document.getElementById('b-cnt');
  const diary = document.querySelectorAll('.diary');
  const hedContents = document.querySelector('.hedContents');
  const overlay = document.querySelector('.overlay');
  const container = document.querySelector('.container');
  const dayBtn = document.querySelector('.day-btn');
  const historyBtn = document.querySelector('.history');

// ---------------------------------------------------------------------
// ハンバーガーメニューボタン押下処理
// ---------------------------------------------------------------------
  // ハンバーガーメニュークリック時の動作
  let showHmenu = function() {
    // 日付メニューを前面に表示
    overlay.classList.remove('dnone');
    // ヘッダ部分を非表示とする
    hedContents.classList.add('dnone');
    // 更新履歴ボタンを非表示とする
    historyBtn.classList.add('dnone');
    // 現在表示している日記画面を非表示とする
    diary[disp_index].classList.add('dnone');
    // いいね/よくないねを非表示
    container.classList.add('dnone');
    // いいね/よくないね音声を停止
    good_audio.pause();
    bad_audio.pause();
    // タイプライタ表示
    if (diary[disp_index].children[2].nodeName === 'P' && 
        diary[disp_index].children[2].classList.contains('d-twr') === true) {
      // タイプライタ文章を元に戻す
      diary[disp_index].children[2].textContent = charP;
      // カウントMAXにしてこれ以上タイプライタ処理を実行させない。
      charCnt = charLen;
    }
    // 動画のとき
    if (diary[disp_index].children[1].nodeName === 'VIDEO') {
      // 動画停止
      diary[disp_index].children[1].pause();
      // 再生を先頭に戻す
      diary[disp_index].children[1].currentTime = 0;
    }
    // 日記画面が2画面
    if (diary[disp_index].childElementCount === 5) {
      // 動画のとき
      if (diary[disp_index].children[3].nodeName === 'VIDEO') {
        // 動画停止
        diary[disp_index].children[3].pause();
        // 再生を先頭に戻す
        diary[disp_index].children[3].currentTime = 0;
      }
    }
  }
  // ハンバーガーメニューボタンのクリックを待ち受ける
  open.addEventListener('click', showHmenu);

  // ---------------------------------------------------------------------
  // クローズボタン押下処理
  // ---------------------------------------------------------------------
  // クローズボタンのクリックを待ち受ける
  close.addEventListener('click', () => {
    // 日付メニューを消す
    overlay.classList.add('dnone');
    // ヘッダ部分表示とする
    hedContents.classList.remove('dnone');
    // 日記画面を表示とする
    diary[disp_index].classList.remove('dnone');
    // いいね/よくないねを非示
    container.classList.remove('dnone');
    // 更新履歴ボタンを表示する
    historyBtn.classList.remove('dnone');
    // タイプライタ表示
    if (diary[disp_index].children[2].nodeName === 'P' && 
        diary[disp_index].children[2].classList.contains('d-twr') === true) {
      charLen = diary[disp_index].children[2].textContent.length;
      charP = diary[disp_index].children[2].textContent;
      diary[disp_index].children[2].textContent = '';
      charCnt = 0;
      setTimeout(charSlice, 100);
    }
  });
  // ---------------------------------------------------------------------
  // 日付ボタン押下処理
  // ---------------------------------------------------------------------
  // 日付ボタンのクリックを待ち受ける
  document.querySelector('.day-btn').addEventListener('click', e => {
    // 押されたのがボタンの時
    if (e.target.nodeName === 'LI') {
      // 日付メニューを消す
      overlay.classList.add('dnone');
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diary, index) => {
        // 押されたボタンの日記画面なら
        if (diary.id === e.target.id) {
          // インデックスを保存
          disp_index = index;
          // 日記画面を表示する
          diary.classList.remove('dnone');
          // ヘッダ部分を表示する
          hedContents.classList.remove('dnone');
          // 更新履歴ボタンを表示する
          historyBtn.classList.remove('dnone');
          // いいね/よくないねを表示する
          container.classList.remove('dnone');
          // いいね数を設定
          gCounter.textContent = gnum[disp_index];
          // タイプライタ表示
          if (diary.children[2].nodeName === 'P' && 
              diary.children[2].classList.contains('d-twr') === true) {
            charLen = diary.children[2].textContent.length;
            charP = diary.children[2].textContent;
            diary.children[2].textContent = '';
            charCnt = 0;
            setTimeout(charSlice, 100);
          }
        }
        // 押されたボタンの日記画面以外
        else {
          // 日記画面を非表示にする
          diary.classList.add('dnone');
        }
      });
    }
  });

  // ---------------------------------------------------------------------
  // いいね/よくないねボタン押下処理
  // ---------------------------------------------------------------------
  // いいね数初期化
  for (let i = 0;  i < dayBtn.childElementCount; i++) {
    gnum[i] = 0;
  }
  // いいね/よくないね音声のインスタンス作成
  let good_audio = new Audio("audio/good.mp3");
  let bad_audio = new Audio("audio/bad.mp3");
  // いいねボタンのクリックを待ち受ける
  good.addEventListener('click', () => {
    // いいね。カウントアップ
    gnum[disp_index]++;
    // いいね。カウント数表示
    gCounter.textContent = `${gnum[disp_index]}`;
    // いいね音声を頭から再生
    bad_audio.pause();
    good_audio.currentTime = 0;
    good_audio.play();
  });

  // よくないねボタンのクリックを待ち受ける
  bad.addEventListener('click', () => {
    // いいね。カウント数表示
    bCounter.textContent = '1';
    // よくないね音声を頭から再生
    good_audio.pause();
    bad_audio.currentTime = 0;
    bad_audio.play();
    // 0.1秒後に0に戻す
    setTimeout(bcntRev, 100);
  });

  let bcntRev = function(){
    // いいね。カウント数表示
    bCounter.textContent = '0';
  };
  
// ---------------------------------------------------------------------
// 画像押下処理(文章タイプライタ表示用)
// ---------------------------------------------------------------------
  let charCnt = 0;
  let charLen = diary[disp_index].children[2].textContent.length;
  let charP = diary[disp_index].children[2].textContent;

  let charSlice = function(){
    if (charCnt >= charLen) 
    {
      return; 
    }
    diary[disp_index].children[2].textContent += charP.slice(charCnt, 1 + charCnt);
    charCnt++;
    setTimeout(charSlice, 100);
  };
  // タイプライタ表示のとき
  if (diary[disp_index].children[2].nodeName === 'P' && 
      diary[disp_index].children[2].classList.contains('d-twr') === true) {
    diary[disp_index].children[2].textContent = '';
    setTimeout(charSlice, 100);
  }

}

