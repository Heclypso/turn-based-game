// navegação do menu de combate
const buttons = document.getElementsByTagName('button')
const log = document.getElementById('log')
const itemMenu = document.getElementById('itens')
const allys = document.getElementById('allys')
const skills = document.getElementById('skills')
const enemy = document.getElementById('enemy')
const ally = document.getElementById('ally')

const itensButton = document.getElementById('itens-button')
const groupButton = document.getElementById('group-button')
const logButton = document.getElementById('log-button')

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
        if (enemy.style.opacity != '0' && ally.style.opacity != '0') {
        switch(buttons[i].id) {
            case ('attack-button'): 
                allys.classList.remove('battle-menu__infos__allys-is--visible')
                skills.classList.add('battle-menu__infos__skills-is--visible')
            break;

            case ('itens-button'): 
                removeAtiveOptions()
                itensButton.classList.add('battle-menu__options__button-is--active')
                itemMenu.classList.toggle('itens-is--visible')
            break;

            case ('group-button'): 
                removeAtiveOptions()
                groupButton.classList.add('battle-menu__options__button-is--active')
                allys.classList.add('battle-menu__infos__allys-is--visible')
                skills.classList.remove('battle-menu__infos__skills-is--visible')
            break;

            case ('log-button'): 
                removeAtiveOptions()
                logButton.classList.add('battle-menu__options__button-is--active')
                log.classList.toggle('battle-log-is--visible')
            break;
        }
    }
    })
}

// sistema de seleção do menu de opções
const optionButtons = document.querySelectorAll(`[data-button-name="options-button"]`)

function removeAtiveOptions() {
    optionButtons.forEach(item => item.classList.remove('battle-menu__options__button-is--active'))
}

// navegação do menu de itens
const itemListItem = document.querySelectorAll('.itens__body__list__item')

for (let i = 0; i < itemListItem.length; i++) {
    itemListItem[i].addEventListener('click', function(){
        removeActiveItens()
        itemListItem[i].classList.add('itens__body__list__item-is--selected')
    })
}

// função que remove todas as classes que representam o botão selecionado
function removeActiveItens() {
    for (let i = 0; i < itemListItem.length; i++) {
        itemListItem[i].classList.remove('itens__body__list__item-is--selected')
    }
}

const itemTab = document.querySelectorAll('.itens__header__tab')

for (let i = 0; i < itemTab.length; i++) {
    itemTab[i].addEventListener('click', function(){
        removeAtiveTabs()
        itemTab[i].classList.add('itens__header__tab-is--active')
    })
}

// função que remove todas as classes que representam a aba ativa
function removeAtiveTabs() {
    for (let i = 0; i < itemTab.length; i++) {
        itemTab[i].classList.remove('itens__header__tab-is--active')
    }
}

const itens = document.querySelectorAll('.itens__body__list__item')
const healItens = document.querySelectorAll(`[data-item-type="heal"]`)
const damageItens = document.querySelectorAll(`[data-item-type="damage"]`)

document.querySelector(`[data-tab-id="all"]`).addEventListener('click', showAllItens)
document.querySelector(`[data-tab-id="heal"]`).addEventListener('click',  showHealItens)
document.querySelector(`[data-tab-id="damage"]`).addEventListener('click',  showDamageItens)

function showAllItens() {
    itens.forEach(item => item.classList.remove('itens__body__list__item-is--hidden'))
}
showAllItens()

function showHealItens() {
    damageItens.forEach(item => item.classList.add('itens__body__list__item-is--hidden'))
    healItens.forEach(item => item.classList.remove('itens__body__list__item-is--hidden'))
}

function showDamageItens() {
    healItens.forEach(item => item.classList.add('itens__body__list__item-is--hidden'))
    damageItens.forEach(item => item.classList.remove('itens__body__list__item-is--hidden'))
}