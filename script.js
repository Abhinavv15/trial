const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultMessageEl = document.getElementById('result-message');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');

const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Initialize event listeners
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.id;
        playGame(playerChoice);
    });
});

resetBtn.addEventListener('click', resetGame);

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(player, computer) {
    if (player === computer) return 'draw';
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }
    
    if (playerScore > 0 || computerScore > 0) {
        resetBtn.classList.remove('hidden');
        resetBtn.classList.add('fade-in');
    }
}

function displayResult(result, player, computer) {
    // Remove previous animation classes
    resultMessageEl.classList.remove('win', 'lose', 'draw', 'animate-result');
    
    // Trigger reflow to restart animation
    void resultMessageEl.offsetWidth;
    
    let message = '';
    
    if (result === 'win') {
        message = `You win! ${emojis[player]} beats ${emojis[computer]}`;
        resultMessageEl.classList.add('win');
    } else if (result === 'lose') {
        message = `You lose! ${emojis[computer]} beats ${emojis[player]}`;
        resultMessageEl.classList.add('lose');
    } else {
        message = `It's a draw! Both chose ${emojis[player]}`;
        resultMessageEl.classList.add('draw');
    }
    
    resultMessageEl.textContent = message;
    resultMessageEl.classList.add('animate-result');
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);
    
    displayResult(result, playerChoice, computerChoice);
    updateScore(result);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    resultMessageEl.textContent = 'Choose your weapon!';
    resultMessageEl.className = 'result-message'; // Remove win/lose/draw classes
    resetBtn.classList.remove('fade-in');
    resetBtn.classList.add('hidden');
}
