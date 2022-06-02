import { expect } from "earljs";
import {
  Client,
  Route,
  Supplier,
  Transport,
} from "../../src/model/Transportation";
import {
  alfabeta,
  calculateCosts,
  findMax,
} from "../../src/services/Intermediary";

const clients: Client[] = [
  {
    index: 0,
    demand: 10,
    price: 30,
  },
  {
    index: 1,
    demand: 28,
    price: 25,
  },
  {
    index: 2,
    demand: 27,
    price: 30,
  },
];

const suppliers: Supplier[] = [
  {
    index: 0,
    supply: 20,
    cost: 10,
  },
  {
    index: 1,
    supply: 30,
    cost: 12,
  },
];

const routes: Route[] = [
  {
    client: 0,
    supplier: 0,
    cost: 8,
  },
  {
    client: 1,
    supplier: 0,
    cost: 14,
  },
  {
    client: 2,
    supplier: 0,
    cost: 17,
  },
  {
    client: 0,
    supplier: 1,
    cost: 12,
  },
  {
    client: 1,
    supplier: 1,
    cost: 9,
  },
  {
    client: 2,
    supplier: 1,
    cost: 19,
  },
];

const profits = [
  {
    client: 0,
    supplier: 0,
    profit: 12,
  },
  {
    client: 1,
    supplier: 0,
    profit: 1,
  },
  {
    client: 2,
    supplier: 0,
    profit: 3,
  },
  {
    client: 0,
    supplier: 1,
    profit: 6,
  },
  {
    client: 1,
    supplier: 1,
    profit: 4,
  },
  {
    client: 2,
    supplier: 1,
    profit: -1,
  },
];

const transports: Transport[] = [
  {
    client: 0,
    supplier: 0,
    amount: 10,
    pricePerOne: 12
},
  {
    client: 1,
    supplier: 0,
    amount: 0,
    pricePerOne: 1
},
  {
    client: 2,
    supplier: 0,
    amount: 10,
    pricePerOne: 3
},
  {
    client: 0,
    supplier: 1,
    amount: 0,
    pricePerOne: 6
},
  {
    client: 1,
    supplier: 1,
    amount: 28,
    pricePerOne: 4
},
  {
    client: 2,
    supplier: 1,
    amount: 2,
    pricePerOne: -1
},
];

describe(calculateCosts.name, () => {
  it("ez", () => {
    const result = calculateCosts(suppliers, clients, routes);

    expect(result).toEqual(profits);
  });
});

describe(findMax.name, () => {
  it("ez2", () => {
    const result = findMax(clients, suppliers, profits);

    expect(result).toEqual(transports);
  });
});

describe(alfabeta.name, () => {
  it("", () => {
    const result = alfabeta([
      {
        client: 0,
        supplier: 0,
        amount: 10,
        pricePerOne: 12
    },
      {
        client: 1,
        supplier: 0,
        amount: 0,
        pricePerOne:1
    },
      {
        client: 2,
        supplier: 0,
        amount: 10,
        pricePerOne:3
    },
      {
        client: 3,
        supplier: 0,
        amount: 0,
        pricePerOne:0
    },
      {
        client: 0,
        supplier: 1,
        amount: 0,
        pricePerOne:6
    },
      {
        client: 1,
        supplier: 1,
        amount: 28,
        pricePerOne:4
    },
      {
        client: 2,
        supplier: 1,
        amount: 2,
        pricePerOne:-1
    },
      {
        client: 3,
        supplier: 1,
        amount: 0,
        pricePerOne:0
    },
      {
        client: 0,
        supplier: 2,
        amount: 0,
        pricePerOne:0
    },
      {
        client: 1,
        supplier: 2,
        amount: 0,
        pricePerOne:0
    },
      {
        client: 2,
        supplier: 2,
        amount: 15,
        pricePerOne:0
    },
      {
        client: 3,
        supplier: 2,
        amount: 50,
        pricePerOne:0
    },
    ]);

    expect(result).toEqual({
      alfa: [3, -1, 0],
      beta: [9, 5, 0, 0],
    });
  });
});
