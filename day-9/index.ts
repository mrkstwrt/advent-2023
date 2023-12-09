export const parseInput = (input: string): Array<Array<number>> =>
  input.split("\n").map((line) => line.split(" ").map(Number));

const findDifferences = (sequence: Array<number>): Array<number> =>
  sequence.reduce<Array<number>>(
    (differences, num, i, sequence) =>
      i === sequence.length - 1
        ? differences
        : [...differences, sequence[i + 1] - num],
    []
  );

const getHistories = (sequence: Array<number>): Array<Array<number>> => {
  const histories = [sequence];

  while (!histories[histories.length - 1].every((num) => num === 0)) {
    const nextSequence = findDifferences(histories[histories.length - 1]);
    histories.push(nextSequence);
  }

  return histories;
};

const findNextValue = (
  sequence: Array<number>,
  backwards?: boolean
): number => {
  const histories = getHistories(sequence);

  return histories.reduceRight(
    (count, history) =>
      backwards ? history[0] - count : count + history[history.length - 1],
    0
  );
};

export const partOne = (input: string): number => {
  const sequences = parseInput(input);

  return sequences.reduce(
    (total, sequence) => total + findNextValue(sequence),
    0
  );
};

export const partTwo = (input: string): number => {
  const sequences = parseInput(input);

  return sequences.reduce(
    (total, sequence) => total + findNextValue(sequence, true),
    0
  );
};
