function spinTheWheel(wheel) {
  const segments = [];
  const sum = wheel.reduce((acc, { weight, reward }) => {
    const key = weight + acc;
    segments.push({ key, reward });
    return key;
  }, 0);
  const randomNum = Math.floor(Math.random() * sum);
  const { reward } = segments.find(s => randomNum < s.key) || {};
  return reward;
}

module.exports = {
  spinTheWheel
}