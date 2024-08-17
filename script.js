let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#gamebtn");
let msg = document.querySelector(".msg");
let msp = document.querySelector("#ms");
let a = document.querySelector("#a");

let turnO = true;   //player1 or player2
let moveCount = 0;  // Track the number of moves made

// Winning patterns in 2D-arrays
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
    [6, 7, 8],
    [2, 5, 8]                // 8 winning patterns
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        moveCount++;                    // Increment move count with each click

        checkWinner();
    });
});

const disable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    moveCount = 0;  // Reset move count. this will count the button clicks.
}

const showWinner = (winner) => {
    msp.innerText = `Congratulations, the winner is ${winner}!`;
    a.innerText = "Start a New Game...";
    msg.classList.remove("hide");
    disable();
}
// this is the additional of tic tac toe i.e is DRAW
const showDraw = () => {
    msp.innerText = "It's a draw!";
    a.innerText = "Start a New Game...";
    msg.classList.remove("hide");
    disable();
}

const checkWinner = () => {
    let winnerFound = false;          // at start the winner is false....
    
    for (let pattern of winpatterns) {
        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

        if (post1Val !== "" && post2Val !== "" && post3Val !== "") {
            if (post1Val === post2Val && post2Val === post3Val) {
                showWinner(post1Val);
                winnerFound = true;
                break;
            }
        }
    }
    
    //           If no winner found and all moves are made, declare a draw
    if (!winnerFound && moveCount === 9) {    // button clicks = 9 then its a draw and showDraw function will be called.
        showDraw();
    }
}

const resetGame = () => {
    turnO = true;
    enable();
    msg.classList.add("hide");
}

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
