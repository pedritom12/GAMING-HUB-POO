# GamingHub – Proyecto POO

Aplicación educativa de gestión de bibliotecas de videojuegos con **inicio moderno**, **panel de usuario**, registro, login, bibliotecas privadas, importación JSON, búsqueda y gestión de perfil.

## Requisitos

- Node.js **20 o superior** instalado desde https://nodejs.org/.
- Un navegador moderno.
- **No necesita MySQL, npm install, Docker ni variables de entorno.**

## Cómo correrlo

**Windows:** hacer doble clic en `INICIAR_WINDOWS.bat`. O abrir una terminal en la carpeta que contiene `package.json` y escribir:

```bash
npm start
```

Después abrir **http://localhost:3000**. Para finalizar, cerrar la ventana del servidor o presionar Ctrl+C.

## Cómo usarlo

1. Desde el inicio, elegí **Crear cuenta** o **Abrir mi biblioteca**. Si no tenés sesión, se abre el ingreso.
2. Registrate con nombre de usuario (3–30 caracteres), email y contraseña (8 caracteres como mínimo).
3. Una vez autenticado, accedés al **panel**: resumen, bibliotecas y mi cuenta.
4. En **Mis bibliotecas** creá una biblioteca y agregá juegos con **Importar JSON**.
5. Buscá juegos, abrí enlaces opcionales o borrá entradas. En **Mi cuenta** editá usuario/email y cambiá tu contraseña.

Ejemplo de importación JSON:

```json
[
  {"titulo":"Juego de prueba","genero":"Aventura","anio":"2026","portada":"https://placehold.co/400x300/png","ejecutable":"https://example.com"},
  {"titulo":"Otro juego","genero":"Estrategia","anio":"2024"}
]
```

## Seguridad implementada

- Contraseñas almacenadas con **scrypt y sal individual**, nunca en texto plano.
- **Cookie HttpOnly, SameSite=Strict**, con duración de 8 horas; flag Secure al servir mediante HTTPS directo.
- Sesiones guardadas en memoria del servidor; reiniciarlo cierra todas las sesiones.
- Restricción de **propiedad de bibliotecas y juegos en cada endpoint del backend**. Un usuario no puede modificar los datos de otro cambiando identificadores.
- Comprobación del `Origin` en solicitudes que modifican datos, para rechazar solicitudes desde otros sitios; SameSite Strict reduce CSRF. Rate limiting básico del inicio de sesión (8 intentos por combinación IP/usuario durante 15 minutos).
- Encabezados CSP, X-Frame-Options y nosniff; inserción de datos mediante `textContent` en el panel, evitando HTML dinámico no confiable.
- Cambiar la contraseña revoca todas las sesiones de la cuenta.

**Límites:** se trata de un **MVP académico local**, no una aplicación certificada para internet. Para alojarlo públicamente se recomienda HTTPS en proxy inverso configurado, protección adicional contra fuerza bruta, base de datos transaccional, backups, pruebas de seguridad y sistema de sesiones persistente. No almacenes datos sensibles reales. La información se guarda en `database/data/gaminghub.json` (excluido de Git). Cada computadora conserva sus datos propios.

## Archivos

- `front/index.html` + `front/home.js` + `front/app.css`: landing y acceso.
- `front/dashboard.html` + `front/dashboard.js`: panel de usuario, bibliotecas y perfil.
- `database/server.js`: servidor web, sesiones, API, validaciones y persistencia.
- `database/legacy-mysql/`: código original guardado como referencia, no utilizado.
- `INICIAR_WINDOWS.bat`: ejecuta el servidor en Windows.

## Compartir con el profesor

Subí el contenido de esta carpeta a GitHub, compartí la URL del repositorio y pedile que lo descargue. En su PC debe tener Node.js e iniciar el archivo `INICIAR_WINDOWS.bat`. El link de GitHub **no** aloja por sí mismo la app. Para abrir la aplicación directamente desde un link público se necesita desplegar un backend y un almacenamiento persistente en un hosting.
