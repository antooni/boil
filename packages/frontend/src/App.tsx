import { OutputComponent } from "./components/Output";

import { CPM } from "../../core/src/services/CPM";
import { InputComponent } from "./components/Input";
import { createSignal } from "solid-js";

function App() {
  const [input, setInput] = createSignal([]);
  const [output, setOutput] = createSignal([])

  const calculateOutput = () => {
    const cpm = new CPM()
    
    const output = cpm.solve(input())

    setOutput(output)
  }

  return (
    <>
      <div class="p-4 align-middle text-center ">
        <button class="rounded-full bg-sky-500/75 p-2" onClick={calculateOutput}>OBLICZ</button>
      </div>
      <div class="p-8 flex flex-row">
        <InputComponent  setActivities={setInput} activities={input}></InputComponent>
        <OutputComponent output={output()}></OutputComponent>
       
      </div>
    </>
  );
}
export default App;
