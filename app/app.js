// APP: pantallas y lógica. Los datos se guardan con Almacen (app/almacen.js).

let estado = Almacen.cargar();
let pestanaActual = "hoy";
let filtroCitas = "todas";        // "todas" | "favoritas"
let citaElegida = null;           // índice de la cita mostrada si pulsas "Otra cita"
let historialCompleto = false;
const pantalla = document.getElementById("pantalla");
const hoja = document.getElementById("hoja");
const hojaContenido = document.getElementById("hoja-contenido");

// ───────── Utilidades ─────────

function hoyISO(fecha = new Date()) {
  const f = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  return f.toISOString().slice(0, 10);
}
function sumarDias(iso, n) {
  const d = new Date(iso + "T12:00");
  d.setDate(d.getDate() + n);
  return hoyISO(d);
}
function diasEntre(desdeISO, hastaISO) {
  return Math.round((new Date(hastaISO + "T12:00") - new Date(desdeISO + "T12:00")) / 86400000);
}
function fechaBonita(iso, opciones = { weekday: "long", day: "numeric", month: "long" }) {
  return new Date(iso + "T12:00").toLocaleDateString("es-ES", opciones);
}
function inicialDia(iso) {
  return ["D", "L", "M", "X", "J", "V", "S"][new Date(iso + "T12:00").getDay()];
}
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function plural(n, uno, varios) { return `${n} ${n === 1 ? uno : varios}`; }
function guardar() { Almacen.guardar(estado); }
function esDeNoche() { return new Date().getHours() >= 19; }
function saludo() {
  const h = new Date().getHours();
  return h < 6 ? "Buenas noches" : h < 14 ? "Buenos días" : h < 21 ? "Buenas tardes" : "Buenas noches";
}

// Mensaje flotante que desaparece solo (en lugar de las ventanas de alerta)
let temporizadorToast;
function aviso(texto) {
  const t = document.getElementById("toast");
  t.textContent = texto;
  t.classList.add("visible");
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => t.classList.remove("visible"), 2600);
}

// Lluvia de confeti para celebrar
function confeti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colores = ["#4f63f0", "#7a55ec", "#23a065", "#e09a12", "#ff6b8b", "#2bb3e0"];
  for (let i = 0; i < 36; i++) {
    const c = document.createElement("i");
    c.className = "confeti";
    const angulo = Math.random() * Math.PI * 2, distancia = 120 + Math.random() * 200;
    c.style.background = colores[i % colores.length];
    c.style.setProperty("--x", Math.cos(angulo) * distancia + "px");
    c.style.setProperty("--y", Math.sin(angulo) * distancia + 160 + "px");
    c.style.setProperty("--r", Math.random() * 720 - 360 + "deg");
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1200);
  }
}

const RESULTADOS = {
  si: { icono: "✅", texto: "Lo hice" },
  medio: { icono: "🌓", texto: "A medias" },
  no: { icono: "❌", texto: "No lo hice" }
};
const ESTADOS = { pendiente: "Pendiente", practica: "En práctica", habito: "Hábito" };

// Retos genéricos para libros añadidos sin retos propios
const RETOS_GENERICOS = [
  ["Lee de nuevo el principio y busca una situación de hoy donde aplicarlo.", "En clase, en la tienda o en casa."],
  ["Aplica el principio una vez hoy, aunque sea en algo pequeño.", "Apunta con quién y cómo."],
  ["Aplícalo con alguien del trabajo.", "Un compañero o un cliente de la tienda."],
  ["Aplícalo en la universidad.", "Con un compañero de clase o un profesor."],
  ["Aplícalo con alguien cercano.", "Familia o amigos."],
  ["Aplícalo en una situación que te cueste.", "Con alguien con quien tengas tensión."],
  ["Repaso: ¿qué has aprendido esta semana con este principio?", "Apunta lo que quieres seguir haciendo."]
];

// ───────── Libros y progreso ─────────

function todosLosLibros() { return [CARNEGIE, ...estado.librosPropios]; }
function libroPorId(id) { return todosLosLibros().find(l => l.id === id); }
function libroActivo() { return libroPorId(estado.libroActivoId) || CARNEGIE; }

function progresoDe(libro) {
  if (!estado.progresoLibros[libro.id]) {
    const estados = {};
    libro.principios.forEach((p, i) => estados[p.id] = i === 0 ? "practica" : "pendiente");
    estado.progresoLibros[libro.id] = { indice: 0, inicioSemana: hoyISO(), estados };
    guardar();
  }
  return estado.progresoLibros[libro.id];
}
function principioActual(libro) {
  return libro.principios[progresoDe(libro).indice] || null;
}
function diaDeLaSemana(libro) {
  return Math.min(Math.max(diasEntre(progresoDe(libro).inicioSemana, hoyISO()), 0), 6);
}
function retoDelDia(principio, dia) {
  const retos = principio.retos && principio.retos.length ? principio.retos : RETOS_GENERICOS;
  return retos[Math.min(dia, retos.length - 1)];
}

