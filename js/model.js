const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;
const DEFAULT_NAME = `noname`;

export default new class {

  constructor() {
    this.name = DEFAULT_NAME;
  }

  set userName(name) {
    if (name !== ` `) {
      this.name = name;
    }
  }

  load(adapter) {
    return fetch(`${SERVER_URL}/questions`)
      .then((resp) => resp.json())
      .then(adapter.preprocess);
  }

  send(data, adapter) {
    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${this.name}`, requestSettings);
  }

  loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${this.name}`)
      .then((resp) => resp.json());
  }
}();
