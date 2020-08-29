
// var fps = 15;
// function step() {
//     setTimeout(function() {
//         requestAnimationFrame(step);
//         draw ()
//         console.log("lo")
//     }, 1000 / fps);
// }


// step()


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d"); //подключаем поле
let cell = 20;

// вычисляем размер поля и передаем количество секций по:
let width = getComputedStyle(canvas).width; // принимаем ширину поля с html
let height = getComputedStyle(canvas).height; // принимаем высоту поля с html
let widrep = width.replace(/[^+\d]/g, '') / 20; //:по шиине
let heirep = height.replace(/[^+\d]/g, '') / 20; //:по высоте
let widthNum =  width.replace(/[^+\d]/g, '');
let heightNum = height.replace(/[^+\d]/g, '');
// создаём клетки 
function draw (){
    for (let j = 0; j<heirep; j++){ 
        let y = j*cell;
        for (let i = 0; i<widrep; i++){
            let x = i*cell;
            ctx.strokeRect(x,y,cell,cell);
        }
    }
}
draw ()



// данные вращения

let massCordT =[
    [cell*1,cell*0,cell*0,cell*1,cell*1,cell*1,cell*2,cell*1],
    [cell*1,cell*0,cell*1,cell*1,cell*1,cell*2,cell*2,cell*1],
    [cell*1,cell*2,cell*0,cell*1,cell*1,cell*1,cell*2,cell*1],
    [cell*1,cell*0,cell*1,cell*1,cell*1,cell*2,cell*0,cell*1]
];
let massCordL =[
    [cell*1,cell*0,cell*1,cell*1,cell*1,cell*2,cell*2,cell*2],
    [cell*0,cell*1,cell*1,cell*1,cell*2,cell*1,cell*0,cell*2],
    [cell*0,cell*0,cell*1,cell*0,cell*1,cell*1,cell*1,cell*2],
    [cell*0,cell*1,cell*1,cell*1,cell*2,cell*1,cell*2,cell*0]
]
let massCordJ =[
    [cell*1,cell*0,cell*1,cell*1,cell*1,cell*2,cell*0,cell*2],
    [cell*0,cell*0,cell*0,cell*1,cell*1,cell*1,cell*2,cell*1],
    [cell*1,cell*0,cell*2,cell*0,cell*1,cell*1,cell*1,cell*2],
    [cell*0,cell*1,cell*1,cell*1,cell*2,cell*1,cell*2,cell*2]
]
let massCordSquare =[
    [cell*1,cell*1,cell*2,cell*1,cell*1,cell*2,cell*2,cell*2],
    [cell*1,cell*1,cell*2,cell*1,cell*1,cell*2,cell*2,cell*2],
    [cell*1,cell*1,cell*2,cell*1,cell*1,cell*2,cell*2,cell*2],
    [cell*1,cell*1,cell*2,cell*1,cell*1,cell*2,cell*2,cell*2]
]
let massCordLine =[
    [cell*0,cell*1,cell*1,cell*1,cell*2,cell*1,cell*3,cell*1],
    [cell*2,cell*0,cell*2,cell*1,cell*2,cell*2,cell*2,cell*3],
    [cell*0,cell*2,cell*1,cell*2,cell*2,cell*2,cell*3,cell*2],
    [cell*1,cell*0,cell*1,cell*1,cell*1,cell*2,cell*1,cell*3]
]
let massCordZ =[
    [cell*0,cell*1,cell*1,cell*1,cell*1,cell*2,cell*2,cell*2],
    [cell*1,cell*0,cell*1,cell*1,cell*0,cell*1,cell*0,cell*2],
    [cell*2,cell*1,cell*1,cell*1,cell*1,cell*0,cell*0,cell*0],
    [cell*1,cell*2,cell*1,cell*1,cell*2,cell*1,cell*2,cell*0]
]

// функция передачи координат 
function zet (xy){
    ctx.fillRect(xy[0],xy[1], cell, cell);
    ctx.fillRect(xy[2],xy[3], cell, cell);
    ctx.fillRect(xy[4],xy[5], cell, cell);
    ctx.fillRect(xy[6],xy[7], cell, cell);
}


let number = 0;
let tecPos 
let bool;
// let coordinates;


function callFigure(){
    let rund = Math.floor(Math.random() * 5)
    let massFigure = [massCordT, massCordL, massCordJ, massCordSquare, massCordLine, massCordZ];
    let back = massFigure[rund]; // текущая фигура
    // console.log (back, rund) 
    zet (back[number]); // теущий поворот фигуры
    tecPos = back[number];
    // zet (massCordZ[number]); // должна вызываться при рандомайзере фигуры // удалить эту строку
    
    document.addEventListener('keydown', function(event) {
        if (event.code == 'KeyW' ) {
       
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, widthNum, heightNum); // очищаем фон

        draw (); // рисуем заново разметку
        ctx.fillStyle = "black"; 
        number ++ // добавление +1 для переходя в масиве поворотов
        if ( number<=3){
            zet (back[number]);
            // console.log(back[number],bool)
        }else{  // если поворот больше 270 то вернуть к исходному значению
            ctx.fillStyle = "white";
            ctx.fillRect(0,0, widthNum, heightNum);
            
            draw ();
            ctx.fillStyle = "black";
            number = 0;
            zet (back[number]);
            }
          // обновленное вращение

        } else if(event.code == 'KeyS' ){
            down(back, number )
            // console.log(down(back, number ))

        }else if(event.code == 'KeyD' ){

            right (back, number )
            
        }else if(event.code == 'KeyA' ){

            left (back, number )
            
        }
    });

    
    
  
    // let timerId = setInterval(() => alert('tick'), 2000);

    



}




let coordinXY = new Array(heightNum/cell);

