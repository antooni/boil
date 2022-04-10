import { Boundary } from "@boil/core";
import { Component, For } from "solid-js";

export const Graph: Component<{ output: Map<string, Boundary> }> = (
  props
) => {
  const array = Array.from(props.operations, ([name, value]) => ({
    name,
    value,
  }));
  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th>Operation</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        <For each={array}>
          {(operation) => (
            <tr>
              <td>
                {operation.name} 
              </td>
              <td>
                {operation.value.from}
              </td>
              <td>
              {operation.value.to}
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
