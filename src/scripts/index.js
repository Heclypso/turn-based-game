const battleLog = document.getElementById('log')

// Função que cria um novo battle-log container 
function createBattleLogContainer(containerId, titleId, turnValue) {
    const newBattleLogContainer = document.createElement('div')
    newBattleLogContainer.className = ('battle-log__container')
    newBattleLogContainer.id = containerId;

    const newBattleLogTitle = document.createElement('span')
    newBattleLogTitle.className = ('battle-log__title')
    newBattleLogTitle.innerText = turnValue;
    newBattleLogTitle.id = titleId;
    
    battleLog.appendChild(newBattleLogContainer)
    newBattleLogContainer.appendChild((newBattleLogTitle))
}

// Função que cria um novo item para o battle log container
function createBattleLogItem(containerId, titleId, skillName, skillDamage, Reverse) {
    const battleLogContainer = document.getElementById(containerId)
    const BattleLogTitle = document.getElementById(titleId)

    const newBattleLogItem = document.createElement('div')
    newBattleLogItem.className = ('battle-log__item')

    const newBattleLogSkillContainer = document.createElement('div')
    newBattleLogSkillContainer.className = ('battle-log__skill-container')

    const newBattleLogIcon = document.createElement('img')
    newBattleLogIcon.className = ('battle-log__icon')
    newBattleLogIcon.src = 'https://placehold.co/58x56'
    newBattleLogIcon.alt = 'Ícone da habilidade'

    const newBattleLogSkill = document.createElement('span')
    newBattleLogSkill.className = ('battle-log__skill')
    newBattleLogSkill.innerText = skillName;

    const newBattleLogDamage = document.createElement('span')
    newBattleLogDamage.className = ('battle-log__damage')
    newBattleLogDamage.innerText = `- ${skillDamage}`;

    battleLog.appendChild(battleLogContainer)
    battleLogContainer.append(BattleLogTitle, newBattleLogItem)
    newBattleLogItem.append(newBattleLogSkillContainer, newBattleLogDamage)
    newBattleLogSkillContainer.append(newBattleLogIcon, newBattleLogSkill)

    if (Reverse === true) {
        newBattleLogItem.classList.add('battle-log__item--reverse')
        newBattleLogSkillContainer.classList.add('battle-log__skill-container--reverse')
        newBattleLogDamage.innerText = `${skillDamage} -`
    }
}

const allyHpBar = document.getElementById('ally-hp-bar')
const allyHpValue = document.getElementById('ally-hp-number')

const enemyHpBar = document.getElementById('enemy-hp-bar')
const enemyHpValue = document.getElementById('enemy-hp-number')

class Character {
    #maxHp = 100;
    #hp = 100;
    #canAttack = true;
    #negativeEffect = 'none';

    constructor(characterName, characterSkills) {
        this.name = characterName;
        this.skill = characterSkills;
    }
    getAttacked(enemyDamage) {
        this.#hp -= enemyDamage;
    }
    getHp() {
        return this.#hp;
    }
    getMaxHp() {
        return this.#maxHp;
    }
    updateHpBars() {
    }
    setCanAttack(value) {
        this.#canAttack = value;
    }
    getCanAttack() {
        return this.#canAttack;
    }
    setNegativeEffect(value) {
        this.#negativeEffect = value;
    }
    getNegativeEffect() {
        return this.#negativeEffect;
    }
}

class Skills {
    constructor(skillName, skillDamage, skillCost) {
        this.name = skillName;
        this.damage = skillDamage;
        this.cost = skillCost;
    }
}

const ally = document.getElementById('ally')

const resultsScreen = document.getElementById('results-screen')
const resultsScreenTitle = document.getElementById('results-screen-title')

class Ally extends Character  {
    updateHpBars() {
        allyHpBar.style.width = `${(this.getHp()/ this.getMaxHp()) *100}%`;
        allyHpValue.innerHTML = this.getHp();

        if (this.getHp() <= 0) {
            exiled.setCanAttack(false)
            protagonist.setCanAttack(false)
            defeat()
        }
    }
}

// Função de derrota
function defeat() {
    ally.style.opacity = '0';
    enemyInfos.style.opacity = '0'
    setTimeout(() => {
        enemyInfos.style.display = 'none'
        setTimeout(() => {
            enemy.style.opacity = '0';
            enemyName.style.opacity = '0'
            resultsScreen.classList.remove('results-screen--hidden')
            resultsScreenTitle.classList.add('results-screen__title--defeat')
            resultsScreenTitle.innerText = 'Derrota'
        }, 1000);
    }, 2000);
}

class AllySkills extends Skills {
    static instances = [];

    constructor(skillName, skillDamage, skillCost) {
        super(skillName, skillDamage, skillCost);  
        AllySkills.instances.push(this);
    }
}

