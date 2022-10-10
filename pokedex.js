const body$$ = document.querySelector('body');
const main$$ = document.querySelector('.main');
const arena$$ = document.querySelector('[data-fn="arena"]');
const stats$$ = document.querySelector('[data-fn="stats"]');
const orden$$ = document.querySelector('[data-fn="orden"]');
const radioo$$ = document.querySelector('[data-fn="ordenum"]');
arena$$.classList.add()
const turnos$$ = document.createElement('div');
turnos$$.classList.add('turnos');
turnos$$.classList.add('hidden');
const radios$$ = document.querySelector('[data-fn="radiob"]');
const tipos$$ = document.querySelector('.tipos');
const barra$$ = document.querySelector('#barra');
const search$$ = document.querySelector('.search');
let pokedex$$ = document.querySelector('[data-fn="pokedexo"]');
let pokedexStats$$ = document.querySelector('[data-fn="pokedexd"]');
const fight$$ = document.createElement('button');
const select$$ = document.createElement('h2');
select$$.textContent = 'Elige a los Pokémon para la batalla!';
arena$$.appendChild(select$$);
fight$$.addEventListener('click', () => comienzaBatalla(pokemons, poke1, poke2));
fight$$.classList.add('botb');
fight$$.textContent = 'BATALLA!';
let hp = [];
let prec = [];
let pokemons = [];
let pokemonStats = [];
let pokemonSelec = 0;
let turno = 0;
let lastIndex = 0;
let poke1 = '';
let poke2 = '';
let primerTurno = true;
let gameOver = false;
let ataqueAcierta = true;
const obtienePokemons = async () => {
    for (let i = 1; i <= 151; i++) {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
            pokemons[i-1] = await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    pokemonsOrdenados = pokemons;
    pokemonStats = pokemons;
    dibujaPokemonsOrdenados(pokemons);
    dibujaPokemonsDesordenados(pokemons);
    stats$$.classList.add('hidden');
}

const llenaBarraVida = () => {
    for(let i = 0 ; i < 151; i++){
        hp[i] = 1000;
    }
}

const llenaBarraPrec = () => {
    for(let i = 0; i < 151; i++){
        prec[i] = 1;
    }
}

const dibujaPokemonsOrdenados = async (pokemons) => {
    for (const pokemon of pokemons) {
        const divcard$$ = document.createElement('div');
        divcard$$.className = 'card';
        const cardi$$ = document.createElement('div');
        cardi$$.className = 'card-inner';
        dibujaFront(pokemon, divcard$$, cardi$$);
        dibujaBack(pokemon, cardi$$);
        divcard$$.appendChild(cardi$$);
        pokedex$$.appendChild(divcard$$);
        document.body.appendChild(pokedex$$);
    }
}

const dibujaPokemonsDesordenados = async (pokemons) => {
    for (const pokemon of pokemons) {
        const divcard$$ = document.createElement('div');
        divcard$$.className = 'card';
        const cardi$$ = document.createElement('div');
        cardi$$.className = 'card-inner';
        dibujaFront(pokemon, divcard$$, cardi$$);
        dibujaBack(pokemon, cardi$$);
        divcard$$.appendChild(cardi$$);
        pokedexStats$$.appendChild(divcard$$);
        document.body.appendChild(pokedexStats$$);
    }
}

const dibujaFront = (pokemon, card, container) => {
    const {name, sprites, weight, types, id} = pokemon;
    card.addEventListener('click', () => seleccionaPoke(pokemons, name, card));
    const cardf$$ = document.createElement('div');
    cardf$$.className = 'card-front';
    const divname$$ = document.createElement('div');
    divname$$.className = 'nombre';
    const nombre$$ = document.createElement('h1');
    nombre$$.className = 'card-title';
    const img$$ = document.createElement('img');
    img$$.className = 'card-image';
    img$$.src = sprites.other.dream_world.front_default;
    const id$$ = document.createElement('h1');
    id$$.className = 'card-title';
    const tipo$$ = document.createElement('h1');
    tipo$$.className = 'card-subtitle';
    const peso$$ = document.createElement('h1');
    peso$$.className = 'card-subtitle';
    nombre$$.textContent = name;
    divname$$.appendChild(nombre$$);
    if (id < 10) id$$.textContent = '00' + id;
    else if (id < 100) id$$.textContent = '0' + id;
    else id$$.textContent = id;
    divname$$.appendChild(id$$);
    cardf$$.appendChild(divname$$);
    cardf$$.appendChild(img$$);
    if (types.length === 1) asignaFondo(types[0].type.name, types[0].type.name, cardf$$, card);
    else asignaFondo(types[0].type.name, types[1].type.name, cardf$$, card);
    tipo$$.textContent = 'Tipo: ' + types.map((type) => type.type.name).join(' / ');
    tipo$$.id = 'tipos';
    cardf$$.appendChild(tipo$$);
    peso$$.textContent = 'Peso: ' + weight/10 + ' kg';
    cardf$$.appendChild(peso$$);
    container.appendChild(cardf$$);
}

const asignaFondo = (name1, name2, front, card) => {
    if (name1 === 'grass' || name1 === 'bug' || name1 === 'poison') { 
        front.style.backgroundImage = "url('./assets/img/grascard.png'), url('./assets/img/fondop.png')";
        card.setAttribute('data-fn', 'grass');
    }       
    else if (name1 === 'fire') {
        front.style.backgroundImage = "url('./assets/img/firecard.png'), url('./assets/img/fondof.png')";
        card.setAttribute('data-fn', 'fire');
    }
    else if ((name1 === 'water') || (name1 === 'ice' && name2 !== 'psychic')) {
        front.style.backgroundImage = "url('./assets/img/watercard.png'), url('./assets/img/fondoa.png')";
        card.setAttribute('data-fn', 'water');
    }
    else if (name1 === 'normal' || name1 === 'fairy') {
        front.style.backgroundImage = "url('./assets/img/normcard.png'), url('./assets/img/fondon.png')";
        card.setAttribute('data-fn', 'normal');
    }
    else if (name1 === 'rock' || name1 === 'ground' || name1 === 'fighting') {
        front.style.backgroundImage = "url('./assets/img/fightcard.png'), url('./assets/img/fondol.png')";
        card.setAttribute('data-fn', 'fighting');
    }
    else if (name1 === 'dragon') {
        front.style.backgroundImage = "url('./assets/img/dragcard.png'), url('./assets/img/fondod.png')";
        card.setAttribute('data-fn', 'dragon');
    }
    else if (name1 === 'electric') {
        front.style.backgroundImage = "url('./assets/img/eleccard.png'), url('./assets/img/fondoe.png')";
        card.setAttribute('data-fn', 'electric');
    }
    else if (name1 === 'psychic'|| name2 === 'psychic' || name1 === 'ghost') {
        front.style.backgroundImage = "url('./assets/img/psycard.png'), url('./assets/img/fondops.png')";
        card.setAttribute('data-fn', 'psychic');
    }
}

const dibujaBack = (pokemon, container) => {
    const cardb$$ = document.createElement('div');
    cardb$$.className = 'card-back';
    const divs$$ = document.createElement('div');
    divs$$.className = 'stats';
    creaNombres(pokemon, divs$$);
    creaBarras(pokemon, divs$$);
    creaMoves(pokemon, divs$$);
    cardb$$.appendChild(divs$$);
    container.appendChild(cardb$$);
}

const creaNombres = (pokemon, container) => {
    const {stats} = pokemon;
    const divn$$ = document.createElement('div');
    divn$$.classList.add('statsn');
    const hp$$ = document.createElement('p');
    hp$$.textContent = ('HP: ' + stats[0].base_stat);
    divn$$.appendChild(hp$$);
    const atk$$ = document.createElement('p');
    atk$$.textContent = ('ATK: ' + stats[1].base_stat);
    divn$$.appendChild(atk$$);
    const def$$ = document.createElement('p');
    def$$.textContent = ('DEF: ' + stats[2].base_stat);
    divn$$.appendChild(def$$);
    const spa$$ = document.createElement('p');
    spa$$.textContent = ('SP.A: ' + stats[3].base_stat);
    divn$$.appendChild(spa$$);
    const spd$$ = document.createElement('p');
    spd$$.textContent = ('SP.D: ' + stats[4].base_stat); 
    divn$$.appendChild(spd$$);
    const spe$$ = document.createElement('p');
    spe$$.textContent = ('SPE: ' + stats[5].base_stat);
    divn$$.appendChild(spe$$);
    container.appendChild(divn$$);

}

const creaBarras = (pokemon, container) => {
    const {stats} = pokemon;
    const divb$$ = document.createElement('div');
    divb$$.classList.add('statsb');
    for (let i = 0 ; i < stats.length ; i++) {
        const bar$$ = document.createElement('img');
        if (stats[i].base_stat < 40) bar$$.src = "./assets/img/0-40.png";
        else if (stats[i].base_stat < 60) bar$$.src = "./assets/img/40-60.png";
        else if (stats[i].base_stat < 80) bar$$.src = "./assets/img/60-80.png";
        else if (stats[i].base_stat < 100) bar$$.src = "./assets/img/80-100.png";
        else if (stats[i].base_stat < 120) bar$$.src = "./assets/img/100-120.png";
        else bar$$.src = "./assets/img/120.png";
        divb$$.appendChild(bar$$);
    }
    container.appendChild(divb$$);
}

const generaRandom = () => Math.floor(Math.random());

const creaMoves = (pokemon, container) => {
    const {moves} = pokemon;
    const divmoves$$ = document.createElement('div');
    divmoves$$.classList.add('divmoves');
    let length = 0;
    if (moves.length < 4) length = moves.length;
    else length = 4;
    let check = [-1, -1, -1, -1];
    for (let i = 0 ; i < length ; i++) {
        const divmove$$ = document.createElement('div');
        divmove$$.classList.add('divmove');
        const name$$ = document.createElement('h6');
        const type$$ = document.createElement('h6');
        const pp$$ = document.createElement('h6');
        let index = Math.floor(Math.random()*moves.length);
        while(check.includes(index)) index = Math.floor(Math.random()*moves.length);
        check[i] = index;
        name$$.textContent = moves[index].move.name;
        divmove$$.appendChild(name$$);
        obtenTipoYPPMove (moves, index, function (tipoypp) {
            type$$.textContent = tipoypp.type;
            pp$$.textContent = tipoypp.pp + '/' + tipoypp.pp;
            pintaFondo(divmove$$, type$$.textContent);
        });
        divmove$$.appendChild(type$$);
        divmove$$.appendChild(pp$$);
        divmoves$$.appendChild(divmove$$);
    }
    container.appendChild(divmoves$$);
}

const obtenTipoYPPMove = (moves, index, callback) => {
    try {
        fetch(moves[index].move.url)
            .then((response) => {
            return response.json();
            })
            .then((datos) => {
            const {pp, type} = datos;
            let array = {type: type.name, pp: pp};
            callback(array);
            });
    } catch (error) {
        console.log(error);
    }
}

const pintaFondo = (container, type) => {
    if (type === 'grass' ||type === 'bug') container.style.backgroundColor = 'rgb(165, 255, 135)';
    else if (type === 'fire') container.style.backgroundColor = 'rgb(255, 60, 75)';
    else if (type === 'water' || type === 'ice') container.style.backgroundColor = 'rgb(155, 125, 255)';
    else if (type === 'normal' || type === 'flying') container.style.backgroundColor = 'rgb(200, 250, 250)';
    else if (type === 'fairy') container.style.backgroundColor = 'rgb(255, 155, 210)';
    else if (type === 'poison' || type === 'ghost' || type === 'psychic') container.style.backgroundColor = 'rgb(180, 75, 225)';
    else if (type === 'ground' || type === 'rock' || type === 'fighting') container.style.backgroundColor = 'rgb(220, 140, 100)';
    else if (type === 'dragon') container.style.backgroundColor = 'rgb(255, 180, 250)';
    else if (type === 'electric') container.style.backgroundColor = 'rgb(253, 255, 15, .8)';
    else if (type === 'dark' || type === 'steel') container.style.backgroundColor = 'rgb(130, 130, 130)';
    else container.style.backgroundColor = 'rgb(120, 120, 160)';
}

function filtraClase (tipopasado) {
    let tipo2 = '-';
    let tipo3 = '-';
    if (tipopasado === 'fighting') {
        tipo2 = 'ground';
        tipo3 = 'rock';
    }
    else if (tipopasado === 'grass') {
        tipo2 = 'bug';
        tipo3 = 'poison';
    }
    else if (tipopasado === 'psychic') {
        tipo2 = 'ghost';
    }
    const img$$ = document.querySelector('#' + tipopasado);
    if(pokedex$$.classList.contains('hidden')) {
        for (let i = 0 ; i < pokedexStats$$.children.length ; i++) {
            if (pokedexStats$$.children[i].getAttribute('data-fn').includes(tipopasado) || pokedexStats$$.children[i].getAttribute('data-fn').includes(tipo2) || pokedexStats$$.children[i].getAttribute('data-fn').includes(tipo3)) {
                if (pokedexStats$$.children[i].style.display !== 'none') {
                    pokedexStats$$.children[i].style.display = 'none';
                    img$$.style.filter = 'brightness(100%)';
                    img$$.style.backgroundColor = 'transparent';
                }
                else {
                    pokedexStats$$.children[i].style.display = 'block';
                    img$$.style.filter = 'brightness(130%)';
                    img$$.style.backgroundColor = 'rgb(180, 225, 15)';
                }
            }
        }
    }
    else {
        for (let i = 0 ; i < pokedex$$.children.length ; i++) {
            if (pokedex$$.children[i].getAttribute('data-fn').includes(tipopasado) || pokedex$$.children[i].getAttribute('data-fn').includes(tipo2) || pokedex$$.children[i].getAttribute('data-fn').includes(tipo3)) {
                if (pokedex$$.children[i].style.display !== 'none') {
                    pokedex$$.children[i].style.display = 'none';
                    img$$.style.filter = 'brightness(100%)';
                    img$$.style.backgroundColor = 'transparent';
                }
                else {
                    pokedex$$.children[i].style.display = 'block';
                    img$$.style.filter = 'brightness(130%)';
                    img$$.style.backgroundColor = 'rgb(180, 225, 15)';
                }
            }
        }
    }
}

buscaPokemon = () => {
    let texto$$ = document.querySelector('#barra').value;
    if(pokedex$$.classList.contains('hidden')) {
        for (let i = 0 ; i < pokedexStats$$.children.length ; i++) {
            let cardtosearch = pokedexStats$$.children[i].getElementsByClassName('card-inner');
            if (!cardtosearch[0].getElementsByClassName('nombre')[0].textContent.includes(texto$$)) pokedexStats$$.children[i].style.display = 'none';
            else pokedexStats$$.children[i].style.display = 'block';
        }
    }
    else {
        for (let i = 0 ; i < pokedex$$.children.length ; i++) {
            let cardtosearch = pokedex$$.children[i].getElementsByClassName('card-inner');
            if (!cardtosearch[0].getElementsByClassName('nombre')[0].textContent.includes(texto$$)) pokedex$$.children[i].style.display = 'none';
            else pokedex$$.children[i].style.display = 'block';
        }
    }
}

function toggleSearch () {
    let tipos$$ = document.querySelector('.tipos');
    for (let i = 0 ; i < pokedex$$.children.length ; i++) {
        pokedex$$.children[i].style.display = 'block';
    }
    for (let i = 1 ; i < 16 ; i = i + 2) {
        tipos$$.childNodes[i].style.filter = 'brightness(130%)';
        tipos$$.childNodes[i].style.backgroundColor = 'rgb(180, 225, 15)';
    }
    barra$$.value = '';
    tipos$$.classList.toggle('hidden');
    search$$.classList.toggle('hidden');
}

const toggleOrden = (num) => {
    barra$$.value = '';
    if(num === 0) {
        pokedexStats$$.classList.add('hidden');
        pokedex$$.classList.remove('hidden');
        stats$$.classList.add('hidden');
        for (let i = 0 ; i < pokedex$$.children.length ; i++) {
            pokedex$$.children[i].style.display = 'block';
        }
        for (let i = 1 ; i < 16 ; i = i + 2) {
            tipos$$.childNodes[i].style.filter = 'brightness(130%)';
            tipos$$.childNodes[i].style.backgroundColor = 'rgb(180, 225, 15)';
        }
    }
    else {
        stats$$.classList.remove('hidden');
        pokedex$$.classList.add('hidden');
        pokedexStats$$.classList.remove('hidden');
        ordenaPokemons(lastIndex);
        for (let i = 0 ; i < pokedex$$.children.length ; i++) {
            pokedexStats$$.children[i].style.display = 'block';
        }
        for (let i = 1 ; i < 16 ; i = i + 2) {
            tipos$$.childNodes[i].style.filter = 'brightness(130%)';
            tipos$$.childNodes[i].style.backgroundColor = 'rgb(180, 225, 15)';
        }
    }
}

const toggleDireccion = (num) => {
    barra$$.value = '';
    for (let i = 0 ; i < pokedex$$.children.length ; i++) {
        pokedexStats$$.children[i].style.display = 'block';
    }
    if(num === 0) {
        ordenaPokemonsAsc(lastIndex);
    }
    else {
        ordenaPokemons(lastIndex);
    }
}

const checkOrdenaPokemons = (index) => {
    barra$$.value = '';
    for (let i = 0 ; i < pokedex$$.children.length ; i++) {
        pokedexStats$$.children[i].style.display = 'block';
    }
    if(document.querySelector('[data-fn="asc"]').checked) ordenaPokemonsAsc(index);
    else ordenaPokemons(index);
}
const ordenaPokemons = (index) => {
    let switching, shouldSwitch, i, stat1, stat2;
    console.log();
    lastIndex = index;
    switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < (pokemonStats.length - 1); i++) {
            stat1 = pokemonStats[i].stats[index].base_stat;
            stat2 = pokemonStats[i+1].stats[index].base_stat; 
            shouldSwitch = false;
            if (stat1 < stat2 || ((stat1 === stat2) && (pokedexStats$$.childNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent > pokedexStats$$.childNodes[i+1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent))) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            let x = pokemonStats[i];
            pokemonStats[i] = pokemonStats[i+1];
            pokemonStats[i+1] = x;
            pokedexStats$$.childNodes[i].parentNode.insertBefore(pokedexStats$$.childNodes[i+1], pokedexStats$$.childNodes[i]);
            switching = true;
        }
    }
}

