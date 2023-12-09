import { describe, expect, test } from "bun:test";
import { partTwo, partOne } from ".";
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

describe("day 9", () => {
  describe("part 1", () => {
    test("sample input", () => {
      expect(partOne(sampleInput)).toEqual(114);
    });

    test("input", () => {
      expect(partOne(inputOne)).toEqual(1992273652);
    });
  });

  describe("part 2", () => {
    test("sample input", () => {
      expect(partTwo(sampleInput)).toEqual(2);
    });

    test("input", () => {
      expect(partTwo(inputOne)).toEqual(1012);
    });
  });
});
