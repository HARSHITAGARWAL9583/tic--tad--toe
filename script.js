const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");



let currentplayer;
let gamegrid;
const winningpostion = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//lets create a function to initially the game
function initgame() {
    currentplayer = "X";
    gamegrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    newgamebtn.classList.remove("active");
    gameinfo.innerText = `current player - ${currentplayer}`;
}
initgame();
function swapturn() {
    if (currentplayer === "X") {
        currentplayer = "O";
    }
    else {
        currentplayer = "X";
    }
    //ui update
    gameinfo.innerText = `current player -${currentplayer}`;
}



function checkgameover() {
    let answer = "";
    winningpostion.forEach((position) => {
        if ((gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")
            && (gamegrid[position[0]] === gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])) {
            if (gamegrid[position[0]] === "X")
                answer = "X";
            else
            {
                answer = "O";
            }
                
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // newgamebtn.classList.add("active");
    if (answer !== "") {
        gameinfo.innerText = `Winner player - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    } 
    let fillcount = 0;
    gamegrid.forEach((box) => {
        if (box !== "")
            fillcount++;
    });
    if (fillcount === 9) {
        gameinfo.innerText = "game tied !";
        newgamebtn.classList.add("active");
    }
}
function handleclick(index) {
    if (gamegrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapturn();
        //check koi jeet toh nahi gaya
        checkgameover();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleclick(index);
    })
})
newgamebtn.addEventListener("click", initgame);