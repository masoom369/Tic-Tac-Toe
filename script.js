class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.init();
    }

    init() {
        this.cells = document.querySelectorAll('.cell');
        this.status = document.getElementById('status');
        this.resetButton = document.getElementById('reset');
        this.cells.forEach(cell => cell.addEventListener('click', (e) => this.handleClick(e)));
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateStatus();
    }

    handleClick(event) {
        const index = event.target.dataset.index;
        if (this.gameOver || this.board[index]) return;

        this.board[index] = this.currentPlayer;
        this.updateBoard();
        if (this.checkWinner()) {
            this.status.textContent = `Player ${this.currentPlayer} Wins!`;
            this.gameOver = true;
        } else if (this.board.every(cell => cell)) {
            this.status.textContent = 'It\'s a Tie!';
            this.gameOver = true;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }

    updateBoard() {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
        });
    }

    updateStatus() {
        if (this.gameOver) return;
        this.status.textContent = `Player ${this.currentPlayer}'s Turn`;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.updateBoard();
        this.updateStatus();
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => new TicTacToe());