function coordin (){
    
    for (let y=0; y<heightNum/20; y++){
        coordinXY [y] = new Array(widthNum/20);
       
    }
    for (let y=0; y<heightNum/20; y++){
        
       
        for (let x=0; x<widthNum/20; x++){
            coordinXY[y][x]=0;
           
        }
    }
    console.log(coordinXY)
}

coordin()



function down (coordinates, number){
    
    
    let SubtractionX = []
    for (let i=1; i<7; i++){
        SubtractionX.push(coordinates[number][i])
        i++
    }

    if (Math.max.apply(null, SubtractionX)<heightNum-cell){



        let downPlus = 0;
        for (let i=0; i<=3; i++){ // добавляем по оси Y по 20 каждому элементу вращения 
            coordinates[i][1] = coordinates[i][1] + cell;
            coordinates[i][3] = coordinates[i][3] + cell;
            coordinates[i][5] = coordinates[i][5] + cell;
            coordinates[i][7] = coordinates[i][7] + cell;
        }
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, widthNum, heightNum);
            
    draw (); 
    ctx.fillStyle = "black";

    zet (coordinates[number]);
    bool = coordinates[number];
    coordinXY = coordinates;
    // console.log(coordinates)
    // let timerId = setInterval(down(), 1000);
}






function right (coordinates, number){
        
    let SubtractionY = []
    for (let i=0; i<7; i++){
        SubtractionY.push(coordinates[number][i])
        i++
    }

    if (Math.max.apply(null, SubtractionY)<widthNum-cell){
        for (let i=0; i<=3; i++){ // добавляем по оси X по 20 каждому элементу вращения 
            
                coordinates[i][0] = coordinates[i][0] + cell;
                coordinates[i][2] = coordinates[i][2] + cell;
                coordinates[i][4] = coordinates[i][4] + cell;
                coordinates[i][6] = coordinates[i][6] + cell;
            
            
        }
        
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, widthNum, heightNum);
            
    draw (); 
    ctx.fillStyle = "black";
    
    zet (coordinates[number]);
    bool = coordinates[number];

}







function left (coordinates, number){
    let SubtractionY = []
    for (let i=0; i<7; i++){
        SubtractionY.push(coordinates[number][i])
        i++
    }

    if (Math.min.apply(null, SubtractionY)>0){
        for (let i=0; i<=3; i++){ // добавляем по оси X по 20 каждому элементу вращения 
            coordinates[i][0] = coordinates[i][0] - cell;
            coordinates[i][2] = coordinates[i][2] - cell;
            coordinates[i][4] = coordinates[i][4] - cell;
            coordinates[i][6] = coordinates[i][6] - cell;
        }
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, widthNum, heightNum);
            
    draw (); 
    ctx.fillStyle = "black";
    
    zet (coordinates[number]);
    bool = coordinates[number];

}



callFigure();


function chek (coordinates){
    let SubtractionY = [];
    for (let i=0; i<7; i++){
        SubtractionY.push(coordinates[number][i])
        i++
    }

    if (Math.min.apply(null, SubtractionY)>0){


        console.log("good")
    }else{
        console.log("not good")
    }
}

chek (back, number)







// let div = document.createElement ('div');
// document.body.appendChild(div);
// div.classList.add('out');


// // alert(document.getElementById('inp_1').value

// function printText(val, fontSizeIndex = 10) {
//             let divo = document.createElement ('div');
//             document.body.appendChild(divo);
//             divo.classList.add('str');
//             divo.innerHTML= val+'  ті лох';
//             divo.style.fontSize = `${fontSizeIndex}px`;
// }

// function scrollToBottom() {
//     window.scrollTo(0, document.body.scrollHeight)}

// butt.onclick = function() {
//     var val = document.getElementById('elem1').value;
//     let fontSizeIndex = 10;
//     if (val.toUpperCase() == "ЮРА"){
//         printText(val, fontSizeIndex);
//         scrollToBottom();
//         setInterval(() => {
//             fontSizeIndex++
//             printText(val, fontSizeIndex);
//             scrollToBottom();
//         }, 10);
//     } else if(val){
//         document.getElementById('str').innerHTML=val+ '  ті красава';
//     } else{
//         document.getElementById('str').innerHTML=val+ ' ті лох';
//     }
// };









// let can = document.getElementById('can');

// if (can.getContext) {
//     let ctx = can.getContext('2d')
//     // let field = document.createElement('div');
//     // document.body.appendChild(field);
//     // field.classList.add('field');

//     for (let x=0; x<500; x+=100){
//         // let x = j * 100; 
        

//         for (let y=0; y<500; y+=100){
//             ctx.fillStyle = 'rgb(200, 0, 0)';
//             ctx.fillRect(x, y, 100, 100);
//             ctx.strokeStyle = "rgb(16,155,252)";
//             ctx.stroke()
            
//         }

//     }
        
//   }  else{

//     }

  
// for (let i = 0; i < 8; i++){
//     for (let j = 0; j < 8; j++){
//         for (let y = 0; y<=1; y++){
//             if (y=0){
//                 let sharp = [];
//                 let sch = '0';
//                 let pro = '1';
//                 sharp [y]=sch;
//             }else{
//                 let pro = '1';
//                 sharp [y]=pro;
//             }
//         }
//     }
// }
// i=1
// let str = i==0 ? '0' : '1';
//  console.log(str)

// let str = [];
// let mass= [];
// for(let i=0; i<8; i++){
//     let st = i&1 ? ' ' : '#';
//     str.push (st);
//     mass [i] = str;
    
//     console.log(str,mass)
// }
//  console.log(str,mass)

// let i = 5;
// let str = [i];

// let j = 88;
//  str.push (j); 


// console.log(str)