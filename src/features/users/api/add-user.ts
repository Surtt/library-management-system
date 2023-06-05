import { api } from '@/api';
import { IUser } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const addUser = async (userData: IUser) => {
  const { data } = await api.post<IUser>('/users', userData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
