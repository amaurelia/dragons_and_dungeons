
const secuelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Definir el modelo de Habilidad
const Habilidad = secuelize.define(
    'habilidades', 
    {
        id_habilidad: {
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
        daño: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coste: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

// Permite exportar el modelo para usarlo en otros archivos
module.exports = Habilidad;