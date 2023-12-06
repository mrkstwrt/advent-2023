const parseInput = (
  input: string
): Array<{ time: number; distance: number }> => {
  const [times, distances] = input
    .split("\n")
    .map((line) => line.split(":")[1].trim().split(/\s+/).map(Number));

  return times.map((time, i) => ({ time, distance: distances[i] }));
};

const parseInputTwo = (
  input: string
): Array<{ time: number; distance: number }> => {
  const [times, distances] = input
    .split("\n")
    .map((line) => line.split(":")[1].trim().split(/\s+/).map(Number));

  const strings = times.reduce(
    (acc, time, i) => [
      { time: acc[0].time + time, distance: acc[0].distance + distances[i] },
    ],
    [{ time: "", distance: "" }]
  );

  return [
    { time: Number(strings[0].time), distance: Number(strings[0].distance) },
  ];
};

const runRaces = (input: Array<{ time: number; distance: number }>) =>
  input.reduce((total, { time, distance }) => {
    const possible = Array.from({ length: time - 2 }).reduce<number>(
      (total, _, i) => {
        const index = i + 1;
        const speed = index;
        const remaining = time - index;
        const distanceTraveled = speed * remaining;

        return distanceTraveled > distance ? total + 1 : total;
      },
      0
    );

    return total * possible;
  }, 1);

export const partOne = (input: string): number => {
  const parsedInput = parseInput(input);

  return runRaces(parsedInput);
};

export const partTwo = (input: string): number => {
  const parsedInput = parseInputTwo(input);

  return runRaces(parsedInput);
};
