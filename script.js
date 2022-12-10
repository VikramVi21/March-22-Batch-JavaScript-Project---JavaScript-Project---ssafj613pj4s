const gameBoard = document.querySelector("#gameBoard");
const digit = document.querySelector("#digit");
const deleteNumber = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let error = 0;


let lastSelected = null;            //Last Selected no zero;

const puzzle =[
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"

];

const solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload=(()=>{
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            const div = document.createElement("div");
            div.classList.add("tile");
            div.addEventListener("click",selectTile);
            div.setAttribute("row", i);         //Add row and Column
            div.setAttribute("col", j);         //Add row and Column

            
            if(puzzle[i][j]!="-"){
                div.innerText=puzzle[i][j];
                div.classList.add("filled");
            }
            // div.innerText=puzzle[i][j];      // create puzzle No
            // if(puzzle[i][j]=="-"){
                                                // remove -
            // }else{
            //     div.innerText=puzzle[i][j];      // show only no
            // }
            // div.innerText= `(${i} ${j} )`;     // concate ka through add && ``=> it is Battikes
            
            if(i == 2 || i == 5){
                div.classList.add("border-bottom");
                
            }
            if(j == 2 || j == 5 ){
                div.classList.add("border-right");
                
            }
            gameBoard.appendChild(div);     //what is different between appen & appendChild
        }
    }

    for(let i=0; i<9; i++){
        const div = document.createElement("div");      // create div
        div.classList.add("tile");
        div.addEventListener("click", addNumber);       // click and selcet no
        div.innerText= i+1;
        div.style.height = gameBoard.querySelector(".tile").clientHeight+"px"           // tile height set in digit height
        digit.appendChild(div);                         
    }

});

function selectTile(){
    // console.log(this);
    if(lastSelected != null){
        lastSelected.classList.remove("select-tile");       // previues selected no remove 
    }
    lastSelected = this;              //selected value assign
    this.classList.add("select-tile");
}

function addNumber(){
    // alert(this.innerText);      //select no show
    if(lastSelected.innerText == "" || 
    lastSelected.classList.contains("danger")){             //lastSelected.classList.contains("danger") => change danger enter number

        lastSelected.innerText= this.innerText;
    }
    // lastSelected.innerText= this.innerText;         // selected no add number
    const col = lastSelected.getAttribute("col");
    const row = lastSelected.getAttribute("row");
    // console.log(row, col);                      // Show row and column

    if(solution[row][col] == lastSelected.innerText){
        // alert("right");
        lastSelected.classList.remove("danger");

    } else {
        lastSelected.classList.add("danger");
        addErrorDisplay();
        
        // alert("wrong");
    }
    if(error>2){
        alert("You lost");
        location.reload();
    }

    if(isAllFilled()){
        // alert("not empty");
        const allTiles = gameBoard.querySelectorAll(".tile");
        let userAnswer = [...allTiles].map((tile)=>{             //all tile change in array
            return tile.innerText;                  //tile add number and create new arrya

        });
        let num=0;
        for(let i = 0; i<9; i++){               //
            for(let j = 0; j<9; j++){
                if(solution[i][j] != userAnswer[num]){
                    allTiles[num].classList.add("danger");          //add danger class
                }
                num++;
            }
            
        }
        let dangerClass= [...allTiles].some((tile)=>{                // 1 bhi true mille per return karege
            return tile.classList.contains("danger");
            // console.log(userAnswer);
        });               
    
        if(dangerClass){
            if(error>2){                    //more then 3 error
                alert("you lost");
            }

        }else{
            alert(" Congratulation! you win the puzzle!");
        }

    }

}
deleteNumber.onclick=()=>{
    if(!lastSelected.classList.contains("filled"))      //last selected class not delete
    lastSelected.innerText= "";
    // alert("hi");
}
function addErrorDisplay(){                     // error count
    error++;
        mistake.innerText = error;
}

function isAllFilled(){                                 // check all fill or not 
    const allTiles = gameBoard.querySelectorAll(".tile");       // all tile are come in there
    // console.log(allTiles);
    return [...allTiles].every((tile)=>{                // har 1 item ka liya chalega (js Function every)
                                                            // sabhi bhi true mille per return karege
        return tile.innerText != "";            //Al tile are fillup


    })

}







