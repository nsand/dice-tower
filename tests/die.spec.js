var tape = require('tape');
var Die = require('../lib/die');

tape.test('should have a default number of sides', (expect) => {
  var die = new Die();
  expect.equal(die.sides, 6);
  expect.end();
});

tape.test('should allow a specified number of sides', (expect) => {
  var die = new Die(20);
  expect.equal(die.sides, 20);
  expect.end();
});

tape.test('should return a result when rolled', (expect) => {
  var die = new Die();
  expect.equal(typeof die.roll(), 'number');
  expect.end();
});

tape.test('should always roll between 1 and the number of sides', (expect) => {
  var die = new Die(1);
  for (var i = 0; i < 100; i++) {
    // Statistically reson
    die.roll();
    if (die.side < 1 || die.side > 1) {
      expect.fail();
    }
  }
  expect.pass();
  expect.end();
});

tape.test('should have a parse function with a default operation', (expect) => {
  expect.equal(typeof Die.parse, 'function');
  var parsed = Die.parse();
  expect.ok(Array.isArray(parsed));
  expect.equal(parsed.length, 1);
  expect.equal(parsed[0].sides, 6);
  expect.ok(parsed[0].side >= 1 && parsed[0].side <= 6);
  expect.end();
});
