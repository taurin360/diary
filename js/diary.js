'use strict';
{
  const good = document.getElementById('good');
  const bad = document.getElementById('bad');

  // ---------------------------------------------------------------------
  // 日付ボタン押下処理
  // ---------------------------------------------------------------------
  // 日付ボタンのクリックを待ち受ける
  document.querySelector('.day-btn').addEventListener('click', e => {
    // 押されたのがボタンの時
    if (e.target.nodeName === 'LI') {
      // 日記初期化共通処理
      diaryInit();
      // Window幅 800px以上
      if (window.innerWidth >= 800) {
        // 何もしない
      } else {
        // 日付メニューを消す
        diaryList.classList.add('dnone');
        // 先頭画面ヘッダ部分を非表示にする
        menuHeader.classList.add('dnone');
        // 日記画面ヘッダ部分を表示する
        diaryHeader.classList.remove('dnone');
        // いいね/よくないねを表示する
        goodBad.classList.remove('dnone');
      }
      // 日記画面をサーチ
      document.querySelectorAll('.diary').forEach((diaryNow, index) => {
        // 押されたリストが日記画面と一致したとき
          if (diaryNow.id === e.target.dataset.id) {
          // インデックスを保存
          disp_index = index;
          // 日記画面を表示する
          diaryNow.classList.remove('dnone');
          // タイプライタ表示
          tipeWriter();
          // いいね数をローカルストレージから取得し表示
          goodbadInit();
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
  let goodAudio = new Audio("audio/good.mp3");
  let badAudio = new Audio("audio/bad.mp3");

  // いいねボタンのクリックを待ち受ける
  good.addEventListener('click', () => {
    gnum++;
    // いいね。カウント数表示
    gCounter.textContent = `${gnum}`;
    // ローカルストレージにいいね数保存
    let goodKey = 'good_' + diary[disp_index].id;
    localStorage.setItem(goodKey, gnum);
    // いいね音声を頭から再生
    badAudio.pause();
    goodAudio.currentTime = 0;
    goodAudio.play();
  });

  // よくないねボタンのクリックを待ち受ける
  bad.addEventListener('click', () => {
    // よくないねカウント数表示
    bCounter.textContent = '1';
    // よくないね音声を頭から再生
    goodAudio.pause();
    badAudio.currentTime = 0;
    badAudio.play();
    // 0.1秒後に0に戻す
    setTimeout(bcntRev, 100);
  });

  let bcntRev = function () {
    // よくないねカウント数表示
    bCounter.textContent = '0';
  };

}

