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
  {
    activity: "I",
    previous: ["C", "D"],
    duration: 4,
  },
  {
    activity: "J",
    previous: ["E"],
    duration: 3,
  },
  {
    activity: "K",
    previous: ["F", "G", "H"],
    duration: 6,
  },
  {
    activity: "L",
    previous: ["F", "G", "H"],
    duration: 3,
  },
  {
    activity: "M",
    previous: ["I"],
    duration: 6,
  },
  {
    activity: "N",
    previous: ["J", "K"],
    duration: 9,
  },
];

const GRAPH = new Map([
  ["A", { from: 1, to: 2, duration: 3 }],
  ["B", { from: 1, to: 3, duration: 4 }],
  ["C", { from: 1, to: 4, duration: 6 }],
  ["D", { from: 3, to: 4 , duration:3}],
  ["E", { from: 2, to: 5, duration:9 }],
  ["F", { from: 2, to: 6 , duration: 1}],
  ["G", { from: 3, to: 6, duration:4 }],
  ["H", { from: 4, to: 6 , duration:5}],
  ["I", { from: 4, to: 7 , duration:4}],
  ["J", { from: 5, to: 8 , duration:3}],
  ["K", { from: 6, to: 8 , duration:6}],
  ["L", { from: 6, to: 9 , duration:3}],
  ["M", { from: 7, to: 9 , duration:6}],
  ["N", { from: 8, to: 9 , duration:9}],
]);

describe(CPM.prototype.convertToNodes.name, () => {
  it("works", () => {
    const result = cpm.convertToNodes(GRAPH);

    expect(result).toEqual([
      {
        num: 1,
        previous: [],
        next: [{num:2, activity:'A', duration: 3}, {num:3, activity:'B', duration: 4}, {num:4, activity:'C', duration: 6}],
      },
      {
        num: 2,
        previous: [{num:1, activity:'A', duration: 3}],
        next: [{num:5, activity:'E', duration: 9},{num:6, activity:'F', duration: 1}],
      },
      {
        num: 3,
        previous: [{num:1, activity:'B', duration: 4}],
        next: [{num:4, activity:'D', duration: 3}, {num:6, activity:'G', duration: 4}],
      },
      {
        num: 4,
        previous: [{num:1, activity:'C', duration: 6}, {num:3, activity:'D', duration: 3}],
        next: [{num:6, activity:'H', duration: 5}, {num:7, activity:'I', duration: 4}],
      },
      {
        num: 5,
        previous: [{num:2, activity:'E', duration: 9}],
        next: [{num:8, activity:'J', duration: 3}],
      },
      {
        num: 6,
        previous: [{num:2, activity:'F', duration: 1}, {num:3, activity:'G', duration: 4}, {num:4, activity:'H', duration: 5}],
        next: [{num:8, activity:'K', duration: 6}, {num:9, activity:'L', duration: 3}],
      },
      {
        num: 7,
        previous: [{num:4, activity:'I', duration: 4}],
        next: [{num:9, activity:'M', duration: 6}],
      },
      {
        num: 8,
        previous: [{num:5, activity:'J', duration: 3},{num:6, activity:'K', duration: 6}],
        next: [{num:9, activity:'N', duration: 9}],
      },
      {
        num: 9,
        previous: [{num:6, activity:'L', duration: 3}, {num:7, activity:'M', duration: 6}, {num:8, activity:'N', duration: 9}],
        next: [],
      },
    ]);
  });
});

describe(CPM.prototype.buildGraph.name, () => {
  it("ABCD", () => {
    expect(cpm.buildGraph(ACTIVITIES, 9)).toEqual(GRAPH);
  });
});

describe(CPM.prototype.findFrom.name, () => {
  it("A", () => {
    expect(cpm.findFrom(ACTIVITIES[0], GRAPH)).toEqual(1);
  });

  it("D", () => {
    expect(cpm.findFrom(ACTIVITIES[3], GRAPH)).toEqual(3);
  });

  it("H", () => {
    expect(cpm.findFrom(ACTIVITIES[7], GRAPH)).toEqual(4);
  });
});

describe(CPM.prototype.findTo.name, () => {
  it("A", () => {
    expect(cpm.findTo(ACTIVITIES[0], ACTIVITIES, GRAPH, 1, 9)).toEqual(2);
  });

  it("E", () => {
    expect(cpm.findTo(ACTIVITIES[4], ACTIVITIES, GRAPH, 4, 9)).toEqual(5);
  });

  it("D", () => {
    expect(cpm.findTo(ACTIVITIES[3], ACTIVITIES, GRAPH, 4, 9)).toEqual(4);
  });

  it("M", () => {
    expect(cpm.findTo(ACTIVITIES[12], ACTIVITIES, GRAPH, 9, 9)).toEqual(9);
  });
});
