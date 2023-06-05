import { api } from '@/api';
import { IUser } from '@/types';

export const signInUser = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await api.post<IUser>('/signin', { email, password });
  return data;
};
