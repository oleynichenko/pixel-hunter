export default (statsList) => {
  const statsListNew = statsList.map((item) =>
    `<li class="stats__result stats__result--${item}"></li>`);
  return `
  <div class="stats">
    <ul class="stats">
      ${statsListNew.join(``)}
    </ul>
  </div>`;
};
