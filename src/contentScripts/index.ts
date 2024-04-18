import { onMessage } from 'webext-bridge';
import { createApp } from 'vue';
import PopupApp from '../popup/Popup.vue';
import '../styles';
import { setupApp } from '~/logic/common-setup';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';
import 'bootstrap';
import 'popper.js';
import App from './views/App.vue';
import CopyButton from './views/CopyButton.vue';
import ItemCombobox from './views/ItemCombobox.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
  components,
  directives,
});

import 'vuetify/dist/vuetify.min.css';
import 'vuetify/dist/vuetify';

// const iframeContainerWidth = ref<number>(0);
// const showIframeContainer = ref<boolean>(true);

let iframeContainerWidth = 500;
let showIframeContainer = false;
let defaultBodyWidth = document.body.style.width;
// const defaultSideWindowWidth = 300;

let isObserveStatus = false;

async function sleep(sec: number) {
  await new Promise((s) => setTimeout(s, sec));
}

function observeDocument(
  executeFunc: Function,
  targetEl?: Element,
  observeOption?: MutationObserverInit
) {
  const target = targetEl ? targetEl : document.body; // body要素を監視
  const observer = new MutationObserver(function (mutations) {
    // observer.disconnect(); // 監視を終了
    executeFunc(mutations);
  });

  const observeOptionSelected = observeOption
    ? observeOption
    : {
        attributes: false, // 属性変化の監視
        attributeOldValue: false, // 変化前の属性値を matation.oldValue に格納する
        characterData: false, // テキストノードの変化を監視
        characterDataOldValue: false, // 変化前のテキストを matation.oldValue に格納する
        childList: true, // 子ノードの変化を監視
        subtree: true, // 子孫ノードも監視対象に含める
      };
  // 監視を開始
  observer.observe(target, observeOptionSelected);
}

function createCopyEl() {
  const el = document.createElement('div');
  const spanEl = document.createElement('span');
  const buttonEl = document.createElement('button');

  return el;
}

/**
 * 作成済みイベントクリック時処理
 * @returns
 */
function observeScheduledEvent() {
  console.log('observeScheduledEvent() START');
  if (document.querySelector('#CopyButton')) {
    // 存在するためスキップ
    return;
  }
  const scheduledEvent = document.querySelector('.Tnsqdc'); // 作成済みイベントのヘッダーコンポーネント
  if (scheduledEvent) {
    console.log('scheduledEvent Founded!!');
    const copyButtonWrapper = document.createElement('div');
    const editAreaEl = document.querySelector('.pPTZAe');
    const editAreaFirstChildEl: any = editAreaEl?.firstChild;
    editAreaEl?.insertBefore(copyButtonWrapper, editAreaFirstChildEl);
    const copyButtion = createApp(CopyButton);
    // copyButtion.use(SnackbarService);
    setupApp(copyButtion);
    copyButtion.mount(copyButtonWrapper ? copyButtonWrapper : '');
  }
  console.log('observeScheduledEvent() END');
}

function createScriptElement(src: string) {
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', src);
  return scriptEl;
}

function createCssEl(path: string) {
  const styleEl = document.createElement('link');
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute('href', path);
  return styleEl;
}

/**
 * イベント作成クリック時処理
 * @returns
 */
function observeCreateEvent() {
  console.log('observeCreateEvent() START');
  if (document.querySelector('#ItemCombobox')) {
    // 存在するためスキップ
    return;
  }
  const targetEvent = document.querySelector('.q2nced'); // これから作成するイベントのヘッダーコンポーネント
  if (targetEvent) {
    console.log('targetEvent Founded!!');
    // const wrapper = document.createElement('div');
    const titleEl = document.querySelector('.DgKtsd');
    createShadowDom('ItemCombobox', ItemCombobox, (wrapper: any) => {
      titleEl?.after(wrapper);
    });
    // const itemCombobox = createApp(ItemCombobox);
    // itemCombobox.use(vuetify);
    // // copyButtion.use(SnackbarService);
    // setupApp(itemCombobox);
    // itemCombobox.mount(wrapper ? wrapper : '');
  }
  console.log('observeCreateEvent() END');
}

async function procObserve() {
  if (isObserveStatus) return;
  isObserveStatus = true;
  await sleep(1000);
  // ----------------------------------------------------
  observeScheduledEvent(); // 作成済みイベントクリック時
  observeCreateEvent(); // イベント作成クリック時
  // ----------------------------------------------------
  isObserveStatus = false;
}

function createShadowDom(containerId: string, App: any, mountElement: Function) {
  const container = document.createElement('div');
  container.id = containerId;
  // container.id = __NAME__
  const root = document.createElement('div');
  const styleEl = document.createElement('link');
  const styleVuetifyEl = document.createElement('link');
  const scriptVuetifyEl = document.createElement('script');
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container;
  const shadowDOM = container.attachShadow?.({ mode: true ? 'open' : 'closed' }) || container;
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'));
  // styleVuetifyEl.setAttribute('rel', 'stylesheet');
  // styleVuetifyEl.setAttribute(
  //   'href',
  //   'https://cdn.jsdelivr.net/npm/vuetify@2.5.8/dist/vuetify.min.css'
  // );
  scriptVuetifyEl.setAttribute(
    'src',
    browser.runtime.getURL('dist/contentScripts/index.global.js')
  );
  shadowDOM.appendChild(styleEl);
  // shadowDOM.appendChild(styleVuetifyEl);
  shadowDOM.appendChild(scriptVuetifyEl);
  shadowDOM.appendChild(root);
  mountElement(container);
  // document.body.appendChild(container);
  const app = createApp(App);
  // setupApp(app);
  app.use(vuetify);
  app.mount(root);
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info('[vitesse-webext] Hello world from content script');

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`);
  });

  observeDocument(procObserve);

  // const target = document.body; // body要素を監視
  // const newElement = document.createElement('div'); // 監視対象の要素に挿入する新しい要素
  // const observer = new MutationObserver(function (mutations) {
  //   // observer.disconnect(); // 監視を終了
  //   console.table(mutations);
  // });

  // // 監視を開始
  // observer.observe(target, {
  //   attributes: true, // 属性変化の監視
  //   attributeOldValue: true, // 変化前の属性値を matation.oldValue に格納する
  //   characterData: true, // テキストノードの変化を監視
  //   characterDataOldValue: true, // 変化前のテキストを matation.oldValue に格納する
  //   childList: true, // 子ノードの変化を監視
  //   subtree: true, // 子孫ノードも監視対象に含める
  // });

  // // APIに観測されるような処理を実施
  // target.classList.add('hoge');
  // target.classList.add('piyo');
  // target.appendChild(newElement);
  // target.innerText = 'hogehoge';

  const container = document.createElement('div');
  // container.id = __NAME__
  const root = document.createElement('div');
  const styleEl = document.createElement('link');
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container;
  const shadowDOM = container.attachShadow?.({ mode: true ? 'open' : 'closed' }) || container;
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'));
  shadowDOM.appendChild(styleEl);
  shadowDOM.appendChild(root);
  document.body.appendChild(container);
  const app = createApp(App);
  app.use(SnackbarService);
  setupApp(app);
  app.mount(root);

  document.head.appendChild(createCssEl('https://unpkg.com/vuetify@3.0.0-beta.3/dist/vuetify.css'));
  document.body.appendChild(
    createScriptElement(browser.runtime.getURL('dist/contentScripts/vuetify.js'))
  );
})();
