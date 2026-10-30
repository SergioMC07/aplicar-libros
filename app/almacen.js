// ALMACÉN: todo lo que guardas se queda en este móvil (localStorage).
// Si algún día hay cuentas o nube, solo habría que cambiar este archivo.

const Almacen = (() => {
  const CLAVE = "aplicar-libros-v1";

  function estadoInicial() {
    return {
      version: 1,
      tema: "auto",                 // "auto" | "claro" | "oscuro"
      libroActivoId: CARNEGIE.id,
      progresoLibros: {},           // por libro: { indice, inicioSemana, estados: { idPrincipio: "pendiente"|"practica"|"habito" } }
      checkins: [],                 // { id, fecha, libroId, principioId, dia, resultado: "si"|"medio"|"no", texto }
      semanas: [],                  // resúmenes de semanas terminadas
      librosPropios: [],            // libros añadidos desde la app
      citasPropias: [],             // citas añadidas desde la app
      citasFavoritas: [],           // textos de las citas marcadas con ❤️
      bienvenidaVista: false        // la pantalla de bienvenida solo sale la primera vez
    };
  }

  function cargar() {
    try {
      const texto = localStorage.getItem(CLAVE);
      if (texto) return Object.assign(estadoInicial(), JSON.parse(texto));
    } catch (e) { console.warn("No se pudo leer lo guardado", e); }
    return estadoInicial();
  }

  function guardar(estado) {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); }
    catch (e) { alert("No se ha podido guardar. Haz una copia de seguridad desde Libros > Ajustes."); }
  }

  // Pide al navegador que no borre los datos (en iPhone ayuda tenerla instalada en la pantalla de inicio)
  function pedirPersistencia() {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  }

  return { cargar, guardar, estadoInicial, pedirPersistencia };
})();
