const form = document.querySelector('.salesForm');
const sizes = document.querySelectorAll('#size input');
const colors = document.querySelectorAll('#color input');
const manufacturers = document.querySelectorAll('#manufacturer option');
const sale = document.querySelector('#sale input');


// ---------------HELPER FUNCTIONS-----------------------
const parseUrl = (url) => {
  const str = url.split('&');
  const params = [];
  str.map((i) => {
    const o = [i.split('=')];
    const obj = Object.fromEntries(o);
    params.push(obj);
  });
  return params;
};

const eventHandler = (query) => {
  for (key of query) {
    for (k in key) {
      switch (k) {
        case 'size':
          sizes.forEach((i) =>
            i.value === key[k] ? (i.checked = true) : false
          );
        case 'color':
          colors.forEach((i) =>
            i.value === key[k] ? (i.checked = true) : false
          );
        case 'manufacturer':
          manufacturers.forEach((i) =>
            i.value === decodeURIComponent(key[k]) ? (i.selected = true) : false
          );
        case 'sale':
          key[k] === '1' ? (sale.checked = true) : (sale.checked = false);
      }
    }
  }
}

const inputChangeHandler = (nodesArray, singleNode) => {
  let query = '';
  nodesArray.forEach(nodes => {
    if (NodeList.prototype.isPrototypeOf(nodes)) {
      nodes.forEach(node => {
        node.checked || node.selected ? query += `${node.parentNode.id}=${encodeURIComponent(node.value)}&` : '';
      })
    }
  })
  singleNode.checked ? query += `${singleNode.parentNode.id}=${singleNode.value}&` : '';
  return query;
}
// --------------------------------------------------------------------

window.onhashchange = () => {
  form.reset();
  const query = parseUrl(window.location.hash.replace('#/filter?', ''));
  eventHandler(query);
}

window.onload = () => {
  const query = parseUrl(window.location.hash.replace('#/filter?', ''));
  eventHandler(query);
}

form.addEventListener('change', e => {
  e.preventDefault();
  const origin = `${window.location.origin}${window.location.pathname}#/filter?`;
  const query = inputChangeHandler([sizes, colors, manufacturers], sale).slice(0, -1);
  window.location.href = `${origin}${query}`;
  console.log(`${origin}${query}`);
})