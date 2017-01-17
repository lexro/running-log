import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['date-tile'],

  date: null,

  momentDate: Ember.computed('date', function () {
    const date = this.get('date');

    return moment(date);
  }),

  month: Ember.computed('momentDate', function () {
    const momentDate = this.get('momentDate');

    return momentDate.format('MMM');
  }),

  day: Ember.computed('momentDate', function () {
    const momentDate = this.get('momentDate');

    return momentDate.format('DD');
  }),

  year: Ember.computed('momentDate', function () {
    const momentDate = this.get('momentDate');

    return momentDate.format('YYYY');
  })
});
