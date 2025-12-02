const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev_key';
const TOKEN_EXPIRES_IN = '8h';

/**
 * Servicio para la gestión de autenticación
 */
class AuthService {
    /**
     * Registrar un nuevo usuario
     * @param {Object} userData - Datos del usuario (email, password)
     * @returns {Promise<Object>} Mensaje de confirmación
     */
    async register(userData) {
        try {
            const { email, password } = userData;

            if (!email || !password) {
                throw new Error('Email and password required');
            }

            const existing = await User.findOne({ email });
            if (existing) {
                throw new Error('User already exists');
            }

            const user = new User({ email, password });
            await user.save();

            return { message: 'User created' };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    /**
     * Iniciar sesión de usuario
     * @param {Object} credentials - Credenciales del usuario (email, password)
     * @returns {Promise<Object>} Token y datos del usuario
     */
    async login(credentials) {
        try {
            const { email, password } = credentials;

            if (!email || !password) {
                throw new Error('Email and password required');
            }

            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: TOKEN_EXPIRES_IN }
            );

            return {
                token,
                user: {
                    id: user._id,
                    email: user.email
                }
            };
        } catch (error) {
            throw new Error(`Login error: ${error.message}`);
        }
    }
}

module.exports = new AuthService();
