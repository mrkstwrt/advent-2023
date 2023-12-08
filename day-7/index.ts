enum Card {
  _,
  Ace,
  King,
  Queen,
  Jack,
  Ten,
  Nine,
  Eight,
  Seven,
  Six,
  Five,
  Four,
  Three,
  Two,
}

enum HandType {
  _,
  FiveOfAKind,
  FourOfAKind,
  FullHouse,
  ThreeOfAKind,
  TwoPair,
  OnePair,
  HighCard,
}

const stringToCard: Record<string, Card> = {
  A: Card.Ace,
  K: Card.King,
  Q: Card.Queen,
  J: Card.Jack,
  T: Card.Ten,
  9: Card.Nine,
  8: Card.Eight,
  7: Card.Seven,
  6: Card.Six,
  5: Card.Five,
  4: Card.Four,
  3: Card.Three,
  2: Card.Two,
};

type Hand = {
  cards: Array<Card>;
  bid: number;
  type: HandType;
};

const getXofAKind = (
  cards: Array<Card>,
  x: number,
  jokers: boolean = false
): { used: Array<Card>; remaining: Array<Card> } | undefined => {
  let used: Array<Card> = [];
  let remaining: Array<Card> = [];

  for (let i = 0; i < cards.length; i++) {
    const otherCards = cards.filter((_, j) => j !== i);
    used = [cards[i]];
    remaining = [];

    for (let j = 0; j < otherCards.length; j++) {
      if (cards[i] === otherCards[j]) {
        used.push(otherCards[j]);
      } else {
        remaining.push(otherCards[j]);
      }
    }

    if (used.length === x) {
      return { used, remaining };
    }

    if (jokers) {
      for (let j = remaining.length - 1; j >= 0; --j) {
        if (remaining[j] === Card.Jack) {
          used.push(remaining[j]);
          remaining.splice(j, 1);
        }

        if (used.length === x) {
          return { used, remaining };
        }
      }
    }
  }

  return undefined;
};

const isFullHouse = (cards: Array<Card>, jokers: boolean = false): boolean => {
  const threeOfAKind = getXofAKind(cards, 3, jokers);

  if (!threeOfAKind) return false;

  return Boolean(
    threeOfAKind && getXofAKind(threeOfAKind.remaining, 2, jokers)
  );
};

const isTwoPair = (cards: Array<Card>, jokers: boolean = false): boolean => {
  const pair = getXofAKind(cards, 2, jokers);

  if (!pair) return false;

  return Boolean(pair && getXofAKind(pair.remaining, 2, jokers));
};

const getHandType = (cards: Array<Card>, jokers: boolean = false): HandType => {
  if (Boolean(getXofAKind(cards, 5, jokers))) return HandType.FiveOfAKind;
  if (Boolean(getXofAKind(cards, 4, jokers))) return HandType.FourOfAKind;
  if (isFullHouse(cards, jokers)) return HandType.FullHouse;
  if (Boolean(getXofAKind(cards, 3, jokers))) return HandType.ThreeOfAKind;
  if (isTwoPair(cards, jokers)) return HandType.TwoPair;
  if (Boolean(getXofAKind(cards, 2, jokers))) return HandType.OnePair;

  return HandType.HighCard;
};

const parseInput = (input: string, jokers: boolean = false): Array<Hand> =>
  input.split("\n").map((line) => {
    const [cardsString, bidString] = line.split(" ");
    const cards = cardsString.split("").map((card) => stringToCard[card]);

    return { cards, bid: Number(bidString), type: getHandType(cards, jokers) };
  });

const sortHands =
  (jokers: boolean = false) =>
  (handA: Hand, handB: Hand): number => {
    if (handA.type === handB.type) {
      for (let i = 0; i < handA.cards.length; i++) {
        if (handA.cards[i] === handB.cards[i]) continue;

        if (jokers) {
          if (handA.cards[i] === Card.Jack) return -1;
          if (handB.cards[i] === Card.Jack) return 1;
        }

        if (handA.cards[i] < handB.cards[i]) return 1;
        if (handA.cards[i] > handB.cards[i]) return -1;
      }

      return 0;
    }

    if (handA.type < handB.type) return 1;
    if (handA.type > handB.type) return -1;

    return 0;
  };

const calculateWinnings = (hands: Array<Hand>): number =>
  hands.reduceRight((total, hand, i) => total + hand.bid * (i + 1), 0);

export const partOne = (input: string): number => {
  const hands = parseInput(input);

  const sortedHands = hands.sort(sortHands(false));

  return calculateWinnings(sortedHands);
};

export const partTwo = (input: string): number => {
  const hands = parseInput(input, true);

  const sortedHands = hands.sort(sortHands(true));

  return calculateWinnings(sortedHands);
};
