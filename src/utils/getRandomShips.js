const arrLength = 10;

export default function getRandomShips() {
	const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	let matrix = [];

	for (let i=0; i<arrLength; i++) {
		matrix[i] = [];
		for (let j=0; j<arrLength; j++) {
			matrix[i].push(0);
		}
	}

	ships.forEach((ship) => {
		createShip(ship, matrix);
	})

	return matrix;
}

function createShip(ship, matrix) {
	const orientation = ship !== 1 ? getOrientation() : 0;
	const [y0, x0] = getRandomCoords();
	let startX = x0;
	let startY = y0;
	const resultMatrix = [...matrix];

	if (resultMatrix[y0][x0] !== 0) {
		return createShip(ship, resultMatrix)
	} else {
		const coords = [];

		for (let length = 0; length < ship; length++) {
			if (startX < arrLength && startY < arrLength && resultMatrix[startY][startX] === 0 && !coords.some(([y,x]) => y === startY && x === startX)){
				coords.push([startY, startX]);

				if (orientation === 0)
					startY += 1;
				else
					startX += 1;
			} else {
				if (orientation === 0)
					startY = startY === arrLength ? y0 - 1 : startY - 1;
				else
					startX = startX === arrLength ? x0 - 1 : startX - 1;

				if (startX < arrLength && startY < arrLength && resultMatrix[startY][startX] === 0 && !coords.some(([y,x]) => y === startY && x === startX)){
					coords.push([startY, startX]);
				} else {
					break;
				}
			}
		}

		if (coords.length === ship) {
			coords.forEach(([y, x]) => {
				resultMatrix[y][x] = 2;
			})
			setCellsAround(resultMatrix, coords, orientation);
		} else
			return createShip(ship, resultMatrix);
	}

	return resultMatrix;
}

function getRandomCoords() {
	const x = Math.abs(Math.round(- 0.5 + Math.random() * (10)));
	const y = Math.abs(Math.round(- 0.5 + Math.random() * (10)));

	return [x, y];
}

function getOrientation() {
	const arr = [0, 1];
	return arr[Math.floor((Math.random()*arr.length))];
}

function setCellsAround(matrix, coords, orientation) {
	const prevArr = [];
	const nextArr = [];
	let main = 0;
	let min = 0;
	let max = 0;

	if (orientation === 0) {
		min = coords[0][0];
		main = coords[0][1];
		coords.forEach(([y,x]) => {
			min = y < min ? y : min;
			max = y > max ? y : max;
			prevArr.push([y, x-1]);
			nextArr.push([y, x+1]);
		})
	} else {
		min = coords[0][1];
		main = coords[0][0];
		coords.forEach(([y,x]) => {
			min = x < min ? x : min;
			max = x > max ? x : max;
			prevArr.push([y-1, x]);
			nextArr.push([y+1, x]);
		})
	}

	const cells = [...prevArr, ...nextArr];
	if (orientation === 0)
		cells.push([min-1, main-1], [min-1, main], [min-1, main+1], [max+1, main-1], [max+1, main], [max+1, main+1]);
	else
		cells.push([main-1, min-1], [main, min-1], [main+1, min-1], [main-1, max+1], [main, max+1], [main+1, max+1]);

	cells.forEach(([y,x]) => {
		if (y >= 0 && x >= 0 && y !== arrLength && x !== arrLength)
			matrix[y][x] = 1;
	})

	return matrix;
}