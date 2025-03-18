const player = document.getElementById('player');
const enemy = document.getElementById('map-enemy');
const battleStage = document.getElementById('battle-stage')
const map = document.getElementById('map')

document.addEventListener('keydown', e => {

    const distance = 10;
    const playerComputedStyle = getComputedStyle(player);

    let playerTop = parseInt(playerComputedStyle.top.replace('px', ''));
    let playerLeft = parseInt(playerComputedStyle.left.replace('px', ''));

    switch (e.key.toLowerCase()) {
        case "a": 
            if (playerLeft > 0) {
                player.style.left = `${playerLeft - distance}px`; 
                player.src = 'https://servidor-estatico-alpha-six.vercel.app/player-left.png' 
            }
            break;
        case "d": 
            if (playerLeft < 778) {
                player.style.left = `${playerLeft + distance}px`; 
                player.src = 'https://servidor-estatico-alpha-six.vercel.app/player-right.png'
            }
            break;
    }

    if (playerTop == 334 && playerLeft == 508) {
        battleStage.classList.remove('battle-stage--hidden')
        map.classList.add('map--hidden')   
    }

});
