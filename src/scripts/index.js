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
            console.log("Você ganhou")
            enemyInfos.style.display = 'none'
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
        if (ally.style.opacity != "0" && enemy.style.opacity != "0") {
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



