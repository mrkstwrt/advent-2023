const maxColours = {
  red: 12,
  green: 13,
  blue: 14,
};

export const partOne = (input: string): number =>
  input.split("\n").reduce((sum, line) => {
    const [game, subsets] = line.split(":");
    const gameNumber = parseInt(game.replace("Game ", ""), 10);

    return (
      sum +
      (subsets.split("; ").every((subset) =>
        subset.split(", ").every((group) => {
          const [amount, colour] = group.trim().split(" ");

          return (
            parseInt(amount, 10) <=
            maxColours[colour as keyof typeof maxColours]
          );
        })
      )
        ? gameNumber
        : 0)
    );
  }, 0);

export const partTwo = (input: string): number =>
  input.split("\n").reduce((sum, line) => {
    const [, subsets] = line.split(":");

    const highestColours = { red: 0, green: 0, blue: 0 };

    subsets.split("; ").forEach((subset) => {
      subset.split(", ").forEach((group) => {
        const [amount, colour] = group.trim().split(" ");

        highestColours[colour as keyof typeof highestColours] = Math.max(
          highestColours[colour as keyof typeof highestColours],
          parseInt(amount, 10)
        );
      });
    });

    return (
      sum + highestColours.red * highestColours.green * highestColours.blue
    );
  }, 0);
