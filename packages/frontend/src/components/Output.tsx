import { Output } from "@boil/core";
import { Component, For } from "solid-js";

export const OutputComponent: Component<{ output: Output[] }> = (props) => {
  return (
    <div class="basis-1/2"> 
      <table class="table-auto">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Duration</th>
            <th>ES</th>
            <th>EF</th>
            <th>LS</th>
            <th>LF</th>
            <th>reserve</th>
            <th>isCritical</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.output}>
            {(operation) => (
              <tr>
                <td>{operation.activity}</td>
                <td>{operation.duration}</td>
                <td>{operation.ES}</td>
                <td>{operation.EF}</td>
                <td>{operation.LS}</td>
                <td>{operation.LF}</td>
                <td>{operation.reserve}</td>
                <td>{operation.isCritical}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
