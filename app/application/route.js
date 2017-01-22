import Ember from 'ember';

export default Ember.Route.extend({
  _initFoundation() {
    Ember.$(document).foundation();

    window.Foundation.Abide.defaults.validators['multiValidateText'] = this._multiValidateText;
    window.Foundation.Abide.defaults.validators['passwordValidate'] = this._passwordValidate;
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

  _passwordValidate($el) {
    // error if password doesn't have these
    const positiveValidations = {
      sybmol: [/[\!\@\#\$\%\^\&\*]/g, 'Should have a symbol (!, @, #, $, %, ^, &, *)'],
      number: [/\d/g, 'Should have a number'],
      lowercase: [/[a-z]/g, 'Should have a lowercase letter'],
      uppercase: [/[A-Z]/g, 'Should have an uppercase letter']
    };

    // error if password has these
    const negativeValidations = {
      illegalCharacter: [/[^A-z0-9\!\@\#\$\%\^\&\*]/g, 'Illegal Character']
    };

    const minPasswordLength = 8;
    let issue;
    const password = $el.val();
    let validationMessages = [];

    if (password.length) {
      if (password.length < minPasswordLength) {
        validationMessages.push('Should be at least 8 characters');
      }

    } else {
      validationMessages.push('A Password is required');
    }

    for (issue in positiveValidations) {
      let validation = positiveValidations[issue];
      if (!password.match(validation[0])) {
        validationMessages.push(validation[1]);
      }
    }

    for (issue in negativeValidations) {
      let validation = negativeValidations[issue];
      if (password.match(validation[0])) {
        validationMessages.push(validation[1]);
      }
    }

    const valid = !validationMessages.length;

    if (!valid) {
      $el.validationMessage = validationMessages.join('\n');
    }

    return valid;
  },

  setupController( controller, model ) {
    this._super(controller, model);
    Ember.run.scheduleOnce( 'afterRender', this._initFoundation.bind(this));
  },
});
