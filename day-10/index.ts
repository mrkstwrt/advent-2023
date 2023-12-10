enum Pipe {
  _,
  NS = "NS",
  EW = "EW",
  NE = "NE",
  NW = "NW",
  SW = "SW",
  SE = "SE",
  Start = "Start",
}

type Coordinates = [number, number];

type PipeMap = Array<Array<Pipe>>;

const pipeChars = {
  "|": Pipe.NS,
  "-": Pipe.EW,
  L: Pipe.NE,
  J: Pipe.NW,
  "7": Pipe.SW,
  F: Pipe.SE,
  ".": Pipe._,
  S: Pipe.Start,
};

const northConnections = [Pipe.NS, Pipe.SE, Pipe.SW, Pipe.Start];
const southConnections = [Pipe.NS, Pipe.NE, Pipe.NW, Pipe.Start];
const eastConnections = [Pipe.EW, Pipe.NW, Pipe.SW, Pipe.Start];
const westConnections = [Pipe.EW, Pipe.NE, Pipe.SE, Pipe.Start];

const parseInput = (
  input: string
): { map: PipeMap; startCoords: Coordinates } => {
  let startCoords: Coordinates = [0, 0];
  const map: PipeMap = input.split(`\n`).map((line, y) =>
    line.split("").map((char, x) => {
      if (char === "S") {
        startCoords = [x, y];
      }

      return pipeChars[char as keyof typeof pipeChars];
    })
  );

  return {
    map: map,
    startCoords,
  };
};

const findAdjacentPipes = (
  map: PipeMap,
  [x, y]: Coordinates,
  ignore?: Array<Coordinates>
): Array<Coordinates> => {
  const coords: Array<Coordinates> = [];

  if (
    y !== 0 &&
    southConnections.includes(map[y][x]) &&
    northConnections.includes(map[y - 1][x])
  ) {
    coords.push([x, y - 1]);
  }

  if (
    y !== map.length - 1 &&
    northConnections.includes(map[y][x]) &&
    southConnections.includes(map[y + 1][x])
  ) {
    coords.push([x, y + 1]);
  }

  if (
    x !== map[0].length - 1 &&
    westConnections.includes(map[y][x]) &&
    eastConnections.includes(map[y][x + 1])
  ) {
    coords.push([x + 1, y]);
  }

  if (
    x !== 0 &&
    eastConnections.includes(map[y][x]) &&
    westConnections.includes(map[y][x - 1])
  ) {
    coords.push([x - 1, y]);
  }

  return Array.isArray(ignore) && ignore.length > 0
    ? coords.filter((c) => !ignore.some((i) => i[0] === c[0] && i[1] === c[1]))
    : coords;
};

export const findPath = (
  map: PipeMap,
  startCoords: Coordinates
): Array<Coordinates> => {
  const path: Array<Coordinates> = [startCoords];

  let [nextPipe] = findAdjacentPipes(map, startCoords);
  let previousPipe = startCoords;

  while (map[nextPipe[1]][nextPipe[0]] !== Pipe.Start) {
    path.push(nextPipe);

    const adjacentPipes = findAdjacentPipes(map, nextPipe, [previousPipe]);

    if (adjacentPipes.length > 1) {
      throw new Error("Unexpected number of adjacent pipes");
    }

    previousPipe = nextPipe;
    nextPipe = adjacentPipes[0];
  }

  return path;
};

const normaliseMap = (
  map: PipeMap,
  path: Array<Coordinates>
): Array<Array<0 | 1 | 2>> => // 0 = empty, 1 = path, 2 = path switching to north
  map.map((row, y) =>
    row.map((pipe, x) =>
      path.find((p) => p[0] === x && p[1] === y)
        ? southConnections.includes(pipe)
          ? 2
          : 1
        : 0
    )
  );

export const partOne = (input: string): number => {
  const { startCoords, map } = parseInput(input);

  return findPath(map, startCoords).length / 2;
};

export const partTwo = (input: string): number => {
  const { startCoords, map } = parseInput(input);

  const path = findPath(map, startCoords);

  const normalisedMap = normaliseMap(map, path);

  let count = 0;

  for (let y = 0; y < normalisedMap.length; ++y) {
    for (let x = 0; x < normalisedMap[y].length; ++x) {
      if (normalisedMap[y][x] === 0) {
        // If we cross an odd number of "sides", the point is insdie the path
        if (
          normalisedMap[y].slice(0, x).filter((p) => p === 2).length % 2 !==
          0
        ) {
          count++;
        }
      }
    }
  }

  return count;
};
