
const express = require('express');
const router = express.Router();
const { Personaje } = require('../models');

router.get('/personajes', async (req, res) => {
    try {
        const personajes = await Personaje.findAll();
        res.status(200).json(personajes);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        res.status(500).json({ error: 'Error al obtener personajes' });
    }
});

router.get('/personajes/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findByPk(req.params.id);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        res.status(200).json(personaje);
    } catch (error) {
        console.error('Error al obtener personaje:', error);
        res.status(500).json({ error: 'Error al obtener personaje' });
    }
});

router.post('/personajes', async (req, res) => {
    try {
        const nuevoPersonaje = await Personaje.create(req.body);
        res.status(201).json(nuevoPersonaje);
    } catch (error) {
        console.error('Error al crear personaje:', error);
        res.status(500).json({ error: 'Error al crear personaje' });
    }
});

router.put('/personajes/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findByPk(req.params.id);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        await personaje.update(req.body);
        res.status(200).json(personaje);
    } catch (error) {
        console.error('Error al actualizar personaje:', error);
        res.status(500).json({ error: 'Error al actualizar personaje' });
    }
});

router.delete('/personajes/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findByPk(req.params.id);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        await personaje.destroy();
        res.status(200).json({ message: 'Personaje eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar personaje:', error);
        res.status(500).json({ error: 'Error al eliminar personaje' });
    }
});

// Exportar el router para usarlo en index.js
module.exports = router;

