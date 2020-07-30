function request(method, url) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        res(xhr.response);
      } else {
        rej(xhr.status);
      }
    };

    xhr.onerror = () => {
      rej(xhr.status);
    };
  });
}

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  request('GET', 'https://jsonplaceholder.typicode.com/photos/')
    .then((res) => {
      return request(
        'GET',
        'https://jsonplaceholder.typicode.com/comments/'
      ).then((res2) => {
        console.log(JSON.parse(res));
        console.log(JSON.parse(res2));
        console.log(
          '%c✅ Оба ответа получены!',
          'color: #00ca00; font-family: sans-serif; font-size: 2em;'
        );
      });
    })
    .catch((err) => {
      console.log(
        '%c😰 Ошибка %s',
        'color: #FF0000; font-size: 2em; font-family: sans-serif; font-weight: bold',
        err
      );
    });
});
