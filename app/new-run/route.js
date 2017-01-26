import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      isRunning: null,

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
          this.set('endRun', true);
        }
      }
    });
  }
});
