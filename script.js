const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


//Initial variables
let currentPlayer;
let gameGrid;

//wining position
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","", "","","", "","",""];
    //UI Empty
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //green color remove (initializes boxes with css property again)
        box.classList = `box box-${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

//Swap if X then Y or if Y then X
function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}



function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) =>{
        //all three boxes should not be empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])  ){

            //check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //disable pointer event
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            //now we know X/O is winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });


    //it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //we know, NO winner Found, lets check whether the the game is tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box != ""){
            fillCount++;
        }
    });

    //boxes is filled , game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }


    


}




function handleClick(index){
    if(gameGrid[index] === ""){
        //change in UI
        boxes[index].innerText = currentPlayer; 
        //change in INNER LOGIC
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //Swap Karo Turn
        swapTurn();

        //check if any one is win 
        checkGameOver();
    }
}


boxes.forEach((box, index) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click" , initGame);


