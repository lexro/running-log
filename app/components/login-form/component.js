import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    // to prevent form from submitting upon successful validation
    this.$().on("submit", function(event) {
      event.preventDefault();
    });
  }
});
