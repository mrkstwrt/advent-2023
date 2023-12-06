import { describe, expect, test } from "bun:test";
import { partOne } from ".";
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

describe("day 5", () => {
  describe("part 1", () => {
    test("sample input", () => {
      expect(partOne(sampleInput)).toEqual(35);
    });

    test("input", () => {
      expect(partOne(inputOne)).toEqual(662197086);
    });
  });
});
