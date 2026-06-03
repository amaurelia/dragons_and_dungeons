
const secuelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Definir el modelo de Enemigo
const Enemigo = secuelize.define(
    'enemigos', 
    {
        id_enemigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ataque: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'enemigos',
        freezeTableName: true,
        timestamps: true
    }
);

// Permite exportar el modelo para usarlo en otros archivos
module.exports = Enemigo;