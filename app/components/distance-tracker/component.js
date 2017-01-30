import Ember from 'ember';

export default Ember.Component.extend({
  distance: 0.0,

  startPosition: null,

  watchId: null,

  start() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.set('startPosition', position);
      const id = navigator.geolocation.watchPosition(this.read.bind(this));

      this.set('watchId', id);
    });
  },

  read(currentPosition) {
    console.log('currentPosition:', currentPosition);
    const startPosition = this.get('startPosition');
    const startCoords = startPosition.coords;
    const currentCoords = currentPosition.coords;
    let currentDistance = this.get('distance');
    currentDistance += this._calculateDistance(startCoords.latitude, startCoords.longitude, currentCoords.latitude, currentCoords.longitude);

    this.set('startPosition:', currentPosition);
    this.set('distance', currentDistance.toFixed(1));
  },

  stop() {
    navigator.geolocation.clearWatch(this.get('watchId'));
    this.set('watchId', null);
  },

  reset() {
    navigator.geolocation.clearWatch(this.get('watchId'));
    this.set('distance', 0.0);
    this.set('startPosition', null);
    this.set('watchId', null);
  },

  willDestroyElement() {
    this.reset();
  },

  // help from http://www.movable-type.co.uk/scripts/latlong.html
  // in kilometers
  _calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  },


  shouldStartTracker: null,

  shouldPauseTracker: null,

  shouldResetTracker: null,

  // also resume
  startTracker: Ember.observer('shouldStartTracker', function () {
    if (this.get('shouldStartTracker')) {
      const _this = this;

      if (!_this.get('startPosition')) {
        this.start();
      }
    }
  }),

  // also stop
  pauseTracker: Ember.observer('shouldPauseTracker', function () {
    if (this.get('shouldPauseTracker')) {
      this.stop();
    }
  })
});
