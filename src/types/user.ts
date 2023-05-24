import { IRole } from '@/types/role';

export interface IUser {
  token?: string;
  id?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password?: string | null;
  roles?: IRole[];
}
