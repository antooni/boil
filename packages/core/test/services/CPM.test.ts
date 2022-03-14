import { CPM } from "../../src";

import { expect } from "earljs";
import { Input } from "../../src/model/Input";

const cpm = new CPM();
const ACTIVITIES: Input[] = [
  {
    activity: "A",
    previous: [],
    duration: 3,
  },
  {
    activity: "B",
    previous: [],
    duration: 4,
  },
  {
    activity: "C",
    previous: [],
    duration: 6,
  },
  {
    activity: "D",
    previous: ["B"],
    duration: 3,
  },
  {
    activity: "E",
    previous: ["A"],
    duration: 9,
  },
  {
    activity: "F",
    previous: ["A"],
    duration: 1,
  },
  {
    activity: "G",
    previous: ["B"],
    duration: 4,
  },
  {
    activity: "H",
    previous: ["C", "D"],
    duration: 5,
  },
];

describe(CPM.prototype.nextNodes.name, () => {
  it("1 has 2,3,4", () => {
    expect(cpm.nextNodes(1, ACTIVITIES.slice(0, 3))).toEqual([
      { num: 2, next: [] },
      { num: 3, next: [] },
      { num: 4, next: [] },
    ]);
  });
});

describe(CPM.prototype.buildGraph.name, () => {
  it("ABC", () => {
    expect(cpm.buildGraph(ACTIVITIES.slice(0, 3))).toEqual(
      new Map([
        ["A", {from: 1, to: 2}],
        ["B", {from: 1, to: 3}],
        ["C", {from: 1, to: 4}],
      ])
    );
  });

  it("ABCD", () => {
    expect(cpm.buildGraph(ACTIVITIES)).toEqual(
      new Map([
        ["A", {from: 1, to: 2}],
        ["B", {from: 1, to: 3}],
        ["C", {from: 1, to: 4}],
        ["D", {from: 3, to: 4}],
        // ["E", {from: 2, to: 5}],
        // ["F", {from: 2, to: 6}],
        // ["G", {from: 3, to: 6}],
        // ["H", {from: 4, to: 6}],
      ])
    );
  });

  
});
