const buttons = document.getElementsByTagName('button')
const log = document.getElementById('log')
const allys = document.getElementById('allys')
const skills = document.getElementById('skills')
const enemy = document.getElementById('enemy')
const ally = document.getElementById('ally')

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
        if (enemy.style.opacity != '0' && ally.style.opacity != '0') {
        switch(buttons[i].id) {
            case ('attack-button'): 
                allys.classList.remove('battle-menu__infos__allys-is--visible')
                skills.classList.add('battle-menu__infos__skills-is--visible')
            break;

            case ('itens-button'): 
            console.log('Menu de itens foi clicado')
            break;

            case ('group-button'): 
                allys.classList.add('battle-menu__infos__allys-is--visible')
                skills.classList.remove('battle-menu__infos__skills-is--visible')
            break;

            case ('log-button'): 
                log.classList.toggle('battle-log-is--visible')
            break;
        }
    }
    })
}