import { api } from '@/api';
import { ICheckout } from '@/types/checkout';

export const getCheckouts = async () => {
  const { data } = await api.get<ICheckout[]>('/books/checkouts');
  return data;
};
