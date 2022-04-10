import { Output } from "../model";
import { Input } from "../model/Input";
import { Node } from "../model/Node";

export interface Boundary {
  from: number;
  to: number;
  duration: number;
}

export class CPM {
  solve(input: Input[]): Output[] {}

  convertToNodes(graph: Map<string, Boundary>): Node[] {
    const mapping = new Map<number, Node>();

    for (const [key, value] of graph.entries()) {
      const node = mapping.get(value.from) ?? {
        num: value.from,
        previous: [],
        next: [],
      };
      node.next.push({
        num: value.to,
        activity: key,
        duration: value.duration,
      });
      mapping.set(value.from, node);
    }

    for (const [key, value] of graph.entries()) {
      const node = mapping.get(value.to) ?? {
        num: value.to,
        previous: [],
        next: [],
      };
      node.previous.push({
        num: value.from,
        activity: key,
        duration: value.duration,
      });
      mapping.set(value.to, node);
    }
    const arr = Array.from(mapping.values());

    return arr.sort((a, b) => a.num - b.num);
  }

  //TODO function to get final index
  buildGraph(activities: Input[]): Map<string, Boundary> {
    const graph = new Map();

    let lastIndex = 1;

    for (const activity of activities) {
      const from = this.findFrom(activity, graph);
      const to = this.findTo(activity, activities, graph, lastIndex);
      if (to > lastIndex) lastIndex++;

      graph.set(`${activity.activity}`, {
        from,
        to,
        duration: activity.duration,
      });
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
    lastIndex: number
  ): number {
    if (activity.previous.length === 0) {
      return ++lastIndex;
    } else {
      const index = activities.indexOf(activity);

      if (isLast(index, activities, graph)) {
        return lastIndex;
      }

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

function isLast(
  index: number,
  activities: Input[],
  graph: Map<string, Boundary>
): boolean {

  let lastActivity = "";
  for (const [key, value] of graph.entries()) {
    lastActivity = key;
  }

  const isPredecessorForAnyNextActivity = activities
    .slice(index)
    .find((a) => a.previous.includes(lastActivity));

  if (isPredecessorForAnyNextActivity === undefined) {
    return true;
  }

  return false;
}
