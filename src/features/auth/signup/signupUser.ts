import { api } from '@/api';
import { IUser } from '@/types';

export const signUpUser = async (user: IUser) => {
  const { data } = await api.post<IUser>('/signup', user);
  return data;
};
