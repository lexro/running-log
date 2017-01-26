import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  timerInterval: null,

  currentTime: 0,

  formattedTime: Ember.computed('currentTime', function () {
    const currentTime = this.get('currentTime');
    const duration = moment.duration(Math.floor(currentTime), 'milliseconds');

    if (Math.floor(duration.asHours()) > 0) {
      return duration.format('hh:mm:ss', { trim: false, precision: 2 });
    }

    return duration.format('mm:ss', { trim: false, precision: 2 });
  }),

  startTime: null,

  lapTime: 0,

  start() {
    this.set('startTime', performance.now());
  },

  read() {
    const startTime = this.get('startTime');
    const now = performance.now();

    return this.get('lapTime') + now - startTime;
  },

  stop() {
    this.set('lapTime', this.read());
    this.set('startTime', null);
  },

  reset() {
    clearInterval(this.get('timerInterval'));
    this.set('timerInterval', null);
    this.set('lapTime', 0);
    this.set('startTime', null);
    this.set('currentTime', 0);
  },

  willDestroyElement() {
    this.reset();
  },

  shouldStartTimer: null,

  shouldPauseTimer: null,

  shouldResetTimer: null,

  // also resume
  startTimer: Ember.observer('shouldStartTimer', function () {
    if(this.get('shouldStartTimer')) {
      const _this = this;

      if (!_this.get('startTime')) {
        this.start();

        const timerInterval = setInterval(() => {
          const time = _this.read();
          _this.set('currentTime', time);
        }, 1);

        this.set('timerInterval', timerInterval);
      }
    }
  }),

  // also stop
  pauseTimer: Ember.observer('shouldPauseTimer', function () {
    if (this.get('shouldPauseTimer')) {
      this.stop();
      clearInterval(this.get('timerInterval'));
      this.set('timerInterval', null);
    }
  })
});
