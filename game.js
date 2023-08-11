export const ticTacToe = {
setBoard(){
    let board=[];
    for (let i = 0; i < 7; i++){
        board.push([]);
        for (let j = 0; j < 6; j++){
            board[i].push(4);
        }
    }
    return board;
},

placeToken(board, chosenColumn, playerToken){
    let value = board[chosenColumn].findIndex( (element) => element === 4);
    if (value >= 0 && value < 6 ) {
        board[chosenColumn][value] = playerToken;
        return {board: board ,latestAddition: [chosenColumn,value]};
    } else return false;
},
checkWin(board ,latestAddition){ // returns false if no win, else returns the player token that won
    const COLUMNS = 7;
    const ROWS = 6;

    let i = latestAddition[0];
    let j = latestAddition[1];

    for (let k=0; k < 3; k++){
        if(!(i && j)) break;
        i--;j--;
    }

    for (; i < COLUMNS-3 && j < ROWS-3; i++,j++){
        // Testing the diagonals
        if (board[i][j] && board[i+1][j+1] && board[i+2][j+2] && board[i+3][j+3]) 
            return board[i][j];
        // Testing the 7 
        if (board[latestAddition[0]][j] && board[latestAddition[0]][j+1] && board[latestAddition[0]][j+2] && board[latestAddition[0]][j+3]) 
            return board[latestAddition[0]][j];
        // Testing the 6
        if (board[i][latestAddition[1]] && board[i+1][latestAddition[1]] && board[i+2][latestAddition[1]] && board[i+3][latestAddition[1]]) 
            return board[i][latestAddition[1]];
    }
    return false;
},
checkDraw(board){
    const COLUMNS = 7;
    for (let i = 0; i < COLUMNS; i++){
        if (board[i].includes(4)) return false;
    }
    return true;
}
}