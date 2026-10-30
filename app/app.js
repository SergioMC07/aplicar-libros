// APP: pantallas y lógica. Los datos se guardan con Almacen (app/almacen.js).

let estado = Almacen.cargar();
let pestanaActual = "hoy";
const pantalla = document.getElementById("pantalla");
const hoja = document.getElementById("hoja");
const hojaContenido = document.getElementById("hoja-contenido");

// ───────── Utilidades ─────────

function hoyISO(fecha = new Date()) {
  const f = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  return f.toISOString().slice(0, 10);
}
function diasEntre(desdeISO, hastaISO) {
  return Math.round((new Date(hastaISO + "T12:00") - new Date(desdeISO + "T12:00")) / 86400000);
}
function fechaBonita(iso, opciones = { weekday: "long", day: "numeric", month: "long" }) {
  return new Date(iso + "T12:00").toLocaleDateString("es-ES", opciones);
}
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function guardar() { Almacen.guardar(estado); }

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
function citaDelDia() {
  const citas = todasLasCitas();
  const n = Math.floor(new Date(hoyISO() + "T12:00").getTime() / 86400000);
  return citas[n % citas.length];
}

// ───────── Pantallas ─────────

function pintar() {
  document.documentElement.dataset.tema = estado.tema;
  document.querySelectorAll(".pestanas button").forEach(b => b.classList.toggle("activa", b.dataset.pestana === pestanaActual));
  pantalla.innerHTML = { hoy: pantallaHoy, progreso: pantallaProgreso, citas: pantallaCitas, libros: pantallaLibros }[pestanaActual]();
  window.scrollTo(0, 0);
}

