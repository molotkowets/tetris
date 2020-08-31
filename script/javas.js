let ctx = document.getElementById("canvas").getContext("2d"); 
let dataWindow = document.getElementById("canvasData").getContext("2d");
let gameScoringWindow = document.getElementById("scoringWindow").getContext("2d");

var fps = 1;
function step() {  

    if (figureNow[0][0] !== undefined){
        setTimeout(function() {
        
                requestAnimationFrame(step);
            // requestAnimationFrame(step);
            chekMacY()
            // console.log(figureNow)
        }, 1000 / fps);
    }

}
let name;
function yourName(){
        // document.getElementById("it").innerHTML = document.getElementById("elem1").value

        if (document.getElementById("elem1").value){
            name = document.getElementById("elem1").value;
            rundFigure ();
            rundFigure ();
            step(figureNow);
        }else{
            console.log("enter your name")
        }
        

}


/* важные переменные */////////

let cage = 20; // размер клетки widthFieldData

let reversal = [3,2,1,0];

let widthFieldData = getComputedStyle(canvasData).width.replace(/[^+\d]/g, ''); // принимаем ширину поля с html
let heightFieldData = getComputedStyle(canvasData).height.replace(/[^+\d]/g, '');

let widthField = getComputedStyle(canvas).width.replace(/[^+\d]/g, ''); // принимаем ширину поля с html
let heightField = getComputedStyle(canvas).height.replace(/[^+\d]/g, ''); // принимаем высоту поля с html
let numCageWidth = widthField / 20; // количество клеток по шиине
let numCageHeight = heightField / 20; // количество клеток по высоте

let gameAccount = 0
let PlayingField = [...Array(numCageWidth)].map(e => Array(numCageHeight).fill(undefined));
let now; // текущая фигура 
let figureNow = [...Array(2)].map(e => Array(4).fill(undefined)); // создание масива 2х4
// FillingPlayingField = [...Array(2)].map(e => Array(4).fill(undefined));

let tempo = [...Array(2)].map(e => Array(4)); 
let fi = [...Array(2)].map(e => Array(4)); 


console.log(PlayingField)


let biasDown = 0;
let biasSide = 0;
let difference = 0;

dataWindow.strokeRect(0,0,widthFieldData, heightFieldData);
flesh(dataWindow);
gameScoringWindow.strokeRect(0,0,widthFieldData, heightFieldData);
flesh(gameScoringWindow);

function animation(n){
    if (n[0][0] !== undefined){
        step()
    }
}


/* фигуры */
let tetramino=[
    tetraminoT= [
        [4,3,4,5], // X
        [-2,-1,-1,-1]  // Y
    ],
    tetraminoL = [
        [3,3,3,4], // X
        [-3,-2,-1,-1]  // Y
    ],
    tetraminoJ = [
        [4,4,4,3], // X
        [-3,-2,-1,-1]  // Y
    ],
    tetraminoQ = [
        [3,4,3,4], // X
        [-2,-2,-1,-1]  // Y
    ],
    tetraminoI= [
        [3,4,5,6], // X
        [-2,-2,-2,-2]  // Y
    ],
    tetraminoZ = [
        [3,4,4,5], // X
        [-2,-2,-1,-1]  // Y
    ],
    tetraminoS = [
        [4,4,3,5], // X
        [-3,-2,-1,-1]  // Y
    ]
    // tetraminoS = [
    //     [4,5,3,4], // X
    //     [-2,-2,-1,-1]  // Y
    // ]
];
/* фигуры */

/* важные переменные *//////////
function transToField (){
    // for(let j=0; j<2; j++){
        for(let i=0; i<4; i++){
            
            PlayingField [figureNow[0][i]][figureNow[1][i]]=1;
            // PlayingField [tetramino[0][0][i]][tetramino[0][1][i]]=tetramino[0][0][i]
        }
    // }
    // console.log(PlayingField)
    gameOver()
    deleteBottomRow()
}

function drawFillingPlayingField(){

    for (let j = 0; j<numCageHeight; j++){ 
        
        
        for (let i = 0; i<numCageWidth; i++){
            let x = i*cage;
            
            if (PlayingField[i][j] !== undefined){

                ctx.fillRect(i*cage,j*cage,cage,cage);
            }
           
        }
    }
}



