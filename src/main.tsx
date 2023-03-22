import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import { queryClient } from './react-query/queryClient';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
