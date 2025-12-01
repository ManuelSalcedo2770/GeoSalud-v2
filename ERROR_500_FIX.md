# 🔴 Error 500 - Diagnóstico y Solución

## ❌ Problema Actual

Error 500 al crear usuario = **El backend tiene un problema interno**

Causas más comunes:
1. MongoDB no está conectado
2. Variable `MONGODB_URI` no configurada en Railway
3. String de conexión de MongoDB incorrecto

---

## 🔍 PASO 1: Verificar Logs de Railway

### Ir a Railway Dashboard

1. Ve a [Railway](https://railway.app)
2. Selecciona tu proyecto
3. Haz clic en tu servicio del backend
4. Ve a **Deployments** → Selecciona el deployment actual
5. **Revisa los logs**

### ¿Qué deberías ver en los logs?

#### ✅ **Logs Correctos:**
```
✓ Conectado a MongoDB exitosamente
My server is working on: http://localhost:3000
```

#### ❌ **Logs con Error:**
```
ERROR: MONGODB_URI no está definida en el archivo .env
```
O:
```
✗ Error al conectar a MongoDB: ...
MongooseError: ...
```

---

## 🔧 PASO 2: Configurar Variables de Entorno en Railway

### Opción A: Si NO tienes MongoDB configurado

#### 1. Crear Cuenta en MongoDB Atlas (Gratis)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta (si no tienes)
3. Crea un cluster GRATIS (M0)

#### 2. Configurar Acceso

**Database Access:**
1. Click "Database Access" en el menú lateral
2. Click "Add New Database User"
3. Username: `geosalud_admin`
4. Password: **Genera una contraseña segura** (guárdala)
5. Database User Privileges: **Atlas Admin**
6. Click "Add User"

**Network Access:**
1. Click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

#### 3. Obtener String de Conexión

1. Ve a "Database" → Click "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Driver: **Node.js**
4. Copia el string de conexión:
```
mongodb+srv://geosalud_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. **IMPORTANTE:** Reemplaza `<password>` con tu contraseña
6. Agrega el nombre de la base de datos antes del `?`:
```
mongodb+srv://geosalud_admin:tu_password@cluster0.xxxxx.mongodb.net/geosalud?retryWrites=true&w=majority
```

### Opción B: Si YA tienes MongoDB

Simplemente copia tu string de conexión existente.

---

## ⚙️ PASO 3: Agregar Variables en Railway

1. En Railway, selecciona tu servicio backend
2. Ve a la pestaña **Variables**
3. Agrega o verifica estas variables:

```
MONGODB_URI = mongodb+srv://usuario:password@cluster.mongodb.net/geosalud?retryWrites=true&w=majority
JWT_SECRET = tu_clave_secreta_muy_segura_12345
PORT = 3000
FRONTEND_URL = https://tu-sitio.netlify.app
```

**⚠️ IMPORTANTE:**
- Reemplaza los valores con tus datos reales
- NO uses comillas
- NO dejes espacios antes o después del `=`

### Ejemplo Real:
```
MONGODB_URI=mongodb+srv://geosalud_admin:MiPassword123@cluster0.abc123.mongodb.net/geosalud?retryWrites=true&w=majority
JWT_SECRET=mi_clave_super_secreta_2024
PORT=3000
FRONTEND_URL=https://geosalud-v2.netlify.app
```

---

## 🔄 PASO 4: Redesplegar Railway

Después de agregar las variables:

1. Railway debería redesplegar automáticamente
2. Si no lo hace: Click en **Deploy** → **Redeploy**
3. Espera 1-2 minutos
4. Revisa los logs nuevamente

### Deberías ver:
```
✓ Conectado a MongoDB exitosamente
My server is working on: http://localhost:3000
```

---

## ✅ PASO 5: Verificar que Funciona

### 1. Probar Backend Directamente

Abre en tu navegador:
```
https://geosalud-v2-production.up.railway.app/api/auth/login
```

Deberías ver:
```json
{"message":"Email and password required"}
```

### 2. Probar Registro desde Frontend

1. Ve a tu sitio de Netlify
2. Intenta registrar un usuario
3. Abre consola (F12) → **Network**
4. Busca la petición `register`
5. Revisa:
   - **Status Code:** Debe ser 201 (no 500)
   - **Response:** `{"message":"User created"}`

---

## 🐛 Troubleshooting

### Error: "bad auth : Authentication failed"

**Causa:** Password incorrecta en MongoDB
**Solución:** 
1. Verifica la contraseña en MongoDB Atlas
2. Asegúrate de escapar caracteres especiales en la URL
3. Ejemplo: `@` → `%40`, `#` → `%23`

### Error: "connection timed out"

**Causa:** IP no permitida en MongoDB
**Solución:**
1. Ve a MongoDB Atlas → Network Access
2. Verifica que `0.0.0.0/0` esté en la lista

### Error: "querySrv ENOTFOUND"

**Causa:** String de conexión incorrecto
**Solución:**
1. Copia nuevamente el string desde MongoDB Atlas
2. Verifica que no tenga espacios
3. Asegúrate de que tenga el formato correcto

---

## 📋 Checklist

- [ ] Revisar logs de Railway
- [ ] Verificar que MongoDB Atlas esté configurado
- [ ] Obtener string de conexión correcto
- [ ] Agregar `MONGODB_URI` en Railway
- [ ] Agregar `JWT_SECRET` en Railway
- [ ] Agregar `PORT=3000` en Railway
- [ ] Esperar a que Railway redespliegue
- [ ] Verificar logs: "✓ Conectado a MongoDB"
- [ ] Probar registro desde frontend

---

## 💡 Tip

Si no ves los logs en Railway:
- Click en el deployment actual
- Los logs aparecen en tiempo real
- Busca mensajes de error en rojo

---

**¿Qué ves en los logs de Railway?** Copia y pega el error exacto si necesitas más ayuda.
