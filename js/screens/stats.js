import StatsView from './stats-view';
import model from '../model';
import app from '../app';


export default class {
  init() {
    model.loadResults()
      .then((results) => {
        this._view = new StatsView(results);
        this._view.onHeaderBack = () => {
          app.reload();
        };

        this._view.showScreen();
      });
  }
}

