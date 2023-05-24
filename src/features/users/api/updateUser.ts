import { api } from '@/api';
import { IUser } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const updateUser = async ({ userId, newData }: { userId: IUser['id']; newData: IUser }) => {
  const { data } = await api.put<IUser>(`/users/${userId}`, newData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
