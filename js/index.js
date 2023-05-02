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
    diaryInit();
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
    // いいね数をローカルストレージから取得し表示
    goodbadInit();
  });

  // ---------------------------------------------------------------------
  // ▶前へボタン押下処理
  // ---------------------------------------------------------------------
  prev.addEventListener('click', () => {
    // 表示していた日記画面を非表示にする
    diary[disp_index].classList.add('dnone');
    // 日記初期化共通処理
    diaryInit();
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
    // いいね数をローカルストレージから取得し表示
    goodbadInit();
  });
}



