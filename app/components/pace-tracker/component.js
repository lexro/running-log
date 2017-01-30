import Ember from 'ember';

export default Ember.Component.extend({
  pace: Ember.computed('distance', 'time', function () {
    const distance = this.get('distance');
    const time = this.get('time');
    let pace =  0;

    if (distance > 0) {
      let seconds = time / 1000;
      pace = seconds / distance / 60;
    }

    return pace.toFixed(1);
  }),

  distance: 0.0,

  time: 0
});
