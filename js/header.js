const headerInfo = (state) => `
  <h1 class="game__timer">${state.time}</h1>
  <div class="game__lives">
    ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
  </div>`;

const getHeaderInfo = (state) => {
  return (state) ? headerInfo(state) : ``;
};

export default (state) => {
  return `
    <header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>
      ${getHeaderInfo(state)}
    </header>`;
};
