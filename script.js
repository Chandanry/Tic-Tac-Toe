let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#gamebtn");
let msg = document.querySelector(".msg");
let msp = document.querySelector("#ms");

let turnO = true;   //player1 or player2

//winning patterns in 2D-arrays

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
    box.addEventListener("click",()=>{         
       if(turnO){
        box.innerText = "O";
        turnO = false;
       }else{
        box.innerText = "X";
        turnO = true;
       }
       box.disabled = true;

       checkWinner();

    });
});

const disable = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enable = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msp.innerText = `Congratulations, winner is ${winner}`;
    msg.classList.remove("hide");

    disable();

}

const checkWinner = () => {
    for(let pattern of winpatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,    // position 1
        //     boxes[pattern[1]].innerText,    // position 2
        //     boxes[pattern[2]].innerText
        // );                                     // position 3

        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

         if(post1Val !== ""  && post2Val !== "" && post3Val !=="") {
            if(post1Val == post2Val && post3Val){
                showWinner(post1Val);
            }
         }

    }
}

const resetGame = () => {
turnO = true;
enable();
msg.classList.add("hide");
}

newGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);