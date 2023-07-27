const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameEnded = true;
      highlightWinningCells(a, b, c);
      setTimeout(() => alert(`${currentPlayer} wins!`), 10);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameEnded = true;
    setTimeout(() => alert("It's a draw!"), 10);
  }
}

function highlightWinningCells(a, b, c) {
  cells[a].classList.add('win');
  cells[b].classList.add('win');
  cells[c].classList.add('win');
}

function makeMove(index) {
  if (gameBoard[index] || gameEnded) return;
  gameBoard[index] = currentPlayer;
  cells[index].innerText = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameEnded = false;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('win');
  });
}

resetButton.addEventListener('click', resetGame);
