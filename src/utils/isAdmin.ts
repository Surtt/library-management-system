import { useStateContext } from '@/context';

export const isAdmin = () => {
  const user = useStateContext().state.authUser;
  const userRole = user?.roles?.find((r) => r.name === 'ROLE_ADMIN')?.name;
  if (userRole === 'ROLE_ADMIN') {
    return true;
  }
};
