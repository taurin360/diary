'use strict';

{ 
  // 初回表示のインデックスは0番目
  let disp_index = 0;
  // いいね数
  let gnum = 0;
  let timeId;
  const good = document.getElementById('good');
  const bad = document.getElementById('bad');
  const gCounter = document.getElementById('g-cnt');
  const bCounter = document.getElementById('b-cnt');
  const diary = document.querySelectorAll('.diary');
  const menuHeader = document.querySelector('.menu-header');
  const diaryHeader = document.querySelector('.diary-header');
  const diaryList = document.querySelector('.diary-list');
  const goodBad = document.querySelector('.good-bad');
  const dayBtn = document.querySelector('.day-btn');

  // ---------------------------------------------------------------------
  // タイプライタ表示開始処理
  // ---------------------------------------------------------------------
  let tipeWriter = function(){
    if (diary[disp_index].children[2].nodeName === 'P' && 
        diary[disp_index].children[2].classList.contains('d-twr') === true) {
      charLen = diary[disp_index].children[2].textContent.length;
      charP = diary[disp_index].children[2].textContent;
      diary[disp_index].children[2].textContent = '';
      charCnt = 0;
      setTimeout(charSlice, 100);
    }
  }
  // ---------------------------------------------------------------------
  // 日付ボタン押下処理
  // ---------------------------------------------------------------------
  // 日付ボタンのクリックを待ち受ける
  document.querySelector('.day-btn').addEventListener('click', e => {
    // 押されたのがボタンの時
    if (e.target.nodeName === 'LI') {
      // 前回の日記がタイプライタのとき
      if (diary[disp_index].children[2].nodeName === 'P' && 
          diary[disp_index].children[2].classList.contains('d-twr') === true) {
        // 文字列を元に戻す
        diary[disp_index].children[2].textContent = charP;
        // タイマ停止
        clearTimeout(timeId);
      }
      // 前回の日記がビデオのとき
      if (diary[disp_index].children[1].nodeName === 'VIDEO') {
        const video = diary[disp_index].children[1];
        // 一時停止
        video.pause();
        video.currentTime = 0;
      }
      // Window幅 800px以上
      if (window.innerWidth >= 800) {
        // いいねカウント数初期化
        gnum = 0;
        gCounter.textContent = '0';
      } else {
        // 日付メニューを消す
        diaryList.classList.add('dnone');
        // 先頭画面ヘッダ部分を非表示にする
        menuHeader.classList.add('dnone');
        // 日記画面ヘッダ部分を表示する
        diaryHeader.classList.remove('dnone');
        // いいね/よくないねを表示する
        goodBad.classList.remove('dnone');
        // いいね数初期化
        gnum = 0;
        gCounter.textContent = '0';
      }
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diaryNow, index) => {
        // 押されたボタンの日記画面なら
        if (diaryNow.id === e.target.id) {
          // インデックスを保存
          disp_index = index;
          // 日記画面を表示する
          diary[disp_index].classList.remove('dnone');
          // タイプライタ表示
          tipeWriter();
        }
        // 押されたボタンの日記画面以外
        else {
          // 日記画面を非表示にする
          diaryNow.classList.add('dnone');
        }
      });
    }
  });

  // ---------------------------------------------------------------------
  // いいね/よくないねボタン押下処理
  // ---------------------------------------------------------------------
  // いいね/よくないね音声のインスタンス作成
  let good_audio = new Audio("audio/good.mp3");
  let bad_audio = new Audio("audio/bad.mp3");

  // いいねボタンのクリックを待ち受ける
  good.addEventListener('click', () => {
    // いいね。カウントアップ
    gnum++;
    // いいね。カウント数表示
    gCounter.textContent = `${gnum}`;
    // いいね音声を頭から再生
    bad_audio.pause();
    good_audio.currentTime = 0;
    good_audio.play();
  });

  // よくないねボタンのクリックを待ち受ける
  bad.addEventListener('click', () => {
    // よくないねカウント数表示
    bCounter.textContent = '1';
    // よくないね音声を頭から再生
    good_audio.pause();
    bad_audio.currentTime = 0;
    bad_audio.play();
    // 0.1秒後に0に戻す
    setTimeout(bcntRev, 100);
  });

  let bcntRev = function(){
    // よくないねカウント数表示
    bCounter.textContent = '0';
  };
  
// ---------------------------------------------------------------------
// タイプライタ表示処理
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
    timeId = setTimeout(charSlice, 100);
  };
// ---------------------------------------------------------------------
// レスポンシブ対応
// ---------------------------------------------------------------------
  // 画面幅800px以上のとき
  if (window.innerWidth >= 800) {
    // 先頭日記画面を表示する
    diary[0].classList.remove('dnone');
    // いいね/よくないねを表示する
    goodBad.classList.remove('dnone');
    // タイプライタ表示
    tipeWriter();
  }

  function resizeWindow() {
    if (window.innerWidth >= 800) {
      // 直前が先頭画面ヘッダ表示中 かつ 日記画面非表示中のとき
      if (menuHeader.classList.contains('dnone') === false &&
          diary[disp_index].classList.contains('dnone') === true) {
        // 日記画面を表示する
        diary[disp_index].classList.remove('dnone');
        // いいね/よくないねを表示する
        goodBad.classList.remove('dnone');
        // タイプライタ表示
        tipeWriter();
      // 日記画面ヘッダ表示中のとき
      } else if (diaryHeader.classList.contains('dnone') === false) {
        // 日付メニューを表示する
        diaryList.classList.remove('dnone');
        // 先頭画面ヘッダ部分を表示する
        menuHeader.classList.remove('dnone');
        // 日記画面ヘッダ部分を非表示にする
        diaryHeader.classList.add('dnone');
      }
    } else {
      // 先頭画面ヘッダ表示中 かつ 日記画面表示中のとき
      if (menuHeader.classList.contains('dnone') === false &&
          diary[disp_index].classList.contains('dnone') === false) {
        // 日記画面を非表示にする
        diary[disp_index].classList.add('dnone');
        // いいねカウント数初期化
        gnum = 0;
        gCounter.textContent = '0';
        // いいね/よくないねを非表示にする
        goodBad.classList.add('dnone');
        // 前回の日記がタイプライタのとき
        if (diary[disp_index].children[2].nodeName === 'P' && 
            diary[disp_index].children[2].classList.contains('d-twr') === true) {
          // 文字列を元に戻す
          diary[disp_index].children[2].textContent = charP;
          // タイマ停止
          clearTimeout(timeId);
        }
      }
    }
  }
  // ウィンドウサイズ変更イベントを待ち受ける
  window.addEventListener('resize', resizeWindow);

}

