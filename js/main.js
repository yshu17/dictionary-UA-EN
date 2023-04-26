jQuery('img.svg').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    if($img.hasClass('heart-svg')) {
      $svg.attr('width', 24);
      $svg.attr('height', 30);
    }
    // Add replaced image's ID to the new SVG
    if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');
});


// serch function

const words = [
  {
    name_ua: 'ананас нансові',
    name_en: 'ananas',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
  {
    name_ua: 'анатолий',
    name_en: 'ananas',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
  {
    name_ua: 'абьюзер',
    name_en: 'ananas',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
  {
    name_ua: 'банан',
    name_en: 'banan',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
  {
    name_ua: 'вишня',
    name_en: 'vishnya',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
  {
    name_ua: 'груша',
    name_en: 'grysha',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
  {
    name_ua: 'диня',
    name_en: 'dinya',
    description_ua: 'посівни́й, або звича́йний',
    description_en: 'is a plant genus in the family Bromeliaceae.',
  },
];
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

    const keycapValue = keycap.textContent;

    if(/[а-яґєії]/i.test(keycapValue)) {
      clearWordList();
      searchWordsByFirstLetterInNameUa(keycapValue).forEach(word => addWordToDOM(word));
      console.log('object :>> ',searchWordsByFirstLetterInNameUa(keycapValue)); 
    }

    if(/^[a-z\s]+$/i.test(keycapValue)) {
      clearWordList();
      searchWordsByFirstLetterInNameEn(keycapValue).forEach(word => addWordToDOM(word));
      console.log('object :>> ',searchWordsByFirstLetterInNameEn(keycapValue)); 
    }

  });
});

const wordList = document.querySelector('.dictionary-list');

function addWordToDOM(word) {
  
  const listItem = document.createElement('li');
  listItem.classList.add('w-50','mb-3', 'dropend');
  
  const dropdownLink = document.createElement('a');
  dropdownLink.classList.add('dropdown-toggle');
  dropdownLink.setAttribute('data-bs-toggle','dropdown');
  dropdownLink.innerText = word.name;
  
  const dropdownBlock = document.createElement('div');
  dropdownBlock.classList.add('dropdown-menu', 'p-3');
  
  dropdownBlock.innerHTML = `
    <h4>${word.translate}</h4>
    <p>${word.description}</p>
  `;

  listItem.appendChild(dropdownLink);  // Добавляем элемент <a> в элемент <li>
  listItem.appendChild(dropdownBlock);  // Добавляем элемент <div> в элемент <li>
  wordList.appendChild(listItem);  // Добавляем элемент <li> в элемент <ul>
}

function clearWordList() {
  wordList.innerHTML = '';
}