/* рисует поле */
function drawPlayingField(){
    for (let j = 0; j<numCageHeight; j++){ 
        let y = j*cage;
        for (let i = 0; i<numCageWidth; i++){
            let x = i*cage;
            ctx.strokeRect(x,y,cage,cage);
        }
    }
}
// drawPlayingField ()


/* очищает поле */
function flesh(i){
    i.fillStyle = "white";
    i.fillRect(0,0, widthField, heightField);
    i.fillStyle = "black";
}



/* выводит фигуру */
function outFigure (xy,w){
    
    flesh(w);
    drawPlayingField ();
    drawFillingPlayingField();

    let dataY = 0;
    let dataX = 0;
    if(w == dataWindow){
        dataY = dataY + 3;
        dataX = dataX - 3;
    }
    for( let i=0; i<=3; i++){
        
        w.fillRect(cage*(xy[0][i] + dataX),cage*(xy[1][i] + dataY), cage, cage);
    }
    
}




/////////* управление *//////////
document.addEventListener('keydown', function(event) {
    switch(event.code) {
        case 'KeyR':  
            
            
            rundFigure ();
            step(figureNow);
        break;
      
        case 'KeyW':
            rotate()
        break;
        case 'KeyD':
            stepRight ()
        break;
        case 'KeyA':
            stepLeft ()
        break;
        case 'KeyS':
            // stepDown ()
            chekMacY()
        break;
        case 'KeyQ':
            chekMacY()
        break;
        
        default:
          
        break;
      }
})
/////////* управление *//////////



function rundFigure (){
 
    console.log(tetramino[0])
    /* проверка есть ли фигура сейчас, если есть то сбрасываем перемещение */
    if (biasSide || biasDown){
        for(let i=0; i<4; i++){
            figureNow[0][i] -= biasSide;
            figureNow[1][i] -= biasDown;
            
        }
        // tetramino[now]=figureNow.slice()
    }

    

    if (now !== undefined){
        outFigure (tetramino[now],ctx)
        figureNow = tetramino[now].slice();
        let rund = Math.floor(Math.random() * 7);
        now = rund;
        outFigure (tetramino[now],dataWindow)
        
    }else{
        let rund = Math.floor(Math.random() * 7);
        outFigure (tetramino[rund],dataWindow)
        now = rund;
        
    }
   
    
    dataWindow.strokeRect(0,0,widthFieldData, heightFieldData); //обновляется поле 
    biasSide = 0;
    biasDown = 0;
    difference = 0;
}



function rotate(){
   
    tempo = [...Array(2)].map(e => Array(4)); 
    fi = [...Array(2)].map(e => Array(4)); 
    
    
    tempo = figureNow


    
    // забрать разницу передвижений
    for(let i=0; i<4; i++){
        tempo[0][i] = figureNow.slice()[0][i]-biasSide;
        tempo[1][i] = figureNow.slice()[1][i]-biasDown;
        fi [0][i] = reversal[tempo[1][i]+3]; //ревёрсит У и пишет его в Х
        fi [1][i] = tempo[0][i]-3
        fi[0][i] = fi[0][i]+biasSide + 3;
        fi[1][i] = fi[1][i]+biasDown - 3;
        // console.log(fi)
    }
    

    /*right*/////////////////////////////////
    if(Math.max.apply(null, fi[0])<=numCageWidth-1 && Math.min.apply(null, fi[0])>=0 ){
        figureNow = fi.slice();
        outFigure (figureNow,ctx);
        difference = 0;
        // console.log("inside")
    }else if (Math.max.apply(null, fi[0])>=numCageWidth-1){
        difference = numCageWidth-1 - Math.max.apply(null, fi[0])
        for(let i=0; i<4; i++){
            fi[0][i] = fi[0][i]+difference;
        };
        figureNow = fi;
        outFigure (figureNow,ctx);

        for(let i=0; i<4; i++){
            fi[0][i] = fi[0][i]-difference;
        };
        
    }else{
        difference = 0 - Math.min.apply(null, fi[0])
        for(let i=0; i<4; i++){
            fi[0][i] = fi[0][i]+difference;
        };
        figureNow = fi;
        outFigure (figureNow,ctx);

        for(let i=0; i<4; i++){
            fi[0][i] = fi[0][i]-difference;
        };
        // console.log(difference)
    };

}


