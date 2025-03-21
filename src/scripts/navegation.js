// navegação do menu de combate
const optionButtons = document.querySelectorAll(`[data-button-name="options-button"]`)
const log = document.getElementById('log')
const itemMenu = document.getElementById('itens')
const allys = document.getElementById('allys')
const skills = document.getElementById('skills')
const enemy = document.getElementById('enemy')
const ally = document.getElementById('ally')

const attackButton = document.getElementById('attack-button')
const itensButton = document.getElementById('itens-button')
const groupButton = document.getElementById('group-button')
const logButton = document.getElementById('log-button')

for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', () => {
            if (enemy.style.opacity != '0' && ally.style.opacity != '0') {
            switch(optionButtons[i].id) {
                case ('attack-button'): 
                    removeAtiveOptions()
                    attackButton.classList.add('battle-menu__button--active')
                    allys.classList.remove('battle-menu__infos__allys--visible')
                    skills.classList.add('battle-menu__infos__skills--visible')
                break;

                case ('itens-button'): 
                    removeAtiveOptions()
                    itensButton.classList.add('battle-menu__button--active')
                    itemMenu.classList.toggle('itens--visible')
                break;

                case ('group-button'): 
                    removeAtiveOptions()
                    groupButton.classList.add('battle-menu__button--active')
                    allys.classList.add('battle-menu__infos__allys--visible')
                    skills.classList.remove('battle-menu__infos__skills--visible')
                break;

                case ('log-button'): 
                    removeAtiveOptions()
                    logButton.classList.add('battle-menu__button--active')
                    log.classList.toggle('battle-log--visible')
                break;
            }
        }
    });
    optionButtons[i].addEventListener('mouseenter', removeAtiveOptions); 
}

// Função de seleção do menu de opções
function removeAtiveOptions() {
    optionButtons.forEach(item => item.classList.remove('battle-menu__button--active'))
}

// navegação do menu de itens
const itemListItem = document.querySelectorAll('.itens__body__list__item')

for (let i = 0; i < itemListItem.length; i++) {
    itemListItem[i].addEventListener('click', () => {
        removeActiveItens()
        itemListItem[i].classList.add('itens__body__list__item--selected')
    })
}

// função que remove todas as classes que representam o botão selecionado
function removeActiveItens() {
    for (let i = 0; i < itemListItem.length; i++) {
        itemListItem[i].classList.remove('itens__body__list__item--selected')
    }
}

const itemTab = document.querySelectorAll('.itens__header__tab')

for (let i = 0; i < itemTab.length; i++) {
    itemTab[i].addEventListener('click', () => {
        removeAtiveTabs()
        itemTab[i].classList.add('itens__header__tab--active')
    })
}

// função que remove todas as classes que representam a aba ativa
function removeAtiveTabs() {
    for (let i = 0; i < itemTab.length; i++) {
        itemTab[i].classList.remove('itens__header__tab--active')
    }
}

const itens = document.querySelectorAll('.itens__body__list__item')
const healItens = document.querySelectorAll(`[data-item-type="heal"]`)
const damageItens = document.querySelectorAll(`[data-item-type="damage"]`)

document.querySelector(`[data-tab-id="all"]`).addEventListener('click', showAllItens)
document.querySelector(`[data-tab-id="heal"]`).addEventListener('click',  showHealItens)
document.querySelector(`[data-tab-id="damage"]`).addEventListener('click',  showDamageItens)

function showAllItens() {
    itens.forEach(item => item.classList.remove('itens__body__list__item--hidden'))
}
showAllItens()

function showHealItens() {
    damageItens.forEach(item => item.classList.add('itens__body__list__item--hidden'))
    healItens.forEach(item => item.classList.remove('itens__body__list__item--hidden'))
}

function showDamageItens() {
    healItens.forEach(item => item.classList.add('itens__body__list__item--hidden'))
    damageItens.forEach(item => item.classList.remove('itens__body__list__item--hidden'))
}