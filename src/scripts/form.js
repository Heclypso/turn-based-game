const form = document.getElementById('form')
const container = document.getElementById('container')
const map = document.getElementById('map')

const button = document.getElementById('submit-button');
button.addEventListener('click', (e) => {
    e.preventDefault();
    startGame();  
    console.log(getPlayerName())
});

// Função que inicia o jogo
const startGame = () => {
    form.classList.add('form--hidden')
    container.classList.add('container--battle')
    map.classList.remove('map--hidden')
}

// Função que recupera o valor do nome do player
const getPlayerName = () => {
    const playerName = document.querySelector('#input-name').value
    return playerName;
}