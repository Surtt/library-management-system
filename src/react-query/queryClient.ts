import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function queryErrorHandler(error: unknown): void {
  const title = error instanceof Error ? error.message : 'error connecting to server';
  toast.error(title, { position: 'top-right' });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler,
  }),
});
