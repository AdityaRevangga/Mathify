const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🧮 MATHIFY BACKEND ACTIVE`);
  console.log(`   API Server:   http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================`);
  console.log(`🚀 MATHIFY FRONTEND APP`);
  console.log(`   Frontend URL: http://localhost:5173`);
  console.log(`   (Buka alamat ini di browser untuk masuk ke aplikasi)`);
  console.log(`======================================================\n`);
});
