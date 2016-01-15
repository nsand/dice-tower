(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.die = factory();
	}
}(this, function () {

	class Die {

		/**
		 * Creates a die of the specified number of sides, or 6 if not specified.
		 * @param {Number} [sides=6] the number of sides on the die
		 */
		constructor(sides=6) {
			this.sides = sides;
		}

		/**
		 * Rolls the die and returns the result
		 */
		roll() {
			this.side = Math.floor(Math.random() * this.sides) + 1;
			return this.side;
		}

		toString() {
			return this.side || NaN;
		}

		valueOf() {
			return this.side || NaN;
		}

		/**
		 * Parses the dice notation string and returns an array of rolled
		 * dice.
		 * @param {string} [string=d6] the dice notation string
		 * @return {Dice[]} an array of rolled dice
		 */
		static roll(string='d6') {
			let result = /^([1-9][0-9]*)*d([1-9][0-9]*)$/.exec(string);

			if (!result) {
				throw new Error('Invalid dice notation');
			}

			var dice = [];

			const size = result[1] || 1;
			const sides = Number(result[2]);

			for (let i = 0; i < size; i++) {
				let die = new Die(sides);
				die.roll();
				dice.push(die);
			}
			return dice;
		}
	}

	return Die;
}));
