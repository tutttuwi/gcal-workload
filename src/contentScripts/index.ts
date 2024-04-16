import { onMessage } from 'webext-bridge';
import { createApp } from 'vue';
import PopupApp from '../popup/Popup.vue';
import '../styles';
import { setupApp } from '~/logic/common-setup';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';
import 'bootstrap';
import 'popper.js';

// const iframeContainerWidth = ref<number>(0);
// const showIframeContainer = ref<boolean>(true);

let iframeContainerWidth = 500;
let showIframeContainer = false;
let defaultBodyWidth = document.body.style.width;
// const defaultSideWindowWidth = 300;

function observeDocument(
  executeFunc: Function,
  targetEl: Element,
  observeOption: MutationObserverInit
) {
  const target = targetEl ? targetEl : document.body; // body要素を監視
  const observer = new MutationObserver(function (mutations) {
    // observer.disconnect(); // 監視を終了
    executeFunc(mutations);
  });

  const observeOptionSelected = observeOption
    ? observeOption
    : {
        attributes: true, // 属性変化の監視
        attributeOldValue: true, // 変化前の属性値を matation.oldValue に格納する
        characterData: true, // テキストノードの変化を監視
        characterDataOldValue: true, // 変化前のテキストを matation.oldValue に格納する
        childList: true, // 子ノードの変化を監視
        subtree: true, // 子孫ノードも監視対象に含める
      };
  // 監視を開始
  observer.observe(target, observeOptionSelected);
}

function observeScheduledEvent() {
  const scheduledEvent = document.querySelector('.Tnsqdc '); // 作成済みイベントのヘッダーコンポーネント
  if (scheduledEvent) {
    const editAreaEl = document.querySelector('.pPTZAe');
    const editAreaFirstChildEl: any = editAreaEl?.firstChild;
    editAreaEl?.insertBefore(el, editAreaFirstChildEl);
  }
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info('[vitesse-webext] Hello world from content script');

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`);
  });

  const target = document.body; // body要素を監視
  const newElement = document.createElement('div'); // 監視対象の要素に挿入する新しい要素
  const observer = new MutationObserver(function (mutations) {
    // observer.disconnect(); // 監視を終了
    console.table(mutations);
  });

  // 監視を開始
  observer.observe(target, {
    attributes: true, // 属性変化の監視
    attributeOldValue: true, // 変化前の属性値を matation.oldValue に格納する
    characterData: true, // テキストノードの変化を監視
    characterDataOldValue: true, // 変化前のテキストを matation.oldValue に格納する
    childList: true, // 子ノードの変化を監視
    subtree: true, // 子孫ノードも監視対象に含める
  });

  // APIに観測されるような処理を実施
  target.classList.add('hoge');
  target.classList.add('piyo');
  target.appendChild(newElement);
  target.innerText = 'hogehoge';
})();
