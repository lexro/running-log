import Ember from 'ember';

export default Ember.Component.extend({

  initTimer: Ember.on('init', function () {
    const _this = this;

    const timerInterval = setInterval(() => {
      const time = _this.read();
      _this.set('currentTime', time);
    }, 1);

    this.set('timerInterval', timerInterval);
  }),

  timerInterval: null,

  currentTime: 0,

  formattedTime: Ember.computed('currentTime', function () {
    const currentTime = this.get('currentTime');

    return Math.floor(currentTime); // TODO: replace with 00:00:00
  }),

  startTime: '',

  start() {
    this.set('startTime', performance.now());
  },

  read() {
    const startTime = this.get('startTime');
    const now = performance.now();

    return now - startTime;
  },

  stop() {
    this.set('stopTime', performance.now());
  },

  reset() {
    clearInterval(this.get('timerInterval'));
  },

  willDestroyElement() {
    this.reset();
  }
});
