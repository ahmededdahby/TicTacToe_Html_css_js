window.addEventListener("load", app);
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let turn = 0;
let winner = false;
//create player
const player = (name) => {
    player.name = name;
    return name;
};
let playerX ;
let playerY ;
//initialize the gaem
function app() {
    let inputField = document.querySelector(".input-field").focus();
    const form = document.getElementById("player-form");
    //add players
    form.addEventListener("submit", addPlayers);

    let replay = document.querySelector(".reply-btn");
    replay.addEventListener("click", resetBoard);
}
function addPlayers(event) {
    event.preventDefault();
    if (this.player1.value === "" && this.player2.value === "") {
        alert("Please enter a name in each field");
        return;
    }
    const playerFormCountainer = document.querySelector(".enter-player");
    const mainBoard = document.querySelector(".board-main");
    playerFormCountainer.classList.add("hide-container");
    mainBoard.classList.remove("hide-container");

    playerX = player(this.player1.value);
    playerY = player(this.player2.value);
   
    addCellClickListner();
}
//cell click event for player to make a move
function addCellClickListner() {
    const cells = document.querySelectorAll(".board-cell");
    cells.forEach((cell) => {
        cell.addEventListener("click", makeMove);
    });
}
function makeMove(event) {
    console.log(turn);

    let currentCell = parseInt(event.currentTarget.firstElementChild.dataset.id);
    let cellElement = document.querySelector(`[data-id = '${currentCell}']`);
    if (cellElement.innerHTML !== "") {
        console.log("this cell is already taken");
        return;
    } else {
        if (currentPlayer() === "X") {
            cellElement.textContent = currentPlayer();
            gameBoard[currentCell] = "X";
        } else {
            cellElement.textContent = currentPlayer();
            gameBoard[currentCell] = "O";
        }
    }
    isWinner();
    turn++;
}

function isWinner() {
    const winningSequence = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winningSequence.forEach((sequence) => {
        let cell1 = sequence[0];
        let cell2 = sequence[1];
        let cell3 = sequence[2];
        //verify if u have 3 in row
        if (
            gameBoard[cell1] === currentPlayer() &&
            gameBoard[cell2] === currentPlayer() &&
            gameBoard[cell3] === currentPlayer()
        ) {
            const cells = document.querySelectorAll(".board-cell");
            cells.forEach((cell) => {
                let cellId = parseInt(cell.firstElementChild.dataset.id);
                //check to change the color of the cells in row
                if (cellId === cell1 || cellId === cell2 || cellId === cell3) {
                    cell.classList.add("board-cell-winner");
                }
            });
            //display the winner
            let currentPlayerText = document.querySelector(".board-player-turn");
            if (currentPlayer() === "X") {
                currentPlayerText.innerHTML = `<div class='congratulations'>congratulations ${playerY}</div>
                <p>you are the winner</p>`;
                winner = true;
                return true;
            }
        }
    });
    if (winner) {
        checkIfTie();
    }
    changeBoardHeaderNames();
    return false;
}
function checkIfTie() {
    if (turn > 7) {
        alert("game over !!! it is a tie");
    }
}
function changeBoardHeaderNames() {
    if (!winner) {
        let currentPlayerText = document.querySelector(".board-player-turn");
        if (currentPlayer() === "X") {
            currentPlayerText.innerHTML = ` <span class="name-style">${playerX}</span> , you are up!
                <div class="u-r-winner></div>`;
        } else {
            currentPlayerText.innerHTML = `<span class="name-style">${playerY}</span> , you are up!
                <div class="u-r-winner></div>`;
        }
    }
}
function resetBoard() {
    console.log("reset");
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    let tokenAddedInCell = document.querySelectorAll(".letter");
    tokenAddedInCell.forEach((square) => {
        square.textContent = "";
        square.parentElement.classList.remove("board-cell-winner");
    });
    turn = 0;
    winner = false;
    let currentPlayerText = document.querySelectorAll(".board-player-turn");
    currentPlayerText.innerHTML = `<span class="name-style">${playerX}</span> you are up!
        <div class="u-r-winner"></div>`;
    addCellClickListner();
}

function removeCellClickListner() {
    let allCells = document.querySelectorAll(".board-cell");
    allCells.forEach((cell) => {
        cell.removeEventListener("click", makeMove);
    });
}

//return current player
function currentPlayer() {
    return turn % 2 === 0 ? "X" : "O";
}

//Resize sqaures
// window.addEventListener("resize", onResize);
// function onResize() {
//     let allCells = document.querySelectorAll(".board-cell");
//     let cellHeight = allCells[0].offsetWidth;
//     allCells.forEach((cell) => {
//         cell.style.height = `${cellHeight}px`;
//     });
// }
// //build board
// function buildBoard() {
//     let resetContainer = document.querySelector(".reset");
//     resetContainer.classList.remove("reset-hidden");
//     onResize();
// }
