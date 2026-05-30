
// importar Sequelize
const { Sequelize } = require('sequelize');

// credenciales para la base de datos
const sequelize = new Sequelize(
    'dragons_and_dungeons', 
    'root',
    '',
    {
        host: 'localhost',
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