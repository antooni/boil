import { Graph } from "./components/Table";

import {CPM} from "../../core/src/services/CPM"
import { Input } from "./components/Input";

function App() {

  const cpm = new CPM()

  const ACTIVITIES = [
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

  return (
      <>
      <div class="p-4 align-middle text-center ">
        <button class="rounded-full bg-sky-500/75 p-2">OBLICZ</button>
      </div>
      <div class="p-8 columns-2">
        <Input></Input>
        <Graph operations={cpm.buildGraph(ACTIVITIES, 9)}></Graph>
      </div>
      </>
  );
}
export default App;