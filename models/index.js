const Habilidad = require('./Habilidad');
const Trabajo = require('./Trabajo');
const Personaje = require('./Personaje');

// relqación entre trabajo y personaje
Trabajo.hasOne(
    Personaje, { 
        foreignKey: 'id_trabajo' 
    }
);

// relación entre trabajo y habilidad
Trabajo.belongsToMany(
    Habilidad, { 
        as: 'habilidades',
        foreignKey: 'id_trabajo',
        otherKey: 'id_habilidad',
        through: 'trabajos_habilidades',
    }
);
Habilidad.belongsToMany(
    Trabajo, { 
        as: 'trabajos',
        foreignKey: 'id_habilidad',
        otherKey: 'id_trabajo',
        through: 'trabajos_habilidades',
    }
);

// Se exportan los modelos para usarlos en otros archivos
module.exports = {
    Habilidad,
    Trabajo,
    Personaje
};