function stepRight (){

    let chekRightSide = 0;

    for(let i=0; i<2; i++){
        for(let j=0; j<4; j++){
            if(PlayingField[figureNow[0][j]+1][figureNow[1][j]] == 1){          
                chekRightSide = 1;
                break;
            }else{
                
            }
        }
    }

    if (chekRightSide == 1){
        // transToField ();
        // rundFigure ();  
    }else{
        if(Math.max.apply(null, figureNow[0])<numCageWidth-1){
            for(let i=0; i<4; i++){
                figureNow[0][i] = figureNow[0][i]+1+difference;
            }
            
            outFigure (figureNow,ctx);
            biasSide =  biasSide +1+difference;
            difference = 0; 
        }
    }
}

function stepLeft (){

    let chekLeftSide = 0;

    for(let i=0; i<2; i++){
        for(let j=0; j<4; j++){
            if(PlayingField[figureNow[0][j]-1][figureNow[1][j]] == 1){          
                chekLeftSide = 1;
                break;
            }else{
                
            }
        }
    }

    if (chekLeftSide != 1){
        // transToField ();
        // rundFigure ();  
        if(Math.min.apply(null, figureNow[0])>0){
            for(let i=0; i<4; i++){
                figureNow[0][i] = figureNow[0][i]-1+difference;
                
            }
            
            outFigure (figureNow,ctx);
            biasSide =  biasSide -1+difference;
            difference = 0;
        }
    }
}
function stepDown (){
    
    for(let i=0; i<4; i++){
        figureNow[1][i] = figureNow[1][i]+1;
    }
    outFigure (figureNow,ctx);
    biasDown = biasDown +1;



    // if(Math.max.apply(null, figureNow[1])<numCageHeight-1){
    //     chekMacY()
        
    // }else{
    //     transToField ();
    //     rundFigure ();
    //     gameAccount = gameAccount + 1;
    //     gameScoring(gameAccount)
    //     console.log(gameAccount)
    // }  
}

function chekMacY(){
   
    if(Math.max.apply(null, figureNow[1])<numCageHeight-1){
        
        // console.log(figureNow)
        let chekDownSide = 0;
        
        // for(let i=0; i<2; i++){
            for(let j=0; j<4; j++){
                
                if(PlayingField[figureNow[0][j]][figureNow[1][j]+1] == 1){
                    chekDownSide = 1;
                    break;
                }
            }
        // }
        if(fullPlayingField == 0){
            if (chekDownSide == 1){
                restartTetramino()
            }else{
                stepDown ()
            }
        }else{
            /*выводим GAME OVER, счет игры и останавливаем всё*////////////////////////
            console.log("GAME OVER")
            figureNow = [...Array(2)].map(e => Array(4).fill(undefined));
        }
    }else{
        restartTetramino()
    }  
}

function restartTetramino(){
    transToField ();
    rundFigure ();
    gameAccount = gameAccount + 1;
    gameScoring(gameAccount)
}

function deleteBottomRow(){
   let testing 

    for(let y=0; y<numCageHeight; y++){
        testing = 0
        for(let x=0; x<numCageWidth; x++){
            if(PlayingField[x][y]){
                testing = testing + 1
            
                if(testing == 10){
                    deleteRowStepDown(y);
                    
                }
            }
        }
    }
}


function deleteRowStepDown(row){
    for(let x=0; x<numCageWidth; x++){
        // PlayingField[x][row] = undefined;
        
        for(let i=0; i<row; i++){
            PlayingField[x][row-i] = PlayingField[x][row-i-1]
        }
    }
    gameAccount = gameAccount + 10;
    gameScoring(gameAccount)
    console.log(gameAccount)
}

function gameScoring(text) {
    flesh(gameScoringWindow);
    gameScoringWindow.fillStyle = "black";
    gameScoringWindow.strokeRect(0,0,widthFieldData, heightFieldData);
    gameScoringWindow.font = "24px ";
    gameScoringWindow.fillText( "Ваше имя: " + name, 10, 20);
    gameScoringWindow.fillText( "твой счет: " + text, 10, 35);
  }

  let fullPlayingField = 0;
  function gameOver() {
      for (let i=0; i<numCageWidth; i++){
        if(PlayingField[i][0] == 1){
            fullPlayingField = 1;
            console.log("gameOver")

        }
    }
  }