const ordenaPokemonsAsc = (index) => {
    let switching, shouldSwitch, i, stat1, stat2;
    lastIndex = index;
    switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < (pokemonStats.length - 1); i++) {
            stat1 = pokemonStats[i].stats[index].base_stat;
            stat2 = pokemonStats[i+1].stats[index].base_stat; 
            shouldSwitch = false;
            if (stat1 > stat2) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            let x = pokemonStats[i];
            pokemonStats[i] = pokemonStats[i+1];
            pokemonStats[i+1] = x;
            pokedexStats$$.childNodes[i].parentNode.insertBefore(pokedexStats$$.childNodes[i+1], pokedexStats$$.childNodes[i]);
            switching = true;
        }
    }
}

const seleccionaPoke = (pokemons, name, div) => {
    if(poke1 === '') {
        div.classList.add('selected');
        poke1 = name;
        select$$.textContent = ('Has elegido a ' + name + '!');
        pokemonSelec++;
    }
    else if(poke1 === name) {
        select$$.textContent = ('Elegiste a  ' + name + ' de nuevo!');
        for(let i = 0 ; i < pokemons.length; i++) {
            if(pokemons[i].name !== name) {
                const char = pokedex$$.childNodes[i];
                char.classList.remove('selected');
                const char2 = pokedexStats$$.childNodes[i];
                char2.classList.remove('selected');
            }
        }
    }   
    else {
        if(poke2 !== '') {
            for(let i = 0 ; i < pokemons.length; i++) {
                if(pokemons[i].name !== name && pokemons[i].name !== poke1) {
                    const char = pokedex$$.childNodes[i];
                    char.classList.remove('selected');
                    const char2 = pokedexStats$$.childNodes[i];
                    char2.classList.remove('selected');
                }
            }
        }
        div.classList.add('selected');
        poke2 = name;
        select$$.textContent = (poke1 + ' contra  ' + poke2 + ' va a comenzar!');
        pokemonSelec++;
    }
    if(pokemonSelec === 2) arena$$.appendChild(fight$$);
}

