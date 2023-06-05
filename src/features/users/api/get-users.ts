import { api } from '@/api';
import { IUser } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const getUsers = async () => {
  const { data } = await api.get<IUser[]>('users', {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
