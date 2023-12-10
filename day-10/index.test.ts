import { describe, expect, test } from "bun:test";
import { partTwo, partOne } from ".";
import { readFileSync } from "fs";
import { join } from "path";

const sampleInputOne = readFileSync(
  join(import.meta.dir, "./sample-1.txt"),
  "utf8"
).trim();

const sampleInputTwo = readFileSync(
  join(import.meta.dir, "./sample-2.txt"),
  "utf8"
).trim();

const inputOne = readFileSync(
  join(import.meta.dir, "./input-1.txt"),
  "utf8"
).trim();

describe("day 10", () => {
  describe("part 1", () => {
    test("sample input 1", () => {
      expect(partOne(sampleInputOne)).toEqual(4);
    });

    test("sample input 2", () => {
      expect(partOne(sampleInputTwo)).toEqual(8);
    });

    test("input", () => {
      expect(partOne(inputOne)).toEqual(6927);
    });
  });

  // describe("part 2", () => {
  //   test("sample input", () => {
  //     expect(partTwo(sampleInput)).toEqual(2);
  //   });

  //   test("input", () => {
  //     expect(partTwo(inputOne)).toEqual(1012);
  //   });
  // });
});
