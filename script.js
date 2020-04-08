var turno = "x"
var player1 = "player 1",
    player2 = "player 2",
    cas;
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


function input(bc) {
    var audio = new Audio('sound/click.wav');
    audio.play();
    console.log(bc.value);
    if (turno == "x") {
        const element =  document.getElementById(bc.value)
        element.classList.add('animated', 'pulse', 'faster' )
        document.getElementById(bc.value).textContent = "x";
        //bc.style.backgroundImage = "url('img/x.png')";
        bc.disabled = "true";
        cas[bc.value] = "x";
        turnorestantes--
        checkwin();
        checktie();
        turno = "o";
        turnoxd = 1;
    } else if (turno == "o") {
        const element =  document.getElementById(bc.value)
        element.classList.add('animated', 'pulse', 'faster')
        document.getElementById(bc.value).textContent = "o";
        //bc.style.backgroundImage = "url('img/0.png')";
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
    var botones = document.querySelectorAll(".botones")
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
        const element = document.getElementById(i);
        element.textContent = "";
        element.classList.remove('animated', 'pulse', 'faster')
    }
}





function checkwin() {
    const hola = pito => pito.every(holax => holax === turno);
    for (let index = 0; index < posxd.length; index++) {
        var pito2 = posxd[index];
        var win = hola(
            [cas[pito2[0]],
                cas[pito2[1]],
                cas[pito2[2]]
            ]);
        if (win) {
            wins[turnoxd]++
            console.table(cas)
            start();
            break
        }
    }

}

function checktie() {
    if (turnorestantes == 0) {
        console.log("empate");
        console.table(cas);
        start();


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

function fixmobile(){

    
}

start();