const comienzaBatalla = (pokemons, rival1, rival2) => {
    music = new Audio('./assets/audio/battle.mp3');
    music.volume = 0.2;
    music.loop = true;
    music.play();
    pokedex$$.classList.add('hidden');
    pokedexStats$$.classList.add('hidden');
    radios$$.classList.add('hidden');
    tipos$$.classList.add('hidden');
    search$$.classList.add('hidden');
    stats$$.classList.add('hidden');
    orden$$.classList.add('hidden');
    turnos$$.classList.remove('hidden');
    arena$$.style.justifyContent = 'space-between';
    while (arena$$.firstChild) arena$$.removeChild(arena$$.lastChild);
    primerTurno = true;
    llenaBarraPrec();
    llenaBarraVida();
    let p1i = -1;
    let p2i = -1;
    for (let i = 0 ; i < pokemons.length ; i++) {
        if(pokemons[i].name == rival1) p1i = i;
        else if(pokemons[i].name == rival2) p2i = i;
    }
    añadeHud(pokemons, p1i, p2i);
    console.log(p1i, p2i);
    setInterval(calculaTurno(pokemons, p1i, p2i), 1000);
}

const añadeHud = (pokemons, poke1, poke2) => {
    body$$.style.backgroundImage = 'url(./assets/img/wp.png)';
    body$$.style.backgroundImage.opacity = '0.2';
    const img1$$ = document.createElement('img');
    img1$$.src = pokemons[poke1].sprites.other.dream_world.front_default;
    const img2$$ = document.createElement('img');
    img2$$.src = pokemons[poke2].sprites.other.dream_world.front_default;
    arena$$.appendChild(img1$$);
    creaLista(pokemons, poke1);
    const imgv$$ = document.createElement('img');
    imgv$$.src = './assets/img/VS.png'
    arena$$.appendChild(imgv$$);  
    creaLista(pokemons, poke2);
    arena$$.appendChild(img2$$);
    main$$.appendChild(turnos$$);
}

