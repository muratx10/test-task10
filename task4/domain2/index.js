const getAllItems = () => {
  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  return values;
};

const ls_content = document.querySelector('.content');

function cbForParent() {
  console.log("%cCallback function from DOMAIN2 invoked inside DOMAIN1", "color: blue; font-weight: bold; font-family: sans-serif; font-size: 1.5em;");
}

window.onmessage = function (e) {
  if (e.origin !== 'http://127.0.0.1:3000') return;
  const payload = JSON.parse(e.data[0]);
  const parent = window.parent;
  switch (payload.method) {
    case 'write':
      localStorage.setItem(payload.key, payload.data);
      break;
    case 'read':
      const data = {
        [payload.key]: localStorage.getItem(payload.key),
      };
      parent.postMessage(data, "*");
      break;
    case 'delete':
      const removedValue = localStorage.getItem(payload.key);
      localStorage.removeItem(payload.key);
      console.log(`${payload.method}: ${JSON.stringify(payload.key)}: ${removedValue}`);
      break;
    default:
      return true;
  }
  if (payload.method === 'write') {
    console.log(`${payload.method}: ${JSON.stringify(payload.key)}: ${payload.data}`);
  }
  if (e.data[1]) cbForParent();
};

window.addEventListener('storage', (e) => {
  if (e.key) {
    const node = document.createElement('code');
    node.innerHTML = `${e.newValue ? 'write' : 'delete'}`;
    node.id = 'ls__content';
    ls_content.appendChild(node);
  }
});