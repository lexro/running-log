import Ember from 'ember';
const stub = [
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 1
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 2
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 3
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 4
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 5
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 6
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 7
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 8
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 9
  },
  {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 10
  }
];

export default Ember.Route.extend({
  model() {
    let runs = localStorage.getItem('run-log-runs');
    // add some mock data to make it look full
    if (!runs) {
      runs = stub;
    } else {
      console.log('runs:', runs);
      runs = JSON.parse(runs);
      console.log('runs:', runs);
      runs = runs.concat(stub);
    }

    return {
      runs: runs
    };
  }
});
