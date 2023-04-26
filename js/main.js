let words;
fetch('../json/csvjson.json')
  .then(response => response.json())
  .then(data => words = data ) // массив объектов, созданных из файла JSON
  .catch(error => console.error(error));

function searchWordsByFirstLetterInNameUa(letter) {
  return words.filter(word => {
    const name_ua = word.name_ua.toLowerCase();
    return name_ua.charAt(0) === letter.toLowerCase();
  }).map(word => ({ name: word.name_ua, translate: word.name_en, description: word.description_ua }));
}

function searchWordsByFirstLetterInNameEn(letter) {
  return words.filter(word => {
    const name_en = word.name_en.toLowerCase();
    return name_en.charAt(0) === letter.toLowerCase();
  }).map(word => ({ name: word.name_en, translate: word.name_ua, description: word.description_en }));
}

const keycaps = document.querySelectorAll('.keycap');

keycaps.forEach(keycap => {
  keycap.addEventListener('click',() => {

    const keycapValue = keycap.querySelector('a').textContent;

    if(/[а-яґєії]/i.test(keycapValue)) {
      clearWordList();
      searchWordsByFirstLetterInNameUa(keycapValue).forEach(word => addWordToDOM(word));
    }

    if(/^[a-z\s]+$/i.test(keycapValue)) {
      clearWordList();
      searchWordsByFirstLetterInNameEn(keycapValue).forEach(word => addWordToDOM(word));
    }

  });
});

const wordList = document.querySelector('.dictionary-list');

function addWordToDOM(word) {
  const randomID = Math.floor(Math.random() * 1000);
  const listItem = document.createElement('li');
  listItem.classList.add('w-50','mb-2');
  
  const dropdownLink = document.createElement('a');
  dropdownLink.classList.add('mb-2');
  dropdownLink.setAttribute('aria-controls',`${randomID}`);
  dropdownLink.setAttribute('aria-expanded','false');
  dropdownLink.setAttribute('role','button');
  dropdownLink.setAttribute('href',`#${randomID}`);
  dropdownLink.setAttribute('data-bs-toggle','collapse');
  dropdownLink.innerText = word.name;
  
  const dropdownBlock = document.createElement('div');
  dropdownBlock.classList.add('collapse');
  dropdownBlock.setAttribute('id',`${randomID}`);
 
  dropdownBlock.innerHTML = `
    <h4 class="my-2">${word.translate}</h4>
    <p class="m-0 p-0">${word.description}</p>
  `;

  listItem.appendChild(dropdownLink);  // Добавляем элемент <a> в элемент <li>
  listItem.appendChild(dropdownBlock);  // Добавляем элемент <div> в элемент <li>
  wordList.appendChild(listItem);  // Добавляем элемент <li> в элемент <ul>
}

function clearWordList() {
  wordList.innerHTML = '';
}
