import { Axios } from 'axios';

import * as API from '@/api';

export type Extra = {
  client: Axios;
  api: typeof API;
};
