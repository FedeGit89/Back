// ===========================
// Puerto
// ===========================

process.env.PORT = process.env.PORT || 3000;

// ===========================
// Entorno
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// BASE DE DATOS
// ===========================

let urlDB = "mongodb://localhost:27017/test";
process.env.URLDB = urlDB;


// ===========================
// Vencimiento de token
// ===========================

process.env.CADUCIDAD_TOKEN = '48h';

// ===========================
// SEED de autenticación
// ===========================

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo';