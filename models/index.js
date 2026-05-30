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
Habilidad.belongsToMany(
    Trabajo, { 
        foreignKey: 'id_trabajo',
        through: 'trabajos_habilidades',
    }
);
Trabajo.belongsToMany(
    Habilidad, { 
        foreignKey: 'id_habilidad',
        through: 'trabajos_habilidades',
    }
);

// Se exportan los modelos para usarlos en otros archivos
module.exports = {
    Habilidad,
    Trabajo,
    Personaje
};
