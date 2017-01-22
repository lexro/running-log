import Ember from 'ember';

export default Ember.Component.extend({
  emailValidationMessage: '',

  passwordValidationMessage: '',

  didInsertElement() {
    const _this = this;

    // to prevent form from submitting upon successful validation
    this.$().on("submit", (event) => {
      event.preventDefault();
    })
    .on("invalid.zf.abide", function(ev,elem) {
      // move this stuff to a 'validated-input' ember component
      const elementId = elem.attr('id');
      if (elementId === 'account-password') {
        _this.set('passwordValidationMessage', elem.validationMessage);
      } else if (elementId === 'account-email') {
        _this.set('emailValidationMessage', elem.validationMessage);
      }
    })
    // field element is valid
    .on("valid.zf.abide", function(ev,elem) {
      console.log("Field name "+elem.attr('name')+" is valid");
    });
  }
});
