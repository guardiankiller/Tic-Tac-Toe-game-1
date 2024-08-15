const EGameStatus = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    FINISHED_WITH_WINNER: "FINISHED_WITH_WINNER",
    FINISHED_WITH_TIE: "FINISHED_WITH_TIE",
};

let gameStatus = EGameStatus.NOT_STARTED;
let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const gameMessage = document.querySelector(".game-message");

updateGameMessage();
resetButton.addEventListener("click", reset);
cells.forEach((cell, index) =>
    cell.addEventListener("click", () => handleCellClick(index)));

function handleCellClick(index) {
    if (isGameFinished() || cells[index].innerHTML !== "") {
        return;
    }
    
    gameStatus = EGameStatus.IN_PROGRESS;
    cells[index].innerHTML = currentPlayer;
    cells[index].classList.add("cell-" + currentPlayer);
    
    if (checkWinner()) {
        gameStatus = EGameStatus.FINISHED_WITH_WINNER;
        updateGameMessage();
        return;
    }
    
    if (checkTie()) {
        gameStatus = EGameStatus.FINISHED_WITH_TIE;
        updateGameMessage();
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateGameMessage();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].innerHTML !== "" &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML
        ) {
            updateCellsWinners(cells[a], cells[b], cells[c]);
            return true;
        }
    }
    
    return false;
}

function updateCellsWinners(a, b, c) {
    a.classList.add("correct");
    b.classList.add("correct");
    c.classList.add("correct");
}

function checkTie() {
    return Array.from(cells).every((cell) => cell.innerHTML !== "");
}

function reset() {
    gameStatus = EGameStatus.NOT_STARTED;
    currentPlayer = "X";
    updateGameMessage();
    cells.forEach((cell) => {
        cell.innerText = "";
        cell.className = "cell";
    });
}

function updateGameMessage() {
    if (gameStatus === EGameStatus.FINISHED_WITH_TIE) {
        gameMessage.innerHTML = "It's a tie!";
    } else if (gameStatus === EGameStatus.FINISHED_WITH_WINNER) {
        gameMessage.innerHTML = `Winner : <span>${currentPlayer}</span>`;
    } else {
        gameMessage.innerHTML = `Who's Turn : <span>${currentPlayer}</span>`;
    }
}

function isGameFinished() {
    return gameStatus == EGameStatus.FINISHED_WITH_TIE || gameStatus == EGameStatus.FINISHED_WITH_TIE;
}
