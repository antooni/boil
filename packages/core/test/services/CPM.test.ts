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
  ["A", { from: 1, to: 2 }],
  ["B", { from: 1, to: 3 }],
  ["C", { from: 1, to: 4 }],
  ["D", { from: 3, to: 4 }],
  ["E", { from: 2, to: 5 }],
  ["F", { from: 2, to: 6 }],
  ["G", { from: 3, to: 6 }],
  ["H", { from: 4, to: 6 }],
  ["I", { from: 4, to: 7 }],
  ["J", { from: 5, to: 8 }],
  ["K", { from: 6, to: 8 }],
  ["L", { from: 6, to: 9 }],
  ["M", { from: 7, to: 9 }],
  ["N", { from: 8, to: 9 }],
]);

describe(CPM.prototype.buildGraph.name, () => {
  it("ABC", () => {
    expect(cpm.buildGraph(ACTIVITIES.slice(0, 3), 9)).toEqual(
      new Map([
        ["A", { from: 1, to: 2 }],
        ["B", { from: 1, to: 3 }],
        ["C", { from: 1, to: 4 }],
      ])
    );
  });

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
