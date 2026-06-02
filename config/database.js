
// importar Sequelize y dotenv
require('dotenv').config();
const { Sequelize } = require('sequelize');

// credenciales para la base de datos (se leen desde el archivo .env)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// Verificar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida exitosamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

// Exportar la instancia de Sequelize para usarla en otros archivos
module.exports = sequelize;