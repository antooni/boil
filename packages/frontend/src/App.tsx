import { createSignal } from "solid-js";
import { InputComponent } from "./components/project-2/Input";
import { OutputComponent } from "./components/project-2/Output";

import {calculateResult} from "../../core/src/services/Intermediary"
import {Transport} from "../../core/src/model/Transportation";

// PROJECT 1
// import { CPM } from "../../core/src/services/CPM";
// import { InputComponent } from "./components/project-1/Input";
// import { OutputComponent } from "./components/project-1/Output";

function App() {

  const [clients, setClients] = createSignal([
    {
      index: 0,
      demand: 10,
      price: 30,
    },
    {
      index: 1,
      demand: 28,
      price: 25,
    },
    {
      index: 2,
      demand: 27,
      price: 30,
    },
  ]);

  const [suppliers, setSuppliers] = createSignal([
    {
      index: 0,
      supply: 20,
      cost: 10,
    },
    {
      index: 1,
      supply: 30,
      cost: 12,
    },
  ]);

  const [routes, setRoutes] = createSignal([
    {
      client: 0,
      supplier: 0,
      cost: 8,
    },
    {
      client: 1,
      supplier: 0,
      cost: 14,
    },
    {
      client: 2,
      supplier: 0,
      cost: 17,
    },
    {
      client: 0,
      supplier: 1,
      cost: 12,
    },
    {
      client: 1,
      supplier: 1,
      cost: 9,
    },
    {
      client: 2,
      supplier: 1,
      cost: 19,
    },
  ]);

  const [output, setOutput] = createSignal([]);

  const [profit, setProfit] = createSignal(0);

  const calculateOutput = () => {
    const result: Transport[] = calculateResult(suppliers(),clients(),routes())

    setOutput(result)

    let p = 0

    for(const r of result) {
      p += r.amount * r.pricePerOne
    }

    setProfit(p)
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
          clients={clients}
          setClients={setClients}
          suppliers={suppliers}
          setSuppliers={setSuppliers}
          routes={routes}
          setRoutes={setRoutes}
        ></InputComponent>

        <OutputComponent 
          clients={clients}
          suppliers={suppliers}
          output={output}
          profit={profit}
        ></OutputComponent>
      </div>
    </>
  );
}
export default App;
