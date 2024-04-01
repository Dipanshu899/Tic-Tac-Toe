const players = ['X', 'O'];
let currentPlayer = 0;
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function handleMove(index) {
    if (gameEnded || board[index] !== '') return;

    board[index] = players[currentPlayer];
    document.getElementsByClassName('cell')[index].innerText = players[currentPlayer];
    
    const winner = checkWinner();
    if (winner) {
        gameEnded = true;
        document.getElementById('status').innerText = '';
        setTimeout(() => {
            alert(`${winner} wins!`);
            resetGame();
        }, 200);
        return;
    }

    if (board.every(cell => cell !== '')) {
        gameEnded = true;
        document.getElementById('status').innerText = '';
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 200);
        return;
    }

    currentPlayer = (currentPlayer + 1) % 2;
    document.getElementById('status').innerText = `${players[currentPlayer]}'s turn`;
}

function resetGame() {
    currentPlayer = 0;
    board = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;

    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    document.getElementById('status').innerText = `${players[currentPlayer]}'s turn`;
}

document.getElementById('status').innerText = `${players[currentPlayer]}'s turn`;