const enemy = document.getElementById('enemy')
const enemyName = document.getElementById('enemy-name')
const enemyInfos = document.getElementById('enemy-infos')

class Enemy extends Character {
    updateHpBars() {
        enemyHpBar.style.width = `${(this.getHp()/ this.getMaxHp()) *100}%`;
        enemyHpValue.innerHTML = this.getHp();

        if (this.getHp() <= 0) {
            setResultScreenValues(0, 0, 0, 1)
            protagonist.setCanAttack(false)
            exiled.setCanAttack(false)
            victory()
        }
    }
}

// Função de vitória 
function victory() {
    enemy.style.opacity = '0';
    enemyInfos.style.opacity = '0'
    setTimeout(() => {
        enemyInfos.style.display = 'none'
        setTimeout(() => {
            ally.style.opacity = '0';
            enemyName.style.opacity = '0'
            resultsScreen.classList.remove('results-screen--hidden')
            resultsScreenTitle.classList.add('results-screen__title--victory')
            resultsScreenTitle.innerText = 'Vitória'
        }, 1000);
    }, 1000);
}

class EnemySkills extends Skills {
}

// Definição das instancias de habilidades dos personagens
const allyPunch = new AllySkills('Punch', 20, 10);
const allyJab = new AllySkills('Jab', 30, 10)

// Atualiza o dano das skills e o nome delas na barra inferior
const skillsName = document.querySelectorAll('.battle-menu__infos__skills__name')
const skillsDamage = document.querySelectorAll('.battle-menu__infos__skills__damage')

for (let i = 0; i < AllySkills.instances.length; i++) {
    skillsName[i].innerText = AllySkills.instances[i].name;
    skillsDamage[i].innerText = AllySkills.instances[i].damage;
}

// Definição das habilidades da CPU
const enemyPunch = new EnemySkills('Punch', 20, 10);
const enemyJab = new EnemySkills('Jab', 30, 10)

// Definição da instancia dos personagens
const protagonist = new Ally('Protagonist', [allyPunch, allyJab]);
const exiled = new Enemy('Exilado', [enemyPunch, enemyJab])
exiled.setCanAttack(false)


// Seleção de skill aleatoria para o inimigo (computador) atacar.
const enemySkillsArray = [enemyPunch, enemyJab]

// Função que seta o conteúdo do enemyName
function setEnemyNameDisplay(name) {
    enemyName.innerText = `Ovo [${name}]`
}

setEnemyNameDisplay(`${exiled.name}`)

let turnCounter = 0;

function increseTurnCounter() {
    return turnCounter += 1;
}

let indice = 0

function increaseIndice() {
    if (indice === 10) {
        indice = 0
    }
    return indice += 1;
}

