$(function () {

	samples = [
		// samples of grid (put your own grid here replacing empty case by 0 from right to
		// left, top to bottom).
		"001403090009001200003007006000900001607000304800006000700300100005100800030602900",
        "001508070050000090004002000680100700400000005007009064000600800010000030090301600",
        "502406010987002040000000000000200701708000609201009000000000000010500873070903204",
        "009801500052007090000009007800000006907000201400000003600300000080200140004905300",
        "902700050130008270000006000590100000004000500000004087000600000081400063020001705",
        "000005420316008050000001003600500800902000306008009005500100000060800534083900000",
        "503107420004005700000004000640800009005000800800003047000700000006300200081602305",
        "800603070970000160003007000690800000001000600000004092000700800027000036080405009",
        "900704100072000060000002007500900001609000502100008009800500000060000750003601004",
        "407008060390006000002003000730000600206000405009000082000400500000800016020100709",
        "300507020760002090002009000180000700200000005009000014000800100020700089070605003",
        "400001070317005060000004000200300708006000900804009006000900000020800354050400007"
        ];

	var Grid = {
		dim: 800,
		padding: 10,
		row: 9,
	};

	var randomInit  = [];
	var solution = [];

	var dim = Grid.dim + (Grid.padding*2);
	var canvas = $('<canvas/>').attr({"width": dim, "height": dim}).appendTo('.background');
	var ctx = canvas[0].getContext("2d");

	function draw(ctx) {
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		ctx.fillStyle = "#000";

		var step = Math.floor(Grid.dim/Grid.row);
		var pad = Grid.padding;

		for (var i = 0; i <= Grid.dim; i += step) {
			ctx.beginPath();

			ctx.moveTo(i + pad, pad);
	        ctx.lineTo(i + pad, step*Grid.row+pad);
	        ctx.moveTo(pad, i + pad);
	        ctx.lineTo(step*Grid.row+pad, i + pad);

			ctx.lineWidth = (!(i % 3)) ? 3 : 1;
			ctx.stroke();
		}
	}

	function writeDigit(ctx, array, i, j, step, shift, pad) {
		ctx.fillText(array[i + Grid.row*j],i*step + pad+shift,j*step+pad+shift);
	}

	function initNumber(ctx) {
		var step = Math.floor(Grid.dim/Grid.row);
		var pad = Grid.padding;
		var shift = Math.floor(step/2);
		var len = randomInit.length;

		for (var i = 0; i < Grid.row; i += 1) {
			for (var j = 0; j < Grid.row; j += 1) {
				if (randomInit[i + Grid.row*j] != 0) {
					writeDigit(ctx, randomInit, i, j, step, shift, pad)
				}
			}
		}
	}

	function allNumber(ctx) {
		var step = Math.floor(Grid.dim/Grid.row);
		var pad = Grid.padding;
		var shift = Math.floor(step/2);
		var len = randomInit.length;

		ctx.fillStyle = "#646464";

		for (var i = 0; i < Grid.row; i += 1) {
			for (var j = 0; j < Grid.row; j += 1) {
				if (randomInit[i + Grid.row*j] !== solution[i + Grid.row*j]) {
					writeDigit(ctx, solution, i, j, step, shift, pad)
				}
			}
		}
	}

	function numOnLine(array, idx) {
		return array.slice(idx*9, 9*idx+9).filter(Number);
	}

	function numOnCol(array, idx) {
		var arr = [];
		for(i = 0; i < Grid.row; i++) {
			if (array[i*Grid.row+idx] !=="0") {
				arr.push(array[i*Grid.row+idx]);
			}
		}
		return arr;
	}

	function numOnBloc(array, idx1, idx2) {
		var xPos = Math.floor(idx1 / 3), yPos = Math.floor(idx2 / 3);
		var x = [Grid.row*3*xPos+yPos*3, Grid.row*3*xPos+3*(yPos+1)];

		var arr = [];
		for (var i = x[0]; i < x[1]; i++) {
			for (var j = 0; j < 3; j++) {
				if (array[i+Grid.row*j] !=="0") {
					arr.push(array[i+Grid.row*j]);
				}
			}
		}
		return arr;
	}

	function digitAllowed(array, idx1, idx2) {
		var uniq = numOnBloc(array, idx1, idx2).concat(numOnLine(array, idx1), numOnCol(array, idx2)).filter(function(elem, index, self) {
			return index == self.indexOf(elem);
		}).sort();
		
		var possibleArray = [];
		var pt = 1, i =0;
		while(pt <= Grid.row) {
			if (uniq[i] !== pt+"") {
				possibleArray.push(pt+"");
				pt++;
			} else {
				i++; pt++;
			}
		}
		return possibleArray;
	}

	function nextCase(idx1, idx2) {
		var ret = idx2 + 1 === 9 ? 1 : 0
		return [idx1+ret, (idx2+1) % 9];
	}


	function solve(idx1, idx2) {
		var comeBackToCase = [];
		var next = [idx1, idx2];
		var ind = 0;

		while ( next[0] !== 9 ) {
			ind = 0;
			while ( solution[next[0]*Grid.row+next[1]] !== "0" ) {
				next = nextCase(next[0], next[1]);
				if ( next[0] >= 9 ) {
					return;
				}
			} // next contient la première case non encore renseignée.
			var digitArr = digitAllowed(solution, next[0], next[1]);

			if (!digitArr.length) {
				do {
					solution[next[0]*Grid.row+next[1]] = "0";
					ind = comeBackToCase.pop()+1;
					digitArr = comeBackToCase.pop();
					next = comeBackToCase.pop();
				} while (ind === digitArr.length);
			}
			comeBackToCase.push(next);
			comeBackToCase.push(digitArr);
			comeBackToCase.push(ind);
			solution[next[0]*Grid.row+next[1]] = digitArr[ind];
		}
	}

	function init() {
		draw(ctx);

		randomInit  = samples[Math.floor(Math.random()*10)].split('');
		solution = randomInit.slice(0);

		ctx.font = "48px Arial";
		ctx.textAlign="center"; 
		ctx.textBaseline = 'middle';
		initNumber(ctx);

		ctx.strokeStyle = "black";
		solve(0, 0);
	};

	init();

	$("#solve").click(function() {
		allNumber(ctx);
	});

	$("#reset").click(function() {
		init();
	});


});