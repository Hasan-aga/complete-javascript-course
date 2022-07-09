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
let players1 = game.players[0];
let players2 = game.players[1];

const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const {
  odds: { team1, x: draw, team2 },
} = game;

function printGoals(...players) {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    console.log(`${player} scored`);
  }
}

printGoals(...game.scored);

(game.odds.team1 > game.odds.team2 &&
  console.log(`${game.team1} is more likely to win`)) ||
  (game.odds.team1 < game.odds.team2 &&
    console.log(`${game.team2} is more likely to win`));
