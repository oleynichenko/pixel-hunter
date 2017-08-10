const mainCentral = document.querySelector(`.central`);

// Очищает содержимое тега main.
function clearMainNode() {
  while (mainCentral.lastChild) {
    mainCentral.removeChild(mainCentral.lastChild);
  }
}
const getBlockProportion = (elem) => {
  console.log("Пропорции блока",  getComputedStyle(elem).width, getComputedStyle(elem).height);
  return parseInt(getComputedStyle(elem).width, 10) / parseInt(getComputedStyle(elem).height, 10);
};

const checkProportion = (elem, number) => {
  const currentProportion = elem.naturalWidth / elem.naturalHeight;
  return (currentProportion > number);
};

// Растягивает по высоте если растяжение по ширине не вмещает в блоке все фото
function resizeImage(images, proportion) {
  console.log("resize работает");
  Array.from(images).forEach((item, index) => {
    if (checkProportion(item, proportion)) {
      item.style.width = `auto`;
      item.style.height = `100%`;
      console.log("Изменена картинка -", index, item.style.width, item.style.height);
    }
  });
}

/**
 *показывает экран
 *@param {string} elem
 */
export default (elem) => {
  // очистка экрана
  clearMainNode();

  // отображение экрана
  mainCentral.appendChild(elem);

  // обрезать фото по размерам блока
  const imageBlock = elem.querySelector(`.game__option`);

  if (imageBlock) {
    console.log("Экартинки есть");
    const blockProportion = getBlockProportion(imageBlock);
    const images = elem.querySelectorAll(`img[alt^='Option']`);

    resizeImage(images, blockProportion);
  }
};
