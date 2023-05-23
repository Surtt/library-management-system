import { api } from '@/api';
import { IAuthor } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const updateAuthor = async ({
  authorId,
  newData,
}: {
  authorId: IAuthor['id'];
  newData: IAuthor;
}) => {
  const { data } = await api.put<IAuthor>(`/authors/${authorId}`, newData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