function changeIdValue(indice) {
    const idArray = ['first', 'second', 'third', 'fourth' , 'fifith', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']
    increaseIndice()

    for (let i = 0; i < idArray.length; i++) {
        return idValue = (idArray[indice])
    }

}

// Display de skills na upperbar
const upperBar = document.getElementById('upper-bar')
const upperBarContainer = document.getElementById('upper-bar-container')
const skillDisplay = document.getElementById('skill-display')
const skillDisplayName = document.getElementById('skill-display-name')
const skillDisplayIcon = document.getElementById('skill-display-icon')

// Sistema do player escolher uma skill e atacar com ela
const allySkillsArray = [allyPunch, allyJab]
const skill = document.querySelectorAll('.battle-menu__infos__skills__container')
const skillMenu = document.getElementById('skills')
const allys = document.getElementById('allys')
const allyDamageIndicator = document.getElementById('ally-damage-indicator')
const enemyDamageIndicator = document.getElementById('enemy-damage-indicator')
const skills = document.getElementById('skills')

// Função que aplica active no primeiro item das skills
function activeSkillsFirstChild() {
    skill[0].classList.add('battle-menu__infos__skills__container--active')
}

activeSkillsFirstChild()

// Função que remove o active do primeiro item das skills quando outra é hovered
function removeActiveSkillsFirstChild() {
    skill[0].classList.remove('battle-menu__infos__skills__container--active')
}

for (let i = 0; i < skill.length; i++) {
    skill[i].addEventListener('click', function(){
        if (protagonist.getHp() > 0 && exiled.getHp() > 0 && protagonist.getCanAttack() === true && document.getElementById('timer').innerText != '') {
            showSkillDisplay(`${allySkillsArray[i].name}`, '--ally')
            showSkills()
            setTimeout(() => {
                increseTurnCounter()
                exiled.getAttacked(allySkillsArray[i].damage);
                setResultScreenValues(allySkillsArray[i].damage, 0, 0, 0)
                enemy.classList.add('getAttacked')
                showEnemyDamageIndicator(`${allySkillsArray[i].damage}`)
                changeIdValue(`${indice}`)
                createBattleLogContainer(`${idValue}-turn-container`, `${idValue}-turn-title`, `Turno ${turnCounter}`)
                createBattleLogItem(`${idValue}-turn-container`, `${idValue}-turn-title`, `Você usou ${allySkillsArray[i].name}`, `${allySkillsArray[i].damage} de dano`, false)
                exiled.updateHpBars();
                exiled.setCanAttack(true)
                setTimeout(() => {
                    enemy.classList.remove('getAttacked')
                    hideSkillsDisplay()
                    hideEnemyDamageIndicator()
                }, 1500);
            }, 500);
        }
    })
    skill[i].addEventListener('mouseenter', removeActiveSkillsFirstChild)
}

// Função que mostra as opções de skills
function showSkills() {
    skills.classList.remove('battle-menu__infos__skills--visible')
}

// Função que mostra o skill display
function showSkillDisplay(name, theme) {
    upperBar.classList.add('upper-bar--skill')
    upperBarContainer.classList.add('upper-bar__container--hidden')
    skillDisplay.classList.remove('skill-display--hidden')
    skillDisplayName.innerText = name;
    upperBar.classList.add(`upper-bar${theme}`)
}

function hideSkillsDisplay() {
    upperBar.classList.remove('upper-bar--skill')
    upperBarContainer.classList.remove('upper-bar__container--hidden')
    skillDisplay.classList.add('skill-display--hidden')
    upperBar.classList.remove(`upper-bar--ally`)
    upperBar.classList.remove(`upper-bar--enemy`)
}

// Função que mostra o damage indicator do inimigo
function showEnemyDamageIndicator(damage) {
    enemyDamageIndicator.innerText = damage;
    enemyDamageIndicator.style.opacity = '1'
    enemyDamageIndicator.style.bottom = '-30%'
}

// Função que esconde o damage indicator do inimigo
function hideEnemyDamageIndicator() {
    enemyDamageIndicator.style.opacity = '0'
    setTimeout(() => {
        enemyDamageIndicator.style.bottom = '20%'
    }, 2500);
}

const enemyWeapon = document.getElementById('enemy-weapon')

// Função que adiciona e remove a animação de atacar da arma do inimigo
function setWeaponAnimation() {
    enemyWeapon.classList.add('enemyAttack')
    setTimeout(() => {
        enemyWeapon.classList.remove('enemyAttack')
    }, 2000);
}

// Sistema de duração do turno e ataque da CPU
function changeTimerInnerText() {
    if (protagonist.getHp() > 0 && enemyDamageIndicator.style.bottom != '20%' || document.getElementById('timer').innerText == '' && protagonist.getHp() > 0) {
        const now = new Date()
        const turnStart = now.getTime()
        const turnEnd = turnStart + 1000 * 62;  
        
        const timeCounter = setInterval(function(){
            const now = new Date()
            const turnStart = now.getTime()
            
            const minsInMs = 1000 * 60;
            const secondsInMs = 1000;
        
            const timeLeftToEndTheTurn = turnEnd - turnStart;
            
            const minsToEndTheTurn = Math.floor((timeLeftToEndTheTurn /  (minsInMs)))
            const secondsToEndTheTurn = Math.floor((timeLeftToEndTheTurn % minsInMs) / secondsInMs) 
        
            document.getElementById('timer').innerText = `00:0${minsToEndTheTurn}:${secondsToEndTheTurn}`
        
            if(secondsToEndTheTurn < 10) {
                document.getElementById('timer').innerText = `00:0${minsToEndTheTurn}:0${secondsToEndTheTurn}`
            }

            if (timeLeftToEndTheTurn < 0) {
                increseTurnCounter()
                changeIdValue(`${indice}`)
                createBattleLogContainer(`${idValue}-turn-container`, `${idValue}-turn-title`, `Turno ${turnCounter}`)
            }
        
            if (timeLeftToEndTheTurn < 0 || exiled.getCanAttack() === true || protagonist.getCanAttack() === false) {
                clearInterval(timeCounter)
                document.getElementById('timer').innerText = ''

                if(exiled.getHp() > 0 && protagonist.getHp() > 0) {
                    const randomSkill = Math.floor(Math.random() * enemySkillsArray.length)
                    showSkillDisplay(`${enemySkillsArray[randomSkill].name}`, '--enemy')
                    setWeaponAnimation()
                    setTimeout(() => {
                        protagonist.getAttacked(enemySkillsArray[randomSkill].damage);
                        setResultScreenValues(0, enemySkillsArray[randomSkill].damage, 0, 0)
                        ally.classList.add('getAttacked')
                        createBattleLogItem(`${idValue}-turn-container`, `${idValue}-turn-title`, `CPU usou ${enemySkillsArray[randomSkill].name}`, `${enemySkillsArray[randomSkill].damage} de dano`, true)
                        trySetStunNegativeEffect('stun')
                        showAllyDamageIndicator(`${enemySkillsArray[randomSkill].damage}`)
                        protagonist.updateHpBars();
                        exiled.setCanAttack(false)
                        setTimeout(() => {
                            ally.classList.remove('getAttacked')
                            hideSkillsDisplay()
                            hideAllyDamageIndicator()
                            changeTimerInnerText()
                            verifyNegativeEffect()
                        }, 1500);
                    }, 500);
                    showAllysInfos()    
                }
            }
        }, 1000);
    }
}

changeTimerInnerText()

// Função que tenta aplicar o efeito negativo de stun
function trySetStunNegativeEffect(effect) {
    if (protagonist.getNegativeEffect() === 'stun') {

    } else {
        const number = Math.round((Math.random() * 100))
        if (number < 50 && protagonist.getHp() > 0) {
            protagonist.setNegativeEffect(`${effect}`)
        }
    }
}

const allyStatusContainer = document.getElementById('ally-status-container')

function verifyNegativeEffect() {
    if (protagonist.getNegativeEffect() != 'none') {
        switch (protagonist.getNegativeEffect()) {
            case ('stun'):
                protagonist.setCanAttack(false);

                const negativeStatusIcon = document.createElement('img');
                if (allyStatusContainer.children.length >= 2) {
                    removeNegativeStatus()
                } else {
                negativeStatusIcon.className = ('battle-menu__infos__allys__effect-icon')
                negativeStatusIcon.id = 'negative-status-icon'
                negativeStatusIcon.src = 'https://servidor-estatico-alpha-six.vercel.app/stun-effect-icon.png'
                negativeStatusIcon.alt = 'Ícone do efeito'

                allyStatusContainer.appendChild(negativeStatusIcon)
                }
            break;
        }
        
    }
}

// Função que remove o status negativo do jogador 
function removeNegativeStatus() {
    protagonist.setCanAttack(true)
    if (allyStatusContainer.children.length >= 2) {
        const negativeStatusIcon = document.getElementById('negative-status-icon')
        allyStatusContainer.removeChild(negativeStatusIcon)
    }
    protagonist.setNegativeEffect('none')
}

// Função que mostra o damage indicator do aliado
function showAllyDamageIndicator(damage) {
    allyDamageIndicator.innerHTML = damage
    allyDamageIndicator.style.opacity = '1'
    allyDamageIndicator.style.left = '-30%'
}

// Função que esconde o damage indicator do aliado
function hideAllyDamageIndicator() {
    allyDamageIndicator.style.opacity = '0'
    setTimeout(() => {
        allyDamageIndicator.style.left = '0'
    }, 1500);
}

// Função que mostra as informações dos aliados na party 
function showAllysInfos() {
    skills.classList.remove('battle-menu__infos__skills--visible')
    allys.classList.add('battle-menu__infos__allys--visible')
}

const resultsScreenDamageDealt = document.getElementById('results-screen-damage-dealt')
const resultsScreenDamageReceived = document.getElementById('results-screen-damage-received')
const resultsScreenItensCount = document.getElementById('results-screen-itens-count')
const resultsScreenEnemiesKilled = document.getElementById('results-screen-enemies-killed')

let allyDamageDealt = 0;
let allyDamageRecieved = 0;
let allyItensCount = 0;
let allyEnemiesKilled = 0;

function setResultScreenValues(damageDealt, damageRecieved, itensCount, enemiesKilled,) {

    if (damageDealt > 0) {
        allyDamageDealt += damageDealt;
        resultsScreenDamageDealt.innerText = `Dano causado: ${allyDamageDealt}`;
    }

    if (damageRecieved > 0) {
        allyDamageRecieved += damageRecieved;
        resultsScreenDamageReceived.innerText = `Dano recebido: ${allyDamageRecieved}`;
    }

    if (itensCount > 0) {
        allyItensCount += itensCount;
        resultsScreenItensCount.innerText = `Itens utilizados: ${allyItensCount}`;
    }

    if (enemiesKilled > 0) {
        allyEnemiesKilled += enemiesKilled;
        resultsScreenEnemiesKilled.innerText = `Inimigos derrotados: ${allyEnemiesKilled}`;
    }
}

// setResultScreenValues(0, 0, itens, 0)

// const resultsScreenPlayer = document.getElementById('results-screen-player')
// const resultsScreenMessage = document.getElementById('results-screen-message')

const playAgainButton = document.getElementById('play-again').addEventListener('click', function(){
    location.reload();
});

// protagonist.setCanAttack(false)
// console.log(protagonist.getCanAttack())


