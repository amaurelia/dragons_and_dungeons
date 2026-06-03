
const express = require('express');
const router = express.Router();
const { Objeto } = require('../models');

// CRUD para objetos
router.get('/objetos', async (req, res) => {
    try {
        const objetos = await Objeto.findAll();
        res.status(200).json(objetos);
    } catch (error) {
        console.error('Error al obtener objetos:', error);
        res.status(500).json({ error: 'Error al obtener objetos' });
    }
});

router.get('/objetos/:id', async (req, res) => {
    try {
        const objeto = await Objeto.findByPk(req.params.id);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        res.status(200).json(objeto);
    } catch (error) {
        console.error('Error al obtener objeto:', error);
        res.status(500).json({ error: 'Error al obtener objeto' });
    }
});

router.post('/objetos', async (req, res) => {
    try {
        const nuevoObjeto = await Objeto.create(req.body);
        res.status(201).json(nuevoObjeto);
    } catch (error) {
        console.error('Error al crear objeto:', error);
        res.status(500).json({ error: 'Error al crear objeto' });
    }
});

router.put('/objetos/:id', async (req, res) => {
    try {
        const objeto = await Objeto.findByPk(req.params.id);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        await objeto.update(req.body);
        res.status(200).json(objeto);
    } catch (error) {
        console.error('Error al actualizar objeto:', error);
        res.status(500).json({ error: 'Error al actualizar objeto' });
    }
});

router.delete('/objetos/:id', async (req, res) => {
    try {
        const objeto = await Objeto.findByPk(req.params.id);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }
        await objeto.destroy();
        res.status(200).json({ message: 'Objeto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar objeto:', error);
        res.status(500).json({ error: 'Error al eliminar objeto' });
    }
});

// Exportar el router para usarlo en index.js
module.exports = router;

