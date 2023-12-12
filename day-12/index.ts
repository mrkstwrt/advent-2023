type Damaged = Array<number>;

type Row = Array<"." | "#" | "?">;

const parseInput = (input: string): Array<{ row: Row; damaged: Damaged }> =>
  input.split("\n").map((line) => {
    const [row, damaged] = line.split(" ");

    return {
      row: row.split("") as Row,
      damaged: damaged.split(",").map(Number),
    };
  });

const parseExpandedInput = (
  input: string
): Array<{ row: Row; damaged: Damaged }> =>
  input.split("\n").map((line) => {
    const [row, damaged] = line.split(" ");

    const damagedArray = damaged.split(",").map(Number);

    return {
      row: `${row}?${row}?${row}?${row}?${row}`.split("") as Row,
      damaged: [
        ...damagedArray,
        ...damagedArray,
        ...damagedArray,
        ...damagedArray,
        ...damagedArray,
      ],
    };
  });

const cacheFn = <T extends unknown[], R>(
  fn: (...args: T) => R
): ((...args: T) => R) => {
  const cache = new Map<string, R>();

  return (...args) => {
    const cacheKey = JSON.stringify(args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }
    const result = fn(...args);

    cache.set(cacheKey, result);

    return result;
  };
};

const countValidArrangements = cacheFn((row: Row, damaged: Damaged): number => {
  if (row.length === 0) {
    if (damaged.length === 0) {
      return 1;
    }

    return 0;
  }

  if (damaged.length === 0) {
    if (row.includes("#")) {
      return 0;
    }

    return 1;
  }

  let count = 0;

  if (row[0] === "." || row[0] === "?") {
    count += countValidArrangements(row.slice(1), damaged);
  }

  if (row[0] === "#" || row[0] === "?") {
    if (damaged[0] > row.length) return count;

    if (row.slice(0, damaged[0]).includes(".")) return count;

    if (damaged[0] === row.length || row[damaged[0]] !== "#") {
      count +=
        damaged[0] === row.length
          ? countValidArrangements([], damaged.slice(1))
          : countValidArrangements(row.slice(damaged[0] + 1), damaged.slice(1));
    }
  }

  return count;
});

const cachedCountValidArrangements = (
  ...args: Parameters<typeof countValidArrangements>
): number => {
  const cache = new Map<string, number>();

  const cacheKey = JSON.stringify(args);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const result = countValidArrangements(...args);

  cache.set(cacheKey, result);

  return result;
};

const sumTotal = (lines: Array<{ row: Row; damaged: Damaged }>) =>
  lines.reduce(
    (sum, line) => sum + cachedCountValidArrangements(line.row, line.damaged),
    0
  );

export const partOne = (input: string): number => {
  const lines = parseInput(input);

  return sumTotal(lines);
};

export const partTwo = (input: string): number => {
  const lines = parseExpandedInput(input);

  return sumTotal(lines);
};
