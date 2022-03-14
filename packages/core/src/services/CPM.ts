import { Input } from "../model/Input";
import { Node } from "../model/Node";

interface Boundary {
  from: number;
  to: number;
}

export class CPM {
  private graph: Map<string, Boundary> = new Map();

  add(a: number, b: number): number {
    return a + b;
  }

  buildGraph(activities: Input[]): Map<string, { from: number; to: number }> {
    const graph = new Map();

    let lastIndex = 1;

    for (const [index, activity] of activities.entries()) {
      if (activity.previous.length === 0) {
        graph.set(`${activity.activity}`, { from: 1, to: ++lastIndex });
      } else {
        for (const pp of activity.previous) {
          const known = activities
            .slice(index)
            .map((a) => a.previous)
            .flat();

          if (known.includes(activity.activity)) {
            for (const aa of activities) {
              if (
                aa.previous.includes(activity.activity) &&
                aa.previous.length > 1
              ) {
                const nn: Boundary = graph.get(aa.activity);
                const prevNode: Boundary = graph.get(pp);
                graph.set(`${activity.activity}`, {
                  from: prevNode.to,
                  to: nn.to,
                });
              }
            }
          } else {
            const node: Boundary = graph.get(prev);
            graph.set(`${activity.activity}`, {
              from: node.to,
              to: ++lastIndex,
            });
          }
        }

        return graph;
      }
    }

    return graph
  }

  nextNodes(nodeNumber: number, activities: Input[]): Node[] {
    const result: Node[] = [];
    let nextIndex = nodeNumber;
    for (const activity of activities) {
      if (activity.previous.length === 0) {
        result.push({ num: ++nextIndex, next: [] });
      } else {
        for (const prev of activity.previous) {
        }
      }
    }

    return result;
  }
}
