import { api } from '@/api';
import { ICheckout } from '@/types/checkout';
import { cookie } from '@/utils/cookieInstance';

export const getUsersCheckouts = async (userId: string | undefined | null) => {
  const { data } = await api.get<ICheckout[]>(`/books/checkouts/${userId}`, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
