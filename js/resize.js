'use strict';
{
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
    // いいね数をローカルストレージから取得し表示
    goodbadInit();
  }
  // ウィンドウサイズ変更イベントを待ち受ける
  window.addEventListener('resize', resizeWindow);

  // ---------------------------------------------------------------------
  // ウィンドウサイズ変更イベント受信処理
  // ---------------------------------------------------------------------
  function resizeWindow() {
    if (window.innerWidth >= 800) {
      // スマホサイズからPCサイズに拡大されたとき
      if (menuHeader.classList.contains('dnone') === false &&
        diary[disp_index].classList.contains('dnone') === true) {
        // 日記画面を表示する
        diary[disp_index].classList.remove('dnone');
        // いいね/よくないねを表示する
        goodBad.classList.remove('dnone');
        // タイプライタ表示
        tipeWriter();
        // いいね数をローカルストレージから取得し表示
        goodbadInit();
        // スマホサイズで日記画面ヘッダ表示中からPCサイズに拡大されたとき
      } else if (diaryHeader.classList.contains('dnone') === false) {
        // 日付メニューを表示する
        diaryList.classList.remove('dnone');
        // 先頭画面ヘッダ部分を表示する
        menuHeader.classList.remove('dnone');
        // 日記画面ヘッダ部分を非表示にする
        diaryHeader.classList.add('dnone');
      }
    } else {
      // PCサイズからスマホサイズに縮小されたとき
      if (menuHeader.classList.contains('dnone') === false &&
        diary[disp_index].classList.contains('dnone') === false) {
        // 日記画面を非表示にする
        diary[disp_index].classList.add('dnone');
        // いいね/よくないねを非表示にする
        goodBad.classList.add('dnone');
        // 日記初期化共通処理
        diaryInit();
      }
    }
  }
}

