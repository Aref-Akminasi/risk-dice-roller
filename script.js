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
//Adding the class disabled for the attacker dices
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
//Adding the class disabled for the defender dices
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
//Updating the array for the players with the active dices
rollDice.addEventListener('click', () => {
  rollSoud.pause();
  rollSoud.currentTime = 0;
  rollSoud.play();
  for (let i = 0; i < attackerAvailableDices; i++) {
    attackerRoll.push(getRandomNumber());
  }
  attackerRoll.sort().reverse();

  for (let i = 0; i < defenderAvailableDices; i++) {
    defenderRoll.push(getRandomNumber());
  }
  defenderRoll.sort().reverse();
  updateLayout();
});
//Updating the assets of the active dices
function updateLayout() {
  const attackerAvailableDices = attackerDices.filter(
    (dice) => !dice.classList.contains('disabled')
  );
  for (let i = 0; i < attackerAvailableDices.length; i++) {
    attackerAvailableDices[
      i
    ].style.backgroundImage = `url('assets/a_dices/${attackerRoll[i]}.jpg`;
  }

  const defenderAvailableDices = defenderDices.filter(
    (dice) => !dice.classList.contains('disabled')
  );
  for (let i = 0; i < defenderAvailableDices.length; i++) {
    defenderAvailableDices[
      i
    ].style.backgroundImage = `url('assets/d_dices/${defenderRoll[i]}.jpg`;
  }

  calculateDied();
}
//Calculated how much troops are dead
function calculateDied() {
  for (let i = 0; i < 10; i++) {
    if (i >= attackerRoll.length || i >= defenderRoll.length) {
      diedAttacker.innerText = attackerDied;
      diedDefender.innerText = defenderDied;
      break;
    }
    if (attackerRoll[i] > defenderRoll[i]) {
      defenderDied++;
    } else {
      attackerDied++;
    }
  }
  //Resetting the values of the deads and the rolled numbers for both the players
  attackerDied = 0;
  defenderDied = 0;
  attackerRoll = [];
  defenderRoll = [];
}
