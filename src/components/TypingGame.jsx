"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Keyboard, RotateCcw, ChevronRight, ChevronLeft, Volume2, VolumeX, Info } from 'lucide-react';

// Configuración de niveles y ejercicios
const niveles = {
  1: {
    titulo: "Fila Central - Posición Base",
    descripcion: "Coloca tus dedos en ASDF (mano izquierda) y JKL\u00D1 (mano derecha)",
    subtitulo: "Aprende la posición base del teclado",
    ejercicios: [
      "asdf jkl\u00f1",
      "asdfjkl\u00f1",
      "fjfjfjfj",
      "dkdkdkdk",
      "slslslsl",
      "a\u00f1a\u00f1a\u00f1a\u00f1",
      "fff jjj",
      "ddd kkk",
      "sss lll",
      "aaa \u00f1\u00f1\u00f1"
    ]
  },
  2: {
    titulo: "Fila Central - Combinaciones",
    descripcion: "Practica combinaciones simples con las teclas base",
    subtitulo: "Fortalece la memoria muscular",
    ejercicios: [
      "asdf fdsa",
      "jkl\u00f1 \u00f1lkj",
      "fj dk sl a\u00f1",
      "fad fad fad",
      "jal jal jal",
      "sad sad sad",
      "la la la",
      "as as as",
      "df df df",
      "jk jk jk"
    ]
  },
  3: {
    titulo: "Fila Superior",
    descripcion: "Incorpora las teclas QWERT YUIOP",
    subtitulo: "Expande tu alcance al teclado superior",
    ejercicios: [
      "qwert yuiop",
      "quiet type",
      "power quit",
      "write your",
      "type this",
      "quiet room",
      "quick team",
      "keep your",
      "work it up",
      "they play"
    ]
  },
  4: {
    titulo: "Fila Inferior",
    descripcion: "Aprende las teclas ZXCV BNMÇ",
    subtitulo: "Completa el conocimiento del teclado",
    ejercicios: [
      "zxcv bnm",
      "zoom back",
      "next zone",
      "mix max",
      "box news",
      "very nice",
      "copy move",
      "zinc band",
      "crazy mix",
      "name buzz"
    ]
  },
  5: {
    titulo: "Mayúsculas y Signos",
    descripcion: "Practica con mayúsculas y signos de puntuación",
    subtitulo: "Domina los modificadores",
    ejercicios: [
      "Hola Mundo",
      "¿Qué tal?",
      "¡Bien!",
      "Juan & María",
      "Paso 1, 2, 3.",
      "¿Cómo estás?",
      "¡Me alegro!",
      "A, B y C.",
      "Uno; Dos: Tres."
    ]
  },
  6: {
    titulo: "Palabras Comunes",
    descripcion: "Practica con las palabras más usadas en español",
    subtitulo: "Mejora tu velocidad con palabras frecuentes",
    ejercicios: [
      "casa mesa silla",
      "libro papel lápiz",
      "agua fuego aire",
      "sol luna cielo",
      "perro gato pez",
      "día noche tarde",
      "rojo azul verde",
      "pan leche café",
      "uno dos tres",
      "bien mal así"
    ]
  },
  7: {
    titulo: "Frases Cortas",
    descripcion: "Practica con frases simples",
    subtitulo: "Construye fluidez",
    ejercicios: [
      "El sol brilla hoy.",
      "Me gusta leer libros.",
      "El café está caliente.",
      "¿Cómo te llamas?",
      "Hoy es un buen día.",
      "La casa es grande.",
      "El perro corre rápido.",
      "¿Vamos al cine?",
      "La música suena bien.",
      "Quiero aprender más."
    ]
  },
  8: {
    titulo: "Frases Complejas",
    descripcion: "Aumenta la dificultad con frases más largas",
    subtitulo: "Desarrolla velocidad y precisión",
    ejercicios: [
      "El gato duerme en el sofá nuevo.",
      "¿Te gustaría ir al cine esta noche?",
      "María estudia inglés los martes y jueves.",
      "La película comenzará a las 8:30 PM.",
      "El tren sale en quince minutos.",
      "¿Has terminado ya tu trabajo de hoy?",
      "Me encanta el helado de chocolate.",
      "La reunión será el próximo lunes.",
      "¿Podrías ayudarme con esto, por favor?",
      "El libro está sobre la mesa azul."
    ]
	
  },
  9: {
    titulo: "Párrafos Cortos",
    descripcion: "Comienza con párrafos simples",
    subtitulo: "Practica la escritura continua",
    ejercicios: [
      "El pequeño perro jugaba en el jardín. Le gustaba perseguir mariposas y correr entre las flores. Su dueña lo miraba sonriente desde la ventana.",
      "La biblioteca estaba en silencio. Los estudiantes leían sus libros con atención. El reloj marcaba las tres de la tarde.",
      "María preparó un pastel de chocolate. El aroma llenaba toda la cocina. Sus hijos esperaban ansiosos probar un pedazo.",
      "El cielo estaba lleno de estrellas. La luna brillaba intensamente. Era una noche perfecta para observar el universo.",
      "El jardín necesitaba atención. Las plantas estaban secas y las flores marchitas. Juan decidió dedicar el fin de semana a arreglarlo."
    ]
  },
  10: {
    titulo: "Texto Técnico",
    descripcion: "Practica con vocabulario técnico y científico",
    subtitulo: "Mejora la precisión con términos especializados",
    ejercicios: [
      "La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en energía química.",
      "El ADN contiene la información genética que determina el desarrollo de los organismos vivos.",
      "Los algoritmos son conjuntos de instrucciones diseñadas para resolver problemas específicos.",
      "La programación orientada a objetos se basa en el concepto de clases y objetos.",
      "La inteligencia artificial utiliza redes neuronales para procesar información."
    ]
  },
11: {
    titulo: "Textos Narrativos",
    descripcion: "Practica con fragmentos narrativos cortos",
    subtitulo: "Mejora tu velocidad con narrativa",
    ejercicios: [
      "La lluvia golpeaba suavemente contra la ventana. María observaba las gotas deslizarse mientras pensaba en todo lo que había ocurrido ese día. El café sobre su mesa se enfriaba lentamente.",
      "El viejo reloj de la estación marcaba las doce. Los últimos viajeros se apresuraban a tomar sus trenes. El sonido de las maletas rodando sobre el suelo de mármol resonaba por todo el lugar.",
      "El jardín había cambiado mucho desde la última vez que lo visitó. Las rosas que su abuela tanto cuidaba ahora crecían salvajes, y el pequeño estanque estaba cubierto de hojas secas.",
      "En la biblioteca reinaba un silencio absoluto. El olor a libros viejos y a madera pulida creaba una atmósfera única. Los rayos del sol atravesaban los ventanales creando patrones dorados sobre las estanterías.",
      "La pequeña cafetería de la esquina era su lugar favorito en la ciudad. Cada mañana, el aroma del café recién hecho y el pan caliente atraía a los transeúntes como un imán."
    ]
  },
  12: {
    titulo: "Don Quijote",
    descripcion: "Fragmentos de la obra de Cervantes",
    subtitulo: "Literatura clásica española",
    ejercicios: [
      "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.",
      "La razón de la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece, que con razón me quejo de la vuestra fermosura.",
      "¡Dichosa edad y siglos dichosos aquellos a quien los antiguos pusieron nombre de dorados, y no porque en ellos el oro, que en esta nuestra edad de hierro tanto se estima!",
      "Yo sé quién soy -respondió don Quijote-, y sé que puedo ser, no solo los que he dicho, sino todos los doce Pares de Francia, y aun todos los nueve de la Fama.",
      "Con estas razones perdía el pobre caballero el juicio, y desvelábase por entenderlas y desentrañarles el sentido, que no se lo sacara ni las entendiera el mismo Aristóteles."
    ]
  },
  13: {
    titulo: "Cien Años de Soledad",
    descripcion: "Fragmentos de Gabriel García Márquez",
    subtitulo: "Realismo mágico",
    ejercicios: [
      "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.",
      "Úrsula se convenció de que el tiempo no pasaba, sino que daba vueltas en redondo. José Arcadio Buendía seguía soñando con los proyectos delirantes que sembraron la perdición.",
      "La casa se llenó de amor. Aureliano lo expresó en versos que no tenían principio ni fin. Los escribía en los ásperos pergaminos que le regalaba Melquíades.",
      "Era como si Dios hubiera resuelto poner a prueba toda capacidad de asombro, y mantuviera a los habitantes de Macondo en un permanente vaivén entre el alborozo y el desencanto.",
      "Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas que se precipitaban por un lecho de piedras pulidas."
    ]
  },
  14: {
    titulo: "Star Wars",
    descripcion: "Fragmentos icónicos de la saga",
    subtitulo: "Diálogos cinematográficos",
    ejercicios: [
      "Hace mucho tiempo, en una galaxia muy, muy lejana... La República Galáctica está sumida en el caos. Los impuestos de las rutas comerciales están en disputa.",
      "Yo soy tu padre. No... ¡No es cierto! ¡Es imposible! Busca en tu interior, sabes que es verdad. ¡Noooooo! ¡Nooooooo!",
      "La Fuerza es lo que le da al Jedi su poder. Es un campo de energía creado por todas las cosas vivientes. Nos rodea, nos penetra, mantiene unida a la galaxia.",
      "El miedo lleva a la ira, la ira lleva al odio, el odio lleva al sufrimiento. Percibo mucho miedo en ti.",
      "Que la Fuerza te acompañe. Ayúdame, Obi-Wan Kenobi, eres mi única esperanza. Un Jedi usa la Fuerza para el conocimiento y la defensa, nunca para el ataque."
    ]
  },
  15: {
    titulo: "El Señor de los Anillos",
    descripcion: "Fragmentos de J.R.R. Tolkien",
    subtitulo: "Fantasía épica",
    ejercicios: [
      "Todo comenzó con la forja de los Grandes Anillos. Tres fueron otorgados a los Elfos, inmortales, los más sabios y justos de todos los seres.",
      "Un Anillo para gobernarlos a todos, Un Anillo para encontrarlos, Un Anillo para atraerlos a todos y atarlos en las tinieblas.",
      "Ni la más mínima grieta de nube se veía en el cielo, y los últimos rayos del sol poniente caían sobre la superficie del Anduin, que brillaba como el oro bruñido.",
      "Las grandes historias nunca terminan. La gente que las lee siempre quiere saber más. Frodo vivía ahora en paz en la Comarca, pero el corazón de Sam anhelaba el mar.",
      "No todo el que vaga está perdido, no todo lo que es oro reluce, no todo aquel que duda vacila, las raíces profundas no se hielan."
    ]
  },
  16: {
    titulo: "Discursos Históricos",
    descripcion: "Fragmentos de discursos famosos",
    subtitulo: "Oratoria histórica",
    ejercicios: [
      "Yo tengo un sueño que un día esta nación se levantará y vivirá el verdadero significado de su credo: Sostenemos que estas verdades son evidentes por sí mismas.",
      "Nunca en el campo del conflicto humano tantos debieron tanto a tan pocos. No tengo nada más que ofrecer que sangre, esfuerzo, lágrimas y sudor.",
      "Cuatro veintenas y siete años atrás nuestros padres crearon en este continente una nueva nación, concebida en la libertad y dedicada a la proposición de que todos los hombres son creados iguales.",
      "Pido perdón a los niños que han tenido que leer este discurso en la escuela. No es culpa mía. Cuando escribes algo, nunca sabes el castigo que puedes estar infligiendo a inocentes estudiantes.",
      "Hemos decidido ir a la luna. Hemos decidido ir a la luna en esta década y hacer otras cosas, no porque sean fáciles, sino porque son difíciles."
    ]
  },
  17: {
    titulo: "Literatura Contemporánea",
    descripcion: "Fragmentos de autores modernos",
    subtitulo: "Narrativa actual",
    ejercicios: [
      "El problema de la realidad virtual es que no sabes que estás dentro hasta que sales. Y entonces es demasiado tarde. La matriz nos tiene a todos conectados.",
      "La verdad es que los adultos no saben lo que quieren. Viven resolviendo sus vidas como si tuvieran todo el tiempo del mundo, y nosotros aquí, esperando crecer.",
      "No era la mejor de las épocas, no era la peor de las épocas. Era la época de la sabiduría, era la época de la necedad. Era la era de la fe, era la era de la incredulidad.",
      "La memoria del corazón elimina los malos recuerdos y magnifica los buenos, y gracias a ese artificio logramos sobrellevar el pasado.",
      "El futuro pertenece a quienes creen en la belleza de sus sueños. No hay nada imposible para aquel que lo intenta."
    ]
  },
  18: {
    titulo: "Textos Científicos",
    descripcion: "Fragmentos de divulgación científica",
    subtitulo: "Ciencia y tecnología",
    ejercicios: [
      "El universo no solo es más extraño de lo que imaginamos, es más extraño de lo que podemos imaginar. La física cuántica nos muestra un mundo de posibilidades infinitas.",
      "La teoría de la relatividad especial puede expresarse en una sola frase: las leyes físicas son las mismas para todos los observadores en movimiento uniforme relativo.",
      "El código genético es universal. Desde las bacterias hasta los elefantes, todos los organismos vivos utilizan el mismo lenguaje molecular para almacenar y expresar información genética.",
      "La inteligencia artificial no es solo una tecnología, es una revolución en la forma en que los humanos interactuamos con las máquinas y procesamos la información.",
      "El cambio climático representa el mayor desafío ambiental al que se ha enfrentado la humanidad. Los próximos años serán cruciales para determinar el futuro de nuestro planeta."
    ]
  },
  19: {
    titulo: "Textos Periodísticos",
    descripcion: "Fragmentos de artículos y reportajes",
    subtitulo: "Escritura periodística",
    ejercicios: [
      "Las últimas investigaciones revelan que el consumo de café puede tener beneficios inesperados para la salud. Los científicos han descubierto nuevas propiedades antioxidantes.",
      "El desarrollo de las ciudades inteligentes está transformando la manera en que vivimos. La tecnología se integra cada vez más en nuestra vida cotidiana.",
      "Los expertos advierten sobre los efectos del cambio climático en los océanos. La acidificación de las aguas está afectando a los ecosistemas marinos de forma alarmante.",
      "La revolución digital ha cambiado completamente el panorama laboral. Las empresas buscan adaptarse a un entorno cada vez más virtualizado y conectado.",
      "El auge de las redes sociales ha transformado la forma en que nos comunicamos. Los estudios muestran cambios significativos en los patrones de interacción social."
    ]
  },
  20: {
    titulo: "Escritura Creativa",
    descripcion: "Ejercicios de escritura libre",
    subtitulo: "Expresión y creatividad",
    ejercicios: [
      "La luz de la luna se filtraba por la ventana, proyectando sombras misteriosas en las paredes. El silencio de la noche solo era interrumpido por el suave tictac del reloj antiguo.",
      "El aroma del café recién hecho inundaba la pequeña librería. Los libros antiguos, alineados perfectamente en las estanterías de madera, guardaban mil historias por descubrir.",
      "Las olas rompían contra las rocas con una fuerza hipnótica. La brisa marina traía consigo el olor a sal y aventura. En el horizonte, el sol comenzaba a hundirse en el océano.",
      "El viejo teatro conservaba la magia de épocas pasadas. Las cortinas de terciopelo rojo, los asientos de madera tallada y las lámparas de cristal contaban historias silenciosas.",
      "El jardín secreto florecía en primavera como si conociera todos los secretos del universo. Cada flor, cada hoja, cada gota de rocío parecía contener un mundo entero."
    ]
  },
21: {
    titulo: "Canciones Clásicas Españolas",
    descripcion: "Letras de cantautores clásicos",
    subtitulo: "Joan Manuel Serrat y Joaquín Sabina",
    ejercicios: [
      "Hoy puede ser un gran día, plantéatelo así, aprovecharlo o que pase de largo depende en parte de ti. Dale el día libre a la experiencia para comenzar, y recíbelo como si fuera fiesta de guardar.",
      "Y nos dieron las diez y las once, las doce y la una, y las dos y las tres. Y desnudos al anochecer nos encontró la luna, y nos encontró la luna.",
      "Mediterráneo, yo te amo porque en tus playas aprendí a jugar. Y luego, ya de grande, me enseñaste a amar, dejándome dormir sobre tu arena.",
      "Que la vida iba en serio uno lo empieza a comprender más tarde, como todos los jóvenes, yo vine a llevarme la vida por delante.",
      "Piedra, papel o tijera, cada cual con su ceguera, mariposas en el pecho son la fiebre que te quema, cuando el río suena agua lleva."
    ]
  },
  22: {
    titulo: "Pop Español Contemporáneo",
    descripcion: "Letras de pop moderno español",
    subtitulo: "Alejandro Sanz y Pablo Alborán",
    ejercicios: [
      "¿Y si fuera ella? El espejo en el que se miran todos los días, todas las chicas soñando con ser la más bonita. Y si fuera ella ese oscuro objeto de deseo.",
      "Solamente tú, solamente tú, solamente tú me arreglas el día. Solamente tú, solamente tú, solamente tú me das alegría.",
      "No es lo mismo hacer cara de interesante que estar realmente interesado. No es lo mismo estar dormido que estar durmiendo. No es lo mismo.",
      "Perdóname si me ves llorar, a veces no me puedo controlar. Es que te fuiste sin avisar y duele tanto que ya no estás.",
      "Corazón sin dueño, que te vas haciendo más y más pequeño. Si sigues guardando todo lo que llevas dentro, te acabarás rompiendo."
    ]
  },
  23: {
    titulo: "Rock Español",
    descripcion: "Letras de rock en español",
    subtitulo: "Héroes del Silencio y Maná",
    ejercicios: [
      "Entre dos tierras estás y no dejas aire que respirar. Entre dos tierras estás y no hacen más que envenenar. Siempre quedará, siempre quedará.",
      "La avalancha irá sobre los que no tienen fe, ni recuerdos de otros que perdieron su ser. La avalancha irá dejando atrás todo lo que amé.",
      "Cuando no quede más espacio en el papel, cuando se acabe la tinta del bolígrafo, cuando las palabras se gasten de tanto usarlas.",
      "Si no te hubiera conocido no sería lo que soy, si no te hubiera encontrado seguiría siendo vapor. Si no te hubiera querido no sabría lo que es amor.",
      "Como duele el silencio, la palabra que nunca dijiste. Como duele el momento en que te fuiste sin decir adiós."
    ]
  },
  24: {
    titulo: "Flamenco y Copla",
    descripcion: "Letras de flamenco tradicional",
    subtitulo: "Camarón y Paco de Lucía",
    ejercicios: [
      "Volando voy, volando vengo, por el camino yo me entretengo. Volando voy, volando vengo, por el camino yo me entretengo.",
      "Como el agua me encuentro de limpio, como el agua me encuentro de claro, como el agua me encuentro de puro, como el agua me encuentro de blanco.",
      "La tarde se está muriendo como un lirio en el río, y del monte las campanas tocan el Ave María. Como un lirio en el río.",
      "Verde que te quiero verde. Verde viento. Verde ramas. El barco sobre la mar y el caballo en la montaña. Con la sombra en la cintura.",
      "Mi cante por bulerías, sale del alma gitana, que llevo dentro metía. Y cuando canto y me arranco, mi pena se vuelve alegría."
    ]
  },
  25: {
    titulo: "Cantautores Modernos",
    descripcion: "Letras de cantautores actuales",
    subtitulo: "Rozalén y Vetusta Morla",
    ejercicios: [
      "Cada paso que das es un paso más cerca de casa. Cada paso que das es un paso más cerca de ti. Y si te pierdes, yo te espero aquí.",
      "La puerta violeta, la puerta violeta. No me sigas por favor, necesito estar sola ahora mismo. No voy a volver atrás, no voy a volver.",
      "Los mapas son mentiras que nos ayudan a creer que existe un orden, que hay un centro y una periferia, y que todo tiene sentido.",
      "Quiero bailar contigo hasta que salga el sol, hasta que el cuerpo aguante, hasta perder la razón. Quiero bailar contigo sin miedo al qué dirán.",
      "Somos las que nos quitaron tanto que nos quitaron hasta el miedo. Somos las nietas de las brujas que no pudisteis quemar."
    ]
  },
  26: {
    titulo: "Música Latina Actual",
    descripcion: "Letras de éxitos latinos recientes",
    subtitulo: "Rosalía y C. Tangana",
    ejercicios: [
      "Me han dicho que no hay salida, me han dicho que no hay salida. Por esta calle que va al mar, tan oscura y tan vacía.",
      "Antes de que salga el sol y que vuelva a la realidad, quiero recordarte una vez más. Lo único que me consuela es pensar que mañana tal vez.",
      "Yo era un cantante de flamenco, pero los tiempos han cambiado y ahora soy un artista urbano. Me busco la vida cantando.",
      "Todo lo que me das es arte, cuando estamos juntos arte. Todo lo que haces es arte, cuando te miro desde lejos arte.",
      "Malamente, malamente, mal, muy mal, malamente. Ese cristalito roto, yo sentí como crujía. Antes de caerse al suelo, ya sabía que se rompía."
    ]
  },  
  27: {
    titulo: "Federico García Lorca I",
    descripcion: "Poemas del Romancero Gitano",
    subtitulo: "Romance de la Luna",
    ejercicios: [
      "La luna vino a la fragua con su polisón de nardos. El niño la mira, mira. El niño la está mirando. En el aire conmovido mueve la luna sus brazos.",
      "Verde que te quiero verde. Verde viento. Verdes ramas. El barco sobre la mar y el caballo en la montaña. Con la sombra en la cintura ella sueña en su baranda.",
      "Por el olivar venían, bronce y sueño, los gitanos. Las cabezas levantadas y los ojos entornados. Por el monte, monte, monte, el jinete se acercaba.",
      "La casada infiel: Y que yo me la llevé al río creyendo que era mozuela, pero tenía marido. Fue la noche de Santiago y casi por compromiso.",
      "Romance sonámbulo: Las cosas la están mirando y ella no puede mirarlas. Verde carne, pelo verde, con ojos de fría plata. Un carámbano de luna la sostiene sobre el agua."
    ]
  },
  28: {
    titulo: "Pablo Neruda I",
    descripcion: "Veinte poemas de amor",
    subtitulo: "Poemas románticos",
    ejercicios: [
      "Puedo escribir los versos más tristes esta noche. Escribir, por ejemplo: La noche está estrellada, y tiritan, azules, los astros, a lo lejos.",
      "En ti los ríos cantan y mi alma en ellos huye como tú lo desees y hacia donde tú quieras. Márcame mi camino en tu arco de esperanza y soltaré en delirio mi bandada de flechas.",
      "Me gustas cuando callas porque estás como ausente, y me oyes desde lejos, y mi voz no te toca. Parece que los ojos se te hubieran volado y parece que un beso te cerrara la boca.",
      "Para mi corazón basta tu pecho, para tu libertad bastan mis alas. En el cielo nos vemos cada noche, cada noche es azul, cada día es un pozo.",
      "Ya no la quiero, es cierto, pero cuánto la quise. Mi voz buscaba el viento para tocar su oído. De otro. Será de otro. Como antes de mis besos."
    ]
  },
  29: {
    titulo: "Antonio Machado",
    descripcion: "Soledades y otros poemas",
    subtitulo: "Poesía contemplativa",
    ejercicios: [
      "Caminante, son tus huellas el camino, y nada más; caminante, no hay camino, se hace camino al andar. Al andar se hace camino, y al volver la vista atrás.",
      "Anoche cuando dormía soñé, ¡bendita ilusión!, que una fontana fluía dentro de mi corazón. Di, ¿por qué acequia escondida, agua, vienes hasta mí?",
      "He andado muchos caminos, he abierto muchas veredas; he navegado en cien mares, y atracado en cien riberas. En todas partes he visto caravanas de tristeza.",
      "La tarde está muriendo como un hogar humilde que se apaga. Allá, sobre los montes, quedan algunas brasas del sol que muere.",
      "Mi infancia son recuerdos de un patio de Sevilla, y un huerto claro donde madura el limonero; mi juventud, veinte años en tierra de Castilla."
    ]
  },
  30: {
    titulo: "Miguel Hernández",
    descripcion: "Poemas de amor y guerra",
    subtitulo: "Poesía comprometida",
    ejercicios: [
      "Llegó con tres heridas: la del amor, la de la muerte, la de la vida. Con tres heridas viene: la de la vida, la del amor, la de la muerte.",
      "Vientos del pueblo me llevan, vientos del pueblo me arrastran, me esparcen el corazón y me aventan la garganta. Los bueyes doblan la frente.",
      "Umbrío por la pena, casi bruno, porque la pena tizna cuando estalla, donde yo no me hallo no se halla hombre más apenado que ninguno.",
      "Tu risa me hace libre, me pone alas. Soledades me quita, cárcel me arranca. Boca que vuela, corazón que en tus labios relampaguea.",
      "Para la libertad sangro, lucho, pervivo. Para la libertad, mis ojos y mis manos, como un árbol carnal, generoso y cautivo."
    ]
  },
  31: {
    titulo: "Octavio Paz",
    descripcion: "Poemas filosóficos",
    subtitulo: "Poesía reflexiva",
    ejercicios: [
      "Entre lo que veo y digo, entre lo que digo y callo, entre lo que callo y sueño, entre lo que sueño y olvido, la poesía.",
      "Mis pasos en esta calle resuenan en otra calle donde oigo mis pasos pasar en esta calle donde solo es real la niebla.",
      "La luz es tiempo que piensa. El pájaro es un astro que anida en el aire. La tarde se ha vuelto invisible de tan vista.",
      "El presente es perpetuo. En el centro del tiempo está la decisión presente, única rosa cierta del tiempo, único fruto.",
      "El mundo nace cuando dos se besan. Sobre el tumulto de los días y los años, los rostros y los destinos se borran."
    ]
  },
  32: {
    titulo: "Gustavo Adolfo Bécquer",
    descripcion: "Rimas",
    subtitulo: "Poesía romántica",
    ejercicios: [
      "¿Qué es poesía?, dices mientras clavas en mi pupila tu pupila azul. ¿Qué es poesía? ¿Y tú me lo preguntas? Poesía... eres tú.",
      "Volverán las oscuras golondrinas en tu balcón sus nidos a colgar, y otra vez con el ala a sus cristales jugando llamarán.",
      "Por una mirada, un mundo; por una sonrisa, un cielo; por un beso... ¡yo no sé qué te diera por un beso!",
      "Los suspiros son aire y van al aire. Las lágrimas son agua y van al mar. Dime, mujer, cuando el amor se olvida, ¿sabes tú adónde va?",
      "Mientras haya unos ojos que reflejen los ojos que los miran, mientras responda el labio suspirando al labio que suspira."
    ]
  },
  33: {
    titulo: "Pablo Neruda II",
    descripcion: "Odas elementales",
    subtitulo: "Poesía cotidiana",
    ejercicios: [
      "Oda a la cebolla: Cebolla, luminosa redoma, pétalo a pétalo se formó tu hermosura, escamas de cristal te acrecentaron.",
      "Oda al tomate: La calle se llenó de tomates, mediodía, verano, la luz se parte en dos tomates, y corre por las calles el jugo.",
      "Oda al día feliz: Esta vez dejadme ser feliz, nada ha pasado a nadie, no estoy en ninguna parte, sucede solamente.",
      "Oda a la alegría: Alegría, vuela como una mariposa hacia todos, atraviesa las cocinas del mundo, entra en todas las flores.",
      "Oda al libro: Libro, cuando te cierro abro la vida, cuando te abro respiras, libro pequeño, pan de mi alma, espiga de papel."
    ]
  },
  34: {
    titulo: "Jorge Luis Borges",
    descripcion: "Poemas metafísicos",
    subtitulo: "Poesía y filosofía",
    ejercicios: [
      "El tiempo es un río que me arrebata, pero yo soy el río; es un tigre que me destroza, pero yo soy el tigre; es un fuego que me consume, pero yo soy el fuego.",
      "La muerte es una vida vivida. La vida es una muerte que viene. Los días son un espejo sin fin. Los libros son un espejo sin memoria.",
      "No hay otro Paraíso que el Paraíso perdido. El tiempo es la sustancia de que estoy hecho. El tiempo es un río que me arrebata.",
      "Si para todo hay término y hay tasa y última vez y nunca más y olvido ¿quién nos dirá de quién, en esta casa, sin saberlo, nos hemos despedido?",
      "Ya somos el olvido que seremos. El polvo elemental que nos ignora y que fue el rojo Adán y que es ahora todos los hombres y que no veremos."
    ]
  },
  35: {
    titulo: "Federico García Lorca II",
    descripcion: "Poeta en Nueva York",
    subtitulo: "Poesía surrealista",
    ejercicios: [
      "Nueva York de cieno, Nueva York de alambres y de muerte. ¿Qué ángel llevas oculto en la mejilla? ¿Qué voz perfecta dirá las verdades del trigo?",
      "La aurora de Nueva York tiene cuatro columnas de cieno y un huracán de negras palomas que chapotean las aguas podridas.",
      "Asesinado por el cielo, entre las formas que van hacia la sierpe y las formas que buscan el cristal, dejaré crecer mis cabellos.",
      "No es sueño la vida. ¡Alerta! ¡Alerta! ¡Alerta! Nos caemos por las escaleras para comer la tierra húmeda.",
      "Los niños de Cristo dormían, y el agua era una paloma, y la madera era una garza, y el plomo era un colibrí, y aun las vivas prisiones de fuego."
    ]
  },
  36: {
    titulo: "Mario Benedetti",
    descripcion: "Poemas de amor y compromiso",
    subtitulo: "Poesía cotidiana y social",
    ejercicios: [
      "No te salves ahora ni nunca, no te salves, no te llenes de calma, no reserves del mundo sólo un rincón tranquilo, no dejes caer los párpados pesados.",
      "Te quiero porque tus manos trabajan por la justicia. Si te quiero es porque sos mi amor, mi cómplice y todo. Y en la calle codo a codo somos mucho más que dos.",
      "Defender la alegría como una trinchera defenderla del escándalo y la rutina del caos y de los miserables de las ausencias pasajeras y las definitivas.",
      "Hagamos un trato: yo quisiera contar contigo, no sólo para esto o para aquello, sino para enfrentar lo que vendrá, lo que no ha de venir.",
      "No te rindas, por favor no cedas, aunque el frío queme, aunque el miedo muerda, aunque el sol se esconda y se calle el viento."
    ]
  },
  37: {
    titulo: "Postres Tradicionales I",
    descripcion: "Recetas básicas de postres españoles",
    subtitulo: "Arroz con leche",
    ejercicios: [
      "Ingredientes para el arroz con leche: 1 litro de leche entera, 100g de arroz redondo, 1 rama de canela, piel de un limón, 100g de azúcar, canela en polvo para decorar. Opcional: una pizca de sal.",
      "Preparación: Pon la leche en una olla con la rama de canela y la piel de limón. Calienta a fuego medio hasta que empiece a hervir. Añade el arroz y cocina a fuego lento durante 45 minutos, removiendo frecuentemente.",
      "Cuando el arroz esté tierno, añade el azúcar y remueve hasta que se disuelva. Retira la canela y la piel de limón. Cocina 10 minutos más hasta conseguir la textura deseada.",
      "Vierte en recipientes individuales y deja enfriar a temperatura ambiente. Cuando esté templado, refrigera durante al menos 2 horas. Antes de servir, espolvorea con canela en polvo.",
      "Consejos: El arroz debe quedar cremoso pero no demasiado líquido. Si queda muy espeso, añade un poco más de leche caliente. Si prefieres más dulzor, ajusta la cantidad de azúcar al gusto."
    ]
  },
  38: {
    titulo: "Postres Tradicionales II",
    descripcion: "Recetas de flan casero",
    subtitulo: "Flan de huevo",
    ejercicios: [
      "Ingredientes para el flan: 4 huevos, 500ml de leche entera, 100g de azúcar para el flan, 100g de azúcar para el caramelo, 1 rama de canela, piel de limón. Necesitarás moldes o flanera.",
      "Preparación del caramelo: Pon el azúcar en un cazo a fuego medio. Sin remover, deja que se derrita y tome color dorado. Vierte inmediatamente en los moldes, girándolos para cubrir la base.",
      "Para el flan: Calienta la leche con la canela y la piel de limón. Retira del fuego cuando empiece a hervir y deja infusionar. Bate los huevos con el azúcar hasta integrar bien.",
      "Cuela la leche templada y añádela a los huevos batidos, mezclando suavemente. Vierte en los moldes caramelizados. Hornea al baño maría a 180°C durante 35-40 minutos.",
      "Deja enfriar completamente antes de desmoldar. Para desmoldar, pasa un cuchillo por el borde y voltea sobre un plato. El caramelo líquido bañará el flan."
    ]
  },
  39: {
    titulo: "Postres Tradicionales III",
    descripcion: "Recetas de natillas caseras",
    subtitulo: "Natillas de la abuela",
    ejercicios: [
      "Ingredientes: 500ml de leche entera, 3 yemas de huevo, 100g de azúcar, 1 rama de canela, piel de limón, 20g de maicena, galletas maría para servir, canela en polvo.",
      "Preparación: Calienta la leche con la canela y la piel de limón. Mientras, mezcla las yemas con el azúcar y la maicena hasta obtener una pasta suave sin grumos.",
      "Cuando la leche esté caliente, retira la canela y el limón. Vierte un poco sobre la mezcla de yemas, batiendo constantemente. Añade esta mezcla al resto de la leche.",
      "Cocina a fuego medio-bajo, removiendo constantemente con una cuchara de madera hasta que espese. No debe hervir. Cuando cubra el dorso de la cuchara, estará listo.",
      "Sirve en recipientes individuales y deja enfriar. Decora con galletas maría y espolvorea con canela en polvo. Se pueden tomar frías o templadas."
    ]
  },
  40: {
    titulo: "Postres Tradicionales IV",
    descripcion: "Recetas de torrijas",
    subtitulo: "Torrijas tradicionales",
    ejercicios: [
      "Ingredientes: Pan del día anterior cortado en rebanadas, 500ml de leche, 2 huevos, 100g de azúcar, 1 rama de canela, piel de limón, aceite para freír, canela en polvo y azúcar para rebozar.",
      "Preparación de la leche: Calienta la leche con el azúcar, la canela y la piel de limón. Deja infusionar y templar. Remoja las rebanadas de pan en la leche hasta que estén bien empapadas.",
      "Pasa las rebanadas por huevo batido, asegurándote de que queden bien cubiertas. Fríe en abundante aceite caliente hasta que estén doradas por ambos lados.",
      "Retira sobre papel absorbente para eliminar el exceso de aceite. Mientras están calientes, rebózalas en la mezcla de azúcar y canela en polvo por ambos lados.",
      "Se pueden servir calientes o frías. Si las preparas con antelación, no las rebocen en azúcar y canela hasta el momento de servir. Se conservan bien 2-3 días."
    ]
  },
  41: {
    titulo: "Postres Tradicionales V",
    descripcion: "Recetas de leche frita",
    subtitulo: "Leche frita casera",
    ejercicios: [
      "Ingredientes: 500ml de leche, 100g de azúcar, 60g de harina, 2 huevos, piel de limón, 1 rama de canela, aceite para freír, azúcar y canela para rebozar.",
      "Preparación de la crema: Mezcla 100ml de leche fría con la harina hasta que no haya grumos. Calienta el resto de la leche con el azúcar, la canela y el limón.",
      "Cuando la leche esté caliente, retira la canela y el limón. Añade la mezcla de harina y remueve constantemente a fuego medio hasta que espese. Cocina 5 minutos más.",
      "Vierte la masa en una fuente rectangular y deja enfriar completamente en la nevera (mínimo 4 horas). Corta en cuadrados, pasa por harina y huevo batido.",
      "Fríe en aceite caliente hasta dorar. Escurre sobre papel absorbente y reboza en azúcar y canela mientras están calientes. Sirve templadas o frías."
    ]
  },
  42: {
    titulo: "Postres Tradicionales VI",
    descripcion: "Recetas de buñuelos",
    subtitulo: "Buñuelos de viento",
    ejercicios: [
      "Ingredientes: 250ml de agua, 100g de mantequilla, 150g de harina, 4 huevos, una pizca de sal, azúcar para rebozar, aceite para freír.",
      "Preparación de la masa: Pon el agua con la mantequilla y la sal a calentar. Cuando rompa a hervir, añade la harina de golpe y remueve enérgicamente hasta que se despegue de las paredes.",
      "Retira del fuego y deja templar. Añade los huevos uno a uno, incorporando bien cada uno antes de añadir el siguiente. La masa debe quedar brillante y suave.",
      "Calienta abundante aceite. Con dos cucharas forma bolitas de masa y fríe hasta que estén doradas. Es importante que el aceite no esté demasiado caliente.",
      "Escurre sobre papel absorbente y reboza en azúcar mientras están calientes. Se pueden rellenar con crema pastelera, nata o chocolate."
    ]
  },
  43: {
    titulo: "Postres Tradicionales VII",
    descripcion: "Recetas de crema catalana",
    subtitulo: "Crema catalana tradicional",
    ejercicios: [
      "Ingredientes: 500ml de leche, 4 yemas de huevo, 100g de azúcar, piel de limón, 1 rama de canela, 20g de maicena, azúcar para quemar por encima.",
      "Preparación: Calienta la leche con la canela y la piel de limón. Mientras, mezcla las yemas con el azúcar y la maicena hasta obtener una pasta suave.",
      "Cuando la leche esté caliente, retira la canela y el limón. Añade un poco de leche a la mezcla de yemas, bate bien y vierte todo en la cazuela. Cocina removiendo hasta espesar.",
      "Reparte en cazuelas de barro individuales y deja enfriar completamente. Antes de servir, espolvorea con azúcar y quema con un soplete hasta caramelizar.",
      "El caramelo debe quedar crujiente y de color dorado oscuro. Sirve inmediatamente para disfrutar del contraste entre el caramelo crujiente y la crema fría."
    ]
  },
  44: {
    titulo: "Postres Tradicionales VIII",
    descripcion: "Recetas de tarta de manzana",
    subtitulo: "Tarta de manzana casera",
    ejercicios: [
      "Ingredientes: 4 manzanas, 200g de harina, 100g de mantequilla, 100g de azúcar, 2 huevos, 1 sobre de levadura, canela en polvo, mermelada de albaricoque.",
      "Preparación de la masa: Mezcla la mantequilla pomada con el azúcar. Añade los huevos uno a uno. Incorpora la harina tamizada con la levadura hasta formar una masa suave.",
      "Forra un molde con la masa reservando un poco para decorar. Pela y corta las manzanas en láminas finas. Colócalas en círculos sobre la masa.",
      "Espolvorea con canela y azúcar. Decora con tiras de masa entrecruzadas. Hornea a 180°C durante 45 minutos o hasta que esté dorada.",
      "Al sacar del horno, pinta con mermelada de albaricoque diluida. Deja enfriar antes de desmoldar. Se puede servir tibia o fría, sola o con nata montada."
    ]
  },
  45: {
    titulo: "Postres Tradicionales IX",
    descripcion: "Recetas de bizcocho de yogur",
    subtitulo: "Bizcocho de yogur clásico",
    ejercicios: [
      "Ingredientes: 1 yogur natural, 3 huevos, 3 medidas de yogur de harina, 2 medidas de azúcar, 1 medida de aceite, 1 sobre de levadura, ralladura de limón.",
      "Preparación: Bate los huevos con el azúcar hasta blanquear. Añade el yogur y el aceite. Mezcla bien. Incorpora la ralladura de limón.",
      "Tamiza la harina con la levadura e incorpora a la masa poco a poco, mezclando suavemente hasta integrar todo. Vierte en un molde engrasado y enharinado.",
      "Hornea a 180°C durante 35-40 minutos o hasta que al pinchar con un palillo salga limpio. Deja enfriar 10 minutos antes de desmoldar.",
      "Se puede servir espolvoreado con azúcar glas o acompañado de chocolate fundido. Se conserva bien varios días en un recipiente hermético."
    ]
  },
  46: {
    titulo: "Postres Tradicionales X",
    descripcion: "Recetas de quesada pasiega",
    subtitulo: "Quesada tradicional",
    ejercicios: [
      "Ingredientes: 500g de queso fresco, 3 huevos, 150g de azúcar, 50g de mantequilla, 50g de harina, ralladura de limón, canela en polvo.",
      "Preparación: Tritura el queso fresco hasta que quede cremoso. Añade los huevos, el azúcar y la mantequilla derretida. Mezcla bien.",
      "Incorpora la harina tamizada poco a poco, mezclando hasta integrar. Añade la ralladura de limón y una pizca de canela. La masa debe quedar suave y sin grumos.",
      "Vierte en un molde forrado con papel de horno. Espolvorea con canela por encima. Hornea a 180°C durante 45 minutos o hasta que cuaje.",
      "Deja enfriar completamente antes de desmoldar. Se puede servir fría o a temperatura ambiente. Se conserva en la nevera 3-4 días."
    ]
  },
 47: {
    titulo: "Cocina Española I",
    descripcion: "Tortilla de patatas tradicional",
    subtitulo: "La reina de la cocina española",
    ejercicios: [
      "Ingredientes: 6 huevos grandes, 800g de patatas, 1 cebolla grande, aceite de oliva virgen extra, sal. Las patatas deben ser preferentemente tipo Monalisa o Kennebec.",
      "Preparación de las patatas: Pela y corta las patatas en rodajas finas (3mm). Pela y corta la cebolla en juliana fina. Calienta abundante aceite en una sartén grande.",
      "Fríe las patatas y la cebolla a fuego medio-bajo hasta que estén tiernas (no doradas). Escurre bien el aceite y mezcla con los huevos batidos y sal al gusto. Deja reposar 5 minutos.",
      "En una sartén antiadherente con un poco de aceite, vierte la mezcla. Cuando esté cuajada por abajo, dale la vuelta con ayuda de un plato. Cuaja al gusto por el otro lado.",
      "Consejos: La clave está en la temperatura del aceite (no muy caliente) y en el punto de cuajado. Para una tortilla jugosa, el interior debe quedar ligeramente líquido."
    ]
  },
  48: {
    titulo: "Cocina Española II",
    descripcion: "Paella valenciana",
    subtitulo: "El plato más internacional",
    ejercicios: [
      "Ingredientes: 400g arroz bomba, 1 pollo troceado, 1 conejo, judías verdes, garrofón, tomate rallado, azafrán, pimentón, aceite de oliva, sal, agua y romero opcional.",
      "Preparación inicial: Calienta el aceite en la paella. Sofríe la carne hasta dorar. Añade las verduras y sofríe. Incorpora el tomate y el pimentón, removiendo rápido para que no se queme.",
      "Añade el agua caliente (doble que de arroz), el azafrán y la sal. Cuando empiece a hervir, incorpora el arroz distribuido por toda la paella. Cocina a fuego fuerte 10 minutos.",
      "Baja el fuego y cocina 8 minutos más. Deja reposar 5 minutos antes de servir. El arroz debe quedar suelto y con socarrat (costra en el fondo).",
      "Importante: No remover el arroz una vez añadido. Si necesita más caldo durante la cocción, añadir siempre caliente. El socarrat es muy apreciado y debe estar tostado pero no quemado."
    ]
  },
  49: {
    titulo: "Cocina Española III",
    descripcion: "Gazpacho andaluz",
    subtitulo: "Sopa fría tradicional",
    ejercicios: [
      "Ingredientes: 1kg tomates maduros, 1 pimiento verde, 1 pepino, 1 diente de ajo, 100g pan del día anterior, aceite de oliva virgen extra, vinagre de Jerez, sal.",
      "Preparación de las verduras: Lava y trocea todas las verduras. El pan debe estar remojado en agua fría. Pela los tomates si la piel es muy dura. El ajo pelado.",
      "Proceso: Tritura todos los ingredientes junto con el aceite, vinagre y sal hasta conseguir una crema fina. Cuela para eliminar posibles grumos o pieles.",
      "Rectifica de sal, aceite y vinagre al gusto. Refrigera al menos 2 horas antes de servir. Para acompañar, prepara guarnición de verduras picadas muy finas.",
      "Guarnición opcional: Pepino, pimiento, tomate y cebolla picados muy finos, picatostes de pan frito. Cada comensal se sirve al gusto. Servir muy frío."
    ]
  },
  50: {
    titulo: "Cocina Española IV",
    descripcion: "Fabada asturiana",
    subtitulo: "El guiso más reconfortante",
    ejercicios: [
      "Ingredientes: 500g fabes (alubias blancas), chorizo, morcilla, lacón, tocino, azafrán, laurel, sal. Las fabes deben ser de calidad y remojadas 12 horas.",
      "Preparación inicial: Pon las fabes en agua fría con un chorrito de aceite. Lleva a ebullición y retira la espuma. Baja el fuego y añade los embutidos y el lacón.",
      "Cocción lenta: Mantén a fuego muy suave 2-3 horas, moviendo la olla ocasionalmente. Nunca remover con cuchara, mover la olla en círculos. Añadir agua caliente si necesita.",
      "Las fabes deben quedar enteras y cremosas. Retirar los embutidos, cortarlos y volver a incorporar. Dejar reposar 10 minutos antes de servir.",
      "Consejos: La cocción debe ser muy suave para que las fabes no se rompan. El caldo debe quedar untuoso por el tocino. Servir caliente con los embutidos bien repartidos."
    ]
  }  
};

