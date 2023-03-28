import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { StateContextProvider } from '@/context';
import { store } from '@/store';

import { queryClient } from './queries/queryClient';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <StateContextProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </StateContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