const creaLista = (pokemons, poke) => {
    const pokemon = pokemons[poke];
    const liste$$ = document.createElement('ul');
    const hp$$ = document.createElement('li');
    hp$$.textContent = 'HP: ';
    liste$$.appendChild(hp$$);
    const at$$ = document.createElement('li');
    at$$.textContent = 'ATK: ';
    liste$$.appendChild(at$$);
    const df$$ = document.createElement('li');
    df$$.textContent = 'DEF: ';
    liste$$.appendChild(df$$);
    const sa$$ = document.createElement('li');
    sa$$.textContent = 'SPA: ';
    liste$$.appendChild(sa$$);
    const sd$$ = document.createElement('li');
    sd$$.textContent = 'SPD: ';
    liste$$.appendChild(sd$$);
    const sp$$ = document.createElement('li');
    sp$$.textContent = 'SPE: ';
    liste$$.appendChild(sp$$);
    arena$$.appendChild(liste$$);
    const lists$$ = document.createElement('ul');
    const hps$$ = document.createElement('li');
    let hp = pokemon.stats[0].base_stat;
    hp = Math.floor(0.01 * (2 * hp + 31 + Math.floor(0.25 * 252)) * 100) + 100 + 10;
    hps$$.textContent = hp;
    lists$$.appendChild(hps$$);
    for (let i = 1 ; i < pokemon.stats.length ; i++) {
        const stat$$ = document.createElement('li');
        let stat = pokemon.stats[i].base_stat;
        stat = Math.floor(0.01 * (2 * stat + 31 + Math.floor(0.25 * 252)) * 100) + 5;
        stat$$.textContent = stat;
        lists$$.appendChild(stat$$);
    }
    arena$$.appendChild(lists$$);
}

