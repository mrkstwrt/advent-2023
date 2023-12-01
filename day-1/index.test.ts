import { describe, expect, test } from "bun:test";
import { partTwo, partOne } from ".";
import { readFileSync } from "fs";

const sampleInputOne = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim();

const sampleInputTwo = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim();

const inputOne = readFileSync("./day-1/input-1.txt", "utf8").trim();

describe("day 1", () => {
  describe("part 1", () => {
    test("sample input", () => {
      expect(partOne(sampleInputOne)).toEqual(142);
    });

    test("input", () => {
      expect(partOne(inputOne)).toEqual(55017);
    });
  });

  describe("part 2", () => {
    test("sample input", () => {
      expect(partTwo(sampleInputTwo)).toEqual(281);
    });

    test("input", () => {
      expect(partTwo(inputOne)).toEqual(281);
    });
  });
});
