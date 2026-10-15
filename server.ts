import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './src/server/routes';
import { initializeAdminAuth } from './src/server/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Seed default admin account
  initializeAdminAuth();

  // Basic Middlewares
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use('/api', apiRouter);

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  if (!isProd) {
    // Development mode: Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('[SERVER] Berjalan dalam mode pengembangan dengan Vite Middleware');
  } else {
    // Production mode: Serve dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[SERVER] Berjalan dalam mode produksi melayani /dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SWEET BAKERY] Server berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[SERVER] Gagal memulai server Sweet Bakery:', err);
  process.exit(1);
});
