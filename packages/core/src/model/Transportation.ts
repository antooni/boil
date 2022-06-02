export interface Supplier {
    index: number,
    supply: number,
    cost: number
}

export interface Client {
    index: number,
    demand: number,
    price: number
}

export interface Route {
    supplier: number,
    client: number,
    cost: number
}

export interface Profit {
    supplier: number,
    client: number,
    profit: number
}

export interface Transport {
    supplier: number,
    client: number,
    amount: number,
    pricePerOne: number
}