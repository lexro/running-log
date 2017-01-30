import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      isRunning: null,

      distance: 0.0,

      currentTime: 0,

      pace: 0,

      actions: {
        startRun() {
          this.set('isRunning', true);
          this.set('isPaused', false);
        },

        pauseRun() {
          this.set('isRunning', false);
          this.set('isPaused', true);
        },

        endRun() {
          this.set('isRunning', false);
          this.set('isPaused', true);

          let runs = localStorage.getItem('run-log-runs');

          if (runs) {
            runs = JSON.parse(runs);
          } else {
            runs = [];
          }

          runs.unshift({
            distance: this.get('distance'),
            time: this.get('currentTime'),
            pace: this.get('pace'),
            date: Date.now(),
            id: runs.length + 1
          });

          localStorage.setItem('run-log-runs', JSON.stringify(runs));
          this.transitionToRoute('log');
        }
      }
    });
  }
});
