function setBoard(){
    let board=[];
    for (let i = 0; i < 7; i++){
        board.push([]);
        for (let j = 0; j < 6; j++){
            board[i].push(0);
        }
    }
    return board;
}

function placeToken(board, chosenColumn, playerToken) {
    let value = board[chosenColumn].findIndex(element => element === 0);
    if (value >= 0 && value < 6 ) {
        board[chosenColumn][value] = playerToken;
        console.log(board)
        return {board: board ,latestAddition: [chosenColumn ,value]};
    } else return false;
}

function checkWin(board ,latestAddition){ // returns false if no win, else returns the player token that won
    return checkHorizontal(board, latestAddition) || checkVertical(board, latestAddition) || checkDiagonal(board);
}

function checkHorizontal(board, latestAddition){
    const row = latestAddition[1];
    for (let column = 0 ; column < board.length ; column++) {
        if  (board.length - column >= 4 && board[column][row] !== 0 && board[column][row] === board[column+1][row] && board[column][row] === board[column+2][row] && board[column][row] === board[column+3][row])
            return true;
    }
    return false;
}

function checkVertical(board, latestAddition){
    const column = latestAddition[0];
    for (let row = 0 ; row < board[column].length ; row++) {
        if(board[column].length - row >= 4 && board[column][row] !==0 && board[column][row] === board[column][row+1] && board[column][row] === board[column][row+2] && board[column][row] === board[column][row+3])
            return true;
    }
    return false;
}

function checkDiagonal(board){
    for (let column = 0 ; column < board.length ; column++) {
        for (let row = 0 ; row < board[column].length ; row++) {
            if (board[column][row] === 0) continue; // if cell is empty, skip to next cell
            else {
                // check diagonal up
                if(board.length - column >= 4 && board[column].length - row >= 4 && board[column][row] === board[column+1][row+1] && board[column][row] === board[column+2][row+2] && board[column][row] === board[column+3][row+3])
                    return true;
                // check diagonal down
                if(board.length - column >= 4 && row >= 3 && board[column][row] === board[column+1][row-1] && board[column][row] === board[column+2][row-2] && board[column][row] === board[column+3][row-3])
                    return true;
            }
        }
    }
    return false;
}

function checkDraw(board){
    const COLUMNS = 7;
    for (let i = 0; i < COLUMNS; i++){
        if (board[i].includes(0)) return false;
    }
    return true;
}

// Set up page
let BOARD;
let currentPlayerToken = 1;

function startButton() {
    let start = document.createElement("button");
        start.id = "start";
        start.className = "start";
        start.innerText = "Start";
        start.addEventListener("click", () => {
            startGame();
            start.innerText = "Restart";
        });
        document.body.appendChild(start);
}

function startGame() {
    currentPlayerToken = 1;
    createBoardDisplay();
    BOARD = setBoard();
    displayBoard(BOARD);
}

function displayMessage(state) {
    document.body.removeChild(document.getElementById("start"));

    let messageDisplay = document.createElement("div");
    messageDisplay.className = "messageDisplay";

    let message = document.createElement("p");
    message.className = "message";
    message.innerText = state === "draw" ? "The game is a Draw!" : `Congratulations Player ${currentPlayerToken}!\nYou win!`;

    let close = document.createElement("button");
    close.className = "close";
    close.innerText = "No Thanks";
    close.addEventListener("click", () => {
        startButton();
        document.getElementById("start").innerText = "Restart";
        document.getElementById("board").removeChild(messageDisplay);
        document.getElementById("board").removeChild(messageDisplay);
    });

    let playAgain = document.createElement("button");
    playAgain.className = "playAgain";
    playAgain.innerText = "Play Again?";
    playAgain.addEventListener("click", () => {
        startButton();
        startGame();
        document.getElementById("start").innerText = "Restart";
        document.getElementById("board").removeChild(messageDisplay);
    });

    messageDisplay.appendChild(message);
    messageDisplay.appendChild(playAgain);
    messageDisplay.appendChild(close);
    
    document.getElementById("board").appendChild(messageDisplay);
}

function gameDraw() {
    displayMessage("draw");
    document.getElementById("start").innerText = "Start";
}

function gameWin() {
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            BOARD[i][j] = currentPlayerToken;
        }
    }
    displayBoard(BOARD);
    displayMessage("win");
    document.getElementById("start").innerText = "Start";
}

function cleanBoard(board) {
    while (board.hasChildNodes()) {
        board.removeChild(board.lastChild);
    }
}

function createBoardDisplay() {
    let board = document.getElementById('board');
    cleanBoard(board);
    for (let i = 0; i < 7; i++) {
        let col = document.createElement("div");
        col.className = "col";
        col.id = `${i}`;
        for (let j = 0; j < 6; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = `${i}${j}`;
            cell.addEventListener("click", () => {
                columnSetup(i);
            });
            col.appendChild(cell);
        }
        board.appendChild(col);
    }
}

function columnSetup(i) {
    let tokenPlaced = placeToken(BOARD, i, currentPlayerToken);
    if (!tokenPlaced) alert("Invalid move!");
    else{
        BOARD = tokenPlaced.board;
        if (checkWin(BOARD, tokenPlaced.latestAddition)) gameWin();
        else if (checkDraw(BOARD, tokenPlaced.latestAddition)) gameDraw();
        else {
            displayBoard(BOARD);
            currentPlayerToken = currentPlayerToken === 1 ? 2 : 1;
        }
    }
}

function displayBoard(BOARD) {
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            let cell = document.getElementById(`${i}${5-j}`);
            if (BOARD[i][j] === 1) {
                cell.style.backgroundColor = "yellow";
            } else if (BOARD[i][j] === 2) {
                cell.style.backgroundColor = "red";
            } else continue;
        }
    }
}

startButton();