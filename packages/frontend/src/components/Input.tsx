import { Component, For } from "solid-js";

export const Input: Component<{ setActivities: any; activities: any }> = (
  props
) => {
  // const activities = [
  //   {
  //     activity: "A",
  //     previous: [],
  //     duration: 3,
  //   },
  //   {
  //     activity: "B",
  //     previous: [],
  //     duration: 4,
  //   },
  //   {
  //     activity: "C",
  //     previous: [],
  //     duration: 6,
  //   },
  //   {
  //     activity: "D",
  //     previous: ["B"],
  //     duration: 3,
  //   },
  //   {
  //     activity: "E",
  //     previous: ["A"],
  //     duration: 9,
  //   },
  //   {
  //     activity: "F",
  //     previous: ["A"],
  //     duration: 1,
  //   },
  //   {
  //     activity: "G",
  //     previous: ["B"],
  //     duration: 4,
  //   },
  //   {
  //     activity: "H",
  //     previous: ["C", "D"],
  //     duration: 5,
  //   },
  //   {
  //     activity: "I",
  //     previous: ["C", "D"],
  //     duration: 4,
  //   },
  //   {
  //     activity: "J",
  //     previous: ["E"],
  //     duration: 3,
  //   },
  //   {
  //     activity: "K",
  //     previous: ["F", "G", "H"],
  //     duration: 6,
  //   },
  //   {
  //     activity: "L",
  //     previous: ["F", "G", "H"],
  //     duration: 3,
  //   },
  //   {
  //     activity: "M",
  //     previous: ["I"],
  //     duration: 6,
  //   },
  //   {
  //     activity: "N",
  //     previous: ["J", "K"],
  //     duration: 9,
  //   },
  // ];

  function handleClick() {
    console.log(props.activities());

    const operation = document.getElementById("operation")?.value;
    const duration = document.getElementById("duration")?.value;
    const neighbors = document.getElementById("neighbors")?.value;

    props.setActivities((prev: any[]) => [
      ...prev,
      {
        activity: operation,
        previous: neighbors.split(","),
        duration: duration,
      },
    ]);

    // props.setActivities(prev => [...prev, 'a'])

    console.log(props.activities());
  }

  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            <For each={props.activities()}>
              {(activity) => (
                <tr>
                  <td>{activity.activity}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.previous.join(",")}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};
