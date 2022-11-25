const { spinTheWheel } = require("./sol3");

function statistic(wheel) {
  const stat = {};
  for (const w of wheel) {
    stat[w.reward] = 0;
  }
  let count = 0;
  let reward;
  const iterations = 10000000;
  while (count ++ < iterations) {
    reward = spinTheWheel(wheel);
    stat[reward] += 1;   
  }
  const result = Object.keys(stat).map(
      s => (`${s}: ${((stat[s]/iterations) * 100).toFixed(3)}%`)
    ).join(' , ');
  return {
    result,
    stat,
    iterations
  }
}

const test = (w) => {
  const stat = statistic(w);
  console.log(stat);
}

test([
  { weight: 1, reward: 'A' }, 
  { weight: 1, reward: 'B' },
]);

test([
  { weight: 0, reward: 'A' }, 
  { weight: 0, reward: 'B' },
  { weight: 0, reward: 'C' },
  { weight: 1, reward: 'D' },
  { weight: 1, reward: 'E' }
]);

test([
  { weight: 1, reward: 'A' }, 
  { weight: 2, reward: 'B' },
  { weight: 20, reward: 'C' },
  { weight: 200, reward: 'D' }
]);

test([
  { weight: 1, reward: 'A' }, 
  { weight: 10, reward: 'B' },
  { weight: 100, reward: 'C' },
  { weight: 10, reward: 'D' },
  { weight: 1, reward: 'E' }
]);


