//backend/routes/zones.js
const express = require('express');
const router = express.Router();
const zoneService = require('../services/zoneService');
const authenticateToken = require('../middleware/auth');

// Obtener todas las zonas
router.get('/', authenticateToken, async (req, res) => {
  try {
    const zones = await zoneService.getAllZones();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una zona
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newZone = await zoneService.createZone(req.body);
    res.status(201).json(newZone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar zona
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedZone = await zoneService.updateZone(req.params.id, req.body);
    res.json(updatedZone);
  } catch (error) {
    const statusCode = error.message.includes('no encontrada') ? 404 : 400;
    res.status(statusCode).json({ message: error.message });
  }
});

// Borrar zona
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await zoneService.deleteZone(req.params.id);
    res.json(result);
  } catch (error) {
    const statusCode = error.message.includes('no encontrada') ? 404 : 500;
    res.status(statusCode).json({ message: error.message });
  }
});

module.exports = router;