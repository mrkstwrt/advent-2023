import lcm from "lcm";

type Node = {
  name: string;
  left: string;
  right: string;
};

type Direction = "left" | "right";

const parseNodes = (input: string): Array<Node> =>
  input.split("\n").map((line) => {
    const [name, directions] = line.split(" = ");
    const [left, right] = directions.split(", ");

    return {
      name: name.trim(),
      left: left.replace("(", "").trim(),
      right: right.replace(")", "").trim(),
    };
  });

const parseInput = (input: string): [Array<Direction>, Array<Node>] => {
  const [directions, nodes] = input.split("\n\n");

  return [
    directions.split("").map((dir) => (dir === "L" ? "left" : "right")),
    parseNodes(nodes),
  ];
};

const getNode = (name: string, nodes: Array<Node>): Node => {
  const node = nodes.find((node) => node.name === name);

  if (!node) throw new Error("No node");

  return node;
};

const infiniteDirections = (directions: Array<Direction>) => {
  let index = -1;

  return () => {
    if (index === directions.length - 1) {
      index = 0;
    } else {
      ++index;
    }

    return directions[index];
  };
};

const countSteps = (
  directions: Array<Direction>,
  nodes: Array<Node>
): number => {
  const getDirection = infiniteDirections(directions);
  let currentNode = getNode("AAA", nodes);
  let steps = 0;

  while (currentNode.name !== "ZZZ") {
    const direction = getDirection();

    const nextNode = getNode(currentNode[direction], nodes);

    if (!nextNode) throw new Error("No next node");

    currentNode = nextNode;
    steps += 1;
  }

  return steps;
};

const countEndsWithSteps = (
  directions: Array<Direction>,
  startNode: Node,
  nodes: Array<Node>
): number => {
  const getDirection = infiniteDirections(directions);
  let currentNode = startNode;
  let steps = 0;

  while (!currentNode.name.endsWith("Z")) {
    const direction = getDirection();

    const nextNode = getNode(currentNode[direction], nodes);

    if (!nextNode) throw new Error("No next node");

    currentNode = nextNode;
    steps += 1;
  }

  return steps;
};

export const partOne = (input: string): number => {
  const [directions, nodes] = parseInput(input);

  return countSteps(directions, nodes);
};

export const partTwo = (input: string): number => {
  const [directions, nodes] = parseInput(input);

  const totals = nodes
    .filter((node) => node.name.endsWith("A"))
    .map((node) => countEndsWithSteps(directions, node, nodes));

  return totals.reduce((a: number, b) => lcm(a, b), totals.shift() as number);
};
