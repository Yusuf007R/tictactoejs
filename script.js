var turn = "x"
var player1 = "player 1",
    player2 = "player 2",
    win,
    tie;
var grid = new Array(10)
var wins = {
    x: 0,
    o: 0
}
var remainingMovements;
var winningCombos = [
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
    tie = false
    win = false
    let button = document.querySelectorAll(".button")
    turn = "x";
    for (let index = 0; index < grid.length; index++) {
        grid[index] = ''

    }
    remainingMovements = 9;
    document.querySelector("#tplayer1").innerHTML = "wins of " + player1 + " : " + wins.x
    document.querySelector("#tplayer2").innerHTML = "wins of " + player2 + " : " + wins.o
    for (let index = 0; index < button.length; index++) {
        button[index].disabled = false
    }
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).textContent = "";
    }
    let bestmove = minimax(grid, 'o')
    setTimeout(() => {
        move(bestmove.id, turn)
    }, 200)
}



function playerinput(button) {
    if (turn == "x") {
        move(button.value, turn);
    } else if (turn == "o") {
        move(button.value, turn);
        if (!win) {
            let bestmove = minimax(grid, 'o')
            setTimeout(() => {
                move(bestmove.id, turn)
            }, 400)
        }
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


function tieChecker(board, callFromOutsideAI) {
    let temptie = true
    for (let i = 1; i < board.length; i++) {
        if (board[i] == '') {
            temptie = false
            return false
        }
    }
    if (temptie && callFromOutsideAI) {
        setTimeout(() => {
            for (let index = 1; index < 10; index++) {
                animateCSS(index, 'flash');
            }
            var audio = new Audio('sound/tie.wav');
            audio.play();
        }, 550)

        setTimeout(() => {
            start()
        }, 2000)

    }
}



function winChecker(board, player, callFromOutsideAI = false) {
    const areSame = array => array.every(elements => elements === turn);
    for (let index = 0; index < winningCombos.length; index++) {
        var winPosition = winningCombos[index];
        win = areSame([board[winPosition[0]], board[winPosition[1]], board[winPosition[2]]]);
        if (win) {
            let botones = document.querySelectorAll('.button');
            if (callFromOutsideAI) {
                wins[turn]++
                for (let index = 0; index < botones.length; index++) {
                    botones[index].disabled = true;
                }
                setTimeout(function () {
                    for (let index2 = 0; index2 < 3; index2++) {
                        animateCSS(winPosition[index2], 'flash');
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


function move(buttonID, turnToCheck) {
    let button = document.getElementById(buttonID);
    animateCSS(button.value, 'pulse');
    animateCSS(button.value, 'faster');
    if (turnToCheck == "x") {
        var audio = new Audio('sound/click.wav');
        audio.play();
        button.disabled = "true";
        document.getElementById(buttonID).textContent = turnToCheck
        grid[button.value] = turn;
        winChecker(grid, 'x', true)
        tieChecker(grid, true)
        //console.log(tie)
        turn = "o";
        remainingMovements--
    } else {
        var audio = new Audio('sound/click.wav');
        audio.play();
        button.disabled = "true";
        document.getElementById(buttonID).textContent = turnToCheck
        grid[button.value] = turn;
        winChecker(grid, 'o', true)
        tieChecker(grid, true)
        turn = "x";
        remainingMovements--
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

function minimax(board, player) {
    let gamestage = winChecker(board, player, false)
    let gametie = tieChecker(board, false)
    if (gamestage == 'o') {
        return {
            evaluation: -10
        }
    } else if (gamestage == 'x') {
        return {
            evaluation: 10
        }
    } else if (gametie !== false) {
        return {
            evaluation: 0
        }
    }
    let empty = emptyspot(board)
    let moves = []
    for (let i = 0; i < empty.length; i++) {
        let id = empty[i]
        let saveboard = board[id]
        board[id] = player
        let possibleMove = {}
        possibleMove.id = id
        if (player == "o") {
            possibleMove.evaluation = minimax(board, 'x').evaluation
        } else {
            possibleMove.evaluation = minimax(board, 'o').evaluation
        }
        board[id] = saveboard
        moves.push(possibleMove)
    }


    let bestMove;
    if (player == 'x') {
        // MAXIMIZER
        let bestEvaluation = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].evaluation > bestEvaluation) {
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    } else {
        // MINIMIZER
        let bestEvaluation = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].evaluation < bestEvaluation) {
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;
}
start();