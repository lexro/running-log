import Ember from 'ember';

export default Ember.Route.extend({
  _initFoundation() {
    Ember.$(document).foundation();

    window.Foundation.Abide.defaults.validators['multiValidateText'] = this._multiValidateText;
  },

  // based on abide to get the validation error type
  // TODO: figure out better way to do multi validation messages with abide
  _multiValidateText($el, required/* , parent*/) {
    const pattern = $el.attr('pattern') || $el.attr('type');
    const inputText = $el.val();
    let valid = false;
    const patterns = window.Foundation.Abide.defaults.patterns;
    const validationMessages = {
      required: 'This field is required',
      email: 'Invalid email'
    };

    let validationMessage = validationMessages['required'];

    if (inputText.length) {
      // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
      if (patterns.hasOwnProperty(pattern)) {
        valid = patterns[pattern].test(inputText);
        validationMessage = validationMessages[pattern];
      }
      else {
        valid = true;
      }
    }
    // An empty field is valid if it's not required
    else if (!required) {
      valid = true;
    }

    if (!valid) {
      $el.validationMessage = validationMessage;
    }

    return valid;
  },

  setupController: function( controller, model ) {
    this._super(controller, model);
    Ember.run.scheduleOnce( 'afterRender', this._initFoundation.bind(this));
  },
});
