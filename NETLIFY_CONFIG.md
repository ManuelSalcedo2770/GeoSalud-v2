# 🔧 Solución Error 404 en Netlify

## ❌ Problema Actual

El frontend en Netlify está intentando hacer requests pero obtiene 404 porque **NO TIENE CONFIGURADA** la variable de entorno `VITE_API_URL`.

**Error en consola:**
```
Failed to load resource: the server responded with a status of 404 () (register, line 0)
SyntaxError: The string did not match the expected pattern.
```

Esto significa que está intentando conectarse a una URL incorrecta o incompleta.

---

## ✅ Solución: Configurar Variable de Entorno en Netlify

### Paso 1: Ir a Netlify Dashboard

1. Abre [Netlify](https://app.netlify.com/)
2. Selecciona tu sitio (GeoSalud-v2 o como lo hayas nombrado)

### Paso 2: Agregar Variable de Entorno

1. En el menú lateral, haz clic en **"Site configuration"**
2. Luego en **"Environment variables"**
3. Haz clic en **"Add a variable"** o **"Add single variable"**

### Paso 3: Ingresar los Valores

Ingresa EXACTAMENTE estos valores:

```
Key (nombre):     VITE_API_URL
Value (valor):    https://geosalud-v2-production.up.railway.app
```

**⚠️ IMPORTANTE:**
- NO incluyas barra final (`/`) al final de la URL
- NO incluyas `http://`, debe ser `https://`
- Verifica que sea la URL correcta de tu backend en Railway

### Paso 4: Guardar

1. En **"Scopes"** asegúrate de que estén marcados:
   - ✅ All deploys
   - ✅ Builds
   - ✅ Functions
   - ✅ Post processing

2. Haz clic en **"Save"** o **"Create variable"**

### Paso 5: Redesplegar el Sitio

**⚠️ CRÍTICO:** Después de agregar variables de entorno, DEBES redesplegar:

1. Ve a la sección **"Deploys"** en el menú lateral
2. Haz clic en **"Trigger deploy"**
3. Selecciona **"Clear cache and deploy site"**
4. Espera 1-2 minutos a que se complete el deploy

---

## 🔍 Verificación

### 1. Verificar que Railway esté funcionando

Abre en tu navegador:
```
https://geosalud-v2-production.up.railway.app
```

Deberías ver tu página HTML o un mensaje del servidor.

### 2. Probar el endpoint de auth

Abre:
```
https://geosalud-v2-production.up.railway.app/api/auth/login
```

Deberías ver un error 400 con JSON (esto es CORRECTO):
```json
{"message":"Email and password required"}
```

Si ves esto ✅ = Backend funcionando correctamente

### 3. Verificar Variables en Netlify

1. Ve a **Site configuration** → **Environment variables**
2. Deberías ver:
   ```
   VITE_API_URL = https://geosalud-v2-production.up.railway.app
   ```

### 4. Probar el Frontend

Después del redespliegue:

1. Abre tu sitio de Netlify
2. Intenta registrar un nuevo usuario
3. Abre la consola (F12) → pestaña **Network**
4. Busca la petición a `register`
5. Verifica que la URL sea: `https://geosalud-v2-production.up.railway.app/api/auth/register`

---

## 🐛 Si Aún No Funciona

### Problema 1: La URL sigue siendo incorrecta

**Causa:** Variables de entorno no se aplicaron
**Solución:** 
- Verifica que guardaste la variable
- Haz **Clear cache and deploy site** nuevamente
- Espera a que termine completamente el deploy

### Problema 2: Error de CORS

Si ves en consola:
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solución:** Necesitamos actualizar el backend. Dime si ves este error.

### Problema 3: Error 500 en el backend

**Causa:** Problemas con MongoDB o variables de entorno en Railway
**Solución:**
1. Ve a Railway → tu servicio → **Deployments**
2. Revisa los logs
3. Busca errores de conexión a MongoDB

---

## 📋 Checklist Final

Marca cada paso cuando lo completes:

- [ ] Verificar Railway está funcionando
- [ ] Agregar variable `VITE_API_URL` en Netlify
- [ ] Guardar la variable
- [ ] Hacer "Clear cache and deploy site"
- [ ] Esperar a que termine el deploy
- [ ] Probar registro de usuario
- [ ] Verificar en consola que la URL sea correcta

---

## 💡 Nota Importante

Las variables de entorno en Netlify con el prefijo `VITE_` son especiales:
- Se inyectan en el código durante el **BUILD**
- Por eso DEBES redesplegar después de agregarlas
- No se pueden cambiar en runtime, solo en build time

---

¿Necesitas ayuda con algún paso específico?
