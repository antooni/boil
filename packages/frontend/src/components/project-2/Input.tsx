import { Component, For } from "solid-js";

import {
  Client,
  Supplier,
  Route,
} from "../../../../core/src/model/Transportation";

export const InputComponent: Component<{
  setActivities: any;
  activities: any;
}> = (props) => {
  const clients: Client[] = [
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
  ];

  const suppliers: Supplier[] = [
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
  ];

  const routes: Route[][] = [
    [
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
    ],
    [
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
    ],
  ];

  const handleClick = () => {
    const amountClients = document.getElementById("amount-clients")?.value;
    const amountSuppliers = document.getElementById("amount-suppliers")?.value;

    console.log(amountClients);
    console.log(amountSuppliers);

    (document.getElementById("amount-clients") as HTMLInputElement).value = "";
    (document.getElementById("amount-suppliers") as HTMLInputElement).value =
      "";
  };

  const handleDelete = (activity: string) => {
    const filtered = props.activities().filter((a) => a.activity !== activity);

    props.setActivities(filtered);
  };

  return (
    <div class="basis-1/2">
      <h1 class="underline decoration-pink-500">Wprowadź dane</h1>
      <div class="grid grid-cols-2 grid-flow-col gap-4 w-80">
        <div>Ilość klientów</div>
        <div>Ilość dostawców</div>
      </div>
      <div class="grid grid-cols-2 grid-flow-col gap-4 w-80">
        <input
          type="number"
          class="border border-sky-500"
          id="amount-clients"
        ></input>
        <input
          type="number"
          class="border border-sky-500"
          id="amount-suppliers"
        ></input>
      </div>
      <div>
        <button
          class="rounded-full bg-green-500/75 p-1 mt-3"
          onClick={handleClick}
        >
          DODAJ
        </button>
      </div>
      <div>
        <table class="border-collapse border border-slate-500 mt-10">
          <thead>
            <tr class="h-24 text-center">
              <td class="border-collapse border border-slate-500 w-24">
              </td>
              <td class="border-collapse border border-slate-500 w-24">
                Popyt
              </td>
              
              <For each={clients}>
                {(client) => (
                  <td class="border-collapse border border-slate-500 w-24">
                    {client.demand}
                  </td>
                )}
              </For>
            </tr>
            <tr class="h-24 text-center">
              <td class="border-collapse border border-slate-500 w-24">
                Podaż
              </td>
              <td class="border-collapse border border-slate-500 w-24">
                
              </td>
              
              <For each={clients}>
                {(client) => (
                  <td class="border-collapse border border-slate-500 w-24">
                    Klient {client.index}
                  </td>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={suppliers}>
              {(supplier) => (
                <>
                  <tr class="h-24 text-center">
                    <td class="border-collapse border border-slate-500">
                      {supplier.supply}
                    </td>
                    <td class="border-collapse border border-slate-500">
                      Dostawca {supplier.index}
                    </td>
                    
                    <For each={clients}>
                      {(client) => (
                        <td class="border-collapse border-2 border-slate-500">
                          {routes[supplier.index][client.index].cost}
                        </td>
                      )}
                    </For>
                  </tr>
                </>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};
