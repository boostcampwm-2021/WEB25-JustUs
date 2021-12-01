export const ArrayToObject = <T, K extends keyof T>(arr: T[], element: K): object => {
  const result = arr.reduce((target: any, key) => {
    target[key[element]] = key;
    return target;
  }, {});

  return result;
};

export const reArrange = (stringOrder: string, obj: object): any[] => {
  const order = stringOrder.split(",");

  const arrayOrder = order.map(e => {
    return obj[e];
  });

  return arrayOrder;
};

export const deleteOrder = (stringOrder: string, Id: number): string => {
  const order = stringOrder.split(",");

  return order.filter(e => +e !== Id).join(",");
};
