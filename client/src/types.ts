import React from 'react';

// AUTH
export interface IAuthLoginCredentials {
  email?: string;
  password?: string;
}

export interface IAuthErrors extends IAuthLoginCredentials {
  firstname?: string;
  lastname?: string;
}

export interface IAuthRequest extends IAuthLoginCredentials {
  firstname?: string;
  lastname?: string;
}

export interface IAuthLoginForm extends IAuthCommon {
  hideForm?: { display: string };
  loginSubmitHanlder: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface IAuthSignupForm extends IAuthCommon {
  hideForm?: { display: string };
  firstname: string;
  lastname: string;
  signupSubmitHanlder: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export interface IAuthCommonHandlers {
  blurHandler?: () => void;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IAuthCommon extends IAuthCommonHandlers {
  isLogin: boolean;
  errors: IAuthErrors;
  email: string;
  password: string;
  error?: string;
}

export interface IAuthState extends IAuthCommon {
  firstname: string;
  lastname: string;
}

export interface IAuthProps {
  onAuth: (email: string, password: string) => void;
  onSignupAuth: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => void;
  error?: string;
}

export interface IAuth extends IAuthLoginForm, IAuthSignupForm {
  toggleLoginHandler: () => void;
  signupSuccess?: boolean;
}

// CART
export interface ICart {
  items: ICartItem[];
  totalItems?: number;
  totalPrice: number;
}

export interface ICartItem {
  image: string;
  name: string;
  _id: string;
  price: number;
  qty: number;
  quantity?: number;
  description?: string;
}

export interface ICartMenu extends CartType {
  isOpen: boolean;
  toggleDropDown: () => void;
}

export type CartType = {
  cart: ICart;
};

export type ItemType = {
  item: ICartItem;
};

export interface IProducts {
  products: ICartItem[];
}

export interface ICartDropDownProps extends IProducts {
  open: boolean;
  totalPrice: number;
  onToggleDropDown: () => void;
}

export interface IProductRowProps {
  product: ICartItem;
  handleRemove: (product: ICartItem) => void;
}

export interface IProductCardProps {
  product: ICartItem;
  setCartItem: (product: ICartItem) => void;
}

export interface IProductDetailProps extends IProductCardProps {
  loading: boolean;
}

// Category
export interface IMenuCategory {
  _id: string;
  name: string;
  image?: string;
}

export interface IMenuCategories {
  loading: boolean;
  categories: IMenuCategory[];
}
