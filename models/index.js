const Habilidad = require('./Habilidad');
const Trabajo = require('./Trabajo');
const Personaje = require('./Personaje');
const Objeto = require('./Objeto');
const Enemigo = require('./Enemigo');

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

// relación entre personaje y objeto
Personaje.belongsToMany(
    Objeto, {   
        as: 'objetos',
        foreignKey: 'id_personaje',
        otherKey: 'id_objeto',
        through: 'personajes_objetos',
    }
);
Objeto.belongsToMany(
    Personaje, { 
        as: 'personajes',
        foreignKey: 'id_objeto',
        otherKey: 'id_personaje',
        through: 'personajes_objetos',
    }
);

// Se exportan los modelos para usarlos en otros archivos
module.exports = {
    Habilidad,
    Trabajo,
    Personaje,
    Objeto,
    Enemigo
};
