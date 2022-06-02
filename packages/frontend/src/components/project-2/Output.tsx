import { Output } from "@boil/core";
import {
  Client,
  Supplier,
  Transport,
} from "@boil/core/src/model/Transportation";
import { Component, For } from "solid-js";

export const OutputComponent: Component<{
  output: any;
  clients: any;
  suppliers: any;
  profit: any
}> = (props) => {
  return (
    <div class="basis-1/2">
      <table class="border-collapse border border-slate-500 mt-10">
        <thead>
          <tr class="h-24 text-center">
            <td class="border-collapse border border-slate-500 w-24"></td>

            <For each={props.clients()}>
              {(client: Client) => (
                <td class="border-collapse border border-slate-500 w-24">
                  Klient {client.index + 1}
                </td>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={props.suppliers()}>
            {(supplier: Supplier) => (
              <>
                <tr class="h-24 text-center">
                  <td class="border-collapse border border-slate-500">
                    Dostawca {supplier.index + 1}
                  </td>

                  <For each={props.clients()}>
                    {(client: Client) => (
                      <td class="border-collapse border-4 border-slate-500">
                        {
                          props.output()[
                            supplier.index * props.clients().length +
                              client.index
                          ]?.amount
                        }
                      </td>
                    )}
                  </For>
                </tr>
              </>
            )}
          </For>
        </tbody>
      </table>

      <div class="mt-10">
        Zysk całkowity = {props.profit()}
      </div>
    </div>
  );
};
