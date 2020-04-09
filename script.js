var turno = "x"
var player1 = "player 1",
    player2 = "player 2",
    cas,
    win;
var turnoxd = 0;
var wins = [0, 0];
var maindivxd;
var cas1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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


function playerinput(bc) {
    const element = document.getElementById(bc.value)
    var audio = new Audio('sound/click.wav');
    audio.play();
    if (turno == "x") {
        animateCSS(bc.value, 'pulse');
        animateCSS(bc.value, 'faster');
        move(bc.value, turno);
    } else if (turno == "o") {
        animateCSS(bc.value, 'pulse');
        animateCSS(bc.value, 'faster');
        move(bc.value, turno);
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

function move(id, turn) {
    document.getElementById(id).textContent = turn;
    let bc = document.getElementById(id);
    if (turno == "x") {
        bc.disabled = "true";
        cas[bc.value] = "x";
        turnorestantes--
        checkwin();
        checktie();
        turno = "o";
        turnoxd = 1;
    } else {
        bc.disabled = "true";
        cas[bc.value] = "o";
        turnorestantes--
        checkwin();
        checktie();
        turno = "x";
        turnoxd = 0
    }


}

function start() {
    let botones = document.querySelectorAll(".botones")
    cas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    turno = "x";
    turnoxd = 0;
    turnorestantes = 9;
    document.querySelector("#tplayer1").innerHTML = "wins of " + player1 + " : " + wins[0]
    document.querySelector("#tplayer2").innerHTML = "wins of " + player2 + " : " + wins[1]
    for (let index = 0; index < botones.length; index++) {
        botones[index].disabled = false
    }
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).textContent = "";
    }
}





function checkwin() {
    const hola = pito => pito.every(holax => holax === turno);
    for (let index = 0; index < posxd.length; index++) {
        var pito2 = posxd[index];
        win = hola([cas[pito2[0]], cas[pito2[1]], cas[pito2[2]]]);
        if (win) {
            var audio = new Audio('sound/win.wav');
            wins[turnoxd]++
            let botones = document.querySelectorAll('.botones');
            for (let index = 0; index < botones.length; index++) {
                botones[index].disabled = true;
            }
            setTimeout(function () {
                for (let index2 = 0; index2 < 3; index2++) {
                    console.log(pito2[index2])
                    animateCSS(pito2[index2], 'flash');
                    
                }
                audio.play();
            }, 550)
           
            setTimeout(() => {
                start();
            }, 2000)
            break;

        }

    }

}





function checktie() {
    if (turnorestantes == 0 && win != true) {
        console.log("empate");
        //console.table(cas);
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

function getusername() {
    player1 = document.querySelector("#username1").value;
    player2 = document.getElementById("username2").value;
    console.log("el nombre del jugador uno es " + player1);
    console.log("el nombre del jugador dos es " + player2);
    document.getElementById("userinput").style.display = "none";
    start();
    document.querySelector("#tictactoe").style.display = "block";

}


start();