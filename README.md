# Aplicar libros

Web app para el móvil que ayuda a aplicar y recordar lo que aprendes en los libros.
Sin servidor ni cuentas: los datos se guardan en el propio móvil.

- `index.html`, `estilos.css`: la página y su aspecto.
- `datos/`: un archivo por libro y las citas.
- `app/app.js`: pantallas y lógica. `app/almacen.js`: dónde se guardan los datos. `app/futuro.js`: enganches para IA, recordatorios y Notion.
- `sw.js`, `manifest.json`, `iconos/`: para instalarla en la pantalla de inicio y usarla sin conexión.
