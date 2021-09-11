const board1 = [
    [ 5 , 3,".",".", 7 ,".",".",".","."],
    [ 6 ,".",".", 1 , 9 , 5 ,".",".","."],
    [".", 9 , 8 ,".",".",".",".", 6 ,"."],
    [ 8 ,".",".",".", 6 ,".",".",".", 3 ],
    [ 4 ,".",".", 8 ,".", 3 ,".",".", 1 ],
    [ 7 ,".",".",".", 2 ,".",".",".", 6 ],
    [".", 6 ,".",".",".",".", 2 , 8 ,"."],
    [".",".",".", 4 , 1 , 9 ,".",".", 5 ],
    [".",".",".",".", 8 ,".",".", 7 , 9 ]
];

const board2 = [
    [ 5 , 3 ,".",".", 7 ,".",".",".","."],
    [ 6 ,".",".", 1 , 9 , 5 ,".",".","."],
    [".", 9 , 8 ,".",".",".",".", 6 ,"."],
    [ 8 ,".",".",".", 6 ,".",".",".", 3 ],
    [ 4 ,".",".", 8 ,".", 3 ,".",".", 1 ],
    [ 7 ,".",".",".", 2 ,".",".",".", 6 ],
    [".", 6 ,".",".",".",".", 2 , 8 ,"."],
    [".",".",".", 4 , 1 , 9 ,".",".", 5 ],
    [".",".",".",".", 8 ,".", 9 , 7 , 9 ]
];

function solve(board) {
    if (solved(board)) return board;
    else {
        const possibilities = nextBoards(board);
        const validBoards = keepOnlyValid(possibilities);
        return searchSolution(validBoards);
    }
}

function searchSolution(boards) {
    if (boards.length < 1) return false;
    else {
        let boardToBeSolve = boards.shift();
        const trial = solve(boardToBeSolve);

        if (trial !== false) return trial;
        else return searchSolution(boards);
    }
}

function solved(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === ".") return false;
        }
    }
    return true;
}

function nextBoards(board) {
    let boardsLeft = [];
    const firstEmpty = findEmptySpace(board); // return to coordinates
    if (firstEmpty != undefined) {
        const y = firstEmpty[0];
        const x = firstEmpty[1];

        for (let i = 1; i <= 9; i++) {
            let newBoard = [...board]; // copy the input board to dummy for further searching
            let row = [...newBoard[y]]; // copy the row to dummy from the input board
            row[x] = i; // fill in the first empty grid with numbers 1 - 9
            newBoard[y] = row; // insert data to board
            boardsLeft.push(newBoard); // save in boardsList
        }
    }
    return boardsLeft;
}

function findEmptySpace(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === ".") {
                return [i, j];
            }
        }
    }
}

function keepOnlyValid(boards) {
    return boards.filter(validBoardToStay => validBoard(validBoardToStay));
    // save valid boards in validBoardToStay
}

function validBoard(board) {
    return rowSafe(board) && colSafe(board) && boxSafe(board);
}

function rowSafe(board) {
    for (let i = 0; i < 9; i++) {
        let checkArray = []; // empty list for checking

        // Putting the numbers in the row into checkArray
        // Return false if ducplicate
        for (let j = 0; j < 9; j++) {
            if (checkArray.includes(board[i][j])) return false;
            else if (board[i][j] !== ".") checkArray.push(board[i][j]);
        }
    }
    return true;
}

function colSafe(board) {
    for (let i = 0; i < 9; i++) {
        let checkArray = []; // empty list for checking

        // Putting the numbers in the column into checkArray
        // Return false if ducplicate
        for (let j = 0; j < 9; j++) {
            if (checkArray.includes(board[j][i])) return false;
            else if (board[j][i] !== ".") checkArray.push(board[j][i]);
        }
    }
    return true;
}

function boxSafe(board) {
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ]

    // checking the boxes from left to right, from top to down
    for (let y = 0; y < 9; y += 3) {
        for (let x = 0; x < 9; x += 3) {
            let checkbox = [];
            // check each box, there are 9 boxes in total
            for (let i = 0; i < 9; i++) {
                let coordinates = [...boxCoordinates[i]];
                coordinates[0] += y; // y-coordinate in the board
                coordinates[1] += x; // y-coordinate in the board

                if (checkbox.includes(board[coordinates[0]][coordinates[1]])) return false;
                else if (board[coordinates[0]][coordinates[1]] !== ".") {
                    checkbox.push(board[coordinates[0]][coordinates[1]]);
                }
            }
        }
    }
    return true;
}



// Answer :
// [
//     ["5","3","4","6","7","8","9","1","2"],
//     ["6","7","2","1","9","5","3","4","8"],
//     ["1","9","8","3","4","2","5","6","7"],
//     ["8","5","9","7","6","1","4","2","3"],
//     ["4","2","6","8","5","3","7","9","1"],
//     ["7","1","3","9","2","4","8","5","6"],
//     ["9","6","1","5","3","7","2","8","4"],
//     ["2","8","7","4","1","9","6","3","5"],
//     ["3","4","5","2","8","6","1","7","9"]
// ]

const input = board1;

if (solve(input) === false) console.log("There is no solution for the board!");
else console.log(solve(input));