import { Component, createSignal, For } from "solid-js";

import {
  Client,
  Supplier,
  Route,
} from "../../../../core/src/model/Transportation";

export const InputComponent: Component<{
  clients: any;
  setClients: any;
  suppliers: any;
  setSuppliers: any;
  routes: any;
  setRoutes: any;
}> = (props) => {
  const handleClick = () => {
    const amountClients = +document.getElementById("amount-clients")?.value;
    const amountSuppliers = document.getElementById("amount-suppliers")?.value;

    const tmpClients: Client[] = [];

    for (let i = 0; i < amountClients; i++) {
      tmpClients.push({
        index: i,
        demand: 0,
        price: 0,
      });
    }

    const tmpSuppliers: Supplier[] = [];

    for (let i = 0; i < amountSuppliers; i++) {
      tmpSuppliers.push({
        index: i,
        supply: 0,
        cost: 0,
      });
    }

    const tmpRoutes: Route[] = [];

    for (let i = 0; i < amountSuppliers; i++) {
      for (let ii = 0; ii < amountClients; ii++) {
        tmpRoutes.push({
          client: ii,
          supplier: i,
          cost: 0
        })

      }
    }
    props.setRoutes(tmpRoutes)
    props.setClients(tmpClients);
    props.setSuppliers(tmpSuppliers);

  };

  const updateDemand = (event: Event, clientIndex: number) => {
    props.setClients(
      props.clients().map((client: Client) => {
        if (client.index === clientIndex) {
          return {
            ...client,
            demand: event.target ? +event.target.value : -1,
          };
        }
        return client;
      })
    );
  };

  const updatePrice = (event: Event, clientIndex: number) => {
    props.setClients(
      props.clients().map((client: Client) => {
        if (client.index === clientIndex) {
          return {
            ...client,
            price: event.target ? +event.target.value : -1,
          };
        }
        return client;
      })
    );
  };

  const updateCost = (event: Event, supplierIndex: number) => {
    props.setSuppliers(
      props.suppliers().map((supplier: Supplier) => {
        if (supplier.index === supplierIndex) {
          return {
            ...supplier,
            cost: event.target ? +event.target.value : -1,
          };
        }
        return supplier;
      })
    );
  };

  const updateSupply = (event: Event, supplierIndex: number) => {
    props.setSuppliers(
      props.suppliers().map((supplier: Supplier) => {
        if (supplier.index === supplierIndex) {
          return {
            ...supplier,
            supply: event.target ? +event.target.value : -1,
          };
        }
        return supplier;
      })
    );
  };

  const updateRoute = (
    event: Event,
    clientIndex: number,
    supplierIndex: number
  ) => {
    const routeIndex = supplierIndex * props.clients().length + clientIndex;

    props.setRoutes(
      props.routes().map((route: Route, index: number) => {
        if (routeIndex === index) {
          return {
            ...route,
            cost: event.target ? +event.target.value : -1,
          };
        }
        return route;
      })
    );
  };

  return (
    <div class="basis-1/2">
      <h1 class="underline decoration-pink-500">Wprowadź dane</h1>
      <div class="grid grid-cols-2 grid-flow-col gap-4 w-80">
        <div>Ilość klientów</div>
        <div>Ilość dostawców</div>
      </div>
      <div class="grid grid-cols-2 grid-flow-col gap-4 w-80">
        <input type="number" class="border " id="amount-clients"></input>
        <input type="number" class="border " id="amount-suppliers"></input>
      </div>
      <div>
        <button
          class="rounded-full bg-green-500/75 p-1 mt-3"
          onClick={handleClick}
        >
          Generuj
        </button>
      </div>
      <div>
        <table class="border-collapse border border-slate-500 mt-10">
          <thead>
            <tr class="h-24 text-center">
              <td class="border-collapse border border-slate-500 w-24"></td>
              <td class="border-collapse border border-slate-500 w-24">
                Popyt
              </td>

              <For each={props.clients()}>
                {(client: Client) => (
                  <td class="border-collapse border border-slate-500 w-24">
                    <input
                      type="number"
                      class="border w-12 h-12 text-center demand"
                      value={client.demand}
                      onChange={(e) => updateDemand(e, client.index)}
                    ></input>
                  </td>
                )}
              </For>
            </tr>
            <tr class="h-24 text-center">
              <td class="border-collapse border border-slate-500 w-24">
                Podaż
              </td>
              <td class="border-collapse border border-slate-500 w-24"></td>

              <For each={props.clients()}>
                {(client: Client) => (
                  <td class="border-collapse border border-slate-500 w-24">
                    Klient {client.index + 1}
                  </td>
                )}
              </For>
              <td class="border-collapse border border-slate-500 w-24">
                Cena zakupu
              </td>
            </tr>
          </thead>
          <tbody>
            <For each={props.suppliers()}>
              {(supplier: Supplier) => (
                <>
                  <tr class="h-24 text-center">
                    <td class="border-collapse border border-slate-500">
                      <input
                        type="number"
                        class="border w-12 h-12 text-center supply"
                        value={supplier.supply}
                        onChange={(e) => updateSupply(e, supplier.index)}
                      ></input>
                    </td>
                    <td class="border-collapse border border-slate-500">
                      Dostawca {supplier.index + 1}
                    </td>

                    <For each={props.clients()}>
                      {(client: Client) => (
                        <td class="border-collapse border-4 border-slate-500">
                          <input
                            type="number"
                            class="border w-12 h-12 text-center transport-cost"
                            value={
                              props.routes()[
                                supplier.index * props.clients().length +
                                  client.index
                              ]?.cost
                            }
                            onChange={(e) =>
                              updateRoute(e, client.index, supplier.index)
                            }
                          ></input>
                        </td>
                      )}
                    </For>

                    <td class="border-collapse border border-slate-500">
                      <input
                        type="number"
                        class="border w-12 h-12 text-center cost"
                        value={supplier.cost}
                        onChange={(e) => updateCost(e, supplier.index)}
                      ></input>
                    </td>
                  </tr>
                </>
              )}
            </For>
            <tr class="h-24 text-center">
              <td class="border-collapse border border-slate-500"></td>
              <td class="border-collapse border border-slate-500">
                Cena sprzedaży
              </td>
              <For each={props.clients()}>
                {(client: Client) => (
                  <td class="border-collapse border border-slate-500">
                    <input
                      type="number"
                      class="border w-12 h-12 text-center price"
                      value={client.price}
                      onChange={(e) => updatePrice(e, client.index)}
                    ></input>
                  </td>
                )}
              </For>

              <td class="border-collapse border border-slate-500"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
