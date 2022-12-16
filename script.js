const gameBoard = document.querySelector("#gameBoard");
const digit = document.querySelector("#digit");
const deleteNumber = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");
let error = 0;

let lastSelected = null; 

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

    // "387491625",
    // "241568379",
    // "569327418",
    // "758619234",
    // "123784596",
    // "496253187",
    // "934176852",
    // "675832941",
    // "--2945763"
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
            div.setAttribute("row", i);        
            div.setAttribute("col", j);         

            
            if(puzzle[i][j]!="-"){
                div.innerText=puzzle[i][j];
                div.classList.add("filled");
            }
            if(i == 2 || i == 5){
                div.classList.add("border-bottom");
                
            }
            if(j == 2 || j == 5 ){
                div.classList.add("border-right");
                
            }
            gameBoard.appendChild(div);    
        }
    }

    for(let i=0; i<9; i++){
        const div = document.createElement("div");      
        div.classList.add("tile");
        div.addEventListener("click", addNumber);       
        div.innerText= i+1;
        // div.style.height = gameBoard.querySelector(".tile").clientHeight+"px"         
        digit.appendChild(div);                         
    }

});

function selectTile(){
    // console.log(this);
    if(lastSelected != null){
        lastSelected.classList.remove("select-tile");       
    }
    lastSelected = this;              
    this.classList.add("select-tile");
}

function addNumber(){
    if(lastSelected.innerText == "" || 
    lastSelected.classList.contains("danger")){             

        lastSelected.innerText= this.innerText;
    }
    const col = lastSelected.getAttribute("col");
    const row = lastSelected.getAttribute("row");
    // console.log(row, col);                     

    if(solution[row][col] == lastSelected.innerText){
        lastSelected.classList.remove("danger");

    } else {
        lastSelected.classList.add("danger");
        addErrorDisplay();
        
    }
    if(error>2){
        alert("You lost");
        location.reload();
    }

    if(isAllFilled()){
        const allTiles = gameBoard.querySelectorAll(".tile");
        let userAnswer = [...allTiles].map((tile)=>{           
            return tile.innerText;                  

        });
        let num=0;
        for(let i = 0; i<9; i++){            
            for(let j = 0; j<9; j++){
                if(solution[i][j] != userAnswer[num]){
                    allTiles[num].classList.add("danger");          
                }
                num++;
            }
            
        }
        let dangerClass= [...allTiles].some((tile)=>{               
            return tile.classList.contains("danger");
            // console.log(userAnswer);
        });               
    
        if(dangerClass){
            if(error>2){                    
                alert("you lost");
            }

        }else{
            alert(" Congratulation! you win the puzzle!");
        }

    }

}
deleteNumber.onclick=()=>{
    if(!lastSelected.classList.contains("filled"))      
    lastSelected.innerText= "";
    // alert("hi");
}
function addErrorDisplay(){                     
    error++;
        mistake.innerText = error;
}

function isAllFilled(){                                 
    const allTiles = gameBoard.querySelectorAll(".tile");       
    // console.log(allTiles);
    return [...allTiles].every((tile)=>{                
        return tile.innerText != "";            


    })

}
