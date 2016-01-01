var tape = require('tape');
var Die = require('../lib/die');

tape.test('should have a default number of sides', function (expect) {
  var die = new Die();
  expect.equal(die.sides, 6);
  expect.end();
});

tape.test('should allow a specified number of sides', function (expect) {
  var die = new Die(20);
  expect.equal(die.sides, 20);
  expect.end();
});
