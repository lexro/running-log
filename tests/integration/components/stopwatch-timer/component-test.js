import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stopwatch-timer', 'Integration | Component | stopwatch timer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stopwatch-timer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#stopwatch-timer}}
      template block text
    {{/stopwatch-timer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
