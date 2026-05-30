
const secuelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Definir el modelo de Trabajo
const Trabajo = secuelize.define(
    'trabajos', 
    {
        id_trabajo: {
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
        atk_por_nivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hp_por_nivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mp_por_nivel: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'trabajos',
        freezeTableName: true,
        timestamps: true
    }
);

// Permite exportar el modelo para usarlo en otros archivos
module.exports = Trabajo;