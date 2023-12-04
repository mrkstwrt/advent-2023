import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "url";

const sampleInput = readFileSync(
  join(import.meta.dir, "./sample-1.txt"),
  "utf8"
).trim();

const inputOne = readFileSync(
  join(import.meta.dir, "./input-1.txt"),
  "utf8"
).trim();

const parseCard = (
  input: string
): Array<{
  winning: Array<number>;
  mine: Array<number>;
  gameNumber: number;
  count: number;
}> =>
  input.split("\n").map((game, i) => {
    const [, gameParts] = game.split(":");
    const [winning, mine] = gameParts.split("|");

    return {
      gameNumber: i,
      count: 1,
      winning: winning
        .trim()
        .split(" ")
        .map((num) => parseInt(num.trim(), 10)),
      mine: mine.trim().split(" ").map(Number),
    };
  });

export const partOne = (input: string): number => {
  const games = parseCard(input);

  return games.reduce(
    (totalScore, { winning, mine }) =>
      (totalScore += mine.reduce(
        (score, num) =>
          winning.includes(num) ? (score === 0 ? 1 : score * 2) : score,
        0
      )),
    0
  );
};

export const partTwo = (input: string): number => {
  const games = parseCard(input);

  for (let i = 0; i < games.length; i++) {
    const { winning, mine, gameNumber, count } = games[i];

    const matchingCount = mine.filter((num) => winning.includes(num)).length;

    for (let j = 0; j < matchingCount; j++) {
      const targetIndex = games.findLastIndex(
        (game) => game.gameNumber === gameNumber + 1 + j
      );

      if (games[targetIndex]) {
        games[targetIndex].count += 1 * count;
      }
    }
  }

  return games.reduce((total, { count }) => total + count, 0);
};