function pantallaHoy() {
  const libro = libroActivo();
  const principio = principioActual(libro);
  const cabecera = `
    <div class="cabecera">
      <span class="fecha">${fechaBonita(hoyISO())}</span>
      <span class="chip">🔥 ${racha()} ${racha() === 1 ? "día" : "días"}</span>
    </div>`;

  if (!principio) {
    return cabecera + `
      <div class="tarjeta">
        <h2>🎉 Has terminado «${esc(libro.titulo)}»</h2>
        <p class="suave">Repasa tus hábitos en Progreso o activa otro libro en Libros.</p>
      </div>`;
  }

  const dia = diaDeLaSemana(libro);
  const [reto, ejemplo] = retoDelDia(principio, dia);
  const hecho = checkinDeHoy();
  const semanaCumplida = diasEntre(progresoDe(libro).inicioSemana, hoyISO()) >= 6;
  const cita = citaDelDia();
  const puntos = Array.from({ length: 7 }, (_, i) => `<i class="${i <= dia ? "hecho" : ""}"></i>`).join("");

  return cabecera + `
    <div class="tarjeta reto">
      <div class="etiqueta">Reto de hoy · Día ${dia + 1} de 7</div>
      <div class="texto-reto">${esc(reto)}</div>
      <div class="ejemplo">💡 ${esc(ejemplo)}</div>
      <div class="puntos">${puntos}</div>
    </div>

    ${hecho ? `
      <div class="tarjeta checkin-hecho">
        <span class="icono-resultado">${RESULTADOS[hecho.resultado].icono}</span>
        <div style="flex:1">
          <strong>${RESULTADOS[hecho.resultado].texto}</strong>
          ${hecho.texto ? `<p class="suave peque">${esc(hecho.texto)}</p>` : ""}
          <button class="fantasma" data-accion="checkin">Editar</button>
        </div>
      </div>` : `
      <button data-accion="checkin" style="margin-bottom:14px">🌙 ¿Cómo te ha ido hoy?</button>`}

    <div class="tarjeta">
      <p class="suave peque">Principio ${libro.principios.indexOf(principio) + 1} de ${libro.principios.length} · ${esc(principio.parte || libro.titulo)}</p>
      <h2>${esc(principio.titulo)}</h2>
      <p>${esc(principio.significado)}</p>
      ${principio.ideasClave && principio.ideasClave.length ? `
        <details>
          <summary>Ideas clave</summary>
          <ul class="ideas">${principio.ideasClave.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
        </details>` : ""}
    </div>

    ${semanaCumplida
      ? `<button data-accion="terminar-semana" style="margin-bottom:14px">✨ Terminar semana y pasar al siguiente</button>`
      : `<p class="suave peque" style="text-align:center">Siguiente principio en ${6 - diasEntre(progresoDe(libro).inicioSemana, hoyISO())} ${6 - diasEntre(progresoDe(libro).inicioSemana, hoyISO()) === 1 ? "día" : "días"} · <button class="fantasma peque" data-accion="terminar-semana">Pasar ya</button></p>`}

    <div class="tarjeta">
      <p class="suave peque">Cita del día</p>
      <div class="cita">«${esc(cita.texto)}»</div>
      <div class="cita-autor">— ${esc(cita.autor)}</div>
    </div>`;
}

function pantallaProgreso() {
  const libro = libroActivo();
  const prog = progresoDe(libro);
  const habitos = Object.values(prog.estados).filter(e => e === "habito").length;
  const historial = [...estado.checkins].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const semanas = estado.semanas.filter(s => s.libroId === libro.id).slice().reverse();

  return `
    <h1>Progreso</h1>
    <div class="numeros">
      <div class="tarjeta"><strong>🔥 ${racha()}</strong><span class="suave peque">Racha</span></div>
      <div class="tarjeta"><strong>${estado.checkins.length}</strong><span class="suave peque">Check-ins</span></div>
      <div class="tarjeta"><strong>${habitos}</strong><span class="suave peque">Hábitos</span></div>
    </div>

    <h3>Principios · ${esc(libro.titulo)}</h3>
    <div class="tarjeta">
      <p class="suave peque">Toca el estado para cambiarlo.</p>
      <ul class="lista">
        ${libro.principios.map((p, i) => `
          <li class="linea-principal">
            <span>${i + 1}. ${esc(p.titulo)}</span>
            <button class="estado ${prog.estados[p.id] || "pendiente"}" data-accion="cambiar-estado" data-id="${p.id}">${ESTADOS[prog.estados[p.id] || "pendiente"]}</button>
          </li>`).join("")}
      </ul>
    </div>

    ${semanas.length ? `
      <h3>Semanas terminadas</h3>
      ${semanas.map(s => `
        <details class="tarjeta">
          <summary>${esc(s.titulo)}</summary>
          <p class="suave peque">${fechaBonita(s.inicio, { day: "numeric", month: "short" })} – ${fechaBonita(s.fin, { day: "numeric", month: "short" })} · ✅ ${s.si} · 🌓 ${s.medio} · ❌ ${s.no} · ${ESTADOS[s.estadoFinal]}</p>
          ${s.textos.length ? `<ul class="ideas">${s.textos.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : `<p class="suave peque">Sin notas esa semana.</p>`}
        </details>`).join("")}` : ""}

    <h3>Historial de check-ins</h3>
    <div class="tarjeta">
      ${historial.length ? `<ul class="lista">${historial.map(c => {
        const p = libroPorId(c.libroId)?.principios.find(x => x.id === c.principioId);
        return `<li>
          <div class="linea-principal"><strong>${RESULTADOS[c.resultado].icono} ${fechaBonita(c.fecha, { weekday: "short", day: "numeric", month: "short" })}</strong><span class="suave peque">${esc(p ? p.titulo : "")}</span></div>
          ${c.texto ? `<p class="peque" style="margin-top:4px">${esc(c.texto)}</p>` : ""}
        </li>`;
      }).join("")}</ul>` : `<div class="vacio">Aún no hay check-ins. Esta noche haz el primero desde Hoy.</div>`}
    </div>`;
}

function pantallaCitas() {
  const cita = citaDelDia();
  return `
    <h1>Citas</h1>
    <div class="tarjeta reto">
      <div class="etiqueta">Cita del día</div>
      <div class="texto-reto" style="font-size:20px">«${esc(cita.texto)}»</div>
      <div>— ${esc(cita.autor)}</div>
    </div>

    <details class="tarjeta">
      <summary>➕ Añadir una cita</summary>
      <form data-form="cita" style="margin-top:12px">
        <textarea name="texto" placeholder="Escribe la cita" required></textarea>
        <input type="text" name="autor" placeholder="Autor" required>
        <button type="submit">Guardar cita</button>
      </form>
    </details>

    <div class="tarjeta">
      <ul class="lista">
        ${todasLasCitas().map((c, i) => `
          <li>
            <div class="cita" style="font-size:16px">«${esc(c.texto)}»</div>
            <div class="linea-principal"><span class="cita-autor">— ${esc(c.autor)}</span>
            ${c.propia ? `<button class="fantasma peque" data-accion="borrar-cita" data-indice="${i}">Borrar</button>` : ""}</div>
          </li>`).join("")}
      </ul>
    </div>`;
}

function pantallaLibros() {
  return `
    <h1>Libros</h1>
    ${todosLosLibros().map(l => {
      const prog = estado.progresoLibros[l.id];
      const activo = l.id === estado.libroActivoId;
      return `
        <div class="tarjeta">
          <h2>${esc(l.titulo)}</h2>
          <p class="suave peque">${esc(l.autor || "")} · ${l.principios.length} principios${prog ? ` · vas por el ${Math.min(prog.indice + 1, l.principios.length)}` : ""}</p>
          ${activo ? `<span class="chip">📖 Libro activo</span>` : `<button class="secundario" data-accion="activar-libro" data-id="${esc(l.id)}">Activar este libro</button>`}
        </div>`;
    }).join("")}

    <details class="tarjeta">
      <summary>➕ Añadir un libro</summary>
      <form data-form="libro" style="margin-top:12px">
        <input type="text" name="titulo" placeholder="Título" required>
        <input type="text" name="autor" placeholder="Autor">
        <p class="suave peque">Un principio por línea. Si quieres, añade su significado después de una barra:<br><em>Escucha más de lo que hablas | La gente se abre cuando se siente escuchada</em></p>
        <textarea name="principios" style="min-height:160px" required></textarea>
        <button type="submit">Guardar libro</button>
      </form>
    </details>

    <h3>Ajustes</h3>
    <div class="tarjeta">
      <p><strong>Tema</strong></p>
      <div class="fila" style="margin-bottom:16px">
        ${["auto", "claro", "oscuro"].map(t => `<button class="${estado.tema === t ? "" : "secundario"}" data-accion="tema" data-tema="${t}">${{ auto: "Auto", claro: "Claro", oscuro: "Oscuro" }[t]}</button>`).join("")}
      </div>
      <p><strong>Copia de seguridad</strong></p>
      <p class="suave peque">Tus datos viven en este móvil. Guarda una copia en Archivos o iCloud de vez en cuando.</p>
      <div class="fila">
        <button class="secundario" data-accion="exportar">Exportar</button>
        <button class="secundario" data-accion="importar">Importar</button>
      </div>
      <input type="file" id="archivo-importar" accept="application/json,.json" hidden>
    </div>
    <button class="peligro" data-accion="borrar-todo">Borrar todos mis datos</button>`;
}

// ───────── Hojas (ventanas desde abajo) ─────────

function abrirHoja(html) {
  hojaContenido.innerHTML = html;
  hoja.showModal();
}
function cerrarHoja() { hoja.close(); }
hoja.addEventListener("click", e => { if (e.target === hoja) cerrarHoja(); });

function abrirCheckin() {
  const libro = libroActivo();
  const principio = principioActual(libro);
  if (!principio) return;
  const previo = checkinDeHoy();
  const [reto] = retoDelDia(principio, diaDeLaSemana(libro));
  abrirHoja(`
    <h2>¿Cómo te ha ido hoy?</h2>
    <p class="suave peque">${esc(reto)}</p>
    <form data-form="checkin">
      <div class="opciones">
        ${Object.entries(RESULTADOS).map(([valor, r]) => `
          <button type="button" data-valor="${valor}" class="${previo?.resultado === valor ? "elegido" : ""}">${r.icono}<br>${r.texto}</button>`).join("")}
      </div>
      <input type="hidden" name="resultado" value="${previo?.resultado || ""}">
      <textarea name="texto" placeholder="¿Qué pasó? 2 o 3 líneas…">${esc(previo?.texto || "")}</textarea>
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
  abrirHoja(`
    <h2>Resumen de la semana</h2>
    <p><strong>${esc(principio.titulo)}</strong></p>
    <p class="suave">✅ ${cuenta("si")} · 🌓 ${cuenta("medio")} · ❌ ${cuenta("no")} · ${lista.length} de 7 días con check-in</p>
    ${lista.length ? `<ul class="ideas">${lista.filter(c => c.texto).map(c => `<li><span class="suave peque">${fechaBonita(c.fecha, { weekday: "short" })}:</span> ${esc(c.texto)}</li>`).join("") || "<li class='suave'>Sin notas escritas.</li>"}</ul>` : `<p class="suave">No escribiste check-ins esta semana.</p>`}
    <h3>¿Cómo queda este principio?</h3>
    <form data-form="terminar-semana">
      <div class="fila" style="margin-bottom:12px">
        <label class="tarjeta" style="margin:0"><input type="radio" name="estadoFinal" value="practica" ${sugerido === "practica" ? "checked" : ""}> Sigo practicando</label>
        <label class="tarjeta" style="margin:0"><input type="radio" name="estadoFinal" value="habito" ${sugerido === "habito" ? "checked" : ""}> Ya es hábito</label>
      </div>
      <div class="fila">
        <button type="button" class="secundario" data-accion="cerrar">Ahora no</button>
        <button type="submit">Siguiente principio</button>
      </div>
    </form>`);
}

// ───────── Acciones ─────────

const acciones = {
  "checkin": abrirCheckin,
  "terminar-semana": abrirResumenSemana,
  "cerrar": cerrarHoja,
  "cambiar-estado": b => {
    const prog = progresoDe(libroActivo());
    const orden = ["pendiente", "practica", "habito"];
    const actual = prog.estados[b.dataset.id] || "pendiente";
    prog.estados[b.dataset.id] = orden[(orden.indexOf(actual) + 1) % orden.length];
    guardar(); pintar();
  },
  "borrar-cita": b => {
    if (!confirm("¿Borrar esta cita?")) return;
    estado.citasPropias.splice(Number(b.dataset.indice), 1);
    guardar(); pintar();
  },
  "activar-libro": b => { estado.libroActivoId = b.dataset.id; guardar(); pestanaActual = "hoy"; pintar(); },
  "tema": b => { estado.tema = b.dataset.tema; guardar(); pintar(); },
  "exportar": exportar,
  "importar": () => document.getElementById("archivo-importar").click(),
  "borrar-todo": () => {
    if (!confirm("Se borrarán todos tus check-ins, citas y libros añadidos. ¿Seguro? Haz antes una copia si la quieres.")) return;
    estado = Almacen.estadoInicial(); guardar(); pintar();
  }
};

document.addEventListener("click", e => {
  const pestana = e.target.closest("[data-pestana]");
  if (pestana) { pestanaActual = pestana.dataset.pestana; pintar(); return; }

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
    if (!datos.resultado) { alert("Marca si lo hiciste, a medias o no."); return; }
    const libro = libroActivo();
    const principio = principioActual(libro);
    const previo = checkinDeHoy();
    const checkin = {
      id: previo?.id || String(Date.now()),
      fecha: hoyISO(), libroId: libro.id, principioId: principio.id,
      dia: diaDeLaSemana(libro) + 1, resultado: datos.resultado, texto: datos.texto.trim()
    };
    estado.checkins = estado.checkins.filter(c => c.fecha !== checkin.fecha).concat(checkin);
    guardar(); cerrarHoja(); pintar();
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
    guardar(); cerrarHoja(); pintar();
  }

  if (form.dataset.form === "cita") {
    estado.citasPropias.unshift({ texto: datos.texto.trim(), autor: datos.autor.trim() });
    guardar(); pintar();
  }

  if (form.dataset.form === "libro") {
    const principios = datos.principios.split("\n").map(l => l.trim()).filter(Boolean).map((linea, i) => {
      const [titulo, significado = ""] = linea.split("|").map(s => s.trim());
      return { id: i + 1, parte: "", titulo, significado, ideasClave: [], retos: [] };
    });
    if (!principios.length) { alert("Añade al menos un principio."); return; }
    estado.librosPropios.push({ id: "libro-" + Date.now(), titulo: datos.titulo.trim(), autor: datos.autor.trim(), principios });
    guardar(); pintar();
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
    alert("Copia restaurada.");
  } catch (err) {
    alert("Ese archivo no parece una copia de Aplicar libros.");
  }
});

// ───────── Arranque ─────────

pintar();
Almacen.pedirPersistencia();
// Si cambias de día con la app abierta, se actualiza al volver a ella
let ultimoDia = hoyISO();
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && hoyISO() !== ultimoDia) { ultimoDia = hoyISO(); pintar(); }
});
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
