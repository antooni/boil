import { Component, For } from "solid-js";

export const InputComponent: Component<{
  setActivities: any;
  activities: any;
}> = (props) => {
  const  handleClick = () => {
    const operation = document.getElementById("operation")?.value;
    const duration = document.getElementById("duration")?.value;
    //it needs to be sorted !!!
    const neighbors = document.getElementById("neighbors")?.value;

    props.setActivities((prev: any[]) => [
      ...prev,
      {
        activity: operation,
        previous: neighbors.split(",").sort((a,b) => a.localeCompare(b)),
        duration: +duration,
      },
    ]);

    (document.getElementById("operation") as HTMLInputElement).value = '';
    (document.getElementById("duration") as HTMLInputElement).value = '';
    (document.getElementById("neighbors") as HTMLInputElement).value = '';
  }

  const handleDelete = (activity: string) => {
    const filtered = props.activities().filter(a => a.activity !== activity)

    props.setActivities(filtered)
  }

  return (
    <div class="basis-1/2">
      <h1 class="underline decoration-pink-500">Wprowadź dane</h1>
      <div class="grid grid-cols-3 grid-flow-col gap-4 w-80">
        <div>Operacja</div>
        <div>Długość</div>
        <div>Poprzednicy</div>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 w-80">
        <input type="text" class="border border-sky-500" id="operation"></input>
        <input
          type="number"
          class="border border-sky-500"
          id="duration"
        ></input>
        <input type="text" class="border border-sky-500" id="neighbors"></input>
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
        <table>
          <thead>
            <tr>
              <td>Operacja</td>
              <td>Długość</td>
              <td>Poprzednicy</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <For each={props.activities()}>
              {(activity) => (
                <tr>
                  <td>{activity.activity}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.previous.join(",")}</td>
                  <td><button class="text-red-700" onClick={() => handleDelete(activity.activity)}>X</button></td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};
