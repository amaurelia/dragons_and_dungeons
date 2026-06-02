
const express = require('express');
const router = express.Router();
const { Trabajo, Habilidad } = require('../models');

router.get('/trabajos/:idTrabajo/habilidades', async (req, res) => {
    try {
        const trabajo = await Trabajo.findByPk(req.params.idTrabajo);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        const habilidades = await trabajo.getHabilidades();
        res.status(200).json(habilidades);
    } catch (error) {
        console.error('Error al obtener habilidades del trabajo:', error);
        res.status(500).json({ error: 'Error al obtener habilidades del trabajo' });
    }
});

async function asociarHabilidadATrabajo(req, res) {
    try {
        const trabajo = await Trabajo.findByPk(req.params.idTrabajo);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        const habilidad = await Habilidad.findByPk(req.params.idHabilidad);
        if (!habilidad) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }

        const yaExiste = await trabajo.hasHabilidades(habilidad);
        if (yaExiste) {
            return res.status(409).json({ error: 'La habilidad ya está asociada a este trabajo' });
        }

        await trabajo.addHabilidades(habilidad);
        res.status(201).json(habilidad);
    } catch (error) {
        console.error('Error al crear habilidad:', error);
        res.status(500).json({ error: 'Error al crear habilidad' });
    }
}

router.post('/trabajos/:idTrabajo/habilidades/:idHabilidad', asociarHabilidadATrabajo);
router.post('/trabajo/:idTrabajo/habilidad/:idHabilidad', asociarHabilidadATrabajo);

async function actualizarAsociacion(req, res) {
    try {
        const trabajo = await Trabajo.findByPk(req.params.idTrabajo);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        const habilidad = await Habilidad.findByPk(req.params.idHabilidad);
        if (!habilidad) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }

        const yaExiste = await trabajo.hasHabilidades(habilidad);
        if (!yaExiste) {
            await trabajo.addHabilidades(habilidad);
        }

        res.status(200).json(habilidad);
    } catch (error) {
        console.error('Error al actualizar habilidad:', error);
        res.status(500).json({ error: 'Error al actualizar habilidad' });
    }
}

router.put('/trabajos/:idTrabajo/habilidades/:idHabilidad', actualizarAsociacion);
router.put('/trabajo/:idTrabajo/habilidad/:idHabilidad', actualizarAsociacion);

async function eliminarAsociacion(req, res) {
    try {
        const trabajo = await Trabajo.findByPk(req.params.idTrabajo);
        if (!trabajo) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        const habilidad = await Habilidad.findByPk(req.params.idHabilidad);
        if (!habilidad) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }

        const yaExiste = await trabajo.hasHabilidades(habilidad);
        if (!yaExiste) {
            return res.status(404).json({ error: 'La habilidad no está asociada a este trabajo' });
        }

        await trabajo.removeHabilidades(habilidad);
        res.status(200).json({ message: 'Habilidad eliminada del trabajo correctamente' });
    } catch (error) {
        console.error('Error al eliminar habilidad del trabajo:', error);
        res.status(500).json({ error: 'Error al eliminar habilidad del trabajo' });
    }
}

router.delete('/trabajos/:idTrabajo/habilidades/:idHabilidad', eliminarAsociacion);
router.delete('/trabajo/:idTrabajo/habilidad/:idHabilidad', eliminarAsociacion);

// Exportar el router para usarlo en index.js
module.exports = router;

