document.getElementById('name_input').addEventListener('input', (e) => {
  e.preventDefault();
  e.target.defaultValue === e.target.value ?
    document.getElementById('name_input').classList.remove('red') :
    document.getElementById('name_input').classList.add('red');
});