// ───────── Check-ins y racha ─────────

function checkinDeHoy() {
  return estado.checkins.find(c => c.fecha === hoyISO());
}
function checkinDelDia(iso) {
  return estado.checkins.find(c => c.fecha === iso);
}
function racha() {
  const fechas = new Set(estado.checkins.map(c => c.fecha));
  const d = new Date();
  if (!fechas.has(hoyISO(d))) d.setDate(d.getDate() - 1); // si hoy aún no hiciste check-in, la racha sigue viva
  let n = 0;
  while (fechas.has(hoyISO(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function checkinsDeLaSemana(libro, principio) {
  const inicio = progresoDe(libro).inicioSemana;
  return estado.checkins.filter(c => c.libroId === libro.id && c.principioId === principio.id && c.fecha >= inicio);
}

// ───────── Citas ─────────

function todasLasCitas() { return [...estado.citasPropias.map(c => ({ ...c, propia: true })), ...CITAS]; }
function esFavorita(cita) { return estado.citasFavoritas.includes(cita.texto); }
function indiceCitaDelDia() {
  const n = Math.floor(new Date(hoyISO() + "T12:00").getTime() / 86400000);
  return n % todasLasCitas().length;
}
function citaDelDia() { return todasLasCitas()[indiceCitaDelDia()]; }

// ───────── Pantallas ─────────

function pintar() {
  document.documentElement.dataset.tema = estado.tema;
  document.querySelectorAll(".pestanas button").forEach(b => b.classList.toggle("activa", b.dataset.pestana === pestanaActual));
  pantalla.innerHTML = { hoy: pantallaHoy, progreso: pantallaProgreso, citas: pantallaCitas, libros: pantallaLibros }[pestanaActual]();
  // Cada bloque principal entra animado, uno tras otro
  [...pantalla.children].forEach((el, i) => { el.classList.add("entra"); el.style.setProperty("--i", i); });
}

function cambiarPestana(nombre) {
  if (nombre === pestanaActual) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  pestanaActual = nombre;
  historialCompleto = false;
  pintar();
  window.scrollTo(0, 0);
}

function pantallaHoy() {
  const libro = libroActivo();
  const principio = principioActual(libro);
  const r = racha();
  const cabecera = `
    <div class="cabecera">
      <div>
        <div class="fecha">${fechaBonita(hoyISO())}</div>
        <div class="saludo">${saludo()}</div>
      </div>
      <span class="chip racha" id="chip-racha" title="Días seguidos con check-in">🔥 ${plural(r, "día", "días")}</span>
    </div>`;

  if (!principio) {
    return cabecera + `
      <div class="tarjeta centro">
        <span class="vacio"><span class="grande">🎉</span></span>
        <h2>Has terminado «${esc(libro.titulo)}»</h2>
        <p class="suave">Repasa tus hábitos en Progreso o empieza otro libro.</p>
        <button class="secundario" data-ir="libros">Ver mis libros</button>
      </div>`;
  }

  const prog = progresoDe(libro);
  const dia = diaDeLaSemana(libro);
  const [reto, ejemplo] = retoDelDia(principio, dia);
  const hecho = checkinDeHoy();
  const transcurridos = diasEntre(prog.inicioSemana, hoyISO());
  const semanaCumplida = transcurridos >= 6;
  const cita = citaDelDia();

  // Los 7 días de la semana del principio, con el resultado de cada check-in
  const semana = Array.from({ length: 7 }, (_, i) => {
    const iso = sumarDias(prog.inicioSemana, i);
    const c = checkinDelDia(iso);
    const clases = [c ? c.resultado : "", iso === hoyISO() ? "hoy" : "", iso > hoyISO() ? "futuro" : ""].join(" ");
    const marca = c ? { si: "✓", medio: "½", no: "✕" }[c.resultado] : i + 1;
    return `<div class="dia"><span class="bola ${clases}" style="--i:${i}">${marca}</span>${inicialDia(iso)}</div>`;
  }).join("");

  return cabecera + `
    <div class="tarjeta reto">
      <div class="etiqueta">Tu reto de hoy · Día ${dia + 1} de 7</div>
      <div class="texto-reto">${esc(reto)}</div>
      <div class="ejemplo">💡 ${esc(ejemplo)}</div>
      <div class="semana">${semana}</div>
    </div>

    ${hecho ? `
      <div class="tarjeta checkin-hecho">
        <span class="icono-resultado ${hecho.resultado}">${RESULTADOS[hecho.resultado].icono}</span>
        <div style="flex:1; min-width:0">
          <div class="linea-principal">
            <strong>Hoy: ${RESULTADOS[hecho.resultado].texto.toLowerCase()}</strong>
            <button class="fantasma peque" data-accion="checkin">Editar</button>
          </div>
          ${hecho.texto ? `<p class="suave peque" style="margin:2px 0 0">${esc(hecho.texto)}</p>` : `<p class="suave peque" style="margin:2px 0 0">¡Check-in hecho! Mañana, un reto nuevo.</p>`}
        </div>
      </div>` : `
      <button class="boton-checkin ${esDeNoche() ? "noche" : ""}" data-accion="checkin">
        <span class="icono">🌙</span>
        <span><strong>¿Cómo te ha ido hoy?</strong><span class="suave peque">${esDeNoche() ? "Cuéntalo en 30 segundos y suma a tu racha" : "Hazlo esta noche, cuando hayas probado el reto"}</span></span>
        <span class="flecha">›</span>
      </button>`}

    <div class="tarjeta">
      <div class="etiqueta-tarjeta">Principio de esta semana · ${libro.principios.indexOf(principio) + 1} de ${libro.principios.length}</div>
      <h2>${esc(principio.titulo)}</h2>
      <p style="margin:0">${esc(principio.significado)}</p>
      ${principio.ideasClave && principio.ideasClave.length ? `
        <details class="ideas-clave">
          <summary>Ideas clave del capítulo</summary>
          <ul class="ideas">${principio.ideasClave.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
        </details>` : ""}
    </div>

    ${semanaCumplida
      ? `<button data-accion="terminar-semana" style="margin-bottom:14px">✨ Semana completada: ver resumen y seguir</button>`
      : `<p class="suave peque centro" style="margin:-2px 0 14px">Siguiente principio en ${plural(6 - transcurridos, "día", "días")}.<br><button class="fantasma peque" data-accion="terminar-semana">¿Ya lo dominas? Pasar al siguiente</button></p>`}

    <div class="tarjeta">
      <div class="linea-principal">
        <div class="etiqueta-tarjeta">Cita del día</div>
        <button class="favorito ${esFavorita(cita) ? "si" : ""}" data-accion="favorita" data-texto="${esc(cita.texto)}" aria-label="Guardar en favoritas">${esFavorita(cita) ? "❤️" : "🤍"}</button>
      </div>
      <div class="cita">«${esc(cita.texto)}»</div>
      <div class="cita-autor">— ${esc(cita.autor)}</div>
    </div>`;
}

function pantallaProgreso() {
  const libro = libroActivo();
  const prog = progresoDe(libro);
  const habitos = Object.values(prog.estados).filter(e => e === "habito").length;
  const total = libro.principios.length;
  const hechos = Math.min(prog.indice, total);
  const historial = [...estado.checkins].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const visibles = historialCompleto ? historial : historial.slice(0, 5);
  const semanas = estado.semanas.filter(s => s.libroId === libro.id).slice().reverse();

  // Calendario: las últimas 5 semanas, de lunes a domingo
  const hoy = hoyISO();
  const lunesActual = sumarDias(hoy, -((new Date(hoy + "T12:00").getDay() + 6) % 7));
  const inicioCal = sumarDias(lunesActual, -28);
  const celdas = Array.from({ length: 35 }, (_, i) => {
    const iso = sumarDias(inicioCal, i);
    if (iso > hoy) return `<span class="c vacia"></span>`;
    const c = checkinDelDia(iso);
    return `<span class="c ${c ? c.resultado : ""} ${iso === hoy ? "hoy" : ""}" style="--i:${i}" title="${fechaBonita(iso, { day: "numeric", month: "short" })}"></span>`;
  }).join("");

  return `
    <h1>Progreso</h1>
    <div class="numeros">
      <div class="tarjeta"><strong>🔥 ${racha()}</strong><span class="suave peque">Racha</span></div>
      <div class="tarjeta"><strong>${estado.checkins.length}</strong><span class="suave peque">Check-ins</span></div>
      <div class="tarjeta"><strong>${habitos}</strong><span class="suave peque">Hábitos</span></div>
    </div>

    <div class="tarjeta">
      <div class="etiqueta-tarjeta">Tus últimas semanas</div>
      <div class="calendario">
        ${["L", "M", "X", "J", "V", "S", "D"].map(d => `<span class="cab">${d}</span>`).join("")}
        ${celdas}
      </div>
      <div class="leyenda">
        <span style="--c:var(--si)">Lo hice</span><span style="--c:var(--medio)">A medias</span><span style="--c:var(--no)">No</span><span style="--c:var(--linea)">Sin check-in</span>
      </div>
    </div>

    <div class="tarjeta">
      <div class="etiqueta-tarjeta">${esc(libro.titulo)}</div>
      <div class="linea-principal"><strong>${hechos} de ${total} principios trabajados</strong><span class="suave peque">${Math.round(hechos / total * 100)}%</span></div>
      <div class="barra"><i style="width:${Math.max(hechos / total * 100, 2)}%"></i></div>
    </div>

    <h3>Historial de check-ins</h3>
    <div class="tarjeta">
      ${historial.length ? `<ul class="lista">${visibles.map(c => {
        const p = libroPorId(c.libroId)?.principios.find(x => x.id === c.principioId);
        return `<li>
          <div class="linea-principal"><strong>${RESULTADOS[c.resultado].icono} ${fechaBonita(c.fecha, { weekday: "short", day: "numeric", month: "short" })}</strong><span class="suave peque" style="text-align:right">${esc(p ? p.titulo : "")}</span></div>
          ${c.texto ? `<p class="peque" style="margin:4px 0 0">${esc(c.texto)}</p>` : ""}
        </li>`;
      }).join("")}</ul>
      ${historial.length > 5 ? `<button class="secundario pequeno" style="width:100%;margin-top:8px" data-accion="ver-historial">${historialCompleto ? "Ver menos" : `Ver los ${historial.length}`}</button>` : ""}`
      : `<div class="vacio"><span class="grande">🌱</span>Aún no hay check-ins.<br>Esta noche haz el primero desde Hoy.</div>`}
    </div>

    ${semanas.length ? `
      <h3>Semanas terminadas</h3>
      ${semanas.map(s => `
        <details class="tarjeta">
          <summary>${esc(s.titulo)}</summary>
          <p class="suave peque" style="margin-top:8px">${fechaBonita(s.inicio, { day: "numeric", month: "short" })} – ${fechaBonita(s.fin, { day: "numeric", month: "short" })} · ✅ ${s.si} · 🌓 ${s.medio} · ❌ ${s.no} · ${ESTADOS[s.estadoFinal]}</p>
          ${s.textos.length ? `<ul class="ideas">${s.textos.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : `<p class="suave peque">Sin notas esa semana.</p>`}
        </details>`).join("")}` : ""}

    <h3>Todos los principios</h3>
    <div class="tarjeta">
      <p class="suave peque">Toca la etiqueta para cambiarla: <b>Pendiente</b> → <b>En práctica</b> → <b>Hábito</b>.</p>
      <ul class="lista">
        ${libro.principios.map((p, i) => `
          <li class="linea-principal ${i === prog.indice ? "actual" : ""}">
            <span>${i + 1}. ${esc(p.titulo)}${i === prog.indice ? ` <span class="suave peque">· esta semana</span>` : ""}</span>
            <button class="estado ${prog.estados[p.id] || "pendiente"}" data-accion="cambiar-estado" data-id="${p.id}">${ESTADOS[prog.estados[p.id] || "pendiente"]}</button>
          </li>`).join("")}
      </ul>
    </div>`;
}

function pantallaCitas() {
  const citas = todasLasCitas();
  const indice = citaElegida ?? indiceCitaDelDia();
  const cita = citas[indice] || citas[0];
  const lista = citas.map((c, i) => ({ ...c, i })).filter(c => filtroCitas === "todas" || esFavorita(c));
  return `
    <h1>Citas</h1>
    <div class="tarjeta reto">
      <div class="etiqueta">${citaElegida === null ? "Cita del día" : "Otra cita"}</div>
      <div class="texto-reto cita" style="font-size:21px" id="cita-grande">«${esc(cita.texto)}»</div>
      <div class="linea-principal" style="position:relative;z-index:1">
        <span>— ${esc(cita.autor)}</span>
        <span style="display:flex;gap:6px;align-items:center">
          <button class="favorito ${esFavorita(cita) ? "si" : ""}" data-accion="favorita" data-texto="${esc(cita.texto)}" aria-label="Guardar en favoritas">${esFavorita(cita) ? "❤️" : "🤍"}</button>
          <button class="pequeno" style="background:rgba(255,255,255,.2)" data-accion="otra-cita">🔀 Otra</button>
        </span>
      </div>
    </div>

    <details class="tarjeta">
      <summary>➕ Añadir una cita que te guste</summary>
      <form data-form="cita" style="margin-top:12px">
        <textarea name="texto" placeholder="Escribe la cita" required></textarea>
        <input type="text" name="autor" placeholder="¿Quién lo dijo?" required>
        <button type="submit">Guardar cita</button>
      </form>
    </details>

    <div class="filtros">
      <button class="${filtroCitas === "todas" ? "activa" : ""}" data-accion="filtro-citas" data-filtro="todas">Todas · ${citas.length}</button>
      <button class="${filtroCitas === "favoritas" ? "activa" : ""}" data-accion="filtro-citas" data-filtro="favoritas">❤️ Favoritas · ${estado.citasFavoritas.length}</button>
    </div>

    <div class="tarjeta">
      ${lista.length ? `<ul class="lista">
        ${lista.map(c => `
          <li>
            <div class="cita" style="font-size:17px">«${esc(c.texto)}»</div>
            <div class="linea-principal"><span class="cita-autor" style="margin:4px 0 0">— ${esc(c.autor)}</span>
            <span style="display:flex;align-items:center">
              ${c.propia ? `<button class="fantasma peque" data-accion="borrar-cita" data-indice="${c.i}">Borrar</button>` : ""}
              <button class="favorito" data-accion="favorita" data-texto="${esc(c.texto)}" aria-label="Favorita">${esFavorita(c) ? "❤️" : "🤍"}</button>
            </span></div>
          </li>`).join("")}
      </ul>` : `<div class="vacio"><span class="grande">🤍</span>Aún no tienes favoritas.<br>Toca el corazón de una cita para guardarla aquí.</div>`}
    </div>`;
}

function pantallaLibros() {
  return `
    <h1>Libros</h1>
    ${todosLosLibros().map(l => {
      const prog = estado.progresoLibros[l.id];
      const activo = l.id === estado.libroActivoId;
      const hechos = prog ? Math.min(prog.indice, l.principios.length) : 0;
      return `
        <div class="tarjeta">
          ${activo ? `<span class="chip" style="margin-bottom:10px">📖 Leyendo ahora</span>` : ""}
          <h2>${esc(l.titulo)}</h2>
          <p class="suave peque">${esc(l.autor || "")}${l.autor ? " · " : ""}${l.principios.length} principios</p>
          ${prog ? `<div class="barra"><i style="width:${Math.max(hechos / l.principios.length * 100, 2)}%"></i></div>
            <p class="suave peque">Vas por el principio ${Math.min(prog.indice + 1, l.principios.length)}</p>` : ""}
          ${activo ? "" : `<button class="secundario" style="margin-top:6px" data-accion="activar-libro" data-id="${esc(l.id)}">Practicar este libro</button>`}
        </div>`;
    }).join("")}

    <details class="tarjeta">
      <summary>➕ Añadir un libro</summary>
      <form data-form="libro" style="margin-top:12px">
        <input type="text" name="titulo" placeholder="Título" required>
        <input type="text" name="autor" placeholder="Autor">
        <p class="suave peque">Escribe un principio por línea. Si quieres, añade qué significa después de una barra «|». Ejemplo:<br><em>Escucha más de lo que hablas | La gente se abre cuando se siente escuchada</em></p>
        <textarea name="principios" style="min-height:160px" placeholder="Un principio por línea…" required></textarea>
        <button type="submit">Guardar libro</button>
      </form>
    </details>

    <h3>Ajustes</h3>
    <div class="tarjeta">
      <p><strong>Aspecto</strong></p>
      <div class="fila" style="margin-bottom:18px">
        ${["auto", "claro", "oscuro"].map(t => `<button class="pequeno ${estado.tema === t ? "" : "secundario"}" data-accion="tema" data-tema="${t}">${{ auto: "📱 Auto", claro: "☀️ Claro", oscuro: "🌙 Oscuro" }[t]}</button>`).join("")}
      </div>
      <p><strong>Copia de seguridad</strong></p>
      <p class="suave peque">Tus datos viven solo en este móvil. Guarda una copia en Archivos o iCloud de vez en cuando.</p>
      <div class="fila" style="margin-bottom:18px">
        <button class="secundario pequeno" data-accion="exportar">⬆️ Guardar copia</button>
        <button class="secundario pequeno" data-accion="importar">⬇️ Restaurar</button>
      </div>
      <input type="file" id="archivo-importar" accept="application/json,.json" hidden>
      <p><strong>Ayuda</strong></p>
      <button class="secundario pequeno" style="width:100%" data-accion="bienvenida">❓ Cómo funciona la app</button>
    </div>
    <button class="peligro" data-accion="borrar-todo">Borrar todos mis datos</button>`;
}

// ───────── Hojas (ventanas desde abajo) ─────────

function abrirHoja(html) {
  hojaContenido.innerHTML = `<div class="asa"></div>` + html;
  hoja.classList.remove("cerrando");
  hoja.showModal();
  document.activeElement?.blur(); // sin recuadro de foco al abrir
  hoja.scrollTop = 0;
}
function cerrarHoja() {
  if (!hoja.open) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { hoja.close(); return; }
  hoja.classList.add("cerrando");
  setTimeout(() => { hoja.close(); hoja.classList.remove("cerrando"); }, 260);
}
hoja.addEventListener("click", e => { if (e.target === hoja) cerrarHoja(); });
hoja.addEventListener("cancel", e => { e.preventDefault(); cerrarHoja(); });

function abrirBienvenida() {
  const instalada = navigator.standalone || matchMedia("(display-mode: standalone)").matches;
  abrirHoja(`
    <h2 style="font-size:24px">👋 ¡Hola! Así funciona la app</h2>
    <p class="suave">Leer no basta: aquí practicas un principio cada semana hasta que se vuelva hábito.</p>
    <ul class="pasos">
      <li style="--i:0"><span class="num">☀️</span><div><strong>Por la mañana, mira tu reto</strong><br><span class="suave peque">Cada día hay un reto concreto, con un ejemplo de la uni o de la tienda.</span></div></li>
      <li style="--i:1"><span class="num">🌙</span><div><strong>Por la noche, cuéntalo</strong><br><span class="suave peque">Pulsa «¿Cómo te ha ido hoy?», marca si lo hiciste y escribe 2–3 líneas.</span></div></li>
      <li style="--i:2"><span class="num">🔥</span><div><strong>Mantén la racha</strong><br><span class="suave peque">Cada día con check-in suma. En Progreso ves tu calendario e historial.</span></div></li>
      <li style="--i:3"><span class="num">✨</span><div><strong>A los 7 días, siguiente principio</strong><br><span class="suave peque">Verás un resumen de tu semana y decides si ya es hábito.</span></div></li>
    </ul>
    ${instalada ? "" : `<div class="aviso">📲 <strong>Truco:</strong> en Safari pulsa <strong>Compartir</strong> → <strong>Añadir a pantalla de inicio</strong> para tenerla como una app y que tus datos estén más seguros.</div>`}
    <button data-accion="empezar">Empezar</button>`);
}

function abrirCheckin() {
  const libro = libroActivo();
  const principio = principioActual(libro);
  if (!principio) return;
  const previo = checkinDeHoy();
  const [reto] = retoDelDia(principio, diaDeLaSemana(libro));
  abrirHoja(`
    <h2>¿Cómo te ha ido hoy?</h2>
    <p class="suave peque">Reto: ${esc(reto)}</p>
    <form data-form="checkin">
      <div class="opciones">
        ${Object.entries(RESULTADOS).map(([valor, r]) => `
          <button type="button" data-valor="${valor}" class="${previo?.resultado === valor ? "elegido" : ""}"><span class="em">${r.icono}</span>${r.texto}</button>`).join("")}
      </div>
      <input type="hidden" name="resultado" value="${previo?.resultado || ""}">
      <textarea name="texto" placeholder="¿Qué pasó? ¿Con quién? ¿Cómo reaccionaron? (2 o 3 líneas)">${esc(previo?.texto || "")}</textarea>
      <div class="fila">
        <button type="button" class="secundario" data-accion="cerrar">Cancelar</button>
        <button type="submit">Guardar</button>
      </div>
    </form>`);
}

function abrirResumenSemana() {
  const libro = libroActivo();
  const principio = principioActual(libro);
  if (!principio) return;
  const lista = checkinsDeLaSemana(libro, principio).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const cuenta = r => lista.filter(c => c.resultado === r).length;
  const sugerido = cuenta("si") >= 5 ? "habito" : "practica";
  const notas = lista.filter(c => c.texto);
  abrirHoja(`
    <h2>Resumen de tu semana</h2>
    <p><strong>${esc(principio.titulo)}</strong></p>
    <div class="numeros">
      <div class="tarjeta"><strong>${cuenta("si")}</strong><span class="suave peque">✅ Lo hice</span></div>
      <div class="tarjeta"><strong>${cuenta("medio")}</strong><span class="suave peque">🌓 A medias</span></div>
      <div class="tarjeta"><strong>${cuenta("no")}</strong><span class="suave peque">❌ No</span></div>
    </div>
    ${notas.length
      ? `<p class="suave peque">Lo que escribiste:</p><ul class="ideas">${notas.map(c => `<li><span class="suave peque">${fechaBonita(c.fecha, { weekday: "short" })}:</span> ${esc(c.texto)}</li>`).join("")}</ul>`
      : `<p class="suave">${lista.length ? "No escribiste notas esta semana." : "No hiciste check-ins esta semana."}</p>`}
    <h3 style="margin-left:0">¿Cómo queda este principio?</h3>
    <form data-form="terminar-semana">
      <div class="fila" style="margin-bottom:14px">
        <label class="tarjeta opcion-radio"><input type="radio" name="estadoFinal" value="practica" ${sugerido === "practica" ? "checked" : ""}> Sigo practicando</label>
        <label class="tarjeta opcion-radio"><input type="radio" name="estadoFinal" value="habito" ${sugerido === "habito" ? "checked" : ""}> Ya es hábito</label>
      </div>
      <div class="fila">
        <button type="button" class="secundario" data-accion="cerrar">Ahora no</button>
        <button type="submit">Siguiente principio →</button>
      </div>
    </form>`);
}

// ───────── Acciones ─────────

const acciones = {
  "checkin": abrirCheckin,
  "terminar-semana": abrirResumenSemana,
  "cerrar": cerrarHoja,
  "bienvenida": abrirBienvenida,
  "empezar": () => { estado.bienvenidaVista = true; guardar(); cerrarHoja(); },
  "cambiar-estado": b => {
    const prog = progresoDe(libroActivo());
    const orden = ["pendiente", "practica", "habito"];
    const actual = prog.estados[b.dataset.id] || "pendiente";
    const nuevo = orden[(orden.indexOf(actual) + 1) % orden.length];
    prog.estados[b.dataset.id] = nuevo;
    guardar();
    // Cambiamos solo la etiqueta, sin repintar toda la pantalla
    b.className = `estado ${nuevo} salta`;
    b.textContent = ESTADOS[nuevo];
  },
  "favorita": b => {
    const texto = b.dataset.texto;
    const i = estado.citasFavoritas.indexOf(texto);
    if (i >= 0) estado.citasFavoritas.splice(i, 1); else estado.citasFavoritas.push(texto);
    guardar();
    const ahora = i < 0;
    // Actualiza todos los corazones de esa cita
    document.querySelectorAll(".favorito").forEach(f => {
      if (f.dataset.texto !== texto) return;
      f.textContent = ahora ? "❤️" : "🤍";
      f.classList.remove("si"); void f.offsetWidth; f.classList.toggle("si", ahora);
    });
    if (pestanaActual === "citas") {
      const contador = document.querySelector('[data-filtro="favoritas"]');
      if (contador) contador.textContent = `❤️ Favoritas · ${estado.citasFavoritas.length}`;
      if (filtroCitas === "favoritas" && !ahora) pintar();
    }
    aviso(ahora ? "Guardada en favoritas ❤️" : "Quitada de favoritas");
  },
  "otra-cita": () => {
    const total = todasLasCitas().length;
    const actual = citaElegida ?? indiceCitaDelDia();
    let n = actual;
    while (total > 1 && n === actual) n = Math.floor(Math.random() * total);
    citaElegida = n;
    pintar();
  },
  "filtro-citas": b => { filtroCitas = b.dataset.filtro; pintar(); },
  "ver-historial": () => { historialCompleto = !historialCompleto; pintar(); },
  "borrar-cita": b => {
    if (!confirm("¿Borrar esta cita?")) return;
    const cita = estado.citasPropias[Number(b.dataset.indice)];
    estado.citasPropias.splice(Number(b.dataset.indice), 1);
    estado.citasFavoritas = estado.citasFavoritas.filter(t => t !== cita?.texto);
    citaElegida = null;
    guardar(); pintar(); aviso("Cita borrada");
  },
  "activar-libro": b => {
    estado.libroActivoId = b.dataset.id; guardar();
    cambiarPestana("hoy"); aviso("📖 ¡Nuevo libro activo!");
  },
  "tema": b => { estado.tema = b.dataset.tema; guardar(); pintar(); },
  "exportar": exportar,
  "importar": () => document.getElementById("archivo-importar").click(),
  "borrar-todo": () => {
    if (!confirm("Se borrarán todos tus check-ins, citas y libros añadidos. ¿Seguro? Haz antes una copia si la quieres.")) return;
    estado = Almacen.estadoInicial(); estado.bienvenidaVista = true; guardar(); pintar(); aviso("Datos borrados");
  }
};

document.addEventListener("click", e => {
  const pestana = e.target.closest("[data-pestana]");
  if (pestana) { cambiarPestana(pestana.dataset.pestana); return; }

  const ir = e.target.closest("[data-ir]");
  if (ir) { cambiarPestana(ir.dataset.ir); return; }

  const opcion = e.target.closest(".opciones button");
  if (opcion) {
    opcion.parentElement.querySelectorAll("button").forEach(b => b.classList.toggle("elegido", b === opcion));
    opcion.closest("form").resultado.value = opcion.dataset.valor;
    return;
  }

  const boton = e.target.closest("[data-accion]");
  if (boton && acciones[boton.dataset.accion]) acciones[boton.dataset.accion](boton);
});

document.addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const datos = Object.fromEntries(new FormData(form));

  if (form.dataset.form === "checkin") {
    if (!datos.resultado) { aviso("Primero marca: lo hice, a medias o no"); return; }
    const libro = libroActivo();
    const principio = principioActual(libro);
    const previo = checkinDeHoy();
    const rachaAntes = racha();
    const checkin = {
      id: previo?.id || String(Date.now()),
      fecha: hoyISO(), libroId: libro.id, principioId: principio.id,
      dia: diaDeLaSemana(libro) + 1, resultado: datos.resultado, texto: datos.texto.trim()
    };
    estado.checkins = estado.checkins.filter(c => c.fecha !== checkin.fecha).concat(checkin);
    guardar(); cerrarHoja();
    setTimeout(() => {
      pintar();
      if (!previo) {
        const r = racha();
        const chip = document.getElementById("chip-racha");
        if (chip && r > rachaAntes) chip.classList.add("salta");
        if (datos.resultado !== "no") confeti();
        aviso(datos.resultado === "no"
          ? "Guardado. Mañana es otra oportunidad 💪"
          : `¡Bien hecho! Racha de ${plural(r, "día", "días")} 🔥`);
      } else aviso("Check-in actualizado");
    }, 200);
    Futuro.comentarCheckin(checkin, principio); // para la IA, más adelante
  }

  if (form.dataset.form === "terminar-semana") {
    const libro = libroActivo();
    const prog = progresoDe(libro);
    const principio = principioActual(libro);
    const lista = checkinsDeLaSemana(libro, principio);
    estado.semanas.push({
      libroId: libro.id, principioId: principio.id, titulo: principio.titulo,
      inicio: prog.inicioSemana, fin: hoyISO(), estadoFinal: datos.estadoFinal,
      si: lista.filter(c => c.resultado === "si").length,
      medio: lista.filter(c => c.resultado === "medio").length,
      no: lista.filter(c => c.resultado === "no").length,
      textos: lista.filter(c => c.texto).map(c => c.texto)
    });
    prog.estados[principio.id] = datos.estadoFinal;
    prog.indice++;
    const siguiente = libro.principios[prog.indice];
    if (siguiente && prog.estados[siguiente.id] !== "habito") prog.estados[siguiente.id] = "practica";
    prog.inicioSemana = hoyISO();
    guardar(); cerrarHoja();
    setTimeout(() => { pintar(); window.scrollTo(0, 0); confeti(); aviso(siguiente ? "✨ ¡Nuevo principio desbloqueado!" : "🎉 ¡Libro terminado!"); }, 200);
  }

  if (form.dataset.form === "cita") {
    estado.citasPropias.unshift({ texto: datos.texto.trim(), autor: datos.autor.trim() });
    citaElegida = null;
    guardar(); pintar(); aviso("Cita guardada 💬");
  }

  if (form.dataset.form === "libro") {
    const principios = datos.principios.split("\n").map(l => l.trim()).filter(Boolean).map((linea, i) => {
      const [titulo, significado = ""] = linea.split("|").map(s => s.trim());
      return { id: i + 1, parte: "", titulo, significado, ideasClave: [], retos: [] };
    });
    if (!principios.length) { aviso("Añade al menos un principio"); return; }
    estado.librosPropios.push({ id: "libro-" + Date.now(), titulo: datos.titulo.trim(), autor: datos.autor.trim(), principios });
    guardar(); pintar(); aviso("📚 Libro añadido");
  }
});

// ───────── Copia de seguridad ─────────

async function exportar() {
  const nombre = `aplicar-libros-${hoyISO()}.json`;
  const archivo = new File([JSON.stringify(estado, null, 2)], nombre, { type: "application/json" });
  // En iPhone se abre el menú Compartir para guardarlo en Archivos/iCloud
  if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
    try { await navigator.share({ files: [archivo], title: "Copia de Aplicar libros" }); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = nombre;
  enlace.click();
  setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
}

document.addEventListener("change", async e => {
  if (e.target.id !== "archivo-importar" || !e.target.files[0]) return;
  try {
    const datos = JSON.parse(await e.target.files[0].text());
    if (!datos.version || !Array.isArray(datos.checkins)) throw new Error("formato");
    if (!confirm("Esto sustituirá tus datos actuales por los de la copia. ¿Continuar?")) return;
    estado = Object.assign(Almacen.estadoInicial(), datos);
    guardar(); pintar();
    aviso("✅ Copia restaurada");
  } catch (err) {
    alert("Ese archivo no parece una copia de Aplicar libros.");
  }
});

// ───────── Arranque ─────────

pintar();
if (!estado.bienvenidaVista) setTimeout(abrirBienvenida, 400);
Almacen.pedirPersistencia();
// Si cambias de día con la app abierta, se actualiza al volver a ella
let ultimoDia = hoyISO();
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && hoyISO() !== ultimoDia) { ultimoDia = hoyISO(); citaElegida = null; pintar(); }
});
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
