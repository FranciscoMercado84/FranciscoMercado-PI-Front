# Panadería Frontend — Entorno local de desarrollo

Este README explica paso a paso cómo configurar y arrancar el entorno de desarrollo para el frontend `panaderia-frontend` (proyecto React generado con Vite o Create React App). Está orientado a Windows (PowerShell) pero también incluye notas generales.

## Resumen rápido

- Tipo de proyecto: React (Vite por defecto) — plantilla inicial.
- Carpeta del proyecto: `panaderia-frontend`
- Comandos principales (Vite):

  ```powershell
  npm create vite@latest panaderia-frontend -- --template react
  cd panaderia-frontend
  npm install
  npm run dev
  ```

- Puerto por defecto de Vite: 5173 (puede variar si ya hay otra app en ese puerto).

---

## Requisitos (prerrequisitos)

1. Node.js y npm
   - Recomendado: Node 18.x o 20.x (LTS actuales). Evita versiones demasiado antiguas (<14).
   - Verifica versiones:

     ```powershell
     node -v
     npm -v
     ```

   - Si necesitas gestionar múltiples versiones en Windows, instala nvm-windows: https://github.com/coreybutler/nvm-windows

2. Git (opcional, pero recomendado)
   - Para clonar repositorios, crear ramas y versionado.

3. Editor recomendado
   - Visual Studio Code + extensiones (ESLint, Prettier, ESLint plugin, IntelliSense for React)

---

## Crear el proyecto (opciones)

A continuación las instrucciones para generar el scaffolding inicial.

### Opción A — Vite (recomendada actualmente por rendimiento y DX)

1. Crea el proyecto:

```powershell
npm create vite@latest panaderia-frontend -- --template react
```

- Esto generará la carpeta `panaderia-frontend` con la plantilla React enfocada en Vite.

2. Entra en la carpeta e instala dependencias:

```powershell
cd panaderia-frontend
npm install
```

3. Arranca el servidor de desarrollo:

```powershell
npm run dev
```

- Vite mostrará la URL local (ej: `http://localhost:5173`) y la URL de la red si está disponible.

### Opción B — Create React App (CRA)

Si prefieres CRA (más tradicional):

```powershell
npx create-react-app panaderia-frontend
cd panaderia-frontend
npm start
```

- CRA usa por defecto `http://localhost:3000`.
- En Windows PowerShell, para fijar el puerto puedes usar: `set PORT=3000; npm start` (o usar `cross-env` para scripts multiplataforma).

---

## Scripts útiles (package.json)

Los scripts que verás normalmente en `package.json` para Vite:

- `dev`: arranca servidor de desarrollo (Vite).
- `build`: crea la versión de producción en `dist/`.
- `preview`: sirve la build localmente para probar.

Ejemplo de comandos:

```powershell
npm run dev        # desarrollo
npm run build      # build producción
npm run preview    # previsualizar build (Vite)
```

Si usas CRA tendrás `start`, `build`, `test`, `eject`.

---

## Variables de entorno (.env)

- Crea un archivo `.env` en la raíz de `panaderia-frontend` para valores que no irán al control de versiones si contienen secretos (usa `.env.local` para secretos locales y añade a `.gitignore`).

Ejemplo mínimo para Vite (Vite requiere que las variables públicas comiencen con `VITE_`):

```
VITE_API_BASE_URL=http://localhost:3001/api
```

Acceso desde el código React:

```js
const base = import.meta.env.VITE_API_BASE_URL;
```

Para CRA las variables públicas deben comenzar con `REACT_APP_`.

---

## Puerto y host (PowerShell / Windows)

- Vite por defecto usa el puerto 5173. Para cambiarlo al iniciar:

```powershell
# Pasa la opción al comando dev
npm run dev -- --port 3000
```

- Para CRA (en PowerShell):

```powershell
set PORT=3000; npm start
```

(Si prefieres cross-platform: `npm i -D cross-env` y en `package.json` usar `"start": "cross-env PORT=3000 react-scripts start"`)

---

## Build y previsualización de producción

1. Generar build:

```powershell
npm run build
```

2. Servir la carpeta `dist` para probar la app tal como quedará en producción. Con Vite puedes usar `npm run preview` (si está configurado) o instalar `serve`:

```powershell
npm i -g serve
serve -s dist -l 5000
# o con npx
npx serve -s dist -l 5000
```

---

## Debugging y troubleshooting (problemas comunes)

1. Puerto en uso
   - Mensaje: `EADDRINUSE` o similar. Solución: detener la otra aplicación o arrancar en otro puerto (`--port 3001`).

2. Node incompatible
   - Si obtienes errores en dependencias nativas, verifica `node -v` y usa una versión compatible.

3. Problemas con PowerShell (variables de entorno)
   - En PowerShell usa `set VAR=valor; npm start` o `cmd /c "set VAR=valor && npm start"`.
   - Alternativa cross-platform: `cross-env`.

4. Caché de npm
   - Limpia caché si hay fallos extraños: `npm cache clean --force` y reinstala `node_modules`.

5. Linter / Prettier
   - Si el proyecto incluye ESLint/Prettier, instala las extensiones en VSCode y ejecuta `npm run lint` si hay un script.

6. Problemas CORS al llamar a la API
   - Asegúrate que la API permita peticiones desde `http://localhost:5173` o configura proxy en Vite (`vite.config.js`) o en CRA (`package.json` proxy).

---

## Consejos y buenas prácticas

- Añade `.env.example` con las variables necesarias para que otros desarrolladores sepan qué configurar.
- Añade `node_modules` a `.gitignore` (esto se hace por defecto).
- Mantén `engines` en `package.json` (opcional) para indicar la versión de Node esperada.

Ejemplo minimal de `.env.example`:

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=PanaderiaLocal
```

---

## Verificación rápida (checks)

1. Node y npm instalados:

```powershell
node -v
npm -v
```

2. Crear/instalar e iniciar dev server (Vite):

```powershell
npm create vite@latest panaderia-frontend -- --template react
cd panaderia-frontend
npm install
npm run dev
```

3. Abrir la URL que devuelve Vite (por ejemplo `http://localhost:5173`) y verificar que la app carga.

---

## Contrato (breve)

- Inputs: repositorio con frontend o comandos para generar scaffold.
- Outputs: servidor de desarrollo corriendo en `localhost` (por defecto `5173` para Vite, `3000` para CRA) y una build en `dist/` al ejecutar `npm run build`.
- Criterio de éxito: la página principal carga en el navegador y las peticiones a la API (si se configuran) funcionan según `VITE_API_BASE_URL`.

## Casos límite a considerar

- Node muy antiguo o muy reciente (ver compatibilidad de dependencias).
- Variables de entorno ausentes (la app debe manejar valores por defecto o fallar con mensaje claro).
- Firewall/antivirus que bloquea el puerto local.

---

## Recursos útiles

- Vite: https://vitejs.dev/
- Create React App: https://create-react-app.dev/
- nvm-windows: https://github.com/coreybutler/nvm-windows
 
## Diagramas

En `docs/diagramas` se incluye un diagrama de referencia que muestra la vista global/arquitectura del frontend y sus dependencias.

![Diagrama de vista global](./docs/diagramas/DiagramaVistaGlobal.png)

- **Ruta relativa:** `./docs/diagramas/DiagramaVistaGlobal.png`
- **Descripción:** Diagrama de alto nivel con los componentes principales (cliente React, API, proxy/local env). Úsalo como referencia para la arquitectura local y despliegue.

