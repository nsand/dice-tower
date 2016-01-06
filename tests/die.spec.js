'use strict';

var tape = require('tape');
var Die = require('../lib/die');

tape.test('should have a default number of sides', expect => {
  var die = new Die();
  expect.equal(die.sides, 6);
  expect.end();
});

tape.test('should allow a specified number of sides', expect => {
  var die = new Die(20);
  expect.equal(die.sides, 20);
  expect.end();
});

tape.test('should return a result when rolled', expect => {
  var die = new Die();
  expect.equal(typeof die.roll(), 'number');
  expect.end();
});

tape.test('should always roll between 1 and the number of sides', expect => {
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

tape.test('should have a parse function with a default operation', expect => {
  expect.equal(typeof Die.parse, 'function');
  var parsed = Die.parse();
  expect.ok(Array.isArray(parsed));
  expect.equal(parsed.length, 1);
  expect.equal(parsed[0].sides, 6);
  expect.ok(parsed[0].side >= 1 && parsed[0].side <= 6);
  expect.end();
});

tape.test('should parse expressions, defaulting to one die', expect => {
  expect.equal(typeof Die.parse, 'function');
  var parsed = Die.parse('d20');
  expect.ok(Array.isArray(parsed));
  expect.equal(parsed.length, 1);
  expect.equal(parsed[0].sides, 20);
  expect.end();
});

tape.test('should parse expressions of dice notation format', expect => {
  expect.equal(typeof Die.parse, 'function');
  var parsed = Die.parse('5d20');
  expect.ok(Array.isArray(parsed));
  expect.equal(parsed.length, 5);
  var wrongSides = parsed.some(die => {
    if (die.sides !== 20) {
      return true;
    }
  });
  if (wrongSides) {
    expect.fail('A die didn\'t have 20 sides');
  }
  else {
    expect.pass();
  }
  expect.end();
});

tape.test('should throw an error if the format is invalid', expect => {
  let result, error;
  try {
    result = Die.parse('XXXXXXXXXXXXXXX');
  }
  catch (e) {
    error = e;
  }
  expect.equal(typeof result, 'undefined');
  expect.ok(error instanceof Error);
  expect.end();
})
