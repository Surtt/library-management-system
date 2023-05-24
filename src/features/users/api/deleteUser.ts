import { api } from '@/api';
import { IUser } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const deleteUser = async (userId: string) => {
  const { data } = await api.delete<IUser>(`users/${userId}`, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