const quienEsMasRapido = (pokemons, p1i, p2i) => {
    const p1 = pokemons[p1i];
    const p2 = pokemons[p2i];
    let stat1 = p1.stats[5].base_stat;
    let stat2 = p2.stats[5].base_stat;
    if(stat1 > stat2) return 1;
    else if(stat2 > stat1) return 2;
    else return 0;
}

const calculaTurno = (pokemons, p1i, p2i) => {
    if(!gameOver) {
        if(primerTurno) {
            turno = 1;
            const turno$$ = document.createElement('h2');
            while (turnos$$.firstChild) turnos$$.removeChild(turnos$$.lastChild);
            if (quienEsMasRapido(pokemons, p1i, p2i) === 1) {
                asignaHPS(pokemons, p1i, p2i);
                turno$$.textContent = 'Turno ' + turno + ' ! Ataca ' + pokemons[p1i].name + ' !';
                turnos$$.appendChild(turno$$);
                creaAtaques(pokemons, p1i, p2i);
            }
            else if (quienEsMasRapido(pokemons, p1i, p2i) === 2) {
                asignaHPS(pokemons, p2i, p1i);
                turno$$.textContent = 'Turno ' + turno + ' ! Ataca ' + pokemons[p2i].name + ' !';
                turnos$$.appendChild(turno$$);
                creaAtaques(pokemons, p2i, p1i);
            }
            else {
                let first = Math.floor(Math.random() * 2);
                if(first === 0) {
                    asignaHPS(pokemons, p1i, p2i);
                    turno$$.textContent = 'Turno ' + turno + ' ! Ataca ' + pokemons[p1i].name + ' !';
                    turnos$$.appendChild(turno$$);
                    creaAtaques(pokemons, p1i, p2i);
                }
                else {
                    asignaHPS(pokemons, p2i, p1i);
                    turno$$.textContent = 'Turno ' + turno + ' ! Ataca ' + pokemons[p2i].name + ' !';
                    turnos$$.appendChild(turno$$);
                    creaAtaques(pokemons, p2i, p1i);
                }
            }
        }
        else {
            const turno$$ = document.createElement('h2');
            turno$$.textContent = 'Turno ' + turno;
            turnos$$.appendChild(turno$$);
            turno$$.textContent = 'Turno ' + turno + ' ! Ataca ' + pokemons[p1i].name + ' !';
            turnos$$.appendChild(turno$$);
            creaAtaques(pokemons, p1i, p2i);
        }
    }
    else obtenGanador(pokemons, p1i, p2i);
}

