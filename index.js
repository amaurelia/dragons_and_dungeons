
const express = require('express');
const app = express();
const port = 4500;
const routes = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);   

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi proyecto de D&D!');
});

app.get('/habilidades', (req, res) => {
    res.query('SELECT * FROM habilidades', (err, results) => {
        if (err) {
            console.error('Error al obtener habilidades:', err);
            res.status(500).json({ error: 'Error al obtener habilidades' });
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

console.log("Bienvenido a mi proyecto de D&D")

