export const OrdersDB = new Map();

export interface Order {
  id: string,
  name: string,
  mobile: string,
  items: Item[],
};

export interface Item {
  itemName: string,
  quantity: number
}

export interface SavedOrder {
  id: string,
  orders: Order,
}


