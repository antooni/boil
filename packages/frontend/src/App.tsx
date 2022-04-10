import { Graph } from "./components/Table";

import { CPM } from "../../core/src/services/CPM";
import { Input } from "./components/Input";
import { createSignal } from "solid-js";

export type Activity = {
  activity: string;
  previous: string[];
  duration: number;
};

function App() {
  const [input, setInput] = createSignal([]);
  const [output, setOutput] = createSignal({})

  const calculateOutput = () => {
    const cpm = new CPM()
    
    const output = cpm.buildGraph(input(),9)

    setOutput(output)
  }

  return (
    <>
      <div class="p-4 align-middle text-center ">
        <button class="rounded-full bg-sky-500/75 p-2">OBLICZ</button>
      </div>
      <div class="p-8 columns-2">
        <Input setActivities={setInput} activities={input()}></Input>
        <Graph output={output()}></Graph>
      </div>
    </>
  );
}
export default App;
