const btnKick = document.getElementById('btn-kick');
const btnKickHard = document.getElementById('btn-kick-hard');
const logsContainer = document.getElementById('logs'); 


function changeHP(count, attacker) {
    if (this.damageHP < count) {
        this.damageHP = 0;
        alert(`${this.name} програв бій!`);
        btnKick.disabled = true;
        btnKickHard.disabled = true;
    } else {
        this.damageHP -= count;
    }

    this.renderHP();
    generateLog(this, attacker, count); 
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {

    const { elHP, damageHP, defaultHP } = this; 
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {

    const { elProgressbar, damageHP, defaultHP } = this; 
    const percent = (damageHP / defaultHP) * 100;
    
    elProgressbar.style.width = `${percent}%`;
    
    if (percent < 20) {
        elProgressbar.style.backgroundColor = '#f44336';
    } else if (percent < 60) {
        elProgressbar.style.backgroundColor = '#ffeb3b';
    } else {
        elProgressbar.style.backgroundColor = '#4caf50';
    }
}


function generateLog(defender, attacker, count) {
    const { name: defName, damageHP, defaultHP } = defender; 
    const { name: attName } = attacker;
    

    const logIndex = random(logs.length) - 1; 
    let text = logs[logIndex];
    

    text = text.replace('[ПЕРСОНАЖ №1]', defName)
               .replace('[ПЕРСОНАЖ №2]', attName);
               

    const finalLog = `${text} -${count}, Залишилось: [${damageHP} / ${defaultHP}]`;
    

    const p = document.createElement('p');
    p.innerText = finalLog;
    
 
    logsContainer.prepend(p);
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP
};

function random(num) {
    return Math.ceil(Math.random() * num);
}


btnKick.addEventListener('click', function () {
    character.changeHP(random(20), enemy);
    enemy.changeHP(random(20), character);
});

btnKickHard.addEventListener('click', function () {
    character.changeHP(random(35), enemy);
    enemy.changeHP(random(35), character);
});