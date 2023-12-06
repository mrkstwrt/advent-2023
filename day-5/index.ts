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

const parseSeeds = (input: string): Array<number> =>
  input.split("\n")[0].replace("seeds: ", "").split(" ").map(Number);

type GardnerMap = Array<{
  start: number;
  end: number;
  difference: number;
}>;

const parseMaps = (input: string): Array<GardnerMap> =>
  input
    .slice(2)
    .split("\n\n")
    .map((map) => {
      return map
        .split("\n")
        .slice(1)
        .map((row) => row.split(" ").map(Number))
        .map(([destinationStart, sourceStart, rangeLength]) => {
          return {
            start: sourceStart,
            end: sourceStart + rangeLength,
            difference: destinationStart - sourceStart,
          };
        });
    });

export const partOne = (input: string): number => {
  const seeds = parseSeeds(input);
  const maps = parseMaps(input);

  return seeds
    .map((seed) =>
      maps.reduce((previous, mapSet) => {
        const { difference } = mapSet.find(
          ({ start, end }) => previous >= start && previous <= end
        ) ?? { difference: 0 };

        return previous + difference;
      }, seed)
    )
    .reduce((lowest, number) => (number < lowest ? number : lowest), Infinity);
};
