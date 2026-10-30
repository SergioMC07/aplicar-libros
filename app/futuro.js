// PARA MÁS ADELANTE: puntos de enganche ya conectados a la app, pero vacíos por ahora.
// Cuando toque, se rellena cada función sin tocar el resto del código.

const Futuro = {
  // IA: recibe el check-in recién guardado y el principio. Podría devolver un comentario
  // y un reto adaptado para mañana. Hoy no hace nada.
  async comentarCheckin(checkin, principio) { return null; },

  // Recordatorios diarios: en iPhone requiere notificaciones push (iOS 16.4+ con la app instalada)
  // y un pequeño servidor que las envíe. Hoy no hace nada.
  async programarRecordatorio(hora) { return false; },

  // Notion: importar resúmenes de libros como nuevos libros de la app. Hoy no hace nada.
  async importarDesdeNotion() { return []; }

  // Producto para otros usuarios: haría falta cambiar app/almacen.js por un almacén con cuentas.
};