const asignaHPS = (pokemons, p1i, p2i) => {
    hp[p1i] = pokemons[p1i].stats[0].base_stat;
    hp[p1i] = Math.floor(0.01 * (2 * hp[p1i] + 31 + Math.floor(0.25 * 252)) * 100) + 100 + 10;
    hp[p2i] = pokemons[p2i].stats[0].base_stat;
    hp[p2i] = Math.floor(0.01 * (2 * hp[p2i] + 31 + Math.floor(0.25 * 252)) * 100) + 100 + 10;
}

const creaAtaques = (pokemons, atk, def) => {
    const divmoves$$ = document.createElement('div');
    divmoves$$.classList.add('divattacks');
    divmoves$$.classList.add('hover');
    const divmove1$$ = document.createElement('div');
    divmove1$$.classList.add('divmove');
    divmove1$$.classList.add('azul');
    const atkf$$ = document.createElement('h6');
    atkf$$.textContent = 'Ataque Físico';
    divmove1$$.appendChild(atkf$$);
    divmove1$$.addEventListener('click', () => ataqueFisico(pokemons, atk, def));
    divmoves$$.appendChild(divmove1$$);
    const divmove2$$ = document.createElement('div');
    divmove2$$.classList.add('divmove');
    divmove2$$.classList.add('azul');
    const atke$$ = document.createElement('h6');
    atke$$.textContent = 'Ataque Especial';
    divmove2$$.appendChild(atke$$);
    divmove2$$.addEventListener('click', () => ataqueEspecial(pokemons, atk, def));
    divmoves$$.appendChild(divmove2$$);
    const divmove3$$ = document.createElement('div');
    divmove3$$.classList.add('divmove');
    divmove3$$.classList.add('azul');
    const rec$$ = document.createElement('h6');
    rec$$.textContent = 'Recuperación';
    divmove3$$.appendChild(rec$$);
    divmove3$$.addEventListener('click', () => recuperacion(pokemons, atk, def));
    divmoves$$.appendChild(divmove3$$);
    const divmove4$$ = document.createElement('div');
    divmove4$$.classList.add('divmove');
    divmove4$$.classList.add('azul');
    const are$$ = document.createElement('h6');
    are$$.textContent = 'Ataque Arena';
    divmove4$$.appendChild(are$$);
    divmove4$$.addEventListener('click', () => ataqueArena(pokemons, atk, def));
    divmoves$$.appendChild(divmove4$$);
    turnos$$.appendChild(divmoves$$);
}

const pasaTurno = (pokemons, atk, def) => {
    primerTurno = false; 
    turno++; 
    while (turnos$$.firstChild) turnos$$.removeChild(turnos$$.lastChild);
    calculaTurno(pokemons, atk, def);
}

const evaluaPrecision = (atk) => ataqueAcierta = (Math.random() < prec[atk]);

const esEfectivo = (atk, def) => {
    const tipoatk = pokemons[atk].types[0].type.name;
    const tipodef = pokemons[def].types[0].type.name;
    console.log(tipoatk, tipodef);

    if(tipoatk === 'grass') {
        if (tipodef === 'grass') return 0.5;
        else if (tipodef === 'fire') return 0.5;
        else if (tipodef === 'water') return 2;
        else if (tipodef === 'normal') return 1;
        else if (tipodef === 'psychic') return 1;
        else if (tipodef === 'dragon') return 0.5;
        else if (tipodef === 'fighting') return 1;
        else return 1;
    }
    else if(tipoatk === 'normal') return 1;
    else if(tipoatk === 'fire') {
        if (tipodef === 'grass') return 2;
        else if (tipodef === 'fire') return 0.5;
        else if (tipodef === 'water') return 0.5;
        else if (tipodef === 'normal') return 1;
        else if (tipodef === 'psychic') return 1;
        else if (tipodef === 'dragon') return 0.5;
        else if (tipodef === 'fighting') return 1;
        else return 1;
    }
    else if(tipoatk === 'water') {
        if (tipodef === 'grass') return 0.5;
        else if (tipodef === 'fire') return 2;
        else if (tipodef === 'water') return 0.5;
        else if (tipodef === 'normal') return 1;
        else if (tipodef === 'psychic') return 1;
        else if (tipodef === 'dragon') return 0.5;
        else if (tipodef === 'fighting') return 1;
        else return 1;
    }
    else if(tipoatk === 'psychic') {
        if (tipodef === 'grass') return 1;
        else if (tipodef === 'fire') return 1;
        else if (tipodef === 'water') return 1;
        else if (tipodef === 'normal') return 1;
        else if (tipodef === 'psychic') return 1;
        else if (tipodef === 'dragon') return 1;
        else if (tipodef === 'fighting') return 2;
        else return 1;
    }
    else if(tipoatk === 'dragon') {
        if (tipodef === 'grass') return 1;
        else if (tipodef === 'fire') return 1;
        else if (tipodef === 'water') return 1;
        else if (tipodef === 'normal') return 1;
        else if (tipodef === 'psychic') return 1;
        else if (tipodef === 'dragon') return 2;
        else if (tipodef === 'fighting') return 1;
        else return 1;
    }
    else if(tipoatk === 'electric') {
        if (tipodef === 'grass') return 1;
        else if (tipodef === 'fire') return 1;
        else if (tipodef === 'water') return 2;
        else if (tipodef === 'normal') return 1;
        else if (tipodef === 'psychic') return 1;
        else if (tipodef === 'dragon') return 0.5;
        else if (tipodef === 'fighting') return 1;
        else return 1;
    }
    else if(tipoatk === 'fighting') {
        if (tipodef === 'grass') return 1;
        else if (tipodef === 'fire') return 1;
        else if (tipodef === 'water') return 1;
        else if (tipodef === 'normal') return 2;
        else if (tipodef === 'psychic') return 0.5;
        else if (tipodef === 'dragon') return 1;
        else if (tipodef === 'fighting') return 1;
        else return 1;
    }
    else return 1;
}

