import axios from '../axios';
import { IAuthLoginCredentials } from '../types';

export const loginAuth = async ({ email, password }: IAuthLoginCredentials) => {
  try {
    const res = await axios.post('/auth', {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
