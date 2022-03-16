import { Input } from "../model/Input";
import { Node } from "../model/Node";

interface Boundary {
  from: number;
  to: number;
}

export class CPM {
  //TODO function to get final index
  buildGraph(
    activities: Input[],
    finalIndex: number
  ): Map<string, { from: number; to: number }> {
    const graph = new Map();

    let lastIndex = 1;

    for (const activity of activities) {
      const from = this.findFrom(activity, graph);
      const to = this.findTo(
        activity,
        activities,
        graph,
        lastIndex,
        finalIndex
      );
      if (to > lastIndex) lastIndex++;

      graph.set(`${activity.activity}`, { from, to });
    }

    return graph;
  }

  findFrom(activity: Input, graph: Map<string, Boundary>): number {
    if (activity.previous.length === 0) {
      return 1;
    } else {
      const predecessor = graph.get(activity.previous[0]);
      return predecessor ? predecessor?.to : -1;
    }
  }

  findTo(
    activity: Input,
    activities: Input[],
    graph: Map<string, Boundary>,
    lastIndex: number,
    finalIndex: number
  ): number {
    if (lastIndex >= finalIndex) {
      return finalIndex;
    }
    if (activity.previous.length === 0) {
      return ++lastIndex;
    } else {
      const index = activities.indexOf(activity);
      const known = activities
        .slice(index)
        .find((a) => a.previous.includes(activity.activity));
      if (known === undefined || known.previous.length === 1) {
        return ++lastIndex;
      } else {
        const brother = known?.previous[0];
        const predecessor = graph.get(brother);
        return predecessor ? predecessor?.to : ++lastIndex;
      }
    }
  }
}
