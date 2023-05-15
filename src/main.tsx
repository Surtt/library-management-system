import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { StateContextProvider } from '@/context';
import AuthMiddleware from '@/middleware/AuthMiddleware';
import { store } from '@/store';

import { queryClient } from './queries/queryClient';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <StateContextProvider>
            <Provider store={store}>
              <AuthMiddleware>
                <CookiesProvider>
                  <App />
                </CookiesProvider>
              </AuthMiddleware>
            </Provider>
          </StateContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
