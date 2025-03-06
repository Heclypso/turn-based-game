class Character {
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
        console.log(`A vida atual do ${this.name} é de ${this.#hp}`)
    }
}

class Skills {
    constructor(skillName, skillDamage, skillCost) {
        this.name = skillName;
        this.damage = skillDamage;
        this.cost = skillCost;
    }
}

class Ally extends Character  {
}

class AllySkills extends Skills {
}

class Enemy extends Character {
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
const randomSkill = Math.floor(Math.random() * enemySkillsArray.length)

// Sistema do player escolher uma skill e atacar com ela
const allySkillsArray = [allyPunch, allyJab]
const buttons = document.querySelectorAll('#button')

firstEnemy.getHp();
protagonist.getHp();

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
            protagonist.attack(allySkillsArray[i].name, allySkillsArray[i].damage);
            firstEnemy.getAttacked(allySkillsArray[i].damage);
            firstEnemy.getHp();

            setTimeout(() => {
                protagonist.getAttacked(enemySkillsArray[randomSkill].damage);
                protagonist.getHp()
            }, 1000);
    })
}



