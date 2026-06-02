
const express = require('express');
const router = express.Router();
const { Trabajo } = require('../models');

// CRUD para trabajos
router.get('/trabajos', async (req, res) => {
    try {
        const trabajos = await Trabajo.findAll();
        res.status(200).json(trabajos);
    } catch (error) {
        console.error('Error al obtener trabajos:', error);
        res.status(500).json({ error: 'Error al obtener trabajos' });
    }
});

router.get('/trabajos/:id', async (req, res) => {
    try {
        const trabajo = await Trabajo.findByPk(req.params.id);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        res.status(200).json(trabajo);
    } catch (error) {
        console.error('Error al obtener trabajo:', error);
        res.status(500).json({ error: 'Error al obtener trabajo' });
    }
});

router.post('/trabajos', async (req, res) => {
    try {
        const nuevoTrabajo = await Trabajo.create(req.body);
        res.status(201).json(nuevoTrabajo);
    } catch (error) {
        console.error('Error al crear trabajo:', error);
        res.status(500).json({ error: 'Error al crear trabajo' });
    }
});

router.put('/trabajos/:id', async (req, res) => {
    try {
        const trabajo = await Trabajo.findByPk(req.params.id);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        await trabajo.update(req.body);
        res.status(200).json(trabajo);
    } catch (error) {
        console.error('Error al actualizar trabajo:', error);
        res.status(500).json({ error: 'Error al actualizar trabajo' });
    }
});

router.delete('/trabajos/:id', async (req, res) => {
    try {
        const trabajo = await Trabajo.findByPk(req.params.id);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        await trabajo.destroy();
        res.status(200).json({ message: 'Trabajo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar trabajo:', error);
        res.status(500).json({ error: 'Error al eliminar trabajo' });
    }
});

// ENDPOINTS PARA ASOCIACIONES ENTRE TRABAJOS Y HABILIDADES (opcional, dependiendo de cómo quieras manejar las asociaciones)
// Por ejemplo, podrías tener endpoints para asignar habilidades a trabajos o para obtener las habilidades de un trabajo específico.



// Exportar el router para usarlo en index.js
module.exports = router;

