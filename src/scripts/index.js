const allyHpBar = document.getElementById('ally-hp-bar')
const allyHpValue = document.getElementById('ally-hp-number')

const enemyHpBar = document.getElementById('enemy-hp-bar')
const enemyHpValue = document.getElementById('enemy-hp-number')

class Character {
    #maxHp = 100;
    #hp = 100;

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
}

class Skills {
    constructor(skillName, skillDamage, skillCost) {
        this.name = skillName;
        this.damage = skillDamage;
        this.cost = skillCost;
    }
}

const ally = document.getElementById('ally')

class Ally extends Character  {
    updateHpBars() {
        allyHpBar.style.width = `${(this.getHp()/ this.getMaxHp()) *100}%`;
        allyHpValue.innerHTML = this.getHp();

        if (this.getHp() <= 0) {
            ally.style.opacity = '0';
            console.log("Você perdeu")
        }
    }
}

class AllySkills extends Skills {
}

const enemy = document.getElementById('enemy')
const enemyInfos = document.getElementById('enemy-infos')

class Enemy extends Character {
    updateHpBars() {
        enemyHpBar.style.width = `${(this.getHp()/ this.getMaxHp()) *100}%`;
        enemyHpValue.innerHTML = this.getHp();

        if (this.getHp() <= 0) {
            enemy.style.opacity = '0';
            enemyInfos.style.opacity = '0'
            setTimeout(() => {
                console.log("Você ganhou")
                enemyInfos.style.display = 'none'
            }, 1000);
        }
    }
}

class EnemySkills extends Skills {
}


// Definição das instancias de habilidades dos personagens
const allyPunch = new AllySkills('Punch', 20, 10);
const allyJab = new AllySkills('Jab', 30, 10)

const enemyPunch = new EnemySkills('Punch', 20, 10);
const enemyJab = new EnemySkills('Jab', 30, 10)

// Definição da instancia dos personagens
const protagonist = new Ally('Protagonist', [allyPunch, allyJab]);
const firstEnemy = new Enemy('Enemy', [enemyPunch, enemyJab])

// Sistema de duração do turno

function changeTimerInnerText() {
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
    
        if (timeLeftToEndTheTurn < 0 || enemyDamageIndicator.style.opacity === '1') {
            clearInterval(timeCounter)
            document.getElementById('timer').innerText = ''
            console.log("Turno finalizado")
        }
    }, 1000);
}

changeTimerInnerText()

// Seleção de skill aleatoria para o inimigo (computador) atacar.
const enemySkillsArray = [enemyPunch, enemyJab]

// Sistema do player escolher uma skill e atacar com ela
const allySkillsArray = [allyPunch, allyJab]
const skill = document.querySelectorAll('#skill-button')
const skillMenu = document.getElementById('skills')
const allys = document.getElementById('allys')
const allyDamageIndicator = document.getElementById('ally-damage-indicator')
const enemyDamageIndicator = document.getElementById('enemy-damage-indicator')

for (let i = 0; i < skill.length; i++) {
    skill[i].addEventListener('click', function(){
        if (ally.style.opacity != "0" && enemy.style.opacity != "0" && document.getElementById('timer').innerText != '') {
            skills.classList.remove('battle-menu__infos__skills-is--visible')
            protagonist.attack(allySkillsArray[i].name, allySkillsArray[i].damage);
            firstEnemy.getAttacked(allySkillsArray[i].damage);
            enemyDamageIndicator.style.opacity = '1'
            enemyDamageIndicator.style.bottom = '-30%'
            firstEnemy.updateHpBars();
            setTimeout(() => {
                enemyDamageIndicator.style.opacity = '0'
                setTimeout(() => {
                    enemyDamageIndicator.style.bottom = '20%'
                }, 2500);
            }, 1500);

            setTimeout(() => {
                if(enemy.style.opacity != "0") {
                    const randomSkill = Math.floor(Math.random() * enemySkillsArray.length)
                    console.log(`${firstEnemy.name} attacked with ${enemySkillsArray[randomSkill].name} e inflingiu ${enemySkillsArray[randomSkill].damage}`)
                    protagonist.getAttacked(enemySkillsArray[randomSkill].damage);
                    allyDamageIndicator.style.opacity = '1'
                    allyDamageIndicator.style.right = '-30%'
                    protagonist.updateHpBars();
                    setTimeout(() => {
                        allyDamageIndicator.style.opacity = '0'
                        ally.style.left = '122px'
                        changeTimerInnerText()
                        setTimeout(() => {
                            allyDamageIndicator.style.right = '0'
                        }, 2500);
                    }, 1500);
                    
                    allys.classList.add('battle-menu__infos__allys-is--visible')
                }
            }, 1000);
        }
    })
}

