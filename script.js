const rows= 6;
const columns=7;
let board=[];
for (let i = 0; i < columns; i++){
    board[i]=[];
    for (let j = 0; j < rows; j++){
        board[i][j]=0;
    }
}

function placeToken(selection, playerToken) {
    const column=board[selection];
    const value = column.findIndex( (element) => element === 0);
    if (value === -1) return false;
    else {
        column[value]=playerToken;
        return true;
    }
}