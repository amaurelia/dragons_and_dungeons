
// variables y constantes iniciales
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const {Habilidad, Trabajo, Personaje} = require('./models/index');
const habilidadesRoutes = require('./endpoints/habilidades');
const trabajosRoutes = require('./endpoints/trabajos');
const personajesRoutes = require('./endpoints/personajes');
const app = express();
const port = 4500;
const routes = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/', routes);   

// rura del CRUD de habilidades
app.use('/app', habilidadesRoutes);
app.use('/app', trabajosRoutes);
app.use('/app', personajesRoutes);

// mis funciones
async function crearTablas() { // función para crear las tablas en la base de datos
    try{
        const resetDB = process.env.DB_FORCE_SYNC === 'true';
        const actualizarEsquema = process.env.DB_ALTER_SYNC === 'true';

        const opcionesSync = resetDB
            ? { force: true }
            : (actualizarEsquema ? { alter: true } : {});

        await sequelize.sync(opcionesSync);

        if (resetDB) {
            console.log('Sincronización con force:true (tablas recreadas).');
        } else if (actualizarEsquema) {
            console.log('Sincronización con alter:true (esquema actualizado sin recrear tablas).');
        } else {
            console.log('Sincronización segura (sin cambios de esquema automáticos).');
        }
        console.log('Tablas creadas correctamente.');
    }
    catch (error) {
        console.error('Error al crear las tablas:', error);
    }
}

async function iniciarServidor() { // función para iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

// las páginas web
routes.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/pruebas.html');
});

// se ejecuta el código
async function iniciarApp() {
    await crearTablas();
    await iniciarServidor();
}

iniciarApp();

