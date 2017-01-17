import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('new-run');
  this.route('log');
  this.route('run', { path: "run/:runId" });
});

export default Router;
