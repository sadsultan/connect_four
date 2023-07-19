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
    let column = board[selection];
    let value = column.findIndex( (element) => element === 0);
    if (value === -1) return false;
    else {
        column[value]=playerToken;
        return [selection, value];
    }
}

function checkWin(latestAddition){
    let i = latestAddition[0];
    let j = latestAddition[1];

    for (let k=0; k < 3; k++){
        if( i && j ){
            i--;
            j--;
        }else{
            break;
        } 
    }

    for (; i < columns-3 && j < rows-3; i++,j++){
        // Testing the diagonals
        if (board[i][j] && board[i+1][j+1] && board[i+2][j+2] && board[i+3][j+3]) return true;
        // Testing the columns 
        if (board[latestAddition[0]][j] && board[latestAddition[0]][j+1] && board[latestAddition[0]][j+2] && board[latestAddition[0]][j+3]) return true;
        // Testing the rows
        if (board[i][latestAddition[1]] && board[i+1][latestAddition[1]] && board[i+2][latestAddition[1]] && board[i+3][latestAddition[1]]) return true;
    }
    return false;
}  

function checkDraw(){
    for (let i = 0; i < columns; i++){
        if (board[i].includes(0)) return false;
    }
    return true;
}