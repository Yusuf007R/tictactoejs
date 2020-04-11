













function minimax(board, maximizing) {
    let gamestage = endgame()
    if(gamestage ==  null){
        if (maximizing) {
            let maxEval = -Infinity
            let bestmove
            for (let index = 1; index < board.length; index++) {
                if (board[index] == '') {
                    board[index] = 'o'
                    let xd = minimax(board, false)
                    let eval = xd[0] 
                    board[index] = ''
                    maxEval = Math.max(maxEval, eval)
                    bestmove = index
                }
            }
            return [maxEval, bestmove]
        } else {
            let maxEval = Infinity
            let bestmove
            for (let index = 1; index < board.length; index++) {
                if (board[index] == '') {
                    board[index] = 'x'
                    let xd = minimax(board, true)
                    let eval = xd[0] 
                    board[index] = ''
                    maxEval = Math.min(maxEval, eval)
                    bestmove = index
                }
            }
            return [maxEval, bestmove]
        }
    }
    if (gamestage == 'o') {
       //console.log('win o')
        return 10
    } else if (gamestage == 'x') {
        //console.log('win x')
        return -10
    } else if (gamestage == 'tie') {
        //console.log('tie')
        return 0
    }

  

}

















function minimax(newBoard, player){
    let gamestage = endgame(cas)
    if (gamestage == 'o') {
        return {eva: 10}
    } else if (gamestage == 'x') {
        return  {eva: -10}
    } else if (gamestage !== false) {
        return  {eva: 0}
    }   
    let empty = []
    let moves = []
    for (let i = 1; i < cas.length; i++) {
        if(cas[i] == ''){
            empty.push(i)

        }
    }

    for (let i = 0; i < empty.length; i++) {
        let id = empty[i]
        let move = {}
        move.id = id 
        let saveboard = newBoard[id]
        newBoard[id] = player

        if(player == "x"){
            move.eva = minimax(newBoard,'x').eva

        }
        else{
            move.eva = minimax(newBoard,'o').eva
        }
        newBoard[id] = saveboard
        moves.push(move)
    }

    
    let bestmove;

    if(player == 'o'){
        let besteva = -Infinity
        for (let index = 0; index < moves.length; index++) {
            if(moves[index].eva > besteva){
                besteva = moves[index].eva
                bestmove = moves[i].id
            }
            
        }

    }
    else{
        let besteva = Infinity
        for (let index = 0; index < moves.length; index++) {
            if(moves[index].eva < besteva){
                besteva = moves[index].eva
                bestmove = moves[i].id
            }
            
        }

    }
    return bestmove;
}