import { ICartItem } from '../types';

const concatClasses = (...classes: string[]) => {
  //   if (Array.isArray(classes[0])) {
  //     const newClasses: string[] = classes[0];
  //     return newClasses.join(' ');
  //   }

  return classes.join(' ');
};

const updateObject = (oldObject: any, newObjectProps: any) => {
  return {
    ...oldObject,
    ...newObjectProps,
  };
};

const updateCart = (items: ICartItem[], product: ICartItem) => {
  const itemIndex = getProductIndex(items, product._id);
  let updatedItems;

  // product already in items, then we update its quantity
  if (itemIndex > -1) {
    updatedItems = [...items];
    let item = updatedItems[itemIndex];

    item = {
      ...item,
      qty: item.qty + product.qty,
    };
    updatedItems[itemIndex] = item;
  } else {
    // add new product to items
    updatedItems = items.concat(product);
  }

  return updatedItems;
};

const removeItemFromCart = (items: ICartItem[], productId: string) =>
  [...items].filter(item => item._id !== productId);

const getProductIndex = (items: ICartItem[], productId: string) =>
  items.findIndex(item => item._id && item._id === productId);

const getCartTotalPrice = (items: ICartItem[]) => {
  return items.reduce((acc, item) => (acc += item.price * item.qty), 0);
};

const getCartTotalItems = (items: ICartItem[]) => {
  return items.reduce((acc, item) => (acc += item.qty), 0);
};

const isLoggedin = (): boolean => {
  const token = localStorage.getItem('user:token');
  const userId = localStorage.getItem('user:userId');

  return token !== null && userId !== null;
};

export {
  concatClasses,
  updateObject,
  updateCart,
  getCartTotalPrice,
  getCartTotalItems,
  removeItemFromCart,
  isLoggedin,
};