// Claves para el almacenamiento local
const STORAGE_KEYS = {
  PROGRESS: 'typing_game_progress',
  STATS: 'typing_game_stats',
  SETTINGS: 'typing_game_settings',
  SCORES: 'typing_game_scores'
};

// Funciones de utilidad para el almacenamiento
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

const TypingGame = () => {
  // Estados para el juego
  const [nivel, setNivel] = useState(() => 
    loadFromStorage(STORAGE_KEYS.PROGRESS, { currentLevel: 1 }).currentLevel
  );
  const [ejercicioIndex, setEjercicioIndex] = useState(() => 
    loadFromStorage(STORAGE_KEYS.PROGRESS, { currentExercise: 0 }).currentExercise
  );
  const [currentText, setCurrentText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [errors, setErrors] = useState(0);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  // Estados para configuración y estadísticas
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PROGRESS, { completed: {} }).completed
  );
  const [bestWPM, setBestWPM] = useState(() =>
    loadFromStorage(STORAGE_KEYS.SCORES, {})
  );
  const [settings, setSettings] = useState(() =>
    loadFromStorage(STORAGE_KEYS.SETTINGS, {
      soundEnabled: false,
      showKeyboard: true,
      showStats: false,
      showHelp: false
    })
  );
  const [sessionStats, setSessionStats] = useState(() =>
    loadFromStorage(STORAGE_KEYS.STATS, {
      startTime: Date.now(),
      totalChars: 0,
      totalErrors: 0,
      totalTime: 0,
      exercisesCompleted: 0
    })
  );
  // Efecto para inicializar ejercicio
  const initializeExercise = useCallback(() => {
    const ejercicioActual = niveles[nivel].ejercicios[ejercicioIndex];
    setTargetText(ejercicioActual);
    setCurrentText('');
    setErrors(0);
    setTime(0);
    setWpm(0);
    setAccuracy(100);
    setIsPlaying(false);
  }, [nivel, ejercicioIndex]);

  useEffect(() => {
    initializeExercise();
  }, [initializeExercise]);

  // Efecto para el temporizador
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          const wordsTyped = currentText.trim().split(' ').length;
          const newWpm = Math.round((wordsTyped / newTime) * 60);
          setWpm(newWpm);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentText]);

  // Manejador principal de entrada de texto
  const handleInput = (e) => {
    const value = e.target.value;
    if (!isPlaying && value.length === 1) {
      setIsPlaying(true);
      if (settings.soundEnabled) {
        // Aquí iría la lógica del sonido si lo implementamos
        playSound('normal');
      }
    }

    let newErrors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetText[i]) {
        newErrors++;
        if (newErrors > errors && settings.soundEnabled) {
          playSound('error');
          setStreak(0);
        }
      }
    }

    setErrors(newErrors);
    setCurrentText(value);
    setTotalKeystrokes(prev => prev + 1);
    
    const newAccuracy = Math.round(((value.length - newErrors) / value.length) * 100) || 100;
    setAccuracy(newAccuracy);

    // Verificar si el ejercicio está completo
    if (value === targetText) {
      if (settings.soundEnabled) {
        playSound('success');
      }
      handleExerciseComplete();
    }

    // Actualizar estadísticas
    setSessionStats(prev => ({
      ...prev,
      totalChars: prev.totalChars + 1,
      totalErrors: prev.totalErrors + (newErrors > errors ? 1 : 0)
    }));
  };

  // Manejador de ejercicio completado
  const handleExerciseComplete = () => {
    setIsPlaying(false);
    setStreak(prev => prev + 1);

    const ejercicioKey = `${nivel}-${ejercicioIndex}`;
    const newEjerciciosCompletados = {
      ...ejerciciosCompletados,
      [ejercicioKey]: true
    };
    setEjerciciosCompletados(newEjerciciosCompletados);

    // Actualizar mejor puntuación
    if (!bestWPM[ejercicioKey] || wpm > bestWPM[ejercicioKey]) {
      setBestWPM(prev => ({
        ...prev,
        [ejercicioKey]: wpm
      }));
    }

    // Actualizar estadísticas de sesión
    setSessionStats(prev => ({
      ...prev,
      exercisesCompleted: prev.exercisesCompleted + 1,
      totalTime: prev.totalTime + time
    }));

    // Avanzar al siguiente ejercicio o nivel
    setTimeout(() => {
      if (ejercicioIndex < niveles[nivel].ejercicios.length - 1) {
        setEjercicioIndex(prev => prev + 1);
      } else if (nivel < Object.keys(niveles).length) {
        setNivel(prev => prev + 1);
        setEjercicioIndex(0);
      }
    }, 1000);
  };

  // Función para obtener la clase CSS según el estado del carácter
  const getCharacterClass = (index) => {
    if (index >= currentText.length) return "text-gray-400";
    return currentText[index] === targetText[index] ? "text-green-600" : "text-red-600";
  };

  // Manejadores de navegación
  const handlePrevLevel = () => {
    if (nivel > 1) {
      setNivel(prev => prev - 1);
      setEjercicioIndex(0);
    }
  };

  const handleNextLevel = () => {
    if (nivel < Object.keys(niveles).length) {
      setNivel(prev => prev + 1);
      setEjercicioIndex(0);
    }
  };

  // Manejadores de datos
  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      setNivel(1);
      setEjercicioIndex(0);
      setEjerciciosCompletados({});
      setBestWPM({});
      setSessionStats({
        startTime: Date.now(),
        totalChars: 0,
        totalErrors: 0,
        totalTime: 0,
        exercisesCompleted: 0
      });
    }
  };

  // Renderizado del teclado virtual
  const renderVirtualKeyboard = () => {
    const keys = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-']
    ];

    const getCurrentKey = () => targetText[currentText.length] || '';

    return (
      <div className="mt-4 select-none">
        {keys.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 my-1">
            {row.map((key) => {
              const isCurrentKey = key === getCurrentKey().toLowerCase();
              const isHomeKey = 'asdf jklñ'.includes(key);
              return (
                <div
                  key={key}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded
                    border font-medium transition-all duration-200
                    ${isCurrentKey ? 'bg-blue-500 text-white' : 'bg-white'}
                    ${isHomeKey ? 'border-blue-300' : 'border-gray-300'}
                  `}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Renderizado de estadísticas
  const renderStats = () => {
    const averageWPM = sessionStats.totalTime > 0 
      ? Math.round((sessionStats.totalChars / 5) / (sessionStats.totalTime / 60))
      : 0;
    
    const overallAccuracy = sessionStats.totalChars > 0
      ? Math.round(((sessionStats.totalChars - sessionStats.totalErrors) / sessionStats.totalChars) * 100)
      : 100;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-2">Estadísticas de la sesión</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Tiempo total: {Math.round(sessionStats.totalTime / 60)} minutos</p>
            <p>Ejercicios completados: {sessionStats.exercisesCompleted}</p>
            <p>Racha actual: {streak}</p>
          </div>
          <div>
            <p>PPM promedio: {averageWPM}</p>
            <p>Precisión general: {overallAccuracy}%</p>
            <p>Pulsaciones totales: {totalKeystrokes}</p>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado principal del componente
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <button 
            onClick={handlePrevLevel}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            disabled={nivel === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <CardTitle>Nivel {nivel}: {niveles[nivel].titulo}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{niveles[nivel].descripcion}</p>
            <p className="text-xs text-gray-400">{niveles[nivel].subtitulo}</p>
          </div>
          <button 
            onClick={handleNextLevel}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            disabled={nivel === Object.keys(niveles).length}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              <span>{time}s</span>
            </Badge>
            <Badge variant="secondary">
              {wpm} PPM
            </Badge>
            <Badge variant="secondary">
              Precisión: {accuracy}%
            </Badge>
            <Badge variant="secondary">
              Racha: {streak}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSettings(prev => ({ ...prev, showStats: !prev.showStats }))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative p-4 bg-gray-50 rounded-lg min-h-[100px] text-lg">
          {targetText.split('').map((char, index) => (
            <span key={index} className={getCharacterClass(index)}>
              {char}
            </span>
          ))}
        </div>

        <div className="relative">
          <Keyboard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={currentText}
            onChange={handleInput}
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Empieza a escribir aquí..."
            autoFocus
          />
        </div>

        <div className="grid grid-cols-8 gap-1">
          {niveles[nivel].ejercicios.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded ${
                ejerciciosCompletados[`${nivel}-${index}`]
                  ? 'bg-green-500'
                  : index === ejercicioIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {settings.showKeyboard && renderVirtualKeyboard()}
        {settings.showStats && renderStats()}

        <div className="mt-4 space-y-2">
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reiniciar Progreso
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TypingGame;
