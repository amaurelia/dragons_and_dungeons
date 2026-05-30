
// variables y constantes iniciales
const express = require('express');
const sequelize = require('./config/database');
const {Habilidad, Trabajo, Personaje} = require('./models/index');
const app = express();
const port = 4500;
const routes = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);   

// mis funciones
async function crearTablas() { // función para crear las tablas en la base de datos
    try{
        await sequelize.sync({ force: true });
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

// mis endpoints por sequelize
app.get('/habilidades', async (req, res) => {
    try {
        const habilidades = await Habilidad.findAll();
        res.status(200).json(habilidades);
    } catch (error) {
        console.error('Error al obtener habilidades:', error);
        res.status(500).json({ error: 'Error al obtener habilidades' });
    }
});

app.post('/habilidades', async (req, res) => {
    try {
        const nuevaHabilidad = await Habilidad.create(req.body);
        res.status(201).json(nuevaHabilidad);
    } catch (error) {
        console.error('Error al crear habilidad:', error);
        res.status(500).json({ error: 'Error al crear habilidad' });
    }
});

app.put('/habilidades/:id', async (req, res) => {
    try {
        const habilidad = await Habilidad.findByPk(req.params.id);
        if (!habilidad) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }
        await habilidad.update(req.body);
        res.status(200).json(habilidad);
    } catch (error) {
        console.error('Error al actualizar habilidad:', error);
        res.status(500).json({ error: 'Error al actualizar habilidad' });
    }
});

app.delete('/habilidades/:id', async (req, res) => {
    try {
        const habilidad = await Habilidad.findByPk(req.params.id);
        if (!habilidad) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }
        await habilidad.destroy();
        res.status(200).json({ message: 'Habilidad eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar habilidad:', error);
        res.status(500).json({ error: 'Error al eliminar habilidad' });
    }
});


// se ejecuta el código
iniciarServidor();
crearTablas()