const ataqueFisico = (pokemons, atk, def) => {
    let critico = false;
    let rango = Math.random() * (0.15) + 0.85;
    evaluaPrecision(atk);
    const pokemona = pokemons[atk];
    const pokemond = pokemons[def];
    const boton$$ = document.createElement('button');
    boton$$.classList.add('botb');
    boton$$.textContent = ('Siguiente turno');
    boton$$.addEventListener('click', () => pasaTurno(pokemons, def, atk));
    const atk$$ = document.createElement('p');
    const vida$$ = document.createElement('p');
    let critChance = Math.floor(Math.random() * 5 + 1);
    if(critChance === 3) critico = true;
    let ataque = Math.floor(0.01 * (2 * pokemona.stats[1].base_stat + 31 + Math.floor(0.25 * 252)) * 100) + 5;
    let defensa = Math.floor(0.01 * (2 * pokemond.stats[2].base_stat + 31 + Math.floor(0.25 * 252)) * 100) + 5;
    let daño = Math.floor((((42 * 80 * ataque)/(50 * defensa)) + 2) * 1.5 * rango * esEfectivo(atk, def));
    console.log(daño, hp[atk], hp[def]);
    if (ataqueAcierta) {
        if(!critico) {
            if(esEfectivo(atk, def) < 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque físico! Es poco efectivo! Ha hecho ' + daño + ' de daño!');
            else if(esEfectivo(atk, def) > 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque físico! Es super efectivo! Ha hecho ' + daño + ' de daño!');
            else atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque físico! Ha hecho ' + daño + ' de daño!');
        } 
        else {
            daño = Math.floor(daño * 1.5);
            if(esEfectivo(atk, def) < 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque físico! Es poco efectivo! GOLPE CRÍTICO! Ha hecho ' + daño + ' de daño!!');
            else if(esEfectivo(atk, def) > 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque físico! Es super efectivo! GOLPE CRÍTICO! Ha hecho ' + daño + ' de daño!');
            else atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque físico! GOLPE CRÍTICO! Ha hecho ' + daño + ' de daño!');
        }
        hp[def] = hp[def] - daño;
        if (hp[def] < 0) hp[def] = 0;
        if(hp[def] > 0 ) vida$$.textContent = ('A ' + pokemond.name + ' le quedan ' + hp[def] + ' puntos de vida!');
        else {
            vida$$.textContent = ('A ' + pokemond.name + ' no le quedan puntos de vida!');
            gameOver = true;
            setTimeout(() => {turnos$$.appendChild(atk$$)}, 200);
            setTimeout(() => {turnos$$.appendChild(vida$$)}, 2000);
            setTimeout(() => {while (turnos$$.firstChild) turnos$$.removeChild(turnos$$.lastChild);calculaTurno(pokemons, atk, def);}, 4000);
        }
    }
    else atk$$.textContent = (pokemona.name + ' ha fallado el ataque contra ' + pokemond.name + '! Qué mala suerte!');
    if(!gameOver) {
        setTimeout(() => {turnos$$.appendChild(atk$$)}, 200);
        setTimeout(() => {turnos$$.appendChild(vida$$)}, 2000);
        setTimeout(() => {turnos$$.appendChild(boton$$)}, 2500);
    }
}

const ataqueEspecial = (pokemons, atk, def) => {
    let critico = false;
    let rango = Math.random() * (0.15) + 0.85;
    evaluaPrecision(atk);
    const pokemona = pokemons[atk];
    const pokemond = pokemons[def];
    console.log(pokemona, pokemond);
    const boton$$ = document.createElement('button');
    boton$$.classList.add('botb');
    boton$$.textContent = ('Siguiente turno');
    boton$$.addEventListener('click', () => pasaTurno(pokemons, def, atk));
    const atk$$ = document.createElement('p');
    const vida$$ = document.createElement('p');
    let critChance = Math.floor(Math.random() * 5 + 1);
    if(critChance === 3) critico = true;
    let ataque = Math.floor(0.01 * (2 * pokemona.stats[3].base_stat + 31 + Math.floor(0.25 * 252)) * 100) + 5;
    let defensa = Math.floor(0.01 * (2 * pokemond.stats[4].base_stat + 31 + Math.floor(0.25 * 252)) * 100) + 5;
    let daño = Math.floor((((42 * 80 * ataque)/(50 * defensa)) + 2) * 1.5 * rango * esEfectivo(atk, def));
    if (ataqueAcierta) {
        if(!critico) {
            if(esEfectivo(atk, def) < 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque especial! Es poco efectivo! Ha hecho ' + daño + ' de daño!');
            else if(esEfectivo(atk, def) > 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque especial! Es super efectivo! Ha hecho ' + daño + ' de daño!');
            else atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque especial! Ha hecho ' + daño + ' de daño!');
        } 
        else {
            daño = Math.floor(daño * 1.5);
            if(esEfectivo(atk, def) < 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque especial! Es poco efectivo! GOLPE CRÍTICO! Ha hecho ' + daño + ' de daño!!');
            else if(esEfectivo(atk, def) > 1) atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque especial! Es super efectivo! GOLPE CRÍTICO! Ha hecho ' + daño + ' de daño!');
            else atk$$.textContent = (pokemona.name + ' va a atacar a ' + pokemond.name + ' con un ataque especial! GOLPE CRÍTICO! Ha hecho ' + daño + ' de daño!');
        }
        hp[def] = hp[def] - daño;
        if (hp[def] < 0) hp[def] = 0;
        if(hp[def] > 0 ) vida$$.textContent = ('A ' + pokemond.name + ' le quedan ' + hp[def] + ' puntos de vida!');
        else {
            vida$$.textContent = ('A ' + pokemond.name + ' no le quedan puntos de vida!');
            gameOver = true;
            setTimeout(() => {turnos$$.appendChild(atk$$)}, 200);
            setTimeout(() => {turnos$$.appendChild(vida$$)}, 2000);
            setTimeout(() => {while (turnos$$.firstChild) turnos$$.removeChild(turnos$$.lastChild);calculaTurno(pokemons, atk, def);}, 4000);
        }
    }
    else atk$$.textContent = (pokemona.name + ' ha fallado el ataque contra ' + pokemond.name + '! Qué mala suerte!');
    if(!gameOver) {
        setTimeout(() => {turnos$$.appendChild(atk$$)}, 200);
        setTimeout(() => {turnos$$.appendChild(vida$$)}, 2000);
        setTimeout(() => {turnos$$.appendChild(boton$$)}, 2500);
    }
}

const recuperacion = (pokemons, atk, def) => {
    const pokemona = pokemons[atk];
    const atk$$ = document.createElement('p');
    const boton$$ = document.createElement('button');
    boton$$.classList.add('botb');
    boton$$.textContent = ('Siguiente turno');
    boton$$.addEventListener('click', () => pasaTurno(pokemons, def, atk));
    let hpm = pokemona.stats[0].base_stat;
    hpm = Math.floor(0.01 * (2 * hpm + 31 + Math.floor(0.25 * 252)) * 100) + 100 + 10;
    hp[atk] = hp[atk] + (hpm/2);
    if(hp[atk] > hpm) hp[atk] = hpm;
    atk$$.textContent = (pokemona.name + ' ha recuperado la mitad de la vida! Ahora tiene  ' + hp[atk] + ' puntos de vida!');
    setTimeout(() => {turnos$$.appendChild(atk$$)}, 200);
    setTimeout(() => {turnos$$.appendChild(boton$$)}, 2500);
}

const ataqueArena = (pokemons, atk, def) => {
    const pokemona = pokemons[atk];
    const pokemond = pokemons[def];
    const atk$$ = document.createElement('p');
    const boton$$ = document.createElement('button');
    boton$$.classList.add('botb');
    boton$$.textContent = ('Siguiente turno');
    boton$$.addEventListener('click', () => pasaTurno(pokemons, def, atk));
    prec[def] = prec[def] * 0.9;
    atk$$.textContent = (pokemona.name + ' ha bajado la precisión de ' + pokemond.name + '! Su precisión ahora es del ' + (prec[def] * 100).toFixed(0) + ' por ciento!');
    setTimeout(() => {turnos$$.appendChild(atk$$)}, 200);
    setTimeout(() => {turnos$$.appendChild(boton$$)}, 2500);
}

const obtenGanador = (pokemons, p1i, p2i) => {
    const ganador$$ = document.createElement('h2');
    const reset$$ = document.createElement('button');
    reset$$.textContent = 'NUEVA BATALLA!';
    reset$$.classList.add('botb');
    reset$$.addEventListener('click', reiniciaJuego);
    if(hp[p1i] > 0) ganador$$.textContent = pokemons[p2i].name + ' ha caído derrotado! ' + pokemons[p1i].name + ' es el vencedor!!';
    else ganador$$.textContent = pokemons[p1i].name + ' ha caído derrotado! ' + pokemons[p2i].name + ' es el vencedor!!';
    turnos$$.appendChild(ganador$$);
    turnos$$.appendChild(reset$$);
}

const reiniciaJuego = () => {
    for(let i = 0 ; i < pokemons.length; i++) {
        const char = pokedex$$.childNodes[i];
        char.classList.remove('selected');
        const char2 = pokedexStats$$.childNodes[i];
        char2.classList.remove('selected');
    }
    gameOver = false;
    hp = {hp1: 2000, hp2: 2000};
    prec = {prec1: 1, prec2: 1};
    pokemonSelec = 0;
    turno = 0;
    poke1 = '';
    poke2 = '';
    primerTurno = true;
    atacaPrimero = false;
    gameOver = false;
    llenaBarraPrec();
    llenaBarraVida();
    while (turnos$$.firstChild) turnos$$.removeChild(turnos$$.lastChild);
    while (arena$$.firstChild) arena$$.removeChild(arena$$.lastChild);
    body$$.style.backgroundImage = '';
    arena$$.style.justifyContent = 'center';
    arena$$.classList.add('hidden');
    turnos$$.classList.add('hidden');
    stats$$.classList.add('hidden');
    orden$$.classList.remove('hidden');
    pokedex$$.classList.remove('hidden');
    radios$$.classList.remove('hidden');
    tipos$$.classList.remove('hidden');
    radioo$$.checked = 'true';
    music.pause();
    music.currentTime = 0;
}

obtienePokemons();