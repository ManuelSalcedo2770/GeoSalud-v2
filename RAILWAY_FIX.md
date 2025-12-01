# 🚂 Pasos para Arreglar Railway

## ✅ Cambios Realizados

1. ✓ Agregado script `build` en package.json para recompilar bcrypt
2. ✓ Creado archivo `.npmrc` para permisos de npm
3. ✓ Creado `railway.json` con configuración específica
4. ✓ Mejorado CORS para permitir conexiones desde Netlify
5. ✓ Cambios pusheados a GitHub

---

## 🔧 Pasos en Railway

### 1. Redesplegar desde GitHub

Railway debería detectar automáticamente el push y comenzar un nuevo deploy. Si no lo hace:

1. Ve a tu proyecto en [Railway](https://railway.app)
2. Haz click en tu servicio backend
3. Click en **Deploy** → **Redeploy**

### 2. Verificar Variables de Entorno

Asegúrate de tener estas variables configuradas en Railway:

```
PORT=3000
MONGODB_URI=tu_connection_string_de_mongodb
JWT_SECRET=una_clave_secreta_muy_segura
FRONTEND_URL=https://tu-sitio.netlify.app
```

Para agregar/verificar:
1. Click en tu servicio
2. Ve a **Variables**
3. Asegúrate de que todas estén configuradas

### 3. Verificar Root Directory

1. Ve a **Settings**
2. Busca **Root Directory**
3. Debe estar configurado como: `backend`

### 4. Verificar el Build Command (Opcional)

1. En **Settings** → **Build**
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`

### 5. Monitorear el Deploy

1. Ve a **Deployments**
2. Click en el deployment más reciente
3. Observa los logs en tiempo real
4. Deberías ver:
   ```
   > sitiowebgeos@1.0.0 build
   > npm install && npm rebuild bcrypt --build-from-source
   
   > sitiowebgeos@1.0.0 start
   > node app.js
   
   My server is working on: http://localhost:3000
   ✓ Conectado a MongoDB exitosamente
   ```

---

## ✅ Verificación

Una vez que el deploy esté exitoso:

### 1. Obtén tu URL de Railway
```
https://geosalud-v2-production.up.railway.app
```

### 2. Prueba el endpoint
Abre en tu navegador:
```
https://geosalud-v2-production.up.railway.app
```

Deberías ver el contenido del `public/index.html`

### 3. Prueba la API
```
https://geosalud-v2-production.up.railway.app/api/auth/login
```

Si ves un error 404 o un JSON, ¡está funcionando!

---

## 🌐 Configurar Netlify

Después de que Railway esté funcionando:

### 1. Ir a Netlify Dashboard
1. Selecciona tu sitio
2. **Site configuration** → **Environment variables**

### 2. Agregar Variable
- **Key**: `VITE_API_URL`
- **Value**: `https://geosalud-v2-production.up.railway.app`
- **Scopes**: All scopes
- Click **Save**

### 3. Redesplegar Frontend
1. Ve a **Deploys**
2. Click **Trigger deploy** → **Clear cache and deploy site**

---

## 🎯 Resultado Final

Después de todo esto:
1. ✅ Backend funcionando en Railway
2. ✅ Frontend conectándose al backend
3. ✅ Registro de usuarios funcionando
4. ✅ Login funcionando

---

## 🔍 Si Sigue sin Funcionar

### Opción 1: Borrar node_modules en Railway
```bash
# En Settings → Redeploy
# Railway borrará automáticamente node_modules y reinstalará
```

### Opción 2: Usar bcryptjs en lugar de bcrypt
Si el problema persiste, podemos cambiar a `bcryptjs` que es una implementación en JavaScript puro (sin compilación nativa).

¿Quieres que haga ese cambio también?
