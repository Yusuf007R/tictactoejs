var turno = "x"
var player1 = "player 1",
    player2 = "player 2",
    win,
    tie;
var turnoxd = 0;
var whowin;
var cas = new Array(10)
var wins = [0, 0];
var turnorestantes;

var posxd = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function start() {
    let botones = document.querySelectorAll(".botones")
    turno = "x";
    turnoxd = 0;
    for (let index = 0; index < cas.length; index++) {
        cas[index] = ''

    }
    tie = false;
    whowin = '';
    turnorestantes = 9;
    document.querySelector("#tplayer1").innerHTML = "wins of " + player1 + " : " + wins[0]
    document.querySelector("#tplayer2").innerHTML = "wins of " + player2 + " : " + wins[1]
    for (let index = 0; index < botones.length; index++) {
        botones[index].disabled = false
    }
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).textContent = "";
    }
    let xd = minimax(cas,'o')
    move2(xd.id,turno)
}



function playerinput(bc) {
    const element = document.getElementById(bc.value)
    if (turno == "x") {
        move2(bc.value, turno);

    } else if (turno == "o") {
        move2(bc.value, turno);
        let xd = minimax(cas, 'o')
        console.log(xd)
        setTimeout(()=>{move2(xd.id, turno)},400)
        
    }
}


function animateCSS(element, animationName, callback) {
    const node = document.getElementById(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)
        if (typeof callback === 'function') callback()
    }
    node.addEventListener('animationend', handleAnimationEnd)
}


function tiex(board, pedro) {
    for (let i = 1; i < board.length; i++) {
        if (board[i] == '') {
            return false
        }
    }
}


function endgame(board, player,pedro) {
    const hola = pito => pito.every(holax => holax === turno);
    for (let index = 0; index < posxd.length; index++) {
        var pito2 = posxd[index];
        win = hola([board[pito2[0]], board[pito2[1]], board[pito2[2]]]);
        if (win) {
            wins[turnoxd]++
            let botones = document.querySelectorAll('.botones');
            if(pedro){
                for (let index = 0; index < botones.length; index++) {
                    botones[index].disabled = true;
                }
                setTimeout(function () {
                    for (let index2 = 0; index2 < 3; index2++) {
                        console.log(pito2[index2])
                        animateCSS(pito2[index2], 'flash');
                        
                    }
                    var audio = new Audio('sound/win.wav');
                    audio.play();
                }, 550)
               
                setTimeout(() => {
                    start();
                }, 2000)
                break;
    
            }
            if (player == 'x') {
                return 'x'
            } else if (player == 'o') {
                return 'o'
            }
        }
    }
}


function move2(id, turn) {
    document.getElementById(id).textContent = turn;
    let bc = document.getElementById(id);
    var audio = new Audio('sound/click.wav');
    audio.play();
    animateCSS(bc.value, 'pulse');
    animateCSS(bc.value, 'faster');
    if (turn == "x") {
        bc.disabled = "true";
        cas[bc.value] = "x";
        turnorestantes--
        let xdd = endgame(cas, 'x', true)
        let hola = tiex(cas)
        if (hola) {
            console.log('empate')
        }
        if (xdd == 'x') {
            console.log('x gano')
        }
        turno = "o";
        turnoxd = 1;
    } else {
        bc.disabled = "true";
        cas[bc.value] = "o";
        turnorestantes--
        let xdd = endgame(cas, 'o')
        let hola = tiex(cas)
        if (hola) {
            console.log('empate')
        }
        if (xdd == 'o') {
            console.log('o gano')
        }
        turno = "x";
        turnoxd = 0
    }


}


function emptyspot(board) {
    let empty = []
    for (let i = 1; i < board.length; i++) {
        if (board[i] == '') {
            empty.push(i)
        }
    }
    return empty
}

function minimax(cas, player) {
    let gamestage = endgame(cas, player)
    let gametie = tiex(cas)
    if (gamestage == 'o') {   
        return {       
            evaluation: 10
        }
    } else if (gamestage == 'x') {
        return {
            evaluation: -10
        }
    } else if (gametie !== false) {
        return {
            evaluation: 0
        }
    }
    let empty = emptyspot(cas)
    let moves = []


    for (let i = 0; i < empty.length; i++) {
        let id = empty[i]
        let saveboard = cas[id]
        cas[id] = player
        let move = {}
        move.id = id
        if (player == "o") {
            move.evaluation = minimax(cas, 'x').evaluation
        } else {
            move.evaluation = minimax(cas, 'o').evaluation
        }
        cas[id] = saveboard
        moves.push(move)
    }


    let bestMove;
    if(player == 'x'){
        // MAXIMIZER
        let bestEvaluation = -Infinity;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].evaluation > bestEvaluation ){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }else{
        // MINIMIZER
        let bestEvaluation = +Infinity;
        for(let i = 0; i < moves.length; i++){
            if( moves[i].evaluation < bestEvaluation ){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;
}

start();
