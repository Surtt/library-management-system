import { IUser } from '@/types';

import { api } from './index';

export const getUsers = async () => {
  const { data } = await api.get<IUser[]>('users.json');
  return data;
};
