const form = document.getElementById('form')
const battleStage = document.getElementById('battle-stage')
const container = document.getElementById('container')
const map = document.getElementById('map')

const button = document.getElementById('submit-button');
button.addEventListener('click', (e) => {
    e.preventDefault();
    startGame();  
    console.log(getPlayerName())
});

// Função que inicia o jogo
function startGame() {
    form.classList.add('form--hidden')
    container.classList.add('container--battle')
    // battleStage.classList.remove('battle-stage--hidden')
    map.classList.remove('map--hidden')
}

// Função que recupera o valor do nome do player
function getPlayerName() {
    const playerName = document.querySelector('#input-name').value
    return playerName;
}