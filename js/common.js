'use strict';

let disp_index = 0;     // 初回表示のインデックスは0番目
let timeId;             // タイマID
let gnum = 0;           // いいね数

let charCnt = 0;
let charLen;
let charP;

const diaryList = document.querySelector('.diary-list');
const diary = document.querySelectorAll('.diary');
const menuHeader = document.querySelector('.menu-header');
const diaryHeader = document.querySelector('.diary-header');
const goodBad = document.querySelector('.good-bad');
const gCounter = document.getElementById('g-cnt');
const bCounter = document.getElementById('b-cnt');

// ---------------------------------------------------------------------
// タイプライタ表示開始処理
// ---------------------------------------------------------------------
let tipeWriter = function () {
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
// タイプライタ表示処理
// ---------------------------------------------------------------------
let charSlice = function () {
  if (charCnt >= charLen) {
    return;
  }
  diary[disp_index].children[2].textContent += charP.slice(charCnt, 1 + charCnt);
  charCnt++;
  timeId = setTimeout(charSlice, 100);
}
// ---------------------------------------------------------------------
// 日記初期化共通処理
// ---------------------------------------------------------------------
let diaryInit = function () {
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
}
// ---------------------------------------------------------------------
// いいね数初期化処理
// ---------------------------------------------------------------------
let goodbadInit = function () {
  // ローカルストレージいいね数キー
  let goodKey = 'good_' + diary[disp_index].children[3].textContent;
  // いいね数をローカルストレージから取得する
  if (localStorage.getItem(goodKey) === null) {
    gnum = 0;
  } else {
    gnum = localStorage.getItem(goodKey);
  }
  // いいね数を表示する
  gCounter.textContent = gnum;

}




