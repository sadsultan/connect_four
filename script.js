const rows= 6;
const columns=7;
let board=[];

function setBoard(){
    let board=[];
    for (let i = 0; i < columns; i++){
        for (let j = 0; j < rows; j++){
            board[i][j]=0;
        }
    }
    return board;
}

function placeToken(board, selection, playerToken){
    let value = board[selection].findIndex( (element) => element === 0);
    if (value === -1) return false;
    else {
        board[selection][value]=playerToken;
        return [board ,[selection, value]];
    }
}

function checkWin(board ,latestAddition){
    let i = latestAddition[0];
    let j = latestAddition[1];

    for (let k=0; k < 3; k++){
        if(!(i && j)) break;
        i--;j--;
    }

    for (; i < columns-3 && j < rows-3; i++,j++){
        // Testing the diagonals
        if (board[i][j] && board[i+1][j+1] && board[i+2][j+2] && board[i+3][j+3]) return board[i][j];
        // Testing the columns 
        if (board[latestAddition[0]][j] && board[latestAddition[0]][j+1] && board[latestAddition[0]][j+2] && board[latestAddition[0]][j+3]) return board[latestAddition[0]][j];
        // Testing the rows
        if (board[i][latestAddition[1]] && board[i+1][latestAddition[1]] && board[i+2][latestAddition[1]] && board[i+3][latestAddition[1]]) return board[i][latestAddition[1]];
    }
    return 0;
}  

function checkDraw(board){
    for (let i = 0; i < columns; i++){
        if (board[i].includes(0)) return false;
    }
    return true;
}

function computerMove() {
    // Use a minmax algorithm using alpha-beta pruning to determine the best move here

}

function evaluateBoard(){
    // Evaluate the board here

}
