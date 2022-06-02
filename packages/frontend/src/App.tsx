import { createSignal } from "solid-js";
import { InputComponent } from "./components/project-2/Input";
import { OutputComponent } from "./components/project-2/Output";

// PROJECT 1
// import { CPM } from "../../core/src/services/CPM";
// import { InputComponent } from "./components/project-1/Input";
// import { OutputComponent } from "./components/project-1/Output";



function App() {
  const [input, setInput] = createSignal([
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
  ]);
  const [output, setOutput] = createSignal([]);

  const calculateOutput = () => {
    const cpm = new CPM();

    const result = cpm.solve(input());

    setOutput(result);
  };

  // PROJECT 1
  // return (
  //   <>
  // <div class="p-4 align-middle text-center ">
  //   <button class="rounded-full bg-sky-500/75 p-2" onClick={calculateOutput}>OBLICZ</button>
  // </div>
  // <div class="p-8 flex flex-row">
  //   <InputComponent  setActivities={setInput} activities={input}></InputComponent>
  //   <OutputComponent output={output()}></OutputComponent>

  // </div>
  //   </>
  // );

  return (
    <>
      <div class="p-4 align-middle text-center ">
        <button
          class="rounded-full bg-sky-500/75 p-2"
          onClick={calculateOutput}
        >
          OBLICZ
        </button>
      </div>
      <div class="p-8 flex flex-row">
        <InputComponent
          setActivities={setInput}
          activities={input}
        ></InputComponent>
        <OutputComponent output={output()}></OutputComponent>
      </div>
    </>
  );
}
export default App;
