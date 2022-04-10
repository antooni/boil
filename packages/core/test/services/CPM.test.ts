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

const INPUT: Input[] = [
  {
    activity: "A",
    previous: [],
    duration: 5,
  },
  {
    activity: "B",
    previous: [],
    duration: 7,
  },
  {
    activity: "C",
    previous: ["A"],
    duration: 6,
  },
  {
    activity: "D",
    previous: ["A"],
    duration: 8,
  },
  {
    activity: "E",
    previous: ["B"],
    duration: 3,
  },
  {
    activity: "F",
    previous: ["C"],
    duration: 4,
  },
  {
    activity: "G",
    previous: ["C"],
    duration: 2,
  },
  {
    activity: "H",
    previous: ["D", "E", "F"],
    duration: 5,
  },
];

const GRAPH = new Map([
  ["A", { from: 1, to: 2, duration: 3 }],
  ["B", { from: 1, to: 3, duration: 4 }],
  ["C", { from: 1, to: 4, duration: 6 }],
  ["D", { from: 3, to: 4, duration: 3 }],
  ["E", { from: 2, to: 5, duration: 9 }],
  ["F", { from: 2, to: 6, duration: 1 }],
  ["G", { from: 3, to: 6, duration: 4 }],
  ["H", { from: 4, to: 6, duration: 5 }],
  ["I", { from: 4, to: 7, duration: 4 }],
  ["J", { from: 5, to: 8, duration: 3 }],
  ["K", { from: 6, to: 8, duration: 6 }],
  ["L", { from: 6, to: 9, duration: 3 }],
  ["M", { from: 7, to: 9, duration: 6 }],
  ["N", { from: 8, to: 9, duration: 9 }],
]);

const GRAPH2 = new Map([
  ["A", { from: 1, to: 2, duration: 5 }],
  ["B", { from: 1, to: 3, duration: 7 }],
  ["C", { from: 2, to: 4, duration: 6 }],
  ["D", { from: 2, to: 5, duration: 8 }],
  ["E", { from: 3, to: 5, duration: 3 }],
  ["F", { from: 4, to: 5, duration: 4 }],
  ["G", { from: 4, to: 6, duration: 2 }],
  ["H", { from: 5, to: 6, duration: 5 }],
]);

describe(CPM.prototype.solve.name, () => {
  it("works", () => {
    const result = cpm.solve(INPUT);

    expect(result).toEqual([
      {
        activity: "A",
        duration: 5,
        ES: 0,
        EF: 5,
        LS: 0,
        LF: 5,
        reserve: 0,
        isCritical: true,
      },
      {
        activity: "B",
        duration: 7,
        ES: 0,
        EF: 7,
        LS: 5,
        LF: 12,
        reserve: 5,
        isCritical: false,
      },
      {
        activity: "C",
        duration: 6,
        ES: 5,
        EF: 11,
        LS: 5,
        LF: 11,
        reserve: 0,
        isCritical: true,
      },
      {
        activity: "D",
        duration: 8,
        ES: 5,
        EF: 13,
        LS: 7,
        LF: 15,
        reserve: 2,
        isCritical: false,
      },
      {
        activity: "E",
        duration: 3,
        ES: 7,
        EF: 10,
        LS: 12,
        LF: 15,
        reserve: 5,
        isCritical: false,
      },
      {
        activity: "F",
        duration: 4,
        ES: 11,
        EF: 15,
        LS: 11,
        LF: 15,
        reserve: 0,
        isCritical: true,
      },
      {
        activity: "G",
        duration: 2,
        ES: 11,
        EF: 13,
        LS: 18,
        LF: 20,
        reserve: 7,
        isCritical: false,
      },
      {
        activity: "H",
        duration: 5,
        ES: 15,
        EF: 20,
        LS: 15,
        LF: 20,
        reserve: 0,
        isCritical: true,
      },
    ]);
  });
});

