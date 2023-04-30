'use strict';

{
  const dyaBtn = document.querySelector('.day-btn');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');

  // ---------------------------------------------------------------------
  // ◀次へボタン押下処理
  // ---------------------------------------------------------------------
  next.addEventListener('click', () => {
    // 表示していた日記画面を非表示にする
    diary[disp_index].classList.add('dnone');
    // 日記初期化共通処理
    dirryInit();
    // インデックスを更新
    disp_index--;
    // カウントが日記数を超えたら一番古い日記とする
    if (0 > disp_index) {
      disp_index = dyaBtn.childElementCount - 1;
    }
    // 日記画面を表示する
    diary[disp_index].classList.remove('dnone');
    // タイプライタ表示
    tipeWriter();
  });

  // ---------------------------------------------------------------------
  // ▶前へボタン押下処理
  // ---------------------------------------------------------------------
  prev.addEventListener('click', () => {
    // 表示していた日記画面を非表示にする
    diary[disp_index].classList.add('dnone');
    // 日記初期化共通処理
    dirryInit();
    // インデックスを更新
    disp_index++;
    // カウントが日記数を超えたら一番古い日記とする
    if (dyaBtn.childElementCount <= disp_index) {
      disp_index = 0;
    }
    // 日記画面を表示する
    diary[disp_index].classList.remove('dnone');
    // タイプライタ表示
    tipeWriter();

  });
  // ---------------------------------------------------------------------
  // 日記初期化共通処理
  // ---------------------------------------------------------------------
  let dirryInit = function () {
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
    // いいね数初期化
    gnum = 0;
    gCounter.textContent = '0';
  }

}



