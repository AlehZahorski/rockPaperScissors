const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
};
 
const game = {
    playerHand: null,
    computerHand: null
};

const hands = [...document.querySelectorAll('.select img')];

function computerChoice(){
    let a = hands[Math.floor(Math.random()*3)].dataset.option;
    return a;
}

function publishResult(player, computer, result){
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = computer;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    
    if(result == 'win'){
        document.querySelector('[data-summary="who-win"]').textContent = 'You are win!';
        document.querySelector('p.wins span').textContent++;
    }else if(result == 'lose'){
        document.querySelector('[data-summary="who-win"]').textContent = 'Computer is win!';
        document.querySelector('p.losses span').textContent++
    }else{
        document.querySelector('[data-summary="who-win"]').textContent = 'Nobody!';
        document.querySelector('p.draws span').textContent++
    }
}

function handSelection(){
    game.playerHand =  this.dataset.option;
    hands.forEach( q =>  q.style.boxShadow = "");
    this.style.boxShadow = "0 0 0 4px yellow"
}

const checkResult = (player, computer) =>{
    console.log(player, computer)
    if(player == computer){
        return 'draw'
    }else if((player == 'papier' && computer == 'kamień') ||
     (player == 'kamień' && computer =='nożyczki') || (player == 'nożyczki' && computer == 'papier')){
        return 'win'
     }else if((computer == 'papier' && player == 'kamień') ||
     (computer == 'kamień' && player =='nożyczki') || (computer == 'nożyczki' && player == 'papier')){
        return 'lose'
     }
}

function endGame(){
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = null;

}

function startGame(){
    if(game.playerHand == null){
        alert('Musisz wybrac dlon!')
    }
    game.computerHand = computerChoice();
    const gameResult = checkResult(game.playerHand, game.computerHand);
    console.log(gameResult)
    publishResult(game.playerHand, game.computerHand, gameResult);
    endGame();
}



hands.forEach( hand => hand.addEventListener('click', handSelection))
document.querySelector('.start').addEventListener('click', startGame)