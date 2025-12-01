# 🚀 Guía de Despliegue - GeoSalud

Esta guía te ayudará a desplegar tu aplicación GeoSalud para que tu profesor pueda probar toda la funcionalidad.

## 📋 Requisitos Previos

1. **Cuenta de GitHub** - Para almacenar el código
2. **Cuenta de Netlify** - Para el frontend (gratis)
3. **Cuenta de Railway/Render** - Para el backend (gratis)
4. **Cuenta de MongoDB Atlas** - Para la base de datos (gratis)

---

## 🗄️ PASO 1: Configurar MongoDB Atlas

### 1.1 Crear cuenta y cluster
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (elige la opción FREE)
4. Espera 3-5 minutos mientras se crea

### 1.2 Configurar acceso
1. En "Database Access", crea un usuario:
   - Username: `geosalud_user`
   - Password: (genera una contraseña segura y guárdala)
   - Role: Atlas Admin

2. En "Network Access", agrega acceso:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

### 1.3 Obtener string de conexión
1. Click en "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Copia el string de conexión:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Reemplaza `<username>` y `<password>` con tus credenciales
5. Agrega el nombre de la base de datos: `/geosalud` antes del `?`
   ```
   mongodb+srv://geosalud_user:tu_password@cluster0.xxxxx.mongodb.net/geosalud?retryWrites=true&w=majority
   ```

---

## 🔧 PASO 2: Desplegar el Backend

Recomiendo usar **Railway** (más fácil) o **Render** (alternativa).

### Opción A: Railway (Recomendado)

#### 2.1 Preparar el repositorio
```bash
# En la terminal, navega a la carpeta del proyecto
cd /Users/manu/Desktop/Geos/EXAMEN_FINAL/proyecto-geos

# Inicializa git si no lo has hecho
git init
git add .
git commit -m "Preparar para despliegue"

# Sube a GitHub
# Primero crea un repositorio en github.com
git remote add origin https://github.com/TU_USUARIO/proyecto-geos.git
git branch -M main
git push -u origin main
```

#### 2.2 Desplegar en Railway
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio `proyecto-geos`
5. Railway detectará automáticamente Node.js

#### 2.3 Configurar el backend en Railway
1. Haz click en tu proyecto
2. Selecciona el servicio del backend
3. Ve a "Settings" → "Root Directory" y pon: `backend`
4. Ve a "Variables" y agrega:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://geosalud_user:tu_password@cluster0.xxxxx.mongodb.net/geosalud?retryWrites=true&w=majority
   JWT_SECRET=una_clave_secreta_muy_segura_123456789
   ```
5. Guarda y espera que se redespliegue

#### 2.4 Obtener la URL del backend
1. En Railway, ve a "Settings"
2. Click en "Generate Domain"
3. Copia la URL (ejemplo: `proyecto-geos-production.up.railway.app`)
4. **GUARDA ESTA URL** - la necesitarás para el frontend

### Opción B: Render

#### 2.1 Crear Web Service en Render
1. Ve a [render.com](https://render.com)
2. Inicia sesión con GitHub
3. Click "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Name**: `geosalud-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### 2.2 Variables de entorno en Render
En "Environment", agrega:
```
PORT=3000
MONGODB_URI=tu_string_de_mongodb
JWT_SECRET=una_clave_secreta_muy_segura_123456789
```

#### 2.3 Deploy
Click "Create Web Service" y espera 5-10 minutos.
Copia la URL generada (ejemplo: `geosalud-backend.onrender.com`)

---

## 🌐 PASO 3: Desplegar el Frontend en Netlify

### 3.1 Preparar el frontend
Primero, necesitas crear un archivo `.env` en la carpeta `frontend`:

```bash
cd frontend
# Crea el archivo .env basado en el ejemplo
cp .env.example .env
```

Edita `.env` y pon la URL de tu backend:
```
VITE_API_URL=https://tu-backend.railway.app
```
(o la URL de Render si usaste esa opción)

### 3.2 Desplegar en Netlify (Método GitHub)

#### 3.2.1 Asegúrate de que todo está en GitHub
```bash
# En la raíz del proyecto
cd /Users/manu/Desktop/Geos/EXAMEN_FINAL/proyecto-geos
git add .
git commit -m "Configurar para Netlify"
git push origin main
```

