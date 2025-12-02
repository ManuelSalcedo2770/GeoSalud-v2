const express = require('express');
const router = express.Router();
const caseService = require('../services/caseService');
const authenticateToken = require('../middleware/auth');

// Obtener todos los casos
router.get('/', authenticateToken, async (req, res) => {
    try {
        const cases = await caseService.getAllCases();
        res.json(cases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener estadísticas de casos
router.get('/stats/summary', authenticateToken, async (req, res) => {
    try {
        const stats = await caseService.getCaseStats();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un caso específico
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const caseItem = await caseService.getCaseById(req.params.id);
        res.json(caseItem);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({ message: err.message });
    }
});

// Crear un nuevo caso
router.post('/', authenticateToken, async (req, res) => {
    try {
        const savedCase = await caseService.createCase(req.body);
        res.status(201).json(savedCase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un caso
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedCase = await caseService.updateCase(req.params.id, req.body);
        res.json(updatedCase);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 400;
        res.status(statusCode).json({ message: err.message });
    }
});

// Eliminar un caso
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await caseService.deleteCase(req.params.id);
        res.json(result);
    } catch (err) {
        const statusCode = err.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({ message: err.message });
    }
});

module.exports = router;
