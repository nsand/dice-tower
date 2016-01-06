var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.die = factory();
	}
})(this, function () {
	var Die = (function () {

		/**
   * Creates a die of the specified number of sides, or 6 if not specified.
   * @param {Number} [sides=6] the number of sides on the die
   */

		function Die() {
			var sides = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

			_classCallCheck(this, Die);

			this.sides = sides;
		}

		/**
   * Rolls the die and returns the result
   */

		_createClass(Die, [{
			key: 'roll',
			value: function roll() {
				this.side = Math.floor(Math.random() * this.sides) + 1;
				return this.side;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return this.side || NaN;
			}
		}, {
			key: 'valueOf',
			value: function valueOf() {
				return this.side || NaN;
			}

			/**
    * Parses the dice notation string and returns an array of rolled
    * dice.
    * @param {string} [string=d6] the dice notation string
    * @return {Dice[]} an array of rolled dice
    */

		}], [{
			key: 'parse',
			value: function parse() {
				var string = arguments.length <= 0 || arguments[0] === undefined ? 'd6' : arguments[0];

				var result = /^([1-9][0-9]*)*d([1-9][0-9]*)$/.exec(string);

				if (!result) {
					throw new Error('Invalid dice notation');
				}

				var dice = [];

				var size = result[1] || 1;
				for (var i = 0; i < size; i++) {
					var die = new Die(Number(result[2]));
					die.roll();
					dice.push(die);
				}
				return dice;
			}
		}]);

		return Die;
	})();

	return Die;
});