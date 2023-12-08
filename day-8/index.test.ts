import { describe, expect, test } from "bun:test";
import { partTwo, partOne } from ".";
import { readFileSync } from "fs";
import { join } from "path";

const sampleInputOne = readFileSync(
  join(import.meta.dir, "./sample-1.txt"),
  "utf8"
).trim();

const sampleInputTwo = readFileSync(
  join(import.meta.dir, "./sample-1.txt"),
  "utf8"
).trim();

const inputOne = readFileSync(
  join(import.meta.dir, "./input-1.txt"),
  "utf8"
).trim();

describe("day 8", () => {
  describe("part 1", () => {
    test("sample input", () => {
      expect(partOne(sampleInputOne)).toEqual(6);
    });

    test("input", () => {
      expect(partOne(inputOne)).toEqual(14893);
    });
  });

  describe("part 2", () => {
    test("sample input", () => {
      expect(partTwo(sampleInputTwo)).toEqual(6);
    });

    test("input", () => {
      expect(partTwo(inputOne)).toEqual(10241191004509);
    });
  });
});
