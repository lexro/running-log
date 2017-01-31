"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('running-log/app', ['exports', 'ember', 'running-log/resolver', 'ember-load-initializers', 'running-log/config/environment'], function (exports, _ember, _runningLogResolver, _emberLoadInitializers, _runningLogConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _runningLogConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _runningLogConfigEnvironment['default'].podModulePrefix,
    Resolver: _runningLogResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _runningLogConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('running-log/application/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    _initFoundation: function _initFoundation() {
      _ember['default'].$(document).foundation();

      window.Foundation.Abide.defaults.validators['multiValidateText'] = this._multiValidateText;
      window.Foundation.Abide.defaults.validators['passwordValidate'] = this._passwordValidate;
    },

    // based on abide to get the validation error type
    // TODO: figure out better way to do multi validation messages with abide
    _multiValidateText: function _multiValidateText($el, required /* , parent*/) {
      var pattern = $el.attr('pattern') || $el.attr('type');
      var inputText = $el.val();
      var valid = false;
      var patterns = window.Foundation.Abide.defaults.patterns;
      var validationMessages = {
        required: 'This field is required',
        email: 'Invalid email'
      };

      var validationMessage = validationMessages['required'];

      if (inputText.length) {
        // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
        if (patterns.hasOwnProperty(pattern)) {
          valid = patterns[pattern].test(inputText);
          validationMessage = validationMessages[pattern];
        } else {
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

    _passwordValidate: function _passwordValidate($el) {
      // error if password doesn't have these
      var positiveValidations = {
        sybmol: [/[\!\@\#\$\%\^\&\*]/g, 'Should have a symbol (!, @, #, $, %, ^, &, *)'],
        number: [/\d/g, 'Should have a number'],
        lowercase: [/[a-z]/g, 'Should have a lowercase letter'],
        uppercase: [/[A-Z]/g, 'Should have an uppercase letter']
      };

      // error if password has these
      var negativeValidations = {
        illegalCharacter: [/[^A-z0-9\!\@\#\$\%\^\&\*]/g, 'Illegal Character']
      };

      var minPasswordLength = 8;
      var issue = undefined;
      var password = $el.val();
      var validationMessages = [];

      if (password.length) {
        if (password.length < minPasswordLength) {
          validationMessages.push('Should be at least 8 characters');
        }
      } else {
        validationMessages.push('A Password is required');
      }

      for (issue in positiveValidations) {
        var validation = positiveValidations[issue];
        if (!password.match(validation[0])) {
          validationMessages.push(validation[1]);
        }
      }

      for (issue in negativeValidations) {
        var validation = negativeValidations[issue];
        if (password.match(validation[0])) {
          validationMessages.push(validation[1]);
        }
      }

      var valid = !validationMessages.length;

      if (!valid) {
        $el.validationMessage = validationMessages.join('\n');
      }

      return valid;
    },

    // help from https://www.html5rocks.com/en/tutorials/geolocation/trip_meter/
    _initGeoLocation: function _initGeoLocation() {
      // check for Geolocation support
      if (navigator.geolocation) {
        // ask for geo location support early
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log('position:', position);
        }, function (error) {
          console.log('Error occurred. Error code: ' + error.code);
          // error.code can be:
          //   0: unknown error
          //   1: permission denied
          //   2: position unavailable (error response from locaton provider)
          //   3: timed out
        });
      } else {
          console.log('Geolocation is not supported for this Browser/OS version yet.');
        }
    },

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.scheduleOnce('afterRender', this._initFoundation.bind(this));
      Number.prototype.toRad = function () {
        return this * Math.PI / 180;
      };
      this._initGeoLocation();
    }
  });
});
define("running-log/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SbKRs0JP", "block": "{\"statements\":[[\"open-element\",\"header\",[]],[\"static-attr\",\"class\",\"app-header\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"nav-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav-list\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav-list__item brand\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"index\"],null,2],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"login\"],null,1],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"new-run\"],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"body-content\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav-list__item new-run-button\"],[\"flush-element\"],[\"text\",\"\\n          New Run+\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav-list__item sign-in-button\"],[\"flush-element\"],[\"text\",\"\\n          Sign In\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"logo\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"app-title\"],[\"flush-element\"],[\"text\",\"Run Log\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "running-log/application/template.hbs" } });
});
define('running-log/components/create-account-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    emailValidationMessage: '',

    passwordValidationMessage: '',

    didInsertElement: function didInsertElement() {
      var _this = this;

      // to prevent form from submitting upon successful validation
      this.$().on("submit", function (event) {
        event.preventDefault();
      }).on("invalid.zf.abide", function (ev, elem) {
        // move this stuff to a 'validated-input' ember component
        var elementId = elem.attr('id');
        if (elementId === 'account-password') {
          _this.set('passwordValidationMessage', elem.validationMessage);
        } else if (elementId === 'account-email') {
          _this.set('emailValidationMessage', elem.validationMessage);
        }
      })
      // field element is valid
      .on("valid.zf.abide", function (ev, elem) {
        console.log("Field name " + elem.attr('name') + " is valid");
      });
    }
  });
});
define("running-log/components/create-account-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "JIvdKNIT", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"my-form\"],[\"static-attr\",\"data-abide\",\"\"],[\"static-attr\",\"data-validate-on-blur\",\"true\"],[\"static-attr\",\"novalidate\",\"\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row column log-in\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"text-center\"],[\"flush-element\"],[\"text\",\"Create an Account\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"account-email\"],[\"flush-element\"],[\"text\",\"\\n      Email\\n      \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"account-email\"],[\"static-attr\",\"type\",\"email\"],[\"static-attr\",\"name\",\"account-email\"],[\"static-attr\",\"placeholder\",\"Enter your email\"],[\"static-attr\",\"data-validator\",\"multiValidateText\"],[\"static-attr\",\"pattern\",\"email\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"form-error\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"emailValidationMessage\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"account-password\"],[\"flush-element\"],[\"text\",\"\\n      Password\\n      \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"account-password\"],[\"static-attr\",\"type\",\"password\"],[\"static-attr\",\"name\",\"account-password\"],[\"static-attr\",\"placeholder\",\"Enter your password\"],[\"static-attr\",\"data-validator\",\"passwordValidate\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"form-error account-password-validation\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"passwordValidationMessage\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"account-confirm-password\"],[\"flush-element\"],[\"text\",\"\\n      Confirm Password\\n      \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"account-confirm-password\"],[\"static-attr\",\"type\",\"password\"],[\"static-attr\",\"name\",\"confirm-password\"],[\"static-attr\",\"placeholder\",\"Type your password again\"],[\"static-attr\",\"data-equalTo\",\"account-password\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"form-error\"],[\"flush-element\"],[\"text\",\"Password should be equal\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"button expanded\"],[\"static-attr\",\"value\",\"Sign In\"],[\"flush-element\"],[\"text\",\"Create Account\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/components/create-account-form/template.hbs" } });
});
define('running-log/components/date-tile/component', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['date-tile'],

    date: null,

    momentDate: _ember['default'].computed('date', function () {
      var date = this.get('date');

      return (0, _moment['default'])(date);
    }),

    month: _ember['default'].computed('momentDate', function () {
      var momentDate = this.get('momentDate');

      return momentDate.format('MMM');
    }),

    day: _ember['default'].computed('momentDate', function () {
      var momentDate = this.get('momentDate');

      return momentDate.format('DD');
    }),

    year: _ember['default'].computed('momentDate', function () {
      var momentDate = this.get('momentDate');

      return momentDate.format('YYYY');
    })
  });
});
define("running-log/components/date-tile/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mFGErHR9", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"date-tile__month\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"month\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"date-tile__day\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"day\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"date-tile__year\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"year\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/components/date-tile/template.hbs" } });
});
define('running-log/components/distance-tracker/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    distance: 0.0,

    startPosition: null,

    watchId: null,

    start: function start() {
      var _this2 = this;

      navigator.geolocation.getCurrentPosition(function (position) {
        _this2.set('startPosition', position);
        var id = navigator.geolocation.watchPosition(_this2.read.bind(_this2));

        _this2.set('watchId', id);
      });
    },

    read: function read(currentPosition) {
      console.log('currentPosition:', currentPosition);
      var startPosition = this.get('startPosition');
      var startCoords = startPosition.coords;
      var currentCoords = currentPosition.coords;
      var currentDistance = this.get('distance');
      currentDistance += this._calculateDistance(startCoords.latitude, startCoords.longitude, currentCoords.latitude, currentCoords.longitude);

      this.set('startPosition:', currentPosition);
      this.set('distance', currentDistance.toFixed(1));
    },

    stop: function stop() {
      navigator.geolocation.clearWatch(this.get('watchId'));
      this.set('watchId', null);
    },

    reset: function reset() {
      navigator.geolocation.clearWatch(this.get('watchId'));
      this.set('distance', 0.0);
      this.set('startPosition', null);
      this.set('watchId', null);
    },

    willDestroyElement: function willDestroyElement() {
      this.reset();
    },

    // help from http://www.movable-type.co.uk/scripts/latlong.html
    // in kilometers
    _calculateDistance: function _calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = (lat2 - lat1).toRad();
      var dLon = (lon2 - lon1).toRad();
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;

      return d;
    },

    shouldStartTracker: null,

    shouldPauseTracker: null,

    shouldResetTracker: null,

    // also resume
    startTracker: _ember['default'].observer('shouldStartTracker', function () {
      if (this.get('shouldStartTracker')) {
        var _this = this;

        if (!_this.get('startPosition')) {
          this.start();
        }
      }
    }),

    // also stop
    pauseTracker: _ember['default'].observer('shouldPauseTracker', function () {
      if (this.get('shouldPauseTracker')) {
        this.stop();
      }
    })
  });
});
define("running-log/components/distance-tracker/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9bM4+yj5", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"distance\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/components/distance-tracker/template.hbs" } });
});
define('running-log/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('running-log/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('running-log/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('running-log/components/login-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    emailValidationMessage: '',

    passwordValidationMessage: '',

    didInsertElement: function didInsertElement() {
      var _this = this;

      // to prevent form from submitting upon successful validation
      this.$().on("submit", function (event) {
        event.preventDefault();
      }).on("invalid.zf.abide", function (ev, elem) {
        // move this stuff to a 'validated-input' ember component
        var elementId = elem.attr('id');
        if (elementId === 'login-password') {
          _this.set('passwordValidationMessage', elem.validationMessage);
        } else if (elementId === 'login-email') {
          _this.set('emailValidationMessage', elem.validationMessage);
        }
      })
      // field element is valid
      .on("valid.zf.abide", function (ev, elem) {
        console.log("Field name " + elem.attr('name') + " is valid");
      });
    }
  });
});
define("running-log/components/login-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yvRS5Vo8", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"my-form\"],[\"static-attr\",\"data-abide\",\"\"],[\"static-attr\",\"data-validate-on-blur\",\"true\"],[\"static-attr\",\"novalidate\",\"\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row column log-in\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h2\",[]],[\"static-attr\",\"class\",\"text-center\"],[\"flush-element\"],[\"text\",\"Sign Into Your Account\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"login-email\"],[\"flush-element\"],[\"text\",\"\\n      Email\\n      \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"login-email\"],[\"static-attr\",\"type\",\"email\"],[\"static-attr\",\"name\",\"email\"],[\"static-attr\",\"placeholder\",\"Enter your email\"],[\"static-attr\",\"data-validator\",\"multiValidateText\"],[\"static-attr\",\"pattern\",\"email\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"form-error\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"emailValidationMessage\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"login-password\"],[\"flush-element\"],[\"text\",\"\\n      Password\\n      \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"id\",\"login-password\"],[\"static-attr\",\"type\",\"password\"],[\"static-attr\",\"name\",\"password\"],[\"static-attr\",\"placeholder\",\"Enter your password\"],[\"static-attr\",\"data-validator\",\"multiValidateText\"],[\"static-attr\",\"required\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"form-error\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"passwordValidationMessage\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"forgot-password\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Forgot your password?\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"button expanded\"],[\"static-attr\",\"value\",\"Sign In\"],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"create-account\"],null,0],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"text-center create-account\"],[\"flush-element\"],[\"text\",\"Create an Account\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "running-log/components/login-form/template.hbs" } });
});
define('running-log/components/pace-tracker/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    pace: _ember['default'].computed('distance', 'time', function () {
      var distance = this.get('distance');
      var time = this.get('time');
      var pace = 0;

      if (distance > 0) {
        var seconds = time / 1000;
        pace = seconds / distance / 60;
      }

      return pace.toFixed(1);
    }),

    distance: 0.0,

    time: 0
  });
});
define("running-log/components/pace-tracker/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SAaZybSZ", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"pace\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/components/pace-tracker/template.hbs" } });
});
define('running-log/components/stopwatch-timer/component', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
  exports['default'] = _ember['default'].Component.extend({
    timerInterval: null,

    currentTime: 0,

    formattedTime: _ember['default'].computed('currentTime', function () {
      var currentTime = this.get('currentTime');
      var duration = _moment['default'].duration(Math.floor(currentTime), 'milliseconds');

      if (Math.floor(duration.asHours()) > 0) {
        return duration.format('hh:mm:ss', { trim: false, precision: 2 });
      }

      return duration.format('mm:ss', { trim: false, precision: 2 });
    }),

    startTime: null,

    lapTime: 0,

    start: function start() {
      this.set('startTime', performance.now());
    },

    read: function read() {
      var startTime = this.get('startTime');
      var now = performance.now();

      return this.get('lapTime') + now - startTime;
    },

    stop: function stop() {
      this.set('lapTime', this.read());
      this.set('startTime', null);
    },

    reset: function reset() {
      clearInterval(this.get('timerInterval'));
      this.set('timerInterval', null);
      this.set('lapTime', 0);
      this.set('startTime', null);
      this.set('currentTime', 0);
    },

    willDestroyElement: function willDestroyElement() {
      this.reset();
    },

    shouldStartTimer: null,

    shouldPauseTimer: null,

    shouldResetTimer: null,

    // also resume
    startTimer: _ember['default'].observer('shouldStartTimer', function () {
      var _this2 = this;

      if (this.get('shouldStartTimer')) {
        (function () {
          var _this = _this2;

          if (!_this.get('startTime')) {
            _this2.start();

            var timerInterval = setInterval(function () {
              var time = _this.read();
              _this.set('currentTime', time);
            }, 1);

            _this2.set('timerInterval', timerInterval);
          }
        })();
      }
    }),

    // also stop
    pauseTimer: _ember['default'].observer('shouldPauseTimer', function () {
      if (this.get('shouldPauseTimer')) {
        this.stop();
        clearInterval(this.get('timerInterval'));
        this.set('timerInterval', null);
      }
    })
  });
});
define("running-log/components/stopwatch-timer/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "VDHleY6w", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"formattedTime\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/components/stopwatch-timer/template.hbs" } });
});
define('running-log/components/zf-accordion-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion-menu'], function (exports, _emberCliFoundation6SassComponentsZfAccordionMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfAccordionMenu['default'];
    }
  });
});
define('running-log/components/zf-accordion', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion'], function (exports, _emberCliFoundation6SassComponentsZfAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfAccordion['default'];
    }
  });
});
define('running-log/components/zf-drilldown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-drilldown-menu'], function (exports, _emberCliFoundation6SassComponentsZfDrilldownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDrilldownMenu['default'];
    }
  });
});
define('running-log/components/zf-dropdown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown-menu'], function (exports, _emberCliFoundation6SassComponentsZfDropdownMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDropdownMenu['default'];
    }
  });
});
define('running-log/components/zf-dropdown', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown'], function (exports, _emberCliFoundation6SassComponentsZfDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfDropdown['default'];
    }
  });
});
define('running-log/components/zf-magellan', ['exports', 'ember-cli-foundation-6-sass/components/zf-magellan'], function (exports, _emberCliFoundation6SassComponentsZfMagellan) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfMagellan['default'];
    }
  });
});
define('running-log/components/zf-off-canvas', ['exports', 'ember-cli-foundation-6-sass/components/zf-off-canvas'], function (exports, _emberCliFoundation6SassComponentsZfOffCanvas) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfOffCanvas['default'];
    }
  });
});
define('running-log/components/zf-orbit', ['exports', 'ember-cli-foundation-6-sass/components/zf-orbit'], function (exports, _emberCliFoundation6SassComponentsZfOrbit) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfOrbit['default'];
    }
  });
});
define('running-log/components/zf-reveal', ['exports', 'ember-cli-foundation-6-sass/components/zf-reveal'], function (exports, _emberCliFoundation6SassComponentsZfReveal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfReveal['default'];
    }
  });
});
define('running-log/components/zf-slider', ['exports', 'ember-cli-foundation-6-sass/components/zf-slider'], function (exports, _emberCliFoundation6SassComponentsZfSlider) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfSlider['default'];
    }
  });
});
define('running-log/components/zf-tabs', ['exports', 'ember-cli-foundation-6-sass/components/zf-tabs'], function (exports, _emberCliFoundation6SassComponentsZfTabs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfTabs['default'];
    }
  });
});
define('running-log/components/zf-tooltip', ['exports', 'ember-cli-foundation-6-sass/components/zf-tooltip'], function (exports, _emberCliFoundation6SassComponentsZfTooltip) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassComponentsZfTooltip['default'];
    }
  });
});
define('running-log/create-account/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("running-log/create-account/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eZuMz04J", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"create-account-form\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/create-account/template.hbs" } });
});
define('running-log/helpers/app-version', ['exports', 'ember', 'running-log/config/environment'], function (exports, _ember, _runningLogConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _runningLogConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('running-log/helpers/is-after', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersIsAfter) {
  exports['default'] = _emberMomentHelpersIsAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/is-before', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersIsBefore) {
  exports['default'] = _emberMomentHelpersIsBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/is-between', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersIsBetween) {
  exports['default'] = _emberMomentHelpersIsBetween['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/is-same-or-after', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersIsSameOrAfter) {
  exports['default'] = _emberMomentHelpersIsSameOrAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/is-same-or-before', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersIsSameOrBefore) {
  exports['default'] = _emberMomentHelpersIsSameOrBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/is-same', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersIsSame) {
  exports['default'] = _emberMomentHelpersIsSame['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-add', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentAdd) {
  exports['default'] = _emberMomentHelpersMomentAdd['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-calendar', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('running-log/helpers/moment-format', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-from-now', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-from', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentFrom) {
  exports['default'] = _emberMomentHelpersMomentFrom['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-subtract', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentSubtract) {
  exports['default'] = _emberMomentHelpersMomentSubtract['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-to-date', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentToDate) {
  exports['default'] = _emberMomentHelpersMomentToDate['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-to-now', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-to', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentHelpersMomentTo) {
  exports['default'] = _emberMomentHelpersMomentTo['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('running-log/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('running-log/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _emberMomentHelpersMoment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMoment['default'];
    }
  });
});
define('running-log/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('running-log/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('running-log/index/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('log');
    }
  });
});
define("running-log/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RhsSuvN0", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/index/template.hbs" } });
});
define('running-log/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'running-log/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _runningLogConfigEnvironment) {
  var _config$APP = _runningLogConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('running-log/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('running-log/initializers/export-application-global', ['exports', 'ember', 'running-log/config/environment'], function (exports, _ember, _runningLogConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_runningLogConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _runningLogConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_runningLogConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('running-log/initializers/zf-widget', ['exports', 'ember-cli-foundation-6-sass/initializers/zf-widget'], function (exports, _emberCliFoundation6SassInitializersZfWidget) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassInitializersZfWidget['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCliFoundation6SassInitializersZfWidget.initialize;
    }
  });
});
define('running-log/log/route', ['exports', 'ember'], function (exports, _ember) {
  var stub = [{
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 1
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 2
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 3
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 4
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 5
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 6
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 7
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 8
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 9
  }, {
    distance: 9,
    time: 5400000, // in milliseconds
    pace: '9\' 10"',
    date: 1484602919979,
    id: 10
  }];

  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var runs = localStorage.getItem('run-log-runs');
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
});
define("running-log/log/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SpPU2elH", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"run-list\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"log-header\"],[\"flush-element\"],[\"text\",\"Past Runs\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"runs\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"run-tile\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"date-tile\"],null,[[\"date\",\"class\"],[[\"get\",[\"run\",\"date\"]],\"run-tile__date\"]]],false],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"run-info\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"run-info__item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"run\",\"distance\"]],false],[\"text\",\" km\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"run-info__item\"],[\"flush-element\"],[\"text\",\"time: \"],[\"append\",[\"unknown\",[\"run\",\"time\"]],false],[\"text\",\" pace: \"],[\"append\",[\"unknown\",[\"run\",\"pace\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"run\"]}],\"hasPartials\":false}", "meta": { "moduleName": "running-log/log/template.hbs" } });
});
define('running-log/login/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("running-log/login/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ixFeDUMl", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"login-form\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "running-log/login/template.hbs" } });
});
define('running-log/new-run/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.setProperties({
        isRunning: null,

        distance: 0.0,

        currentTime: 0,

        pace: 0,

        actions: {
          startRun: function startRun() {
            this.set('isRunning', true);
            this.set('isPaused', false);
          },

          pauseRun: function pauseRun() {
            this.set('isRunning', false);
            this.set('isPaused', true);
          },

          endRun: function endRun() {
            this.set('isRunning', false);
            this.set('isPaused', true);

            var runs = localStorage.getItem('run-log-runs');

            if (runs) {
              runs = JSON.parse(runs);
            } else {
              runs = [];
            }

            runs.unshift({
              distance: this.get('distance'),
              time: this.get('currentTime'),
              pace: this.get('pace'),
              date: Date.now(),
              id: runs.length + 1
            });

            localStorage.setItem('run-log-runs', JSON.stringify(runs));
            this.transitionToRoute('log');
          }
        }
      });
    }
  });
});
define("running-log/new-run/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Gg7+8lF2", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"run-tracker-container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"primary-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"distance\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"distance-tracker\"],null,[[\"shouldStartTracker\",\"shouldPauseTracker\",\"distance\"],[[\"get\",[\"isRunning\"]],[\"get\",[\"isPaused\"]],[\"helper\",[\"mut\"],[[\"get\",[\"distance\"]]],null]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"kilometers\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"secondary-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"elasped-time\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"stopwatch-timer\"],null,[[\"shouldStartTimer\",\"shouldPauseTimer\",\"currentTime\"],[[\"get\",[\"isRunning\"]],[\"get\",[\"isPaused\"]],[\"helper\",[\"mut\"],[[\"get\",[\"currentTime\"]]],null]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"pace\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"pace-tracker\"],null,[[\"distance\",\"time\",\"pace\"],[[\"get\",[\"distance\"]],[\"get\",[\"currentTime\"]],[\"helper\",[\"mut\"],[[\"get\",[\"pace\"]]],null]]]],false],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n        min/km\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"section\",[]],[\"static-attr\",\"class\",\"button-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"class\",\"run-button primary-button\"],[\"static-attr\",\"tabindex\",\"0\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isRunning\"]]],null,1,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-label\",\"End Run\"],[\"static-attr\",\"class\",\"run-button secondary-button\"],[\"static-attr\",\"tabindex\",\"0\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"endRun\"]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-stop-circle\"],null],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-label\",\"Start Run\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"startRun\"]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-play-circle\"],null],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-label\",\"Pause Run\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"pauseRun\"]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"fa-icon\"],[\"fa-pause-circle\"],null],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "running-log/new-run/template.hbs" } });
});
define('running-log/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('running-log/router', ['exports', 'ember', 'running-log/config/environment'], function (exports, _ember, _runningLogConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _runningLogConfigEnvironment['default'].locationType,
    rootURL: _runningLogConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('new-run');
    this.route('log');
    this.route('login');
    this.route('create-account');
  });

  exports['default'] = Router;
});
define('running-log/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('running-log/services/moment', ['exports', 'ember', 'running-log/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _runningLogConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_runningLogConfigEnvironment['default'], 'moment.outputFormat')
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('running-log/config/environment', ['ember'], function(Ember) {
  var prefix = 'running-log';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("running-log/app")["default"].create({"name":"running-log","version":"0.0.0+b54c9370"});
}

/* jshint ignore:end */
//# sourceMappingURL=running-log.map
