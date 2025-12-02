const express = require('express');
const router = express.Router();
const placeService = require('../services/placeService');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const places = await placeService.getAllPlaces();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const saved = await placeService.createPlace(req.body);
        res.json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Endpoint para actualizar un lugar
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const place = await placeService.updatePlace(req.params.id, req.body);
        res.json(place);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 400;
        res.status(statusCode).json({ message: err.message });
    }
});

//Endpoint para eliminar un lugar
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await placeService.deletePlace(req.params.id);
        res.json(result);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({ message: err.message });
    }
});

module.exports = router;