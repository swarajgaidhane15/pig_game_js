/*eslint no-console: "error"*/

var score,roundScore, activePlayer,gamePlaying;

var lastDice;

function init() {
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.fire-0').style.display = 'none';
    document.querySelector('.fire-1').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';  
    document.querySelector('.player-0-panel').classList.remove('winner');  
    document.querySelector('.player-1-panel').classList.remove('winner');  
    document.querySelector('.player-0-panel').classList.remove('winner');  
    document.querySelector('.player-1-panel').classList.remove('winner');  
    document.querySelector('.player-0-panel').classList.add('active');  
}

init();
final = prompt("Enter the winning score")
document.querySelector('.finalScore').value = final

document.querySelector('.btn-roll').addEventListener('click',function() {
    
    if(gamePlaying)
    {
        //1. random number generation
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        //2.  Display the result
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';
            document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
            var currentScore = document.querySelector('#current')    

        //3. Update the score if NOT 1
            
            if(dice1 !== 1 && dice2 !== 1)
                {
                    //Add Score
                    roundScore += dice1 + dice2;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
            else{
                //Next Player
                nextPlayer();
            } 
    }    
});

document.querySelector('.btn-hold').addEventListener('click',function() {
    if(gamePlaying){
        //Add current score to global score
        score[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        var input = document.querySelector('.finalScore').value;
        var winningScore;
        
        if(input){
            winningScore = input;
        }
        else{
            winningScore = 100;
        }
        //Check if the player won the game
        if(score[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner..';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');   
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');   
            gamePlaying = false;
            document.querySelector('.fire-' + activePlayer).style.display = 'block';
        }
        else{
            //next player
            nextPlayer();
        }
    }
});

//DRY Dont Repeat Yourself Principle --- dont repeat the same code everywhere insted create a function
function nextPlayer() {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
            
            document.getElementById('current-0').textContent = 0;
            document.getElementById('current-1').textContent = 0;
                    
            //original
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            
            //to hide the dice for next player turn
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);
