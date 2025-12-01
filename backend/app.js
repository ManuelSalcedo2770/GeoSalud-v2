const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const places = require('./routes/places');
const zones = require('./routes/zones');
const cases = require('./routes/cases');
const resources = require('./routes/resources');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Configuración de CORS para permitir conexiones desde el frontend
const corsOptions = {
    origin: function (origin, callback) {
        // Permitir requests sin origin (como apps móviles o Postman)
        if (!origin) return callback(null, true);
        
        // Lista de orígenes permitidos
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            process.env.FRONTEND_URL,
            /\.netlify\.app$/,  // Permite cualquier subdominio de netlify.app
        ].filter(Boolean);
        
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) {
                return allowed.test(origin);
            }
            return allowed === origin;
        });
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, true); // En producción, considera cambiar a: callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Endpoint raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({
        message: 'GeoSalud API está funcionando',
        version: '2.0',
        endpoints: {
            auth: '/api/auth',
            places: '/api/places',
            zones: '/api/zones',
            cases: '/api/cases',
            resources: '/api/resources'
        }
    });
});

app.use('/api/auth', auth);
app.use('/api/places', places);
app.use('/api/zones', zones);
app.use('/api/cases', cases);
app.use('/api/resources', resources);

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI no está definida en el archivo .env');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
        .then(() => {console.log('✓ Conectado a MongoDB exitosamente');})
        .catch((error) => {
            console.error('✗ Error al conectar a MongoDB:', error.message);
            process.exit(1);
        });

app.listen(port, () => {
    console.log("My server is working on: " + `http://localhost:${port}`);
});

module.exports = app;