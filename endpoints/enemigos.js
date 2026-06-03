
const express = require('express');
const router = express.Router();
const { Enemigo } = require('../models');

// CRUD para enemigos
router.get('/enemigos', async (req, res) => {
    try {
        const enemigos = await Enemigo.findAll();
        res.status(200).json(enemigos);
    } catch (error) {
        console.error('Error al obtener enemigos:', error);
        res.status(500).json({ error: 'Error al obtener enemigos' });
    }
});

router.get('/enemigos/:id', async (req, res) => {
    try {
        const enemigo = await Enemigo.findByPk(req.params.id);
        if (!enemigo) {
            return res.status(404).json({ error: 'Enemigo no encontrado' });
        }
        res.status(200).json(enemigo);
    } catch (error) {
        console.error('Error al obtener enemigo:', error);
        res.status(500).json({ error: 'Error al obtener enemigo' });
    }
});

router.post('/enemigos', async (req, res) => {
    try {
        const nuevoEnemigo = await Enemigo.create(req.body);
        res.status(201).json(nuevoEnemigo);
    } catch (error) {
        console.error('Error al crear enemigo:', error);
        res.status(500).json({ error: 'Error al crear enemigo' });
    }
});

router.put('/enemigos/:id', async (req, res) => {
    try {
        const enemigo = await Enemigo.findByPk(req.params.id);
        if (!enemigo) {
            return res.status(404).json({ error: 'Enemigo no encontrado' });
        }
        await enemigo.update(req.body);
        res.status(200).json(enemigo);
    } catch (error) {
        console.error('Error al actualizar enemigo:', error);
        res.status(500).json({ error: 'Error al actualizar enemigo' });
    }
});

router.delete('/enemigos/:id', async (req, res) => {
    try {
        const enemigo = await Enemigo.findByPk(req.params.id);
        if (!enemigo) {
            return res.status(404).json({ error: 'Enemigo no encontrado' });
        }
        await enemigo.destroy();
        res.status(200).json({ message: 'Enemigo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar enemigo:', error);
        res.status(500).json({ error: 'Error al eliminar enemigo' });
    }
});

// Exportar el router para usarlo en index.js
module.exports = router;

