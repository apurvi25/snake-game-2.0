const board = document.querySelector('.board');
const startbtn = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const startgame = document.querySelector('.start-game')
const gameover = document.querySelector('.game-over')
const restartbtn = document.querySelector('.btn-restart')

const highscoreElement= document.querySelector("#high-score")
const scoreelement = document.querySelector("#Score")

const timeelement = document.querySelector("#Time")

let highscore = localStorage.getItem("highscore")
let score = 0
let time = `00-00`

startbtn.addEventListener("click",()=>{
    modal.style.display = "none"
     intervalId = setInterval(()=> {render()},200)

     timerintervalId = setInterval(() =>{
        let [min , sec] = time.split("-").map(Number)

        if(sec == 59){
            min += 1
            sec = 0
        }else{
            sec += 1
        }

        time =`${min}-${sec}`
        timeelement.innerText = time
     },1000)
})

restartbtn.addEventListener("click", restartGame)

function restartGame(){

    blocks[`${food.x}-${food.y}`].classList.remove('food')
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    })
    
    score = 0
    time = `00-00`
    scoreelement.innerText = score
    highscoreElement.innerText = highscore
    timeelement.innerText = time

    modal.style.display = "none"
    direction = "down"
    snake = [ { x : 1, y : 3 } ]
    food = { x: Math.floor(Math.random()*rows), y: Math.floor(Math.random()*cols)}
    intervalId = setInterval(()=> {render()},200)
}


const blockHeight = 30
const blockWidth = 30

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let intervalId = null;
let timerintervalId = null;

let food = { x: Math.floor(Math.random()*rows), y: Math.floor(Math.random()*cols)
}


const blocks = []

let snake = [ { x : 1, y : 3 } ]

let direction = 'down'


for(let row=0; row<rows; row++){
    for(let col=0; col<cols; col++){
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        // block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block
    }
}
function render(){
    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add('food')

    
    if(direction === "left"){
        head ={ x : snake[0].x, y: snake[0].y - 1 }
    } else if(direction === "right"){
        head ={ x : snake[0].x, y: snake[0].y + 1 }
    } else if(direction === "down"){
        head ={ x : snake[0].x + 1, y: snake[0].y }
    } else if(direction === "up"){
        head ={ x : snake[0].x - 1, y: snake[0].y }
    }

    //wall collison logic
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        clearInterval(intervalId)

        modal.style.display = "flex"
        startgame.style.display = "none"
        gameover.style.display = "flex"

        return;
    }

    //food consume logic
    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove('food')
        food = {
            x: Math.floor(Math.random()*rows),
            y: Math.floor(Math.random()*cols)
        }
        blocks[`${food.x}-${food.y}`].classList.add('food')
        snake.unshift(head)

        score += 10 
        scoreelement.innerText = score

        if(score > highscore){
            highscore = score;
            localStorage.setItem("highscore",highscore.toString())
        }
    }


    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    })

    snake.unshift(head)
    snake.pop()

    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    })

    
}

// intervalId = setInterval(() =>{

//     render()
// },300);

addEventListener("keydown",(event)=>{
    if(event.key == "ArrowUp"){
        direction = "up"
    } else if(event.key == "ArrowDown"){
        direction = "down"
    } else if(event.key == "ArrowRight"){
        direction = "right"
    }else if(event.key == "ArrowLeft"){
        direction = "left"
    }
})

function changeDirection(direction) {
  switch(direction) {
    case 'UP':
      dx = 0;
      dy = -10;
      break;

    case 'DOWN':
      dx = 0;
      dy = 10;
      break;

    case 'LEFT':
      dx = -10;
      dy = 0;
      break;

    case 'RIGHT':
      dx = 10;
      dy = 0;
      break;
  }
}
changeDirection();
