window.main = function () {
  const mainCentral = document.querySelector(`.central`);
  const templateNodeList = [
    document.querySelector(`#greeting`),
    document.querySelector(`#rules`),
    document.querySelector(`#game-1`),
    document.querySelector(`#game-2`),
    document.querySelector(`#game-3`),
    document.querySelector(`#stats`)
  ];

  const KEY_CODES = {
    arrowLeft: 37,
    arrowRight: 39
  };

  let currentScreen = 0;

  // Перелистывание экранов

  function keyPressHandler(event) {
    if (event.altKey) {
      if (event.keyCode === KEY_CODES.arrowLeft) {
        event.preventDefault();
        showScreen(currentScreen - 1);
      } else if (event.keyCode === KEY_CODES.arrowRight) {
        event.preventDefault();
        showScreen(currentScreen + 1);
      }
    }
  }

  // Очищает содержимое тега main.
  function clearMainNode() {
    while (mainCentral.lastChild) {
      mainCentral.removeChild(mainCentral.lastChild);
    }
  }

  /**
   *показывает экран
   *@param {number} index
   */

  function showScreen(index = 0) {

    // проверка на крайние значения массива
    if (index > templateNodeList.length - 1 || index < 0) {
      return;
    }

    // запись текущего номера экрана
    currentScreen = index;

    clearMainNode();

    // отображение экрана
    const screenContent = templateNodeList[index].content;
    mainCentral.appendChild(screenContent.cloneNode(true));

  }

  document.addEventListener(`keyup`, keyPressHandler);
  showScreen(0);

}();
