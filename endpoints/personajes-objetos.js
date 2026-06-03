
const express = require('express');
const router = express.Router();
const { Personaje, Objeto } = require('../models');

router.get('/personajes/:idPersonaje/objetos', async (req, res) => {
    try {
        const personaje = await Personaje.findByPk(req.params.idPersonaje);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }

        const objetos = await personaje.getObjetos();
        res.status(200).json(objetos);
    } catch (error) {
        console.error('Error al obtener objetos del personaje:', error);
        res.status(500).json({ error: 'Error al obtener objetos del personaje' });
    }
});

async function asociarObjetoAPersonaje(req, res) {
    try {
        const personaje = await Personaje.findByPk(req.params.idPersonaje);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        const objeto = await Objeto.findByPk(req.params.idObjeto);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }

        const yaExiste = await personaje.hasObjetos(objeto);
        if (yaExiste) {
            return res.status(409).json({ error: 'El objeto ya está asociado a este personaje' });
        }

        await personaje.addObjetos(objeto);
        res.status(201).json(objeto);
    } catch (error) {
        console.error('Error al asociar objeto al personaje:', error);
        res.status(500).json({ error: 'Error al asociar objeto al personaje' });
    }
}

router.post('/trabajo/:idTrabajo/objetos/:idObjeto', asociarObjetoAPersonaje);
router.post('/personaje/:idPersonaje/objeto/:idObjeto', asociarObjetoAPersonaje);

async function actualizarAsociacion(req, res) {
    try {
        const personaje = await Personaje.findByPk(req.params.idPersonaje);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        const objeto = await Objeto.findByPk(req.params.idObjeto);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }

        const yaExiste = await personaje.hasObjetos(objeto);
        if (!yaExiste) {
            await personaje.addObjetos(objeto);
        }

        res.status(200).json(objeto);
    } catch (error) {
        console.error('Error al actualizar objeto:', error);
        res.status(500).json({ error: 'Error al actualizar objeto' });
    }
}

router.put('/personaje/:idPersonaje/objeto/:idObjeto', actualizarAsociacion);
router.put('/personaje/:idPersonaje/objeto/:idObjeto', actualizarAsociacion);

async function eliminarAsociacion(req, res) {
    try {
        const personaje = await Personaje.findByPk(req.params.idPersonaje);
        if (!personaje) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        const objeto = await Objeto.findByPk(req.params.idObjeto);
        if (!objeto) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }

        const yaExiste = await personaje.hasObjetos(objeto);
        if (!yaExiste) {
            return res.status(404).json({ error: 'El objeto no está asociado a este personaje' });
        }

        await personaje.removeObjetos(objeto);
        res.status(200).json({ message: 'Objeto eliminado del personaje correctamente' });
    } catch (error) {
        console.error('Error al eliminar objeto del personaje:', error);
        res.status(500).json({ error: 'Error al eliminar objeto del personaje' });
    }
}

router.delete('/personaje/:idPersonaje/objeto/:idObjeto', eliminarAsociacion);

// Exportar el router para usarlo en index.js
module.exports = router;

