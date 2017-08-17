const mainCentral = document.querySelector(`.central`);

export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  createElement(text) {
    const elem = document.createElement(`section`);
    elem.innerHTML = text;
    return elem;
  }

  showScreen() {
    mainCentral.innerHTML = ``;
    mainCentral.appendChild(this.element);
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.createElement(this.template);
      this.bind();
    }
    return this._element;
  }
}
