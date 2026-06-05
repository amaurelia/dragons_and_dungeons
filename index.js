
// variables y constantes iniciales
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const fileUpload = require('express-fileupload');

const {Habilidad, Trabajo, Personaje} = require('./models/index');
const habilidadesRoutes = require('./endpoints/habilidades');
const trabajosRoutes = require('./endpoints/trabajos');
const personajesRoutes = require('./endpoints/personajes');
const trabajosHabilidadesRoutes = require('./endpoints/trabajos-habilidades');
const personajesObjetosRoutes = require('./endpoints/personajes-objetos');
const objetosRoutes = require('./endpoints/objetos');
const enemigosRoutes = require('./endpoints/enemigos');
const app = express();
const port = 4500;
const routes = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/img', express.static(path.join(__dirname, 'img', 'avatares')));
app.use('/', routes);
app.use(fileUpload());

// ruta del CRUD de habilidades
app.use('/app', habilidadesRoutes);
app.use('/app', trabajosRoutes);
app.use('/app', personajesRoutes);
app.use('/app', trabajosHabilidadesRoutes);
app.use('/app', personajesObjetosRoutes);
app.use('/app', objetosRoutes);
app.use('/app', enemigosRoutes);

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
routes.get('/pruebas', (req, res) => {
    res.sendFile(__dirname + '/templates/pruebas.html');
});

routes.get('/datos', (req, res) => {
    res.sendFile(__dirname + '/templates/datos.html');
});

app.get('/app/avatares', (req, res) => {
    const fs = require('fs');
    const carpeta = path.join(__dirname, 'img', 'avatares');
    fs.readdir(carpeta, (err, archivos) => {
        if (err) {
            return res.status(500).json({ ok: false, mensaje: 'No se pudo leer la carpeta de avatares.' });
        }
        const extensionesImagen = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const imagenes = archivos.filter(f => extensionesImagen.includes(path.extname(f).toLowerCase()));
        res.json(imagenes);
    });
});

app.post('/upload', (req, res) => {

    if(!req.files || !req.files.file) {
        return res.status(400).send('No se han subido archivos.');
    }
    let cantidadArchivos = req.files.file.length || 1;
    console.log('Cantidad de archivos subidos: ' + cantidadArchivos);

    let uploadedFile = req.files.file;
    if(cantidadArchivos === 1) {
        console.log("mostraré el nombre del archivo: " + uploadedFile.name);
        console.log("mostraré el tamaño del archivo: " + uploadedFile.size);
        console.log("mostraré el tipo del archivo: " + uploadedFile.mimetype);
        if(uploadedFile.size < 4000000) {
            if(uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/png') {
                uploadedFile.mv(__dirname + '/img/avatares/' + uploadedFile.name, (err) => {
                    // console.log('Archivo subido correctamente: ' + uploadedFile.name);
                });
            }
            else {
                // return res.status(400).send('El tipo de archivo no es permitido. Solo se permiten archivos JPEG y PNG.');
            }   
        }
        else{
            // return res.status(400).send('El archivo es demasiado grande. El tamaño máximo permitido es de 4MB.');
        }
        // return res.send('Archivo subido correctamente.');
    }
    else {
        uploadedFile.forEach(archivo => {
            console.log("mostraré el nombre de este archivo: " + archivo.name);
            console.log("mostraré el tamaño de este archivo: " + archivo.size);
            if(archivo.size < 4000000) {
                console.log("mostraré el tipo de este archivo: " + archivo.mimetype);
                if(archivo.mimetype === 'image/jpeg' || archivo.mimetype === 'image/png') {
                    archivo.mv(__dirname + '/img/avatares/' + archivo.name, (err) => {
                        // console.log('Archivo subido correctamente: ' + archivo.name);
                    });
                }
                else {
                    // return res.status(400).send('El tipo de archivo no es permitido. Solo se permiten archivos JPEG y PNG.');
                }
            }
            else {
                // return res.status(400).send('El archivo ' + archivo.name + ' es demasiado grande. El tamaño máximo permitido es de 4MB.');
            }
        });
    }
    res.json({ ok: true, mensaje: 'Archivos subidos correctamente.' });

});

// se ejecuta el código
async function iniciarApp() {
    await crearTablas();
    await iniciarServidor();
}

iniciarApp();

