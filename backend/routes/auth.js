const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Endpoint de prueba para verificar que la API está funcionando
router.get('/test', (req, res) => {
  res.json({ 
    message: 'API de autenticación funcionando correctamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login'
    }
  });
});

router.post('/register', async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    const statusCode = err.message.includes('already exists') ? 400 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    const statusCode = err.message.includes('Invalid credentials') ? 401 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
