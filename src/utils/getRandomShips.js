export default function getRandomShips() {
	const arrLength = 10;
	const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
	let matrix = [];

	for (let i=0; i<arrLength; i++) {
		matrix[i] = [];
		for (let j=0; j<arrLength; j++) {
			matrix[i].push(0);
		}
	}

	ships.forEach((ship) => {
		matrix = createShip(ship, matrix);
	})
}

function createShip(ship, matrix) {
	let x0 = Math.round(- 0.5 + Math.random() * (10));
	let y0 = Math.round(- 0.5 + Math.random() * (10));

	// if (matrix[x0][y0] && matrix[x0][y0] !== 0) {
	// 	let flag = false;
	// 	while(!flag){
	// 		x0 = Math.round(- 0.5 + Math.random() * (10));
	// 		y0 = Math.round(- 0.5 + Math.random() * (10));
	//
	// 		if (matrix[x0][y0] === 0)
	// 			flag = true;
	// 	}
	// }
	//
	// if (9 - x0 >= ship) {
	// 	for (let i=0; i<ship; i++){
	// 		matrix[x0+i][y0] = 2;
	// 	}
	// }

	return matrix;
}