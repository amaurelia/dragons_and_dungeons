
const express = require('express');
const router = express.Router();
const { Habilidad } = require('../models');

router.get('/habilidades', async (req, res) => {
    try {
        const habilidades = await Habilidad.findAll();
        res.status(200).json(habilidades);
    } catch (error) {
        console.error('Error al obtener habilidades:', error);
        res.status(500).json({ error: 'Error al obtener habilidades' });
    }
});

router.get('/habilidades/:id', async (req, res) => {
    try {
        const habilidad = await Habilidad.findByPk(req.params.id);
        if (!habilidad) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }
        res.status(200).json(habilidad);
    } catch (error) {
        console.error('Error al obtener habilidad:', error);
        res.status(500).json({ error: 'Error al obtener habilidad' });
    }
});

router.post('/habilidades', async (req, res) => {
    try {
        const nuevaHabilidad = await Habilidad.create(req.body);
        res.status(201).json(nuevaHabilidad);
    } catch (error) {
        console.error('Error al crear habilidad:', error);
        res.status(500).json({ error: 'Error al crear habilidad' });
    }
});

router.put('/habilidades/:id', async (req, res) => {
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

router.delete('/habilidades/:id', async (req, res) => {
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

// Exportar el router para usarlo en index.js
module.exports = router;

