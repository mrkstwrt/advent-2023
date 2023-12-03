import { readFileSync } from "fs";
import { join } from "path";

const sampleInput = readFileSync(
  join(import.meta.dir, "./sample-1.txt"),
  "utf8"
).trim();

const inputOne = readFileSync(
  join(import.meta.dir, "./input-1.txt"),
  "utf8"
).trim();

const buildGrid = (input: string): Array<Array<string>> => [
  Array.from({ length: input.split("\n")[0].length + 2 }, () => "."),
  ...input.split("\n").map((line) => [".", ...line.split(""), "."]),
  Array.from({ length: input.split("\n")[0].length + 2 }, () => "."),
];

const getAdjacentIndexes = (
  startIndex: number,
  numberLength: number,
  lineIndex: number,
  lineLength: number,
  numLines: number
): Array<[number, number]> => {
  const indexes: Array<[number, number]> = [];

  for (let i = 0; i < numberLength; i++) {
    if (i === 0) {
      if (startIndex > 0) {
        indexes.push([lineIndex, startIndex - 1]);

        if (lineIndex > 0) {
          indexes.push([lineIndex - 1, startIndex - 1]);
        }

        if (lineIndex < numLines - 1) {
          indexes.push([lineIndex + 1, startIndex - 1]);
        }
      }
    }

    if (i === numberLength - 1) {
      if (startIndex + numberLength < lineLength) {
        indexes.push([lineIndex, startIndex + numberLength]);

        if (lineIndex > 0) {
          indexes.push([lineIndex - 1, startIndex + numberLength]);
        }

        if (lineIndex < numLines - 1) {
          indexes.push([lineIndex + 1, startIndex + numberLength]);
        }
      }
    }

    if (lineIndex > 0) {
      indexes.push([lineIndex - 1, startIndex + i]);
    }

    if (lineIndex < numLines - 1) {
      indexes.push([lineIndex + 1, startIndex + i]);
    }
  }

  return indexes;
};

export const partOne = (input: string): number => {
  const grid = buildGrid(input);
  const eligibleNumbers: Array<number> = [];

  grid.forEach((line, lineIndex) => {
    let currentNumberString: string = "";

    for (let i = 0; i < line.length; i++) {
      if (line[i].match(/\d/)) {
        currentNumberString += line[i];
      } else {
        if (currentNumberString.length > 0) {
          const number = parseInt(currentNumberString, 10);

          const adjacentIndexes = getAdjacentIndexes(
            i - currentNumberString.length,
            currentNumberString.length,
            lineIndex,
            line.length,
            grid.length
          );

          const shouldCount = adjacentIndexes.some(([y, x]) =>
            grid[y][x].match(/[^\d.]/)
          );

          if (shouldCount) {
            eligibleNumbers.push(number);
          }

          currentNumberString = "";
        }
      }
    }
  });

  return eligibleNumbers.reduce((sum, number) => sum + number, 0);
};

const extractNumber = (line: Array<string>, targetIndex: number): number => {
  let digits = line[targetIndex];

  for (let i = targetIndex - 1; i >= 0; i--) {
    if (line[i].match(/\d/)) {
      digits = line[i] + digits;
    } else {
      break;
    }
  }

  for (let i = targetIndex + 1; i < line.length; i++) {
    if (line[i].match(/\d/)) {
      digits += line[i];
    } else {
      break;
    }
  }

  return parseInt(digits, 10);
};

export const partTwo = (input: string): number => {
  const grid = buildGrid(input);
  const gearRatios: Array<number> = [];

  grid.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "*") {
        const adjacentIndexes = getAdjacentIndexes(
          i,
          1,
          lineIndex,
          line.length,
          grid.length
        );

        const partNumbers = [
          ...new Set(
            adjacentIndexes
              .filter(([y, x]) => grid[y][x].match(/[\d]/))
              .map(([y, x]) => extractNumber(grid[y], x))
          ),
        ];

        if (partNumbers.length === 2) {
          gearRatios.push(partNumbers[0] * partNumbers[1]);
        }
      }
    }
  });

  return gearRatios.reduce((sum, number) => sum + number, 0);
};
