import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:8000'
    }
      },
      plugins: [
        {
          name: 'set-js-mime-type',
          configureServer(server) {
            return () => {
              server.middlewares.use((req, res, next) => {
                if (req.url.endsWith('.js')) {
                  res.setHeader('Content-Type', 'application/javascript');
                }
                next();
              });
            };
          },
        },
      ],
})
