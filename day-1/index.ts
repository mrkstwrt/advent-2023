const isInt = (char: string): boolean => !isNaN(parseInt(char, 10));

export const partOne = (input: string): number =>
  input
    .split("\n")
    .reduce(
      (sum, [...line]) =>
        sum + parseInt(`${line.find(isInt)}${line.findLast(isInt)}`, 10),
      0
    );

const numberMapEntries = Object.entries({
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
});

const find = (line: string, direction: "first" | "last") => {
  while (line.length) {
    for (const [word, number] of numberMapEntries) {
      if (line[direction === "first" ? "startsWith" : "endsWith"](word)) {
        return number;
      }
    }

    line = line.slice(...(direction === "first" ? [1, line.length] : [0, -1]));
  }
};

export const partTwo = (input: string): number =>
  input
    .split("\n")
    .reduce(
      (sum, line) =>
        sum + parseInt(`${find(line, "first")}${find(line, "last")}`, 10),
      0
    );
