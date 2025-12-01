const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Eliminar índices antiguos si existen
UserSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const collection = this.constructor.collection;
      const indexes = await collection.indexes();
      
      // Buscar y eliminar índice de username si existe
      const usernameIndex = indexes.find(idx => idx.name === 'username_1');
      if (usernameIndex) {
        await collection.dropIndex('username_1');
        console.log('✓ Índice obsoleto "username_1" eliminado');
      }
    } catch (err) {
      // Ignorar si el índice no existe
      if (err.code !== 27) { // 27 = IndexNotFound
        console.log('Nota: No se pudo eliminar índice username:', err.message);
      }
    }
  }
  next();
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
