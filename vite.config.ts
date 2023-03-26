import react from '@vitejs/plugin-react';
import dns from 'dns';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim');
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
