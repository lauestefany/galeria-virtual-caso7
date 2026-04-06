// Aquí cargo las herramientas que Node me da para crear un servidor web
const http = require('http');   // Para crear el servidor
const fs = require('fs');       // Para leer los archivos de mi página
const path = require('path');   // Para manejar las rutas de los archivos

// Defino el puerto donde va a correr mi página
const PORT = 3000;

// Aquí le digo al servidor qué tipo de archivo está sirviendo,
// así el navegador sabe cómo mostrar cada uno
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Creo el servidor — cada vez que alguien entra, busco el archivo que pidió
const server = http.createServer((req, res) => {
  // Si entran a la raíz "/", les muestro el index.html
  let filePath = req.url === '/' ? '/index.html' : req.url;

  // Busco el archivo dentro de la carpeta "public"
  filePath = path.join(__dirname, 'public', filePath);

  // Reviso la extensión del archivo para saber su tipo
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Leo el archivo y se lo envío al navegador
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Si el archivo no existe, muestro un error 404
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Archivo no encontrado</h1>');
      } else {
        // Si hay otro error, muestro un error 500
        res.writeHead(500);
        res.end('Error interno del servidor');
      }
    } else {
      // Si todo sale bien, envío el archivo con su tipo correcto
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Pongo el servidor a escuchar en el puerto 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
