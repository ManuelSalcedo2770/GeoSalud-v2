# 🔧 Solución al Error de Conexión Frontend-Backend

## ✅ Cambios Realizados

Se actualizaron los archivos `Login.jsx` y `Register.jsx` para usar la variable de entorno `VITE_API_URL` en lugar de `localhost:3000` hardcodeado.

---

## 📋 Pasos para Configurar la Conexión

### 1. ¿Tienes el Backend Desplegado?

**Primero necesitas desplegar el backend.** Si no lo has hecho, sigue estos pasos:

#### Opción A: Railway (Recomendado)
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio `GeoSalud-v2`
5. En Settings:
   - Root Directory: `backend`
   - Variables de entorno:
     ```
     PORT=3000
     MONGODB_URI=tu_string_de_mongodb
     JWT_SECRET=tu_clave_secreta_segura
     ```
6. En Settings → Networking → "Generate Domain"
7. **COPIA LA URL** (ejemplo: `geosalud-v2-production.up.railway.app`)

#### Opción B: Render
1. Ve a [render.com](https://render.com)
2. Inicia sesión con GitHub
3. "New" → "Web Service"
4. Conecta tu repositorio `GeoSalud-v2`
5. Configura:
   - Name: `geosalud-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Variables de entorno:
   ```
   PORT=10000
   MONGODB_URI=tu_string_de_mongodb
   JWT_SECRET=tu_clave_secreta_segura
   ```
7. Click "Create Web Service"
8. **COPIA LA URL** (ejemplo: `geosalud-backend.onrender.com`)

---

### 2. Configurar Variable de Entorno en Netlify

Una vez que tengas la URL del backend: geosalud-v2-production.up.railway.app

1. Ve al dashboard de Netlify
2. Selecciona tu sitio (GeoSalud-v2)
3. Ve a **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Agrega:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tu-backend-url.com` (SIN barra final)
   
   Ejemplos:
   - Railway: `https://geosalud-v2-production.up.railway.app`
   - Render: `https://geosalud-backend.onrender.com`

6. **Scopes**: Marca "All scopes"
7. Click **Save**

---

### 3. Verificar Backend está Funcionando

Antes de continuar, verifica que tu backend esté activo:

1. Abre en tu navegador: `https://tu-backend-url.com/api/auth/test`
2. Deberías ver algo como: `{"message": "API funcionando"}`

Si ves un error 404 o no responde, revisa:
- ¿El backend está desplegado correctamente?
- ¿Las variables de entorno están configuradas?
- ¿MongoDB está conectado?

---

### 4. Redesplegar el Frontend

Después de configurar la variable de entorno:

1. Haz commit y push de los cambios:
   ```bash
   git add .
   git commit -m "Fix: Configurar conexión con backend usando variable de entorno"
   git push
   ```

2. En Netlify:
   - Ve a **Deploys**
   - Click **Trigger deploy** → **Clear cache and deploy site**

3. Espera 1-2 minutos a que se complete el deploy

---

### 5. Probar la Conexión

1. Abre tu sitio de Netlify
2. Intenta registrar un nuevo usuario
3. Si funciona, deberías ver: "¡Registro exitoso!"
4. Luego podrás iniciar sesión

---

## 🔍 Verificación Rápida

Si sigue sin funcionar, abre la consola del navegador (F12) y verifica:

1. **En la pestaña Console**: ¿Hay errores de CORS?
2. **En la pestaña Network**: 
   - Busca la petición a `/api/auth/register` o `/api/auth/login`
   - ¿Cuál es la URL completa?
   - ¿Cuál es el error HTTP (404, 500, CORS)?

---

## ⚙️ Configuración Adicional del Backend

Asegúrate de que tu `backend/app.js` tenga configurado CORS correctamente:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tu-frontend-netlify.netlify.app'
  ],
  credentials: true
}));
```

---

## 📞 Siguiente Paso

¿Cuál es la URL de tu backend desplegado? Si aún no lo has desplegado, te puedo ayudar con el proceso completo.
