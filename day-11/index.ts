enum Location {
  "Space",
  "Galaxy",
}

type Universe = Array<Array<Location>>;

type Point = [number, number];

const parseInput = (input: string): Universe =>
  input
    .split(`\n`)
    .map((line) =>
      line
        .split("")
        .map((char) => (char === "." ? Location.Space : Location.Galaxy))
    );

const rowHasGalaxy = (universe: Universe, row: number): boolean =>
  universe[row].some((location) => location === Location.Galaxy);

const columnHasGalaxy = (universe: Universe, column: number): boolean =>
  universe.some((row) => row[column] === Location.Galaxy);

const getGalaxyLocations = (universe: Universe): Array<Point> => {
  const locations: Array<Point> = [];

  for (let y = 0; y < universe.length; ++y) {
    for (let x = 0; x < universe[y].length; ++x) {
      if (universe[y][x] === Location.Galaxy) {
        locations.push([x, y]);
      }
    }
  }

  return locations;
};

const expandGalaxies = (
  universe: Universe,
  galaxies: Array<Point>,
  factor: number
): Array<Point> => {
  for (let y = universe.length - 1; y >= 0; --y) {
    if (!rowHasGalaxy(universe, y)) {
      for (const galaxy of galaxies) {
        if (galaxy[1] > y) {
          galaxy[1] += factor - 1;
        }
      }
    }
  }

  for (let x = universe[0].length - 1; x >= 0; --x) {
    if (!columnHasGalaxy(universe, x)) {
      for (const galaxy of galaxies) {
        if (galaxy[0] > x) {
          galaxy[0] += factor - 1;
        }
      }
    }
  }

  return galaxies;
};

const sumGalaxyDistances = (galaxies: Array<Point>): number => {
  let total = 0;

  for (let i = 0; i < galaxies.length; ++i) {
    for (let j = i + 1; j < galaxies.length; ++j) {
      total += getDistance(galaxies[i], galaxies[j]);
    }
  }

  return total;
};

const getDistance = (pointA: Point, pointB: Point): number =>
  Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);

export const partOne = (input: string): number => {
  const universe = parseInput(input);

  const galaxyLocations = getGalaxyLocations(universe);

  const expandedGalaxies = expandGalaxies(universe, galaxyLocations, 2);

  return sumGalaxyDistances(expandedGalaxies);
};

export const partTwo = (input: string): number => {
  const universe = parseInput(input);

  const galaxyLocations = getGalaxyLocations(universe);

  const expandedGalaxies = expandGalaxies(universe, galaxyLocations, 1000000);

  return sumGalaxyDistances(expandedGalaxies);
};
