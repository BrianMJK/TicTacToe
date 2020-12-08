//Vars
var cells = [0,0,0,0,0,0,0,0,0];
var gameEnabled = true;
var currentPlayer = 0;
var winCountInt = [0,0];
let str = ["X","O"];

//Ghetto but works.
var Cells = [
    document.getElementById("c0"),
    document.getElementById("c1"),
    document.getElementById("c2"),
    document.getElementById("c3"),
    document.getElementById("c4"),
    document.getElementById("c5"),
    document.getElementById("c6"),
    document.getElementById("c7"),
    document.getElementById("c8")
];

//Match these to win
const WinningMatch = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 

//Define other snuff
var winCounts = [document.getElementById("xWinCount"), document.getElementById("oWinCount")];
var MessageDisplay = document.getElementById("GameMessage");
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClickManager));
document.querySelector('.RestartGame').addEventListener('click', RestartGame);

//When Clicked
function CellClickManager(cellEvent)
{
    //If the game is not over
    if(!gameEnabled) return false;

    const selCell = cellEvent.target;
    const clickedCellID = parseInt(selCell.getAttribute('id')[1]);

    //Make sure that they are not already filled in.
    if(cells[clickedCellID] != 0) return false;

    //A player clicked check which player clicked
    if(currentPlayer == 0)
        cells[clickedCellID] += 3;
    else
        cells[clickedCellID] += 5;

    AddMark(clickedCellID);
    CheckForWinner();
    SwitchPlayer();

}

//Make sure winner is decided or else just move on.
function CheckForWinner(){

    let winNumber = 0;
    let returnValue = false;

    //for each win condition
    WinningMatch.forEach(element => {

        //Dont run again if a play has won// too lazy to change it back to for loop and use break.
        if(!returnValue){
        //run through 3 possiblities.
            for(let i = 0; i < element.length; i++){
                winNumber += cells[element[i]];
            } 
            if(winNumber == 9){
                //Winner 1
                //alert("Player 1 won!")
                
                GrayOutIfWon(element);
                Winner(0);
                returnValue = true;
            }
            else if(winNumber == 15){
                //Winner 2
                //alert("Player 2 won!")
                
                GrayOutIfWon(element);
                Winner(1);
                returnValue = true;
            }
            else{
            winNumber = 0;
            }
        }
        
    });

    //Check for Cat's Game
    if(!returnValue){
        let catGame = 0;
        for (let i = 0; i < cells.length; i++) {
            if(cells[i] != 0) catGame++;
        }
        if(catGame == 9) CatsGame();
    }
}

function GrayOutIfWon(element){
    for(let i = 0; i < cells.length; i++){
        let match = false;
        for(let m = 0; m < element.length; m++){
            if(i == element[m]){
                match = true;
            }
        }
        if(!match){
            Cells[i].style.color = "gray";
        }

    }
}

function GrayOutAll(element){
    for(let i = 0; i < cells.length; i++){
        Cells[i].style.color = "gray";
    }
}

function CatsGame(){
    gameEnabled = false;
    MessageDisplay.innerHTML = "Cat's Game!";
    GrayOutAll();
}

function Winner(winner){
    winCountInt[winner]++;
    winCounts[winner].innerHTML = str[winner] + "'s wins: " + winCountInt[winner];
    gameEnabled = false;
    MessageDisplay.innerHTML = str[winner] + " wins!";
}


function RestartGame() {
    gameEnabled = true;

    currentPlayer = 0;
    
    //For some reason, it wouldn't change the elements in the cell when I set to a new variable, so I just overwrote the whole array.
    var newCells = [0,0,0,0,0,0,0,0,0];
    cells = newCells;

    //Recolor cells
    for(let i = 0; i < cells.length; i++)
        Cells[i].style.color = "white";

    console.log(cells);
    MessageDisplay.innerHTML = str[currentPlayer]+"'s Turn!";
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function SwitchPlayer()
{
    if(!gameEnabled) return false;

    if(currentPlayer == 0) currentPlayer = 1;
    else currentPlayer = 0;

    MessageDisplay.innerHTML = str[currentPlayer]+"'s Turn!";
}

function AddMark(id)
{
    Cells[id].innerHTML = str[currentPlayer];
}