const frame = document.getElementsByTagName('iframe')[0].contentWindow;
const WRITE_KEY = document.querySelector('#write .key');
const WRITE_TEXT = document.getElementById('text');
const READ_KEY = document.querySelector('#read .key');
const DELETE_KEY = document.querySelector('#delete .key');
const WRITE_BTN = document.querySelector('#write button');
const READ_BTN = document.querySelector('#read button');
const DELETE_BTN = document.querySelector('#delete button');
const allForms = document.querySelectorAll('form');


const managelocalStorage = (method, key, txt = '') => {
  frame.postMessage([JSON.stringify({
    method: method,
    key: key,
    data: txt
  }), 'cb'], "*"); // if you want to invoke callback from domain2, put 'cb' as second parameter for postMessage event
  allForms.forEach(i => i.reset());
}

WRITE_BTN.addEventListener('click', e => {
  e.preventDefault();
  WRITE_TEXT.value ?
    managelocalStorage('write', WRITE_KEY.value.trim(), WRITE_TEXT.value.trim()) :
    console.log("%cEnter value before submiting", "color: red");
});

READ_BTN.addEventListener('click', e => {
  e.preventDefault();
  managelocalStorage('read', READ_KEY.value.trim());
})

DELETE_BTN.addEventListener('click', e => {
  e.preventDefault();
  managelocalStorage('delete', DELETE_KEY.value.trim());
})

window.onmessage = function (e) {
  if (e.origin !== "http://127.0.0.1:3001") return;
  console.log(e.data);
};