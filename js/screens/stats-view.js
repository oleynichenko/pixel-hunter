import header from '../header.js';
import footer from '../footer.js';
import AbstractView from '../view.js';
import {Rules, PassOptions} from '../data/data';

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
    this.gameAmount = this.results.length;
  }

  getGameResult(num) {
    return this.results[num].lives > 0;
  }

  failedGameTemplate(game, index) {
    return `<table class="result__table">
              <tr>
                <td class="result__number">${index + 1}.</td>
                <td>
                  <ul class="stats">
                    ${this.showStatsLine(game)}
                  </ul>
                </td>
                <td class="result__total"></td>
                <td class="result__total  result__total--final">fail</td>
              </tr>
            </table>`;
  }

  showStatsLine(game) {
    return game.stats.map((item) => `<li class="stats__result stats__result--${item}"></li>`).join(``);
  }

  countBonuses(arr) {
    let bonuses = {};

    arr.forEach((item) => {
      bonuses[item] = bonuses[item] || 0;
      bonuses[item]++;
    });

    return bonuses;
  }

  showBonus(conditions, bonuses) {
    console.log(bonuses);
    return bonuses ? `<tr>
              <td></td>
              <td class="result__extra">${conditions.name}:</td>
              <td class="result__extra">${bonuses} <span class="stats__result stats__result--${conditions.class}"></span></td>
              <td class="result__points">×&nbsp;${Math.abs(conditions.cost)}</td>
              <td class="result__total">${conditions.cost * bonuses}</td>
            </tr>` : ``;
  }

  getSumCorrectAnswer(bonuses) {
    return (Rules.LEVELS_QUANTITY - (bonuses[PassOptions.WRONG.class] || 0)) * PassOptions.CORRECT.cost;
  }

  getTotalSum(game, bonuses) {
    const sum = (bonuses[PassOptions.FAST.class] || 0) * PassOptions.FAST.cost
           + (bonuses[PassOptions.SLOW.class] || 0) * PassOptions.SLOW.cost
           + game.lives * PassOptions.HEART.cost
           + this.getSumCorrectAnswer(bonuses);
    return sum;
  }

  wonGameTemplate(game, index) {
    const bonuses = this.countBonuses(game.stats);
    return `<table class="result__table">
          <tr>
            <td class="result__number">${index + 1}.</td>
            <td colspan="2">
              <ul class="stats">
                ${this.showStatsLine(game)}
              </ul>
            </td>
            <td class="result__points">×&nbsp;${PassOptions.CORRECT.cost}</td>
            <td class="result__total">${this.getSumCorrectAnswer(bonuses)}</td>
          </tr>
            ${this.showBonus(PassOptions.FAST, bonuses[PassOptions.FAST.class])}
            ${this.showBonus(PassOptions.HEART, game.lives)}
            ${this.showBonus(PassOptions.SLOW, bonuses[PassOptions.SLOW.class])}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${this.getTotalSum(game, bonuses)}</td>
          </tr>
        </table>`;
  }

  showGameResult(results) {
    return results.map((item, index) => {
      return (item.lives > 0) ? this.wonGameTemplate(item, index) : this.failedGameTemplate(item, index);
    }).join(``);
  }

  get template() {
    const statsContent = `
      <div class="result">
        <h1>${this.getGameResult(this.gameAmount - 1) ? `Вы выиграли!` : `Вы проиграли..`}</h1>
        ${this.showGameResult(this.results)}
      </div>`;
    return `
      ${header()}
      ${statsContent}
      ${footer}`;
  }

  bind() {
    const headerBack = this.element.querySelector(`.header__back`);
    headerBack.addEventListener(`click`, (event) => {
      event.preventDefault(event);
      this.onHeaderBack();
    });
  }
}
