
const secuelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Definir el modelo de Objeto
const Objeto = secuelize.define(
    'objetos', 
    {
        id_objeto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cura: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hace_daño: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'objetos',
        freezeTableName: true,
        timestamps: true
    }
);

// Permite exportar el modelo para usarlo en otros archivos
module.exports = Objeto;