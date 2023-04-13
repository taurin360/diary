'use strict';

{ 
  // 初回表示のインデックスは0番目
  let disp_index = 0;
  // いいね数
  let gnum = [];
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
  // 日付ボタン押下処理
  // ---------------------------------------------------------------------
  // 日付ボタンのクリックを待ち受ける
  document.querySelector('.day-btn').addEventListener('click', e => {
    // 押されたのがボタンの時
    if (e.target.nodeName === 'LI') {
      // 日付メニューを消す
      diaryList.classList.add('dnone');
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diary, index) => {
        // 押されたボタンの日記画面なら
        if (diary.id === e.target.id) {
          // インデックスを保存
          disp_index = index;
          // 日記画面を表示する
          diary.classList.remove('dnone');
          // 先頭画面ヘッダ部分を非表示にする
          menuHeader.classList.add('dnone');
          // 日記画面ヘッダ部分を表示する
          diaryHeader.classList.remove('dnone');
          // いいね/よくないねを表示する
          goodBad.classList.remove('dnone');
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

}

