// pathData.js
import seedrandom from 'seedrandom';

// Initialize the random number generator with a fixed seed
const rng = seedrandom('fixed-seed');

// Generate an array of 20 path strings
export const pathDs = Array.from({ length: 20 }, () => {
  const x1 = rng() * 100;
  const y1 = rng() * 100;
  const x2 = rng() * 100;
  const y2 = rng() * 100;
  const x3 = rng() * 100;
  const y3 = rng() * 100;
  return `M${x1},${y1} Q${x2},${y2} ${x3},${y3}`;
});