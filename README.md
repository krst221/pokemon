# pokemon
Página dedicada a Pokémon donde se muestran los primeros 251 pokémon en formato card, opciones avanzadas de búsqueda y filtraje y modo batalla usando las formulas propias de la franquicia, con algunas modificaciones.

Cartas: se dibuja el tipo de carta asociado al tipo del pokémon (basado en las cartas originales, es un filtraje algo más avanzado), se añade un fondo animado y se
muestran características tales como los tipos (uno o dos, según los que tenga), peso, características de combate y cuatro movimientos elegidos al azar de la lista de
movimientos que puede aprender, y siempre diferentes (si algun pokémon aprende menos de 4 se mostrarán solamente dichos movimientos).

Filtro por tipos: por defecto están todos encendidos, es un toggle que muestra o esconde todos los pokémon asociado a ese tipo.
Filtro por búsqueda: al escribir un carácter te muestra todos los pokémon que lo contienen, ya sea un grupo, coincidencia exacta o ninguno.
En ambos casos los pokémon que se muestren SIEMPRE aparecerán ordenados.

Ordenar por stat (vida, ataque..): puedes ordenar a todos los pokémon de manera tanto descendiente (por defecto) como ascendiente basándose en un stat en particular.
Si dos pokémon tienen el mismo valor para el stat elegido se mostrarán ordenados por número.

Modo batalla: elige a dos pokémon para que combatan entre ellos, el segundo lo puedes cambiar tantas veces como quieras. 
En la batalla se asume que ambos pokémon tienen nivel 100, máximos IV y EV y naturaleza neutra. 
Se pueden elegir entre cuatro ataques:  físico (usa el ataque físico del atacante y la defensa física del defensor),especial (igual pero especial en vez de físico), recuperación (recupera el 50% de vida) y ataque arena (disminuye la precisión). 
Se aplica efectividad de tipos igual que en las cartas. El primer pokémon que se quede sin puntos de vida pierde. 

Modificaciones en las fórmulas: golpes críticos tienen un 20% de ocurrir y multiplican el daño por 1.5. No hay inmunidad entre tipos (el fantasma y veneno no existen).
Ataque arena baja la precisión en un 10% respecto la precisión inicial.
