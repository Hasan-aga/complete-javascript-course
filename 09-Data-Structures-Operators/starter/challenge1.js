const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// ///////////////////////////////////
// solution
// ///////////////////////////////////
// let players1 = game.players[0];
// let players2 = game.players[1];

// const [gk, ...fieldPlayers] = players1;
// const allPlayers = [...players1, ...players2];

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// const {
//   odds: { team1, x: draw, team2 },
// } = game;

// function printGoals(...players) {
//   for (const player of players) {
//     console.log(`${player} had scored`);
//   }
// }

// printGoals(...game.scored);

// (game.odds.team1 > game.odds.team2 &&
//   console.log(`${game.team1} is more likely to win`)) ||
//   (game.odds.team1 < game.odds.team2 &&
//     console.log(`${game.team2} is more likely to win`));

// second challenge

// const scored = game.scored;

// for (const [goal, player] of game.scored.entries())
//   console.log(`Goal ${goal + 1}: ${player}`);

// const { odds } = game;

// let sum = 0;
// let count = 0;
// for (odd of Object.values(odds)) {
//   sum += odd;
//   count++;
// }

// const avg = sum / count;
// console.log(avg);

// // Odd of victory Bayern Munich: 1.33
// // Odd of draw: 3.25
// // Odd of victory Borrussia Dortmund: 6.5

// for ([team, odd] of Object.entries(odds)) {
//   const term = game[team] ? 'victory' : 'draw';
//   console.log(`Odd of ${game[team]} ${term} is ${odd}`);
// }

// challenge 3
// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1
// const uniqueEvents = new Set([...gameEvents.values()]);
// console.log(uniqueEvents);

// // 2
// gameEvents.delete(64);

// // console.log(gameEvents);

// // 3
// const avgEventInterval = 90 / gameEvents.size;
// console.log(`An event happened, on average, every ${avgEventInterval} minutes`);

// // 4
// for (const [time, event] of gameEvents) {
//   console.log(
//     `${time <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${time}: ${event}`
//   );
// }

//challenge 4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textArea = document.querySelector('textArea');
const button = document.querySelector('button');

function turnToCamelCase(params) {
  const paramsArray = params.split('\n');
  for (const [index, element] of paramsArray.entries()) {
    const underscoreIndex = element.indexOf('_') + 1;
    let fixed =
      element.trim().slice(0, underscoreIndex).replace('_', '') +
      element[underscoreIndex].toUpperCase() +
      element.slice(underscoreIndex + 1);

    fixed = fixed.padEnd(18, ' ');

    console.log(`${fixed} ${'✅'.repeat(index + 1)}`);
  }
}

button.addEventListener('click', function () {
  const inputData = textArea.value;

  turnToCamelCase(inputData);
});
