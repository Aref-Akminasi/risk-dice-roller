const attackerDices = [
  document.getElementById('d1-attacker'),
  document.getElementById('d2-attacker'),
  document.getElementById('d3-attacker'),
];
const defenderDices = [
  document.getElementById('d1-defender'),
  document.getElementById('d2-defender'),
];

const rollSoud = document.getElementById('roll-sound');
const diedAttacker = document.getElementById('died-count-attacker');
const diedDefender = document.getElementById('died-count-defender');
const rollDice = document.getElementById('roll-dice');

let attackerAvailableDices = 3;
let defenderAvailableDices = 2;
let attackerRoll = [];
let defenderRoll = [];
let attackerDied = 0;
let defenderDied = 0;

function getRandomNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

attackerDices.forEach((dice) => {
  dice.addEventListener('click', (e) => {
    if (
      attackerAvailableDices > 1 &&
      !e.target.classList.contains('disabled')
    ) {
      e.target.classList.add('disabled');
      attackerAvailableDices--;
    } else if (e.target.classList.contains('disabled')) {
      e.target.classList.remove('disabled');
      attackerAvailableDices++;
    }
  });
});

defenderDices.forEach((dice) => {
  dice.addEventListener('click', (e) => {
    if (
      defenderAvailableDices > 1 &&
      !e.target.classList.contains('disabled')
    ) {
      e.target.classList.add('disabled');
      defenderAvailableDices--;
    } else if (e.target.classList.contains('disabled')) {
      e.target.classList.remove('disabled');
      defenderAvailableDices++;
    }
  });
});

rollDice.addEventListener('click', () => {
  rollSoud.pause();
  rollSoud.currentTime = 0;
  rollSoud.play();
  for (i = 0; i < attackerAvailableDices; i++) {
    attackerRoll.push(getRandomNumber());
  }
  attackerRoll.sort().reverse();

  for (i = 0; i < defenderAvailableDices; i++) {
    defenderRoll.push(getRandomNumber());
  }
  defenderRoll.sort().reverse();
  updateLayout();
});

function updateLayout() {
  const attackerAvailableDices = attackerDices.filter(
    (dice) => !dice.classList.contains('disabled')
  );
  for (i = 0; i < attackerAvailableDices.length; i++) {
    attackerAvailableDices[
      i
    ].style.backgroundImage = `url('assets/a_dices/${attackerRoll[i]}.jpg`;
  }

  const defenderAvailableDices = defenderDices.filter(
    (dice) => !dice.classList.contains('disabled')
  );
  for (i = 0; i < defenderAvailableDices.length; i++) {
    defenderAvailableDices[
      i
    ].style.backgroundImage = `url('assets/d_dices/${defenderRoll[i]}.jpg`;
  }

  calculateDied();
}

function calculateDied() {
  for (i = 0; i < 10; i++) {
    if (i >= attackerRoll.length || i >= defenderRoll.length) {
      diedAttacker.innerText = attackerDied;
      diedDefender.innerText = defenderDied;
      console.log(i);
      break;
    }
    if (attackerRoll[i] > defenderRoll[i]) {
      defenderDied++;
    } else {
      attackerDied++;
    }
  }
  attackerDied = 0;
  defenderDied = 0;
  attackerRoll = [];
  defenderRoll = [];
}
