const express = require('express');
const router = express.Router();
const resourceService = require('../services/resourceService');
const authenticateToken = require('../middleware/auth');

// Obtener todos los recursos
router.get('/', authenticateToken, async (req, res) => {
    try {
        const resources = await resourceService.getAllResources();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener recursos críticos (por debajo del nivel crítico)
router.get('/status/critical', authenticateToken, async (req, res) => {
    try {
        const criticalResources = await resourceService.getCriticalResources();
        res.json(criticalResources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un recurso específico
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const resource = await resourceService.getResourceById(req.params.id);
        res.json(resource);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({ message: err.message });
    }
});

// Crear un nuevo recurso
router.post('/', authenticateToken, async (req, res) => {
    try {
        const savedResource = await resourceService.createResource(req.body);
        res.status(201).json(savedResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un recurso
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedResource = await resourceService.updateResource(req.params.id, req.body);
        res.json(updatedResource);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 400;
        res.status(statusCode).json({ message: err.message });
    }
});

// Eliminar un recurso
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await resourceService.deleteResource(req.params.id);
        res.json(result);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({ message: err.message });
    }
});

module.exports = router;
