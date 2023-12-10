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

export const partOne = (input: string): number => {
  const { startCoords, map } = parseInput(input);

  let [nextPipe] = findAdjacentPipes(map, startCoords);
  let previousPipe = startCoords;
  let steps = 1;

  while (map[nextPipe[1]][nextPipe[0]] !== Pipe.Start) {
    const adjacentPipes = findAdjacentPipes(map, nextPipe, [previousPipe]);

    if (adjacentPipes.length > 1) {
      throw new Error("Unexpected number of adjacent pipes");
    }

    previousPipe = nextPipe;
    nextPipe = adjacentPipes[0];

    steps++;
  }

  return steps / 2;
};

export const partTwo = (input: string): number => {
  return 0;
};
