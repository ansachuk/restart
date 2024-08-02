const expenses = {
	"2023-01": {
		"01": {
			food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
			fuel: [210.22],
		},
		"09": {
			food: [11.9],
			fuel: [190.22],
		},
	},
	"2023-03": {
		"07": {
			food: [20, 11.9, 30.2, 11.9],
		},
		"04": {
			food: [10.2, 11.5, 2.5],
			fuel: [],
		},
	},
	"2023-04": {},
};

const defineFirstSunday = expensesMonth => {
	let acc = 1;
	let firstSunday = 0;

	do {
		firstSunday = new Date(`${expensesMonth}-0${acc}`).getDay() === 0 ? acc : 0;
		acc += 1;
	} while (firstSunday === 0);

	return firstSunday;
};

const definePayments = expensesData => {
	let chosenDays = [];

	Object.keys(expensesData).forEach(date => {
		const firstSunday = defineFirstSunday(date);

		Object.keys(expensesData[date]).forEach(dayOfMonth => {
			if (+dayOfMonth > firstSunday) {
				return;
			}

			Object.values(expensesData[date][dayOfMonth]).forEach(exp => {
				chosenDays = chosenDays.concat(exp);
			});
		});
	});

	return chosenDays;
};

const defineMediana = expenses => {
	if (expenses.length === 0) return null;

	const middleIndex = expenses.length / 2;

	if (expenses.length % 2 === 0) {
		return (expenses[middleIndex] + expenses[middleIndex - 1]) / 2;
	} else {
		return expenses[middleIndex - 0.5];
	}
};

function solution(allExpenses) {
	let result = null;

	let payments = definePayments(allExpenses).sort((a, b) => a - b);

	result = defineMediana(payments);

	return result;
}

console.log(solution(expenses));
