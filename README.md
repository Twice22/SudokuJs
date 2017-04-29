# simple-sudoku-solver

A very minimalist Sudoku solver using JavaScript and HTML Canvas.

## Installation
+ Clone the repository or download it
+ Go to `js/sudoku.js`
+ put you Grid example in each line of samples array.

For example if your Sudoku Grid is:
|   	|   	| 1 	| 5 	|   	| 8 	|   	| 7 	|   	|
|:-:	|---	|---	|---	|---	|---	|---	|---	|---	|
|   	| 5 	|   	|   	|   	|   	|   	| 9 	|   	|
|   	|   	| 4 	|   	|   	| 2 	|   	|   	|   	|
| 6 	| 8 	|   	| 1 	|   	|   	| 7 	|   	|   	|
| 4 	|   	|   	|   	|   	|   	|   	|   	| 5 	|
|   	|   	| 7 	|   	|   	| 9 	|   	| 6 	| 4 	|
|   	|   	|   	| 6 	|   	|   	| 8 	|   	|   	|
|   	| 1 	|   	|   	|   	|   	|   	| 3 	|   	|
|   	| 9 	|   	| 3 	|   	| 1 	| 6 	|   	|   	|

then you will need to add the string:
`"001508070050000090004002000680100700400000005007009064000600800010000030090301600",`
in the `samples` array (where 0 represent an empty case). Each number is filled from left to right, top to bottom.

## Usage
+ Open `index.html` with your browser
+ Press _solve_ to solve the Sudoku Grid
+ Press _reset_ to randomly reset the Sudoku Grid with a Grid from the `samples` array

**Note** : If you want to solve a precise Sudoku Grid, just put one string in the `samples` so `samples` array look likes:
```javascript
	samples = ["400001070317005060000004000200300708006000900804009006000900000020800354050400007"];
```
Then open index.html` with your browser and press _solve_


