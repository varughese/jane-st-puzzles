/*

Idea is to represent as a directed graph. Nodes point to the right, and to the bottom children below it
0: 1, 2
1: 2, 3, 4
2: 4, 5
3: 4, 6, 7
4: 5, 7, 8
5: 8, 9
6: 7, 10, 11
...

So, its a dag, algorithim might be go from 0 to end and try every combination of triad

so, 0: pick 1, 2
remove them
next is 3
3, pick 4 and 7, remove them, continue, if that doesnt work, recurse back to 3, and then pick 6 and 7 instead, recruse

This is like O(2^n) though, because at every choice, if you mess up, you neeed to try it a while. unsure if DP would help, need to spend a few more hours on it
*/

let N = 24;

function generateGraph(N) {
	const graph = [];
	graph[0] = [1, 2];
	
	let row = 2;
	let dot = 1; 
	// `dot` is the current dot on the triangular, going from top to bottom, left to right
	while (row < N) {
		for(var j=0; j<row-1; j++) {
			graph[dot]= [dot + 1, dot + row, dot + row + 1];
			dot++;
		}
		graph[dot] = [dot + row, dot + row + 1];
		dot++;
		row++;
	}
	for(var j=0; j<row-1;j++) {
		graph[dot] = [dot+1]
		dot++;
	}
	graph[dot] = [];
	return graph;
}

const lastDot = N * (N+1) / 2; // Formula for Nth triangular number
const used = new Array(lastDot);

if ((lastDot+1) % 3 == 0) {
	console.log(N + ": False");
	return false;
}

const graph = generateGraph(N);

const triads = [];
let currentTriad = 0;
function recurseTriad(used, dot) {
	if (dot == lastDot-1) {
		return used.filter(u => !u).length == 0; 
	}
	if (used[dot]) {
		return recurseTriad(used, dot+1);
	}
	used[dot] = true;
	const connected = graph[dot];
	if (connected.length == 1) {
		return false;
	}
	if (connected.length == 2) {
		const [left, right] = connected;
		if (!used[left] && !used[right]) {
			used[left] = true;
			used[right] = true;
			if(recurseTriad(used, dot + 1)) {
				triads.push([dot, left, right])
				return true;
			}
		}
		return false;
	} else {
		const [right, bleft, bright] = connected;
		const usedCopy = [...used];
		let success = false;
		if (!used[right] && !used[bright]) {
			used[right] = true;
			used[bright] = true;
			success = recurseTriad(used, dot+1);
			if (success) {
				triads.push([dot, right, bright])
				return true;
			}
		}
		used = usedCopy;
		if (!used[bright] && !used[bleft]) {
			used[bright] = true;
			used[bleft] = true;
			if(recurseTriad(used, dot+1)) {
				triads.push([dot, bleft, bright])
				return true;
			}
		}
		return false;
	}
}

function printTriangularGrid(N, triads=[]) {
	let row = 1;
	let i = 0;
	const grid = []
	while (row <= N) {
		const nums = []
		for(var j=0; j<row; j++) {
			nums.push(i);
			i++;
		}
		row++;
		grid.push(nums)
	}
	const map = {};
	const RESET_COLOR = "\x1b[0m"
	const colors = ["\x1b[31m", "\x1b[30m", "\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m", "\x1b[37m"]
	// const bgColors = ["\x1b[40m", "\x1b[41m", "\x1b[42m", "\x1b[43m","\x1b[44m", "\x1b[45m", "\x1b[46m", "\x1b[47m"]

	triads.forEach((triad, i) => {
		triad.forEach(num => {
			map[num] = colors[i % colors.length]
			const digits = (num+"").length
			map[num] += num;
			map[num] += " ".repeat(Math.max(0, 3-digits))
			map[num] += RESET_COLOR
		})
	})

	const SPACE = '   '

	grid.forEach((row, rowNo) => {
		const spaces = (N-rowNo-1);
		process.stdout.write(SPACE.repeat(spaces));
		// if (spaces % 2 == 1) {
		// 	process.stdout.write('\t')
		// }
		process.stdout.write(row.map(n => map[n] || n).join(SPACE));
		process.stdout.write('\n');
	})
}

const works = recurseTriad(used, 0);
console.log(N + " WORKS: " + works);
printTriangularGrid(N, triads)

