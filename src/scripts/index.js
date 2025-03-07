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
            ally.style.display = "none";
            console.log("Você perdeu")
        }
    }
}

class AllySkills extends Skills {
}

const enemy = document.getElementById('enemy')


class Enemy extends Character {
    updateHpBars() {
        enemyHpBar.style.width = `${(this.getHp()/ this.getMaxHp()) *100}%`;
        enemyHpValue.innerHTML = this.getHp();

        if (this.getHp() <= 0) {
            enemy.style.display = "none";
            console.log("Você ganhou")
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


for (let i = 0; i < skill.length; i++) {
    skill[i].addEventListener('click', function(){
        if (ally.style.display != "none" && enemy.style.display != "none") {
            protagonist.attack(allySkillsArray[i].name, allySkillsArray[i].damage);
            firstEnemy.getAttacked(allySkillsArray[i].damage);
            firstEnemy.updateHpBars();

            setTimeout(() => {
                if(enemy.style.display != "none") {
                    const randomSkill = Math.floor(Math.random() * enemySkillsArray.length)
                    console.log(`${firstEnemy.name} attacked with ${enemySkillsArray[randomSkill].name} e inflingiu ${enemySkillsArray[randomSkill].damage}`)
                    protagonist.getAttacked(enemySkillsArray[randomSkill].damage);
                    protagonist.updateHpBars();
                }
            }, 1000);
        }
    })
}



