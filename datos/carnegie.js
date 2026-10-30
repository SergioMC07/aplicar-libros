// Libro: "Cómo ganar amigos e influir sobre las personas" (Dale Carnegie)
// Principios resumidos con palabras propias.
// Cada principio tiene:
//   - significado: una frase
//   - ideasClave: las ideas principales del capítulo
//   - retos: 7 retos, uno por día. Cada reto es [qué hacer, ejemplo de la vida real]

const CARNEGIE = {
  id: "carnegie-amigos",
  titulo: "Cómo ganar amigos e influir sobre las personas",
  autor: "Dale Carnegie",
  principios: [

    // ───────── Parte 1: Técnicas fundamentales para tratar con las personas ─────────
    {
      id: 1, parte: "Técnicas fundamentales",
      titulo: "No critiques, no condenes, no te quejes",
      significado: "La crítica pone a la gente a la defensiva; intenta entender por qué actúan así en vez de juzgarles.",
      ideasClave: [
        "Casi nadie se culpa a sí mismo de nada: todos tenemos una justificación para lo que hacemos.",
        "La crítica es inútil porque hace que la otra persona se defienda y se justifique.",
        "También es peligrosa: hiere el orgullo y genera resentimiento que dura años.",
        "Las personas no somos seres lógicos, sino emocionales, llenos de orgullo y vanidad.",
        "Cualquiera puede criticar y quejarse; hace falta carácter para comprender y perdonar.",
        "En lugar de condenar, intenta entender por qué alguien hace lo que hace."
      ],
      retos: [
        ["Pasa el día entero sin quejarte en voz alta de nada ni de nadie.", "En la tienda, cuando un cliente sea pesado, en lugar de quejarte con un compañero, piensa qué le puede estar pasando."],
        ["Cada vez que vayas a criticar a alguien, cámbialo por una pregunta: «¿Por qué habrá hecho eso?».", "Un compañero de grupo de la uni no ha hecho su parte: pregúntale si le ha surgido algo antes de juzgarle."],
        ["Detecta 3 momentos en los que te apetece criticar y no lo hagas. Apúntalos.", "Un profesor explica mal, un amigo llega tarde, un cliente deja la ropa tirada en el probador."],
        ["Cuando algo salga mal, describe el problema sin culpar a nadie.", "En vez de «Has dejado el almacén hecho un desastre», di «El almacén está desordenado, ¿lo vemos juntos?»."],
        ["No hables mal de nadie que no esté presente en todo el día.", "Si en el descanso de la tienda se critica al encargado, cambia de tema o di algo neutro."],
        ["Piensa en alguien que te cae mal y escribe una razón que explique su comportamiento.", "Ese compañero de clase que interrumpe a lo mejor necesita sentirse escuchado."],
        ["Repaso: revisa la semana y nota cómo reaccionó la gente cuando no criticaste.", "¿Hubo alguna situación en la uni o la tienda que salió mejor de lo habitual?"]
      ]
    },
    {
      id: 2, parte: "Técnicas fundamentales",
      titulo: "Aprecia de forma honesta y sincera",
      significado: "Todos queremos sentirnos valorados; reconoce lo bueno de los demás de verdad, sin peloteo.",
      ideasClave: [
        "El deseo de sentirse importante es una de las necesidades más profundas del ser humano.",
        "La gente hace cosas sorprendentes por sentirse apreciada.",
        "Apreciar no es adular: el halago es falso y egoísta; el aprecio es sincero y sale del corazón.",
        "Pasamos la mayor parte del tiempo pensando en nosotros; si pensamos en las virtudes de los demás, no hará falta adular.",
        "Todo el mundo es superior a ti en algo: busca en qué y díselo.",
        "Un elogio sincero se recuerda durante años, aunque tú lo olvides."
      ],
      retos: [
        ["Da 3 agradecimientos concretos hoy (di qué te ha gustado exactamente).", "«Gracias por pasarme los apuntes, me han salvado el tema 4»."],
        ["Felicita a un compañero de trabajo por algo específico que haga bien.", "«Qué bien has doblado esa mesa, a mí nunca me queda tan ordenada»."],
        ["Agradece a un profesor algo concreto de su clase.", "«Me ayudó mucho el ejemplo que puso hoy para entender el tema»."],
        ["Cuando un cliente sea amable o paciente, díselo.", "«Gracias por esperar, de verdad, con la cola que hay se agradece»."],
        ["Manda un mensaje a alguien de tu familia o a un amigo valorando algo que hizo por ti.", "Un mensaje a un amigo que te ayudó con una mudanza o un examen."],
        ["Encuentra algo que admirar en alguien con quien no te llevas especialmente bien.", "Ese compañero exigente de grupo quizá es el más organizado: díselo."],
        ["Repaso: ¿qué elogio provocó la reacción más bonita esta semana?", "Apunta cómo cambió el trato con esa persona."]
      ]
    },
    {
      id: 3, parte: "Técnicas fundamentales",
      titulo: "Despierta en el otro un deseo intenso",
      significado: "Para que alguien haga algo, habla de lo que él quiere, no de lo que quieres tú.",
      ideasClave: [
        "La única forma de influir en alguien es hablar de lo que esa persona quiere y mostrarle cómo conseguirlo.",
        "A ti te interesa lo que tú quieres; a los demás, lo que quieren ellos.",
        "Toda acción nace de un deseo: primero despierta el deseo, luego pide.",
        "Ponerte en el lugar del otro y ver las cosas desde su ángulo es la clave del éxito (Henry Ford).",
        "Antes de pedir algo, pregúntate: «¿Cómo hago que quiera hacerlo?».",
        "Esto no es manipular: es buscar un resultado bueno para los dos."
      ],
      retos: [
        ["Antes de pedir algo, pregúntate: «¿Qué gana la otra persona con esto?».", "Para cambiar un turno en la tienda, ofrece algo que le venga bien a tu compañero."],
        ["Haz una petición explicándola desde el beneficio del otro.", "«Si repartimos así el trabajo de grupo, terminamos todos antes del finde»."],
        ["Recomienda un producto pensando en lo que necesita el cliente, no en vender.", "Pregunta para qué ocasión es antes de enseñar nada."],
        ["Escucha 3 conversaciones y detecta qué quiere de verdad cada persona.", "En clase, en la tienda y en casa."],
        ["Convence a alguien de algo pequeño sin hablar de ti en ningún momento.", "Proponer un sitio para comer hablando solo de lo que le gusta a tu amigo."],
        ["Reescribe un mensaje que ibas a mandar para que empiece por el interés del otro.", "Un correo a un profesor: empieza por lo que facilita su trabajo."],
        ["Repaso: ¿en qué situación funcionó mejor hablar de lo que quería el otro?", "Apunta la frase que usaste para repetirla."]
      ]
    },

    // ───────── Parte 2: Seis maneras de agradar a los demás ─────────
    {
      id: 4, parte: "Seis maneras de agradar",
      titulo: "Interésate de verdad por los demás",
      significado: "Haces más amigos interesándote por la gente que intentando que se interesen por ti.",
      ideasClave: [
        "A la gente no le interesas tú: le interesa ella misma.",
        "Nos interesan los demás cuando ellos se interesan por nosotros.",
        "El interés tiene que ser sincero; el fingido se nota.",
        "Pequeños gestos cuentan: recordar cumpleaños, preguntar por algo que te contaron, saludar con ganas.",
        "Dedicar tiempo y energía a los demás es la forma más rápida de conectar.",
        "Quien no se interesa por los demás tiene las mayores dificultades en la vida (Alfred Adler)."
      ],
      retos: [
        ["Haz 3 preguntas personales sinceras hoy y escucha las respuestas.", "«¿Qué tal te fue el examen que tenías?» a un compañero de clase."],
        ["Pregunta a un compañero de la tienda algo sobre su vida fuera del trabajo.", "«¿Qué haces los findes?» o «¿Estudias algo?»."],
        ["Recuerda algo que alguien te contó hace días y pregúntale por ello.", "«¿Al final fuiste a ver a tu abuela?»."],
        ["Saluda con entusiasmo de verdad a todas las personas que veas hoy.", "Al entrar en clase y al llegar a la tienda, mirando a los ojos."],
        ["Apunta el cumpleaños o algo importante de 3 personas cercanas.", "Compañeros de trabajo o de clase con los que hablas a menudo."],
        ["Haz algo por alguien que te cueste tiempo y no te beneficie.", "Explicarle a un compañero algo que no entendió en clase."],
        ["Repaso: ¿con quién has conectado más esta semana gracias a interesarte?", "Apunta qué pregunta abrió la conversación."]
      ]
    },
    {
      id: 5, parte: "Seis maneras de agradar",
      titulo: "Sonríe",
      significado: "Una sonrisa sincera dice «me alegro de verte» sin palabras y cambia el ambiente.",
      ideasClave: [
        "Las acciones dicen más que las palabras: una sonrisa dice «me caes bien, me alegro de verte».",
        "Una sonrisa falsa no engaña a nadie; tiene que salir de dentro.",
        "Si no te apetece sonreír, oblígate: la acción y el sentimiento van juntos y uno arrastra al otro.",
        "La felicidad no depende de lo que tienes, sino de lo que piensas.",
        "Sonreír también se nota por teléfono y en la voz.",
        "Una sonrisa no cuesta nada y da mucho."
      ],
      retos: [
        ["Sonríe a cada persona con la que te cruces hoy, aunque sea un segundo.", "Al conserje de la uni, a los compañeros, a la gente en el transporte."],
        ["Recibe a cada cliente con una sonrisa antes de decir nada.", "En la tienda, aunque haya cola."],
        ["Empieza el día sonriendo al espejo y fíjate si cambia tu humor.", "Antes de salir de casa hacia clase."],
        ["Sonríe cuando estés de mal humor y fíjate qué pasa.", "Un día cansado en la tienda o tras una clase aburrida."],
        ["Habla por teléfono o manda un audio sonriendo.", "Llamar a un familiar o un audio a un amigo."],
        ["Sonríe a alguien con quien tienes una relación tensa.", "Un compañero de grupo o de turno con el que chocas."],
        ["Repaso: ¿notaste diferencias en cómo te trató la gente?", "Apunta un momento concreto."]
      ]
    },
    {
      id: 6, parte: "Seis maneras de agradar",
      titulo: "Recuerda y usa el nombre de las personas",
      significado: "El nombre de alguien es, para esa persona, la palabra más importante; úsalo.",
      ideasClave: [
        "El nombre de una persona es para ella el sonido más dulce en cualquier idioma.",
        "Recordar un nombre es un halago sutil y muy eficaz; olvidarlo o escribirlo mal, lo contrario.",
        "La mayoría olvida los nombres porque no hace el esfuerzo de fijarlos.",
        "Truco: repítelo al oírlo, úsalo en la conversación y asócialo con algo.",
        "Si no lo entiendes bien, pregunta cómo se escribe.",
        "Usar el nombre hace que la persona se sienta única y reconocida."
      ],
      retos: [
        ["Usa el nombre de 3 personas en conversaciones hoy.", "«Gracias, Laura» en vez de solo «gracias»."],
        ["Aprende el nombre de alguien de clase con quien nunca has hablado.", "Preséntate y repite su nombre en voz alta."],
        ["Si un cliente te dice su nombre (encargo, tarjeta, reserva), úsalo al despedirte.", "«Que vaya bien, Marta»."],
        ["Escribe al final del día los nombres nuevos que has aprendido.", "Compañeros, clientes habituales, gente del transporte."],
        ["Pregunta el nombre a alguien que ves a menudo pero no conoces.", "El de la cafetería de la uni o el repartidor de la tienda."],
        ["Usa una asociación para recordar un nombre difícil.", "«Íker, como Íker Casillas»."],
        ["Repaso: ¿cuántos nombres nuevos sabes ahora? ¿Notaste reacciones?", "Apunta quién se sorprendió al oír su nombre."]
      ]
    },
    {
      id: 7, parte: "Seis maneras de agradar",
      titulo: "Sé un buen oyente",
      significado: "Anima a los demás a hablar de sí mismos y escucha con atención de verdad.",
      ideasClave: [
        "Para ser interesante, hay que estar interesado.",
        "Escuchar con atención es uno de los mayores halagos que puedes hacer.",
        "Mucha gente solo quiere alguien que la escuche, no consejos.",
        "Haz preguntas que al otro le guste responder y anímale a hablar de sus logros.",
        "La gente prefiere hablar de sí misma y de sus problemas que de los tuyos.",
        "Escuchar bien calma incluso a la persona más enfadada."
      ],
      retos: [
        ["En cada conversación de hoy, habla menos que la otra persona.", "Con amigos en la uni y con compañeros en la tienda."],
        ["Escucha a alguien sin interrumpir ni mirar el móvil.", "Un amigo que te cuenta algo de su vida."],
        ["Haz 2 preguntas de seguimiento sobre lo que te cuente alguien.", "«¿Y cómo te sentiste?» o «¿Y qué pasó después?»."],
        ["Cuando un cliente se queje, escucha entero antes de responder.", "Una devolución en la tienda: deja que termine de explicar."],
        ["Resume lo que te ha dicho alguien antes de dar tu opinión.", "«O sea, que lo que te preocupa es…»."],
        ["Pregunta a alguien por algo de lo que esté orgulloso.", "Un compañero que hizo una buena presentación o un deporte que practica."],
        ["Repaso: ¿qué aprendiste de alguien esta semana solo por escuchar?", "Apunta lo que te sorprendió."]
      ]
    },
    {
      id: 8, parte: "Seis maneras de agradar",
      titulo: "Habla de lo que le interesa al otro",
      significado: "El camino al corazón de alguien es hablar de lo que más le importa a esa persona.",
      ideasClave: [
        "Las personas que caen bien a todos se preparan para hablar de lo que interesa a cada uno.",
        "Descubre las aficiones y preocupaciones del otro antes de hablar de las tuyas.",
        "Hablar de los intereses del otro beneficia a los dos: aprendes y conectas.",
        "Mucha gente consigue lo que quiere sin pedirlo, solo hablando de lo que apasiona al otro."
      ],
      retos: [
        ["Descubre la afición principal de 2 personas cercanas.", "Un compañero de clase y uno de la tienda."],
        ["Inicia una conversación sobre algo que le gusta a la otra persona, no a ti.", "Su serie favorita, su equipo, su deporte."],
        ["Con un cliente, habla de lo que busca antes de hablar del producto.", "«¿Es para algún plan especial?»."],
        ["Infórmate un poco sobre la afición de alguien y sácala en la conversación.", "Busca algo de su grupo de música favorito."],
        ["Pregunta a un profesor por qué eligió su asignatura.", "Al final de clase o en tutoría."],
        ["En una conversación de grupo, lleva el tema hacia lo que le interesa al más callado.", "En la comida con compañeros."],
        ["Repaso: ¿qué conversación fluyó mejor esta semana y por qué?", "Apunta el tema."]
      ]
    },
    {
      id: 9, parte: "Seis maneras de agradar",
      titulo: "Haz que el otro se sienta importante, con sinceridad",
      significado: "Trata a cada persona como alguien que importa, porque importa.",
      ideasClave: [
        "La regla de oro: trata a los demás como te gustaría que te trataran.",
        "Todos queremos sentirnos importantes en nuestro pequeño mundo.",
        "Pequeñas frases como «perdona la molestia», «¿serías tan amable?» o «gracias» marcan la diferencia.",
        "Busca algo que admirar en cada persona con la que trates.",
        "Hazlo siempre con sinceridad: si es falso, sale mal.",
        "Hablar a la gente de sí misma la mantiene escuchando horas."
      ],
      retos: [
        ["Usa «por favor», «perdona la molestia» y «gracias» en todas tus peticiones de hoy.", "Con compañeros de trabajo y con el personal de la uni."],
        ["Busca algo que admirar en cada persona con la que hables hoy.", "Aunque no lo digas, encuéntralo."],
        ["Pide consejo a alguien sobre algo que sabe hacer bien.", "Pregúntale al compañero más veterano de la tienda cómo maneja a los clientes difíciles."],
        ["Trata a un cliente como si fuera el más importante del día.", "Dedícale toda tu atención aunque solo pregunte una talla."],
        ["Agradece públicamente a alguien su trabajo.", "En un grupo de clase: «Gracias a Pablo esto ha salido»."],
        ["Haz que alguien que suele pasar desapercibido se sienta visto.", "El compañero callado de clase o la persona de limpieza."],
        ["Repaso: ¿a quién has hecho sentir importante y cómo reaccionó?", "Apunta el momento."]
      ]
    },

    // ───────── Parte 3: Cómo convencer a los demás de tu forma de pensar ─────────
    {
      id: 10, parte: "Cómo convencer",
      titulo: "Evita las discusiones",
      significado: "La única forma de ganar una discusión es no tenerla: aunque ganes, el otro se resiente.",
      ideasClave: [
        "En una discusión nadie gana: si pierdes, pierdes; si ganas, el otro se siente humillado y sigue pensando igual.",
        "Una persona convencida contra su voluntad sigue opinando lo mismo.",
        "Acepta el desacuerdo: puede enseñarte algo.",
        "No te fíes de tu primer impulso de defenderte; mantén la calma.",
        "Escucha primero, busca puntos en común, sé honesto con tus errores.",
        "Agradece al otro su interés y date tiempo para pensar antes de responder."
      ],
      retos: [
        ["Hoy no entres en ninguna discusión, aunque tengas razón.", "Un debate de fútbol o política con amigos: escucha y deja pasar."],
        ["Cuando no estés de acuerdo, di primero en qué sí lo estás.", "«Tienes razón en que el plazo es corto; lo que no veo claro es…»."],
        ["Ante un cliente enfadado, no discutas: escucha y busca una solución.", "Una devolución fuera de plazo: «Entiendo, déjame ver qué puedo hacer»."],
        ["Cuenta hasta 5 antes de responder a algo que te molesta.", "Un comentario de un compañero de grupo."],
        ["Agradece a alguien que te lleve la contraria.", "«Gracias por decírmelo, no lo había visto así»."],
        ["Pospón una conversación tensa: «Déjame pensarlo y lo hablamos mañana».", "Un desacuerdo con el encargado o en casa."],
        ["Repaso: ¿qué discusión evitaste y qué ganaste con ello?", "Apunta cómo terminó."]
      ]
    },
    {
      id: 11, parte: "Cómo convencer",
      titulo: "Respeta las opiniones ajenas; nunca digas «estás equivocado»",
      significado: "Decirle a alguien que se equivoca solo hace que defienda más su postura.",
      ideasClave: [
        "Decir «te equivocas» es un ataque a la inteligencia y al orgullo del otro.",
        "Nunca empieces con «te voy a demostrar que…»; eso es decir «soy más listo que tú».",
        "Usa frases como «puede que me equivoque, pero…» o «veamos los hechos».",
        "Si crees que alguien se equivoca, enséñale como si no le enseñaras.",
        "Solo sé que no sé nada: la humildad desarma.",
        "Cambiamos de opinión fácilmente, salvo cuando alguien nos dice que estamos equivocados."
      ],
      retos: [
        ["No digas «estás equivocado» ni «no tienes razón» en todo el día.", "En clase, en la tienda y en casa."],
        ["Usa la frase «puede que me equivoque, pero…» al menos una vez.", "Al corregir algo en un trabajo de grupo."],
        ["Cuando alguien diga algo incorrecto, pregunta en vez de corregir.", "«¿Dónde lo leíste? Yo tenía entendido otra cosa»."],
        ["Si un cliente se equivoca (precio, talla), corrígele sin que se sienta mal.", "«Ah, es que esa etiqueta confunde mucho»."],
        ["Escucha una opinión muy distinta a la tuya sin rebatirla.", "Un compañero con una opinión opuesta sobre un tema de clase."],
        ["Reconoce en voz alta algo en lo que otro tenía razón y tú no.", "«Tenías razón con lo del horario»."],
        ["Repaso: ¿cómo cambiaron las conversaciones al no decir «te equivocas»?", "Apunta un ejemplo."]
      ]
    },
    {
      id: 12, parte: "Cómo convencer",
      titulo: "Si te equivocas, admítelo rápido y con claridad",
      significado: "Reconocer un error antes que nadie desarma al otro y genera respeto.",
      ideasClave: [
        "Si sabes que te van a criticar, adelántate y critícate tú primero.",
        "Al admitir tu error, el otro suele volverse comprensivo y generoso.",
        "Cualquiera puede defender sus errores; admitirlos te pone por encima.",
        "Reconocerlo rápido evita discusiones y alivia tensión.",
        "Peleando nunca consigues bastante; cediendo, consigues más de lo que esperas."
      ],
      retos: [
        ["Si cometes un error hoy, admítelo antes de que te lo digan.", "«Perdona, me equivoqué al cobrarte, lo arreglo ahora»."],
        ["Pide perdón por algo pequeño que tenías pendiente.", "Un mensaje que no contestaste o un plan que cancelaste."],
        ["En la tienda, reconoce un fallo ante tu encargado antes de que lo descubra.", "Un pedido mal colocado o un descuadre."],
        ["Di «tienes razón, me he equivocado» al menos una vez.", "En una conversación con amigos o familia."],
        ["Revisa un trabajo de la uni y reconoce un fallo tuyo ante el grupo.", "«Mi parte tenía un error, ya lo he corregido»."],
        ["Cuando alguien te critique, responde reconociendo lo que tenga de verdad.", "«Es cierto, podría haberlo hecho mejor»."],
        ["Repaso: ¿cómo reaccionó la gente cuando admitiste tus errores?", "Apunta la reacción que más te sorprendió."]
      ]
    },
    {
      id: 13, parte: "Cómo convencer",
      titulo: "Empieza de forma amistosa",
      significado: "Una gota de miel convence más que un litro de hiel: abre con buen tono.",
      ideasClave: [
        "Si empiezas enfadado, el otro cierra su mente y su corazón.",
        "Con una gota de miel se cazan más moscas que con un litro de hiel.",
        "El sol (la amabilidad) consigue más que el viento (la fuerza).",
        "Un tono amable al principio hace que el otro quiera escucharte.",
        "Incluso en una queja, empieza con algo positivo."
      ],
      retos: [
        ["Empieza cada conversación de hoy con un saludo amable y algo positivo.", "«¡Buenos días! Qué bien te queda ese corte»."],
        ["Si tienes que quejarte de algo, empieza con amabilidad.", "En secretaría de la uni: «Hola, gracias por atenderme, tengo un problemilla…»."],
        ["Recibe a los clientes difíciles con más amabilidad de la normal.", "Un cliente que llega ya de mal humor."],
        ["Escribe un mensaje o correo que empiece con algo positivo antes de pedir algo.", "A un profesor: «Me está gustando mucho la asignatura. Quería preguntarle…»."],
        ["Resuelve una pequeña tensión empezando por un gesto amable.", "Llevarle un café al compañero con el que discutiste."],
        ["Habla con alguien que te cae mal con el tono más amable que puedas.", "Un compañero de turno o de grupo."],
        ["Repaso: ¿qué cambió al empezar las conversaciones con amabilidad?", "Apunta un caso concreto."]
      ]
    },
    {
      id: 14, parte: "Cómo convencer",
      titulo: "Consigue que digan «sí» desde el principio",
      significado: "Empieza por los puntos en los que estáis de acuerdo antes de llegar a los difíciles.",
      ideasClave: [
        "Un «no» es muy difícil de superar: el orgullo obliga a mantenerlo.",
        "Empieza hablando de lo que compartís y deja las diferencias para después.",
        "Cuantos más «sí» consigas al principio, más fácil será el acuerdo final.",
        "Es el método de Sócrates: preguntas con las que el otro tenga que estar de acuerdo.",
        "Insiste en que los dos buscáis lo mismo; solo difiere el camino."
      ],
      retos: [
        ["En una conversación, busca 3 puntos de acuerdo antes de dar tu opinión.", "En un debate de clase."],
        ["Con un cliente indeciso, haz preguntas que respondan con «sí».", "«¿Lo buscas cómodo? ¿Para diario? Entonces este te va a encantar»."],
        ["Al proponer algo al grupo, empieza por el objetivo común.", "«Todos queremos sacar buena nota, ¿verdad? Pues propongo…»."],
        ["Evita preguntas que inviten a decir «no».", "En vez de «¿No te importaría…?», di «¿Te viene bien si…?»."],
        ["Ante un desacuerdo, di en voz alta lo que compartís.", "«Los dos queremos que el turno salga bien»."],
        ["Convence a alguien de algo pequeño solo con preguntas.", "Que un amigo se apunte a estudiar en la biblioteca."],
        ["Repaso: ¿qué preguntas te funcionaron para conseguir «síes»?", "Apunta las mejores."]
      ]
    },
    {
      id: 15, parte: "Cómo convencer",
      titulo: "Deja que el otro hable más que tú",
      significado: "Quien habla más se siente escuchado y se abre a tus ideas.",
      ideasClave: [
        "La mayoría habla demasiado cuando intenta convencer.",
        "Deja que el otro se desahogue: sabe más de sus problemas que tú.",
        "Si le interrumpes, no te escuchará; espera a que termine.",
        "Hasta tus amigos prefieren hablar de sus logros que escuchar los tuyos.",
        "Si quieres amigos, deja que los demás te superen (La Rochefoucauld)."
      ],
      retos: [
        ["Hoy deja que la otra persona hable al menos el doble que tú.", "Una conversación con un amigo o compañero."],
        ["Con un cliente, haz preguntas y escucha antes de recomendar nada.", "«¿Qué buscas? ¿Qué no te gustó del anterior?»."],
        ["No cuentes tus logros hoy; pregunta por los de los demás.", "Si sacaste buena nota, pregunta antes por la de los demás."],
        ["En una reunión de grupo, habla el último.", "Deja que todos opinen primero."],
        ["Cuando alguien se queje, déjale desahogarse sin dar soluciones.", "Un compañero estresado en la tienda."],
        ["Pregunta a alguien su opinión sobre algo antes de dar la tuya.", "«¿Tú cómo lo harías?»."],
        ["Repaso: ¿qué descubriste al hablar menos?", "Apunta algo que no sabías."]
      ]
    },
    {
      id: 16, parte: "Cómo convencer",
      titulo: "Deja que sienta que la idea es suya",
      significado: "La gente defiende sus propias ideas; sugiere y deja que el otro llegue a la conclusión.",
      ideasClave: [
        "Confiamos más en las ideas que descubrimos nosotros que en las que nos dan hechas.",
        "Es más inteligente sugerir y dejar que el otro llegue a la conclusión.",
        "Pedir opinión y consejo hace que la persona se implique.",
        "No importa quién se lleve el mérito si el resultado es bueno.",
        "Los líderes se ponen por detrás para que los demás avancen."
      ],
      retos: [
        ["En lugar de imponer una idea, plantéala como pregunta.", "«¿Y si organizamos el trabajo por partes?»."],
        ["Pide ideas al grupo antes de dar la tuya.", "En un trabajo de la uni."],
        ["Deja que un cliente elija entre dos opciones que tú le propones.", "«¿Prefieres este en azul o en negro?»."],
        ["Si alguien propone algo parecido a tu idea, apóyale y dale el mérito.", "«Buena idea, hagámoslo así»."],
        ["Sugiere una mejora en la tienda preguntando su opinión al encargado.", "«¿Crees que funcionaría poner esto en la entrada?»."],
        ["Ayuda a alguien a resolver un problema solo con preguntas.", "Un compañero atascado con un ejercicio."],
        ["Repaso: ¿qué idea «suya» salió adelante gracias a ti?", "Apunta cómo lo planteaste."]
      ]
    },
    {
      id: 17, parte: "Cómo convencer",
      titulo: "Mira las cosas desde su punto de vista",
      significado: "Antes de responder, piensa honestamente cómo lo ve la otra persona.",
      ideasClave: [
        "Los demás pueden estar equivocados, pero ellos no lo creen: no les condenes, entiéndeles.",
        "Siempre hay una razón por la que alguien piensa y actúa como lo hace.",
        "Pregúntate: «¿Cómo me sentiría yo en su lugar?».",
        "Entender su punto de vista te ahorra tiempo, discusiones y enfados.",
        "Antes de hablar con alguien, piensa qué le vas a decir y qué te responderá."
      ],
      retos: [
        ["Antes de cada conversación importante, piensa 1 minuto cómo lo ve el otro.", "Antes de hablar con tu encargado o un profesor."],
        ["Ante un cliente molesto, imagina su día antes de responder.", "Quizá lleva toda la tarde buscando un regalo."],
        ["Escribe el punto de vista de alguien con quien no estás de acuerdo.", "Un compañero que quiere hacer el trabajo de otra forma."],
        ["Di en voz alta: «Entiendo que lo veas así porque…».", "En un desacuerdo con un amigo."],
        ["Piensa en una norma de la uni o la tienda que te molesta y busca por qué existe.", "Una norma de horarios o de devoluciones."],
        ["Pregunta a alguien cómo ve una situación antes de opinar.", "«¿Cómo lo has vivido tú?»."],
        ["Repaso: ¿qué situación entendiste mejor al ponerte en el lugar del otro?", "Apunta qué descubriste."]
      ]
    },
    {
      id: 18, parte: "Cómo convencer",
      titulo: "Muestra comprensión por sus ideas y deseos",
      significado: "Decir «entiendo que te sientas así» calma casi cualquier tensión.",
      ideasClave: [
        "Hay una frase mágica: «No te culpo por sentirte así; en tu lugar, yo sentiría lo mismo».",
        "La mayoría de la gente desea comprensión: dásela y te escuchará.",
        "Si hubieras vivido lo que el otro, actuarías como él.",
        "La comprensión desactiva el enfado más rápido que cualquier argumento."
      ],
      retos: [
        ["Usa hoy la frase «Entiendo que te sientas así».", "Con un cliente molesto o un amigo agobiado."],
        ["Antes de dar tu opinión, valida el sentimiento del otro.", "«Normal que estés cansado con tantos exámenes»."],
        ["Responde a una queja con comprensión, no con excusas.", "En la tienda: «Tienes toda la razón en que es un rollo esperar»."],
        ["Escribe un mensaje de apoyo a alguien que lo está pasando mal.", "Un compañero que suspendió."],
        ["Ante un comentario borde, responde con comprensión.", "«Parece que has tenido un mal día, ¿te ayudo?»."],
        ["Piensa en alguien que te molestó esta semana y escribe por qué pudo sentirse así.", "Un profesor exigente o un cliente impaciente."],
        ["Repaso: ¿en qué momento la comprensión calmó una situación?", "Apunta las palabras que usaste."]
      ]
    },
    {
      id: 19, parte: "Cómo convencer",
      titulo: "Apela a los motivos más nobles",
      significado: "Todos queremos vernos como buenas personas; habla a esa parte del otro.",
      ideasClave: [
        "Las personas suelen tener dos razones para hacer algo: una que suena bien y la verdadera.",
        "Todos nos vemos a nosotros mismos como buenas personas y desinteresadas.",
        "Si apelas a su honestidad, justicia o generosidad, la gente suele estar a la altura.",
        "Trata a los demás como si fueran honrados y la mayoría lo será."
      ],
      retos: [
        ["Pide un favor apelando a la generosidad de la persona.", "«Sé que eres de los que siempre echan una mano…»."],
        ["En un conflicto, apela al sentido de justicia del otro.", "En el reparto de tareas: «Sé que quieres que sea justo para todos»."],
        ["Con un cliente que quiere algo fuera de norma, apela a su comprensión.", "«Sé que usted entiende que tengo que seguir las normas»."],
        ["Trata a alguien como si fuera la persona honesta que quieres que sea.", "Confía en un compañero para algo importante."],
        ["Pide algo a tu grupo apelando al compromiso con el equipo.", "«Sé que a todos nos importa que salga bien»."],
        ["Reconoce en voz alta un motivo noble de alguien.", "«Lo haces porque te preocupas por los demás, se nota»."],
        ["Repaso: ¿qué persona respondió mejor cuando apelaste a lo mejor de ella?", "Apunta el caso."]
      ]
    },
    {
      id: 20, parte: "Cómo convencer",
      titulo: "Dramatiza tus ideas",
      significado: "Una idea se recuerda mejor si la muestras de forma visual o llamativa.",
      ideasClave: [
        "Decir la verdad no basta: hay que hacerla vívida, interesante y teatral.",
        "Las demostraciones visuales convencen más que los argumentos.",
        "La publicidad, el cine y la televisión lo hacen siempre: tú también puedes.",
        "Un ejemplo concreto o una pequeña historia valen más que muchas explicaciones."
      ],
      retos: [
        ["Explica algo hoy usando un ejemplo visual o una historia.", "Explicarle un tema a un compañero con un dibujo."],
        ["En la tienda, enseña el producto en acción en vez de describirlo.", "Muestra cómo queda la prenda combinada."],
        ["Prepara una diapositiva o parte de un trabajo de forma más visual.", "Una gráfica en vez de un párrafo."],
        ["Cuenta una anécdota para convencer de algo en lugar de dar datos.", "Convencer a un amigo de ir al gimnasio contando cómo te cambió a ti."],
        ["Usa un objeto o gesto para reforzar una idea.", "Enseñar el móvil con la foto del sitio que propones."],
        ["Coloca un producto en la tienda de forma que llame la atención.", "Un pequeño escaparate o expositor."],
        ["Repaso: ¿qué idea convenció más al mostrarla en vez de explicarla?", "Apunta qué hiciste."]
      ]
    },
    {
      id: 21, parte: "Cómo convencer",
      titulo: "Lanza un desafío",
      significado: "A la gente le motiva superarse y demostrar lo que vale.",
      ideasClave: [
        "El deseo de superarse y de destacar es un gran motivador.",
        "El dinero no basta: la gente quiere demostrar lo que vale.",
        "Una competición sana saca lo mejor de las personas.",
        "Es el juego lo que motiva: la oportunidad de ganar y de sentirse importante."
      ],
      retos: [
        ["Lánzate un reto a ti mismo hoy y cúmplelo.", "Estudiar 2 horas sin móvil o vender más que ayer."],
        ["Propón un pequeño reto a tu grupo de estudio.", "«¿A ver quién termina antes su parte?»."],
        ["Propón un reto amistoso a un compañero de la tienda.", "Quién consigue más valoraciones positivas de clientes."],
        ["Anima a un amigo a algo con un desafío.", "«A que no eres capaz de levantarte a las 7 toda la semana»."],
        ["Convierte una tarea aburrida en un juego con puntos.", "Ordenar el almacén contrarreloj."],
        ["Reta a alguien a mejorar algo que ya hace bien.", "«Tu presentación fue genial, ¿te ves capaz de hacerla aún mejor?»."],
        ["Repaso: ¿qué reto motivó más a la gente esta semana?", "Apunta cómo lo planteaste."]
      ]
    },

    // ───────── Parte 4: Sé un líder ─────────
    {
      id: 22, parte: "Sé un líder",
      titulo: "Empieza con elogio y aprecio sincero",
      significado: "Es más fácil escuchar algo difícil después de oír algo bueno y verdadero.",
      ideasClave: [
        "Es más fácil escuchar algo desagradable después de oír algo bueno sobre uno mismo.",
        "Como el barbero que enjabona antes de afeitar.",
        "El elogio tiene que ser sincero, no un truco antes del golpe.",
        "Empezar bien prepara a la persona para escuchar sin ponerse a la defensiva."
      ],
      retos: [
        ["Antes de pedir un cambio a alguien, di algo bueno y verdadero de su trabajo.", "«Tu parte del trabajo está muy bien escrita; ¿podrías añadir las fuentes?»."],
        ["Da feedback a un compañero de la tienda empezando por lo positivo.", "«Atiendes genial a los clientes; solo te diría que…»."],
        ["Cuando un amigo te pida opinión, empieza por lo que te gusta.", "Una foto, un texto o un plan."],
        ["Escribe 3 cosas buenas de alguien antes de una conversación difícil.", "Antes de hablar con un compañero que no cumple."],
        ["Haz un elogio sincero a alguien sin pedir nada después.", "Para que no asocien tus elogios a peticiones."],
        ["Corrige a alguien de forma amable empezando por su esfuerzo.", "«Se nota que le has dedicado tiempo; hay un detalle…»."],
        ["Repaso: ¿cómo recibió la gente las críticas que empezaron con elogio?", "Apunta un caso."]
      ]
    },
    {
      id: 23, parte: "Sé un líder",
      titulo: "Señala los errores de forma indirecta",
      significado: "Llama la atención sobre un fallo sin atacar, por ejemplo cambiando «pero» por «y».",
      ideasClave: [
        "El «pero» después de un elogio hace que el elogio parezca falso.",
        "Cambia «pero» por «y»: «Lo has hecho genial, y si añades esto quedará perfecto».",
        "Llamar la atención de forma indirecta funciona con personas sensibles a la crítica.",
        "Dar ejemplo o crear la situación para que el otro vea el error por sí mismo."
      ],
      retos: [
        ["Hoy no uses «pero» después de un elogio: cámbialo por «y».", "«Tu presentación está genial, y con un ejemplo más quedaría redonda»."],
        ["Señala un error sin decir directamente que es un error.", "«¿Has visto cómo queda esto colocado así?»."],
        ["Corrige con el ejemplo: hazlo bien tú delante del otro.", "Doblar bien la ropa junto al compañero que lo hace mal."],
        ["Haz una pregunta que ayude al otro a ver su fallo.", "«¿Qué pasaría si el cliente quisiera devolverlo?»."],
        ["Reescribe un mensaje de corrección para que no suene a crítica.", "Un comentario en un documento compartido de la uni."],
        ["Deja una nota amable en lugar de una queja.", "En el almacén: «¡Gracias por dejar las cajas aquí!»."],
        ["Repaso: ¿qué forma indirecta funcionó mejor?", "Apunta la frase."]
      ]
    },
    {
      id: 24, parte: "Sé un líder",
      titulo: "Habla de tus errores antes de corregir a otro",
      significado: "Si reconoces que tú también fallas, el otro acepta mejor la corrección.",
      ideasClave: [
        "No es tan difícil escuchar nuestros fallos si quien nos corrige admite que él tampoco es perfecto.",
        "Contar un error propio crea cercanía y humildad.",
        "Recuerda cómo eras tú cuando estabas aprendiendo.",
        "Admitir tus errores, aunque no los hayas corregido, ayuda a que el otro cambie."
      ],
      retos: [
        ["Antes de corregir a alguien, cuenta un error parecido que cometiste tú.", "«A mí al principio también se me olvidaba cerrar caja así»."],
        ["Ayuda a un compañero nuevo contándole tus fallos de cuando empezaste.", "En la tienda o en la uni."],
        ["Comparte un error tuyo en el grupo de clase para quitarle presión a otro.", "«Yo también me equivoqué en ese ejercicio»."],
        ["Recuerda cómo eras hace 2 años y sé más paciente con alguien hoy.", "Un estudiante de primero que pregunta algo básico."],
        ["Reconoce un defecto tuyo en una conversación con un amigo.", "«Yo también soy desastre con los plazos»."],
        ["Corrige a alguien empezando con «a mí también me pasa».", "Un amigo que llega tarde siempre."],
        ["Repaso: ¿cómo cambió la reacción al contar tus propios errores?", "Apunta un ejemplo."]
      ]
    },
    {
      id: 25, parte: "Sé un líder",
      titulo: "Pregunta en vez de dar órdenes",
      significado: "Las preguntas invitan a colaborar; las órdenes generan resistencia.",
      ideasClave: [
        "A nadie le gusta recibir órdenes.",
        "Las preguntas hacen que la gente coopere y se implique.",
        "«¿Qué te parece si…?» o «¿Crees que funcionaría…?» en lugar de «haz esto».",
        "Preguntar permite que el otro aporte ideas y aprenda de sus errores.",
        "La gente acepta mejor una orden si ha participado en la decisión."
      ],
      retos: [
        ["Hoy no des ninguna orden: conviértelas todas en preguntas.", "«¿Puedes pasarme eso?» en vez de «Pásame eso»."],
        ["En el trabajo de grupo, reparte tareas con preguntas.", "«¿Te ves con la parte de conclusiones?»."],
        ["En la tienda, pide ayuda preguntando a un compañero.", "«¿Te viene bien encargarte de los probadores un rato?»."],
        ["Usa «¿Qué te parece si…?» al menos 3 veces.", "Con amigos, compañeros y familia."],
        ["Pregunta a alguien cómo resolvería un problema en vez de decirle cómo hacerlo.", "Un compañero que no sabe cómo empezar un trabajo."],
        ["En casa, pide algo en forma de pregunta.", "«¿Os parece bien si hoy cocino yo y mañana alguien friega?»."],
        ["Repaso: ¿notaste más colaboración al preguntar?", "Apunta una situación."]
      ]
    },
    {
      id: 26, parte: "Sé un líder",
      titulo: "Deja que el otro salve las apariencias",
      significado: "Nunca humilles a nadie, aunque tengas razón; protege su dignidad.",
      ideasClave: [
        "Herir la dignidad de alguien es un crimen, aunque tengas razón.",
        "Corregir en público humilla; hazlo en privado.",
        "Unas pocas palabras de comprensión salvan el orgullo del otro.",
        "No tienes derecho a decir o hacer nada que rebaje a alguien ante sí mismo.",
        "Lo que importa no es lo que tú piensas de él, sino lo que él piensa de sí mismo."
      ],
      retos: [
        ["Si tienes que corregir a alguien hoy, hazlo en privado.", "Un compañero de la tienda que se equivocó delante de clientes."],
        ["Cuando alguien meta la pata, ayúdale a salir con naturalidad.", "«Tranqui, a todos nos pasa»."],
        ["No señales en público el error de un compañero de clase.", "Si se equivoca en una presentación, no le corrijas delante."],
        ["Ante un cliente que se equivoca, dale una salida digna.", "«Es normal, esas etiquetas confunden a todos»."],
        ["Evita las bromas que dejan mal a alguien delante de otros.", "En el grupo de amigos o de WhatsApp."],
        ["Cuando alguien reconozca un fallo, quítale importancia.", "«No pasa nada, lo arreglamos en un momento»."],
        ["Repaso: ¿a quién ayudaste a salvar las apariencias?", "Apunta cómo reaccionó."]
      ]
    },
    {
      id: 27, parte: "Sé un líder",
      titulo: "Elogia cada pequeño progreso",
      significado: "Reconocer las mejoras, por pequeñas que sean, anima a seguir mejorando.",
      ideasClave: [
        "Elogiar la más pequeña mejora inspira a seguir mejorando.",
        "Sé caluroso en tu aprobación y generoso en tus elogios (Charles Schwab).",
        "Las críticas hunden el talento; los elogios lo hacen florecer.",
        "El elogio debe ser concreto y sincero, no genérico."
      ],
      retos: [
        ["Elogia hoy una pequeña mejora de alguien.", "«Hoy has cobrado mucho más rápido que la semana pasada»."],
        ["Reconoce un pequeño progreso tuyo y apúntalo.", "Entender un tema que antes no entendías."],
        ["Felicita a un compañero de clase por una mejora concreta.", "«Esta vez tu parte estaba superclara»."],
        ["Anima a alguien que está aprendiendo algo nuevo.", "Un compañero nuevo en la tienda."],
        ["Haz un elogio concreto en lugar de un «bien hecho» genérico.", "«Me gusta cómo has resuelto lo del cliente enfadado»."],
        ["Celebra un pequeño logro de un amigo o familiar.", "Aprobar un examen o empezar el gimnasio."],
        ["Repaso: ¿qué progreso elogiaste y qué efecto tuvo?", "Apunta la reacción."]
      ]
    },
    {
      id: 28, parte: "Sé un líder",
      titulo: "Dale una buena reputación que mantener",
      significado: "Si confías en lo mejor de alguien en voz alta, se esforzará por estar a la altura.",
      ideasClave: [
        "Si quieres que alguien mejore en algo, actúa como si ya tuviera esa cualidad.",
        "Asume una virtud si no la tienes (Shakespeare): dale al otro una virtud que asumir.",
        "La gente se esfuerza mucho por no decepcionar la confianza que pones en ella.",
        "Dale una buena reputación y hará lo posible por merecerla."
      ],
      retos: [
        ["Di a alguien en voz alta una cualidad que quieres que desarrolle.", "«Tú eres de los que siempre llegan puntuales, ¿verdad?»."],
        ["Confía una tarea a alguien diciendo por qué confías en él.", "«Te lo pido a ti porque eres el más organizado»."],
        ["Habla bien de un compañero delante de otros.", "Delante del encargado: «Marta siempre ayuda a los nuevos»."],
        ["Trata a un cliente como si fuera muy paciente y amable.", "«Gracias por su paciencia, se nota que es usted muy comprensivo»."],
        ["Recuerda a un amigo una virtud suya cuando lo esté pasando mal.", "«Tú siempre has sido muy constante, lo vas a sacar»."],
        ["Aplícatelo a ti: escribe la reputación que quieres tener y actúa así hoy.", "«Soy alguien que cumple lo que promete»."],
        ["Repaso: ¿alguien estuvo a la altura de la reputación que le diste?", "Apunta el caso."]
      ]
    },
    {
      id: 29, parte: "Sé un líder",
      titulo: "Anima: que el error parezca fácil de corregir",
      significado: "Transmite que mejorar es posible y sencillo, y la persona lo intentará.",
      ideasClave: [
        "Decirle a alguien que es torpe o que no tiene talento destruye sus ganas de mejorar.",
        "Haz que el error parezca fácil de arreglar y que la persona se sienta capaz.",
        "Muestra confianza en su capacidad: cree en él y él creerá en sí mismo.",
        "El ánimo es más eficaz que la presión."
      ],
      retos: [
        ["Cuando alguien se equivoque hoy, dile que es fácil de arreglar.", "«Es solo cambiar esto, en 5 minutos está»."],
        ["Anima a un compañero que se siente torpe con algo.", "Un compañero nuevo con la caja registradora."],
        ["Ayuda a alguien con un tema de la uni diciéndole que es más fácil de lo que parece.", "«Este tema asusta, pero en cuanto ves el truco es sencillo»."],
        ["Aplícatelo a ti: piensa en algo que te cuesta y divídelo en pasos fáciles.", "Una asignatura difícil."],
        ["Di «tú puedes» a alguien que lo necesite y explícale por qué.", "Un amigo antes de un examen."],
        ["Enseña algo a alguien paso a paso, celebrando cada paso.", "Enseñar a un compañero a hacer un inventario."],
        ["Repaso: ¿a quién animaste y cómo respondió?", "Apunta la frase que usaste."]
      ]
    },
    {
      id: 30, parte: "Sé un líder",
      titulo: "Haz que el otro se alegre de hacer lo que sugieres",
      significado: "Presenta tus peticiones de forma que el otro gane algo y lo haga con gusto.",
      ideasClave: [
        "Sé sincero: no prometas lo que no puedes cumplir.",
        "Piensa qué quieres que haga la otra persona y qué gana ella con hacerlo.",
        "Pon el foco en los beneficios para el otro.",
        "Cuando pidas algo, hazlo de forma que la persona sienta que es importante y que tiene un papel.",
        "Las personas cooperan con gusto cuando sienten que ganan algo."
      ],
      retos: [
        ["Haz una petición explicando qué gana la otra persona.", "«Si me cubres hoy, te cubro el sábado que tienes la boda»."],
        ["Da a alguien un «título» o papel al pedirle algo.", "«¿Te encargas de ser el coordinador del trabajo?»."],
        ["Pide ayuda a un compañero de forma que se sienta experto.", "«Tú que controlas de esto, ¿me echas una mano?»."],
        ["Convence a un amigo de un plan destacando lo que él disfruta.", "Ir a un concierto de su grupo favorito."],
        ["Pide algo en casa de forma que el otro se alegre de hacerlo.", "«Si me ayudas con esto, luego vemos la peli que tú quieras»."],
        ["Agradece con entusiasmo cuando alguien haga lo que le pediste.", "Para que tenga ganas de repetirlo."],
        ["Repaso final del libro: ¿qué principio te ha cambiado más?", "Apunta los 3 principios que quieres convertir en hábito."]
      ]
    }
  ]
};
