/**
 * Script para eliminar índices obsoletos de la base de datos
 * Ejecutar con: node fix-indexes.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI no está definida en el archivo .env');
    process.exit(1);
}

async function fixIndexes() {
    try {
        console.log('Conectando a MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✓ Conectado a MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        
        console.log('\nBuscando colección de usuarios...');
        const usersCollection = collections.find(col => col.name === 'users');
        
        if (!usersCollection) {
            console.log('No se encontró la colección "users". Creando...');
            await db.createCollection('users');
            console.log('✓ Colección "users" creada');
        }

        const collection = db.collection('users');
        const indexes = await collection.indexes();
        
        console.log('\nÍndices actuales:');
        indexes.forEach(idx => {
            console.log(`  - ${idx.name}: ${JSON.stringify(idx.key)}`);
        });

        // Buscar índice obsoleto de username
        const usernameIndex = indexes.find(idx => idx.name === 'username_1');
        
        if (usernameIndex) {
            console.log('\n⚠️  Encontrado índice obsoleto "username_1"');
            console.log('Eliminando...');
            await collection.dropIndex('username_1');
            console.log('✓ Índice "username_1" eliminado exitosamente');
        } else {
            console.log('\n✓ No se encontró el índice obsoleto "username_1"');
        }

        // Verificar que existe el índice de email
        const emailIndex = indexes.find(idx => idx.key && idx.key.email);
        if (!emailIndex) {
            console.log('\nCreando índice para email...');
            await collection.createIndex({ email: 1 }, { unique: true });
            console.log('✓ Índice de email creado');
        } else {
            console.log('\n✓ Índice de email ya existe');
        }

        console.log('\n✅ Base de datos actualizada correctamente');
        console.log('Ahora puedes intentar registrar usuarios nuevamente.');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\nConexión cerrada.');
        process.exit(0);
    }
}

fixIndexes();
