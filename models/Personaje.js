
const secuelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Definir el modelo de Personaje
const Personaje = secuelize.define(
    'personajes', 
    {
        id_personaje: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'personajes',
        freezeTableName: true,
        timestamps: true
    }
);

// Permite exportar el modelo para usarlo en otros archivos
module.exports = Personaje;