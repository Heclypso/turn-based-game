const allyHpBar = document.getElementById('ally-hp-bar')
const allyHpValue = document.getElementById('ally-hp-number')

const enemyHpBar = document.getElementById('enemy-hp-bar')
const enemyHpValue = document.getElementById('enemy-hp-number')

class Character {
    #maxHp = 100;
    #hp = 100;
    #canAttack = true;

    constructor(characterName, characterSkills) {
        this.name = characterName;
        this.skill = characterSkills;
    }
    attack(selectedSkill, selectedSkillDamage) {
        console.log(`${this.name} attacked with ${selectedSkill} e inflingiu ${selectedSkillDamage} de dano`)
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
            firstEnemy.setCanAttack(false)
            protagonist.setCanAttack(false)
            ally.style.opacity = '0';
            resultsScreen.classList.remove('results-screen-is--hidden')
            resultsScreenTitle.classList.add('results-screen__title--defeat')
            resultsScreenTitle.innerText = 'Derrota'
        }
    }
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
            protagonist.setCanAttack(false)
            firstEnemy.setCanAttack(false)
            enemy.style.opacity = '0';
            enemyInfos.style.opacity = '0'
            setTimeout(() => {
                enemyInfos.style.display = 'none'
                setTimeout(() => {
                    enemyName.style.opacity = '0'
                    resultsScreen.classList.remove('results-screen-is--hidden')
                    resultsScreenTitle.classList.add('results-screen__title--victory')
                    resultsScreenTitle.innerText = 'Vitória'
                }, 1000);
            }, 1000);
        }
    }
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
const firstEnemy = new Enemy('Enemy', [enemyPunch, enemyJab])
firstEnemy.setCanAttack(false)

// Seleção de skill aleatoria para o inimigo (computador) atacar.
const enemySkillsArray = [enemyPunch, enemyJab]

// Sistema do player escolher uma skill e atacar com ela
const allySkillsArray = [allyPunch, allyJab]
const skill = document.querySelectorAll('#skill-button')
const skillMenu = document.getElementById('skills')
const allys = document.getElementById('allys')
const allyDamageIndicator = document.getElementById('ally-damage-indicator')
const enemyDamageIndicator = document.getElementById('enemy-damage-indicator')
const skills = document.getElementById('skills')

for (let i = 0; i < skill.length; i++) {
    skill[i].addEventListener('click', function(){
        if (protagonist.getHp() > 0 && firstEnemy.getHp() > 0 && document.getElementById('timer').innerText != '') {
            skills.classList.remove('battle-menu__infos__skills-is--visible')
            protagonist.attack(allySkillsArray[i].name, allySkillsArray[i].damage);
            firstEnemy.getAttacked(allySkillsArray[i].damage);
            enemyDamageIndicator.innerHTML = `${allySkillsArray[i].damage}`
            enemyDamageIndicator.style.opacity = '1'
            enemyDamageIndicator.style.bottom = '-30%'
            firstEnemy.updateHpBars();
            firstEnemy.setCanAttack(true)
            setTimeout(() => {
                enemyDamageIndicator.style.opacity = '0'
                setTimeout(() => {
                    enemyDamageIndicator.style.bottom = '20%'
                }, 2500);
            }, 1500);
        }
    })
}


// Sistema de duração do turno e ataque da CPU
function changeTimerInnerText() {
    if (protagonist.getHp() > 0  && enemyDamageIndicator.style.bottom != '20%') {
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
        
            if (timeLeftToEndTheTurn < 0 || firstEnemy.getCanAttack() === true) {
                clearInterval(timeCounter)
                document.getElementById('timer').innerText = ''

                if(firstEnemy.getHp() > 0 && protagonist.getHp() > 0) {
                    const randomSkill = Math.floor(Math.random() * enemySkillsArray.length)
                    console.log(`${firstEnemy.name} attacked with ${enemySkillsArray[randomSkill].name} e inflingiu ${enemySkillsArray[randomSkill].damage}`)
                    protagonist.getAttacked(enemySkillsArray[randomSkill].damage);
                    allyDamageIndicator.innerHTML = `${enemySkillsArray[randomSkill].damage}`
                    allyDamageIndicator.style.opacity = '1'
                    allyDamageIndicator.style.right = '-30%'
                    protagonist.updateHpBars();
                    firstEnemy.setCanAttack(false)
                    setTimeout(() => {
                        allyDamageIndicator.style.opacity = '0'
                        ally.style.left = '122px'
                        setTimeout(() => {
                            allyDamageIndicator.style.right = '0'
                            changeTimerInnerText()
                        }, 500);
                    }, 1500);
                
                    allys.classList.add('battle-menu__infos__allys-is--visible')
                }
            }
        }, 1000);
    }
}

changeTimerInnerText()

// const resultsScreenPlayer = document.getElementById('results-screen-player')
// const resultsScreenMessage = document.getElementById('results-screen-message')
// const resultsScreenDamageDealt = document.getElementById('results-screen-damage-dealt')
// const resultsScreenDamageReceived = document.getElementById('results-screen-damage-received')
// const resultsScreenItensCount = document.getElementById('results-screen-itens-count')
// const resultsScreenEnemiesKilled = document.getElementById('results-screen-enemies-killed')
// const playAgainButton = document.getElementById('play-again');

// protagonist.setCanAttack(false)
// console.log(protagonist.getCanAttack())