#### 3.2.2 Conectar Netlify con GitHub
1. Ve a [netlify.com](https://www.netlify.com)
2. Inicia sesión con GitHub
3. Click "Add new site" → "Import an existing project"
4. Selecciona "Deploy with GitHub"
5. Autoriza Netlify a acceder a tus repositorios
6. Selecciona tu repositorio `proyecto-geos`

#### 3.2.3 Configurar el build
1. **Base directory**: `frontend`
2. **Build command**: `npm run build`
3. **Publish directory**: `frontend/dist`
4. Click en "Show advanced" → "New variable"
5. Agrega la variable de entorno:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tu-backend.railway.app` (tu URL del backend)

#### 3.2.4 Deploy
1. Click "Deploy site"
2. Espera 2-5 minutos
3. Netlify te dará una URL como: `random-name-123456.netlify.app`

#### 3.2.5 (Opcional) Personalizar el nombre
1. Ve a "Site settings" → "Site details"
2. Click "Change site name"
3. Pon algo como: `geosalud-tu-nombre`
4. Tu URL final será: `geosalud-tu-nombre.netlify.app`

### 3.3 Alternativa: Desplegar con Netlify CLI

Si prefieres usar la terminal:

```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Login en Netlify
netlify login

# En la carpeta del frontend
cd frontend

# Construir la aplicación
npm run build

# Desplegar
netlify deploy --prod

# Sigue las instrucciones:
# - Create & configure a new site: Yes
# - Team: Elige tu team
# - Site name: geosalud-tu-nombre
# - Publish directory: dist
```

---

## ✅ PASO 4: Verificar el Despliegue

### 4.1 Probar el backend
Abre tu navegador y ve a:
```
https://tu-backend.railway.app/api/places
```
Deberías ver `[]` o datos si ya creaste lugares.

### 4.2 Probar el frontend
1. Abre: `https://geosalud-tu-nombre.netlify.app`
2. Verifica que cargue la interfaz
3. Prueba el registro de usuario
4. Prueba el login
5. Prueba crear un lugar en el mapa
6. Verifica todas las funcionalidades

### 4.3 Revisar errores
Si algo no funciona:

**Frontend (Netlify):**
1. Ve a tu sitio en Netlify
2. Click "Deploys" → último deploy → "Deploy log"
3. Revisa los errores

**Backend (Railway):**
1. Ve a tu proyecto en Railway
2. Click en el servicio → "Deployments"
3. Click en el último deployment → "View Logs"

---

## 🔄 PASO 5: Actualizar el Despliegue

Cuando hagas cambios en tu código:

```bash
# En la raíz del proyecto
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

- **Netlify** se actualizará automáticamente (1-2 minutos)
- **Railway/Render** se actualizará automáticamente (3-5 minutos)

---

## 🐛 Solución de Problemas Comunes

### Error: "Failed to fetch"
- Verifica que la variable `VITE_API_URL` esté correctamente configurada en Netlify
- Asegúrate de que el backend esté corriendo (ve a la URL del backend)
- Revisa que CORS esté habilitado en el backend (ya lo tiene)

### Error: "MongoServerError: Authentication failed"
- Verifica que el usuario y contraseña en `MONGODB_URI` sean correctos
- Asegúrate de que el usuario tenga permisos en MongoDB Atlas
- Revisa que la IP 0.0.0.0/0 esté permitida en Network Access

### El frontend se despliega pero muestra página en blanco
- Verifica que el archivo `netlify.toml` esté en la carpeta `frontend`
- Revisa los logs en Netlify
- Asegúrate de que el build directory sea `frontend/dist`

### Error 404 al navegar en la aplicación
- Verifica que el archivo `netlify.toml` tenga la configuración de redirects
- Netlify debe redirigir todas las rutas a `/index.html`

---

## 📝 Checklist Final

Antes de compartir con tu profesor, verifica:

- [ ] Backend desplegado y funcionando (prueba la URL)
- [ ] Frontend desplegado y cargando correctamente
- [ ] Puedes registrar un nuevo usuario
- [ ] Puedes hacer login
- [ ] Puedes crear lugares en el mapa
- [ ] Puedes crear zonas
- [ ] Puedes crear casos
- [ ] Puedes crear recursos
- [ ] El mapa muestra los marcadores correctamente
- [ ] La búsqueda funciona
- [ ] La galería se muestra correctamente

---

## 🎓 URLs para Compartir con el Profesor

Una vez desplegado, comparte estas URLs:

**Aplicación Frontend:**
```
https://geosalud-tu-nombre.netlify.app
```

**API Backend (para verificar):**
```
https://tu-backend.railway.app
```

**Repositorio de GitHub:**
```
https://github.com/TU_USUARIO/proyecto-geos
```

---

## 💡 Consejos Adicionales

1. **Demostración**: Crea algunos datos de ejemplo antes de la presentación
2. **Credenciales de prueba**: Comparte un usuario de prueba con el profesor:
   - Usuario: `profesor@test.com`
   - Contraseña: `test123`

3. **Video de demostración**: Considera grabar un video corto mostrando las funcionalidades

4. **Documentación**: Este archivo `DEPLOYMENT.md` demuestra tu conocimiento del proceso

---

## 🆘 Ayuda

Si tienes problemas durante el despliegue:

1. **Railway**: https://railway.app/help
2. **Netlify**: https://docs.netlify.com
3. **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

¡Buena suerte con tu presentación! 🎉
