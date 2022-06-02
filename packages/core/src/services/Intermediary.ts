import {
  Client,
  Profit,
  Route,
  Supplier,
  Transport,
} from "../model/Transportation";

export function calculateCosts(
  suppliers: Supplier[],
  clients: Client[],
  routes: Route[]
): Profit[] {
  const result: Profit[] = [];

  for (const route of routes) {
    const client = clients[route.client];
    const supplier = suppliers[route.supplier];
    const cost = route.cost;

    result.push({
      client: client.index,
      supplier: supplier.index,
      profit: client.price - supplier.cost - cost,
    });
  }

  return result;
}

export function findMax(
  clients: Client[],
  suppliers: Supplier[],
  profits: Profit[]
): Transport[] {
  const transports = [];

  let ctr = 0;

  for (const [index, profit] of profits.entries()) {
    transports.push({
      client: profit.client,
      supplier: profit.supplier,
      amount: 0,
      pricePerOne: profit.profit
    });
  }

  while (true) {
    let max = -Infinity;
    let maxIndex = -1;

    for (const [index, profit] of profits.entries()) {
      if (
        profit.profit > max &&
        transports[index].amount === 0 &&
        clients[profit.client].demand !== 0 &&
        suppliers[profit.supplier].supply !== 0
      ) {
        maxIndex = index;
        max = profit.profit;
      }
    }

    const client = clients[profits[maxIndex].client];
    const supplier = suppliers[profits[maxIndex].supplier];

    const diff =
      supplier.supply >= client.demand ? client.demand : supplier.supply;

    clients[profits[maxIndex].client].demand -= diff;
    suppliers[profits[maxIndex].supplier].supply -= diff;

    transports[maxIndex].amount = diff;

    console.log(diff);
    ctr++;

    if (ctr > 3) break;
  }

  return transports;
}


export function alfabeta(transports: Transport[]):{alfa: number[], beta: number[]} {
  const alfa: number[] = []
  const beta: number[] = []

  transports = transports.reverse()

  alfa.push(0)
  // for(const transport of transports) {
  //   if(transport.amount > 0) {
  //     if(alfa.length > beta.length) {
  //       beta.push(transport.pricePerOne - alfa)
  //     }
  //   }
  // }

  for(let r = 0; r < 3; r++) {
    for(let k = 0; k < 4; k++) {
      
    }
  }


  return {alfa,beta}


}