describe(CPM.prototype.convertToNodes.name, () => {
  it("works", () => {
    const result = cpm.convertToNodes(GRAPH);

    expect(result).toEqual([
      {
        num: 1,
        previous: [],
        next: [
          { num: 2, activity: "A", duration: 3 },
          { num: 3, activity: "B", duration: 4 },
          { num: 4, activity: "C", duration: 6 },
        ],
      },
      {
        num: 2,
        previous: [{ num: 1, activity: "A", duration: 3 }],
        next: [
          { num: 5, activity: "E", duration: 9 },
          { num: 6, activity: "F", duration: 1 },
        ],
      },
      {
        num: 3,
        previous: [{ num: 1, activity: "B", duration: 4 }],
        next: [
          { num: 4, activity: "D", duration: 3 },
          { num: 6, activity: "G", duration: 4 },
        ],
      },
      {
        num: 4,
        previous: [
          { num: 1, activity: "C", duration: 6 },
          { num: 3, activity: "D", duration: 3 },
        ],
        next: [
          { num: 6, activity: "H", duration: 5 },
          { num: 7, activity: "I", duration: 4 },
        ],
      },
      {
        num: 5,
        previous: [{ num: 2, activity: "E", duration: 9 }],
        next: [{ num: 8, activity: "J", duration: 3 }],
      },
      {
        num: 6,
        previous: [
          { num: 2, activity: "F", duration: 1 },
          { num: 3, activity: "G", duration: 4 },
          { num: 4, activity: "H", duration: 5 },
        ],
        next: [
          { num: 8, activity: "K", duration: 6 },
          { num: 9, activity: "L", duration: 3 },
        ],
      },
      {
        num: 7,
        previous: [{ num: 4, activity: "I", duration: 4 }],
        next: [{ num: 9, activity: "M", duration: 6 }],
      },
      {
        num: 8,
        previous: [
          { num: 5, activity: "J", duration: 3 },
          { num: 6, activity: "K", duration: 6 },
        ],
        next: [{ num: 9, activity: "N", duration: 9 }],
      },
      {
        num: 9,
        previous: [
          { num: 6, activity: "L", duration: 3 },
          { num: 7, activity: "M", duration: 6 },
          { num: 8, activity: "N", duration: 9 },
        ],
        next: [],
      },
    ]);
  });
});

describe(CPM.prototype.buildGraph.name, () => {
  it("internet", () => {
    expect(cpm.buildGraph(ACTIVITIES)).toEqual(GRAPH);
  });

  it("book", () => {
    expect(cpm.buildGraph(INPUT)).toEqual(GRAPH2);
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
    const graph = new Map();
    expect(cpm.findTo(ACTIVITIES[0], ACTIVITIES, graph, 1)).toEqual(2);
  });

  it("D", () => {
    const graph = new Map([
      ["A", { from: 1, to: 2, duration: 3 }],
      ["B", { from: 1, to: 3, duration: 4 }],
      ["C", { from: 1, to: 4, duration: 6 }],
    ]);
    expect(cpm.findTo(ACTIVITIES[3], ACTIVITIES, graph, 3)).toEqual(4);
  });

  it("E", () => {
    const graph = new Map([
      ["A", { from: 1, to: 2, duration: 3 }],
      ["B", { from: 1, to: 3, duration: 4 }],
      ["C", { from: 1, to: 4, duration: 6 }],
      ["D", { from: 3, to: 4, duration: 3 }],
    ]);
    expect(cpm.findTo(ACTIVITIES[4], ACTIVITIES, graph, 4)).toEqual(5);
  });

  it("M", () => {
    const graph = new Map([
      ["A", { from: 1, to: 2, duration: 3 }],
      ["B", { from: 1, to: 3, duration: 4 }],
      ["C", { from: 1, to: 4, duration: 6 }],
      ["D", { from: 3, to: 4, duration: 3 }],
      ["E", { from: 2, to: 5, duration: 9 }],
      ["F", { from: 2, to: 6, duration: 1 }],
      ["G", { from: 3, to: 6, duration: 4 }],
      ["H", { from: 4, to: 6, duration: 5 }],
      ["I", { from: 4, to: 7, duration: 4 }],
      ["J", { from: 5, to: 8, duration: 3 }],
      ["K", { from: 6, to: 8, duration: 6 }],
      ["L", { from: 6, to: 9, duration: 3 }],
    ]);
    expect(cpm.findTo(ACTIVITIES[12], ACTIVITIES, graph, 9)).toEqual(9);
  });
});
