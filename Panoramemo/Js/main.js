const boton = document.querySelector(".elegir");
const secDif = document.querySelector(".secDif");
const facil = document.querySelector(".facil");
const medio = document.querySelector(".medio");
const dificil = document.querySelector(".dificil");
const index = document.querySelector(".index");
const howto = document.querySelector(".howto");
const err = document.querySelector(".error");
const winlose = document.querySelector(".victoriaoderrota");
const tiempo = document.querySelector(".tiempo");

let facilshosen = false;
let medioshosen = false;
let dificilshosen = false;

const zona = document.querySelector(".tabla");
var tabla, tdcol, trfil, array = [], cartas = [], intento = 0, try1, try2, valfila, valcelda, temp1, temp2, error = 0, iniciado = false, ganador = false, perdedor = false;

facil.addEventListener("click", facilEscogido);
medio.addEventListener("click", medioEscogido);
dificil.addEventListener("click", dificilEscogido);
boton.addEventListener("click", elegirDif);

function elegirDif() {

	boton.style.display = "none";
	secDif.style.display = "";
	facil.style.display = "";
	medio.style.display = "";
	dificil.style.display = "";
}

function crearTabla() {

    array = new Array(trfil);
        for (let i = 0; i < trfil; i++) {
            array[i] = new Array(tdcol);
        }

		let e, x;
		for (let i = 0; i < cartas.length; i++) {
			e = Math.floor(Math.random()*(i+1));
			x = cartas[i];
			cartas[i] = cartas[e];
			cartas[e] = x;
		}

		let count = 0;
		for (let i = 0; i < trfil; i++) {
			for (let j = 0; j < tdcol; j++) {
				array[i][j] = cartas[count];
				count++;
			}
		}

    for(var i = 0; i < trfil; i++){
        var fila = document.createElement("tr");        
        for(var j = 0; j < tdcol; j++){
            var celda = document.createElement("td");
            celda.onmousedown = function() {
                revisar(this);
            };
            celda.classList.add("false");
            celda.setAttribute("id", "sinTocar");
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    for (let i = 0; i < trfil; i++) {
			for (let j = 0; j < tdcol; j++) {
				let attr = document.createAttribute("num");
				attr.value = array[i][j];
				tabla.rows[i].cells[j].setAttributeNode(attr);
			}
	}

	inicio();
}

function ctdCartas() {

	tabla = document.createElement("table");
	zona.appendChild(tabla);
	tabla.className = "tablero";
	index.style.position = "absolute";
	index.style.width = "200px";
    index.style.transform = "translate(10%,0%)";
    howto.style.position = "absolute";
    howto.style.width = "200px";
    howto.style.transform = "translate(550%,0%)";

	if (facilshosen) {

		facilshosen = false;
		tdcol = 4;
		trfil = 3;
		tabla.style.width = "540px";
		tabla.style.height = "540px";
        cartas = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
		crearTabla();

	} else if (medioshosen) {

		medioshosen = false;
		tdcol = 4;
		trfil = 4;
		tabla.style.width = "640px";
		tabla.style.height = "640px";
        cartas = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
		crearTabla();


	} else if (dificilshosen) {

		dificilshosen = false;
		tdcol = 5;
		trfil = 4;
		tabla.style.width = "740px";
		tabla.style.height = "540px";
        cartas = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
		crearTabla();
	}
}

function revisar(casilla) {
	if(iniciado == true){
			intento++;
	valfila = casilla.parentNode.rowIndex;
	valcelda = casilla.cellIndex;

	if (intento == 1) {
		try1 = parseInt(tabla.rows[valfila].cells[valcelda].getAttribute("num"));
		temp1 = tabla.rows[valfila].cells[valcelda];
		temp1.id = "revisado";

	} else if(intento == 2){
		try2 = parseInt(tabla.rows[valfila].cells[valcelda].getAttribute("num"));
		temp2 = tabla.rows[valfila].cells[valcelda];
		temp2.id = "revisado";

		if ( (try1 == try2) && (temp1 != temp2) ) {
			temp1.classList.add("true");
			temp2.classList.add("true");
			temp1.classList.remove("false");
			temp2.classList.remove("false");
			temp1.style.cursor = "default";
			temp2.style.cursor = "default";
			temp1.onmousedown = function() {return false;};
			temp2.onmousedown = function() {return  false;};
			revisarVictoria();
			intento = 0;
		} else if(temp1 == temp2){
			alert("Ya has seleccionado esta carta.");
			intento--;
		} else {
			setTimeout(function(){temp2.id = "sinTocar"; temp1.id = "sinTocar"; intento = 0;} , 500);
			error++;
			err.style.display = "";
			err.innerHTML = "Errores: "+error+".";
		}

	} else{
		alert("            Por favor, espere a que se volteen las cartas \n                   antes de intentarlo nuevamente.");
	}
	}
}

function revisarVictoria(){
	var campo;
	ganador = true;
	for (let i = 0; i < trfil; i++) {
		for (let j = 0; j < tdcol; j++) {
			campo = tabla.rows[i].cells[j];
			if (campo.classList.contains("false")) {
				ganador = false;
			}
		}
	}
	if (ganador) {
		winlose.classList.remove("victoriaoderrota");
		winlose.classList.add("victoria");
		winlose.innerHTML = "Has ganado!!";
	}
}

function facilEscogido() {

	secDif.style.display = "none";
	facil.style.display = "none";
	medio.style.display = "none";
	dificil.style.display = "none";
	facilshosen = true;
	ctdCartas();
}
function medioEscogido() {

	secDif.style.display = "none";
	facil.style.display = "none";
	medio.style.display = "none";
	dificil.style.display = "none";
	medioshosen = true;
	ctdCartas();
}
function dificilEscogido() {

	secDif.style.display = "none";
	facil.style.display = "none";
	medio.style.display = "none";
	dificil.style.display = "none";
	dificilshosen = true;
	ctdCartas();
}

function tempo(time) {
	iniciado = true;
	var juego = setInterval(function(){
		tiempo.innerHTML = "Quedan "+time+" segundos";
		time--;

		if((time == 0) && (ganador == false)){
			clearInterval(juego);
			for (let i = 0; i < trfil; i++) {
				for (let j = 0; j < tdcol; j++) {
					tabla.rows[i].cells[j].onmousedown = function() {return false;};;
				}
			}

		winlose.classList.remove("victoriaoderrota");
		winlose.classList.add("derrota");
		winlose.innerHTML = "Has perdido!!";
		tiempo.innerHTML = "Quedan 0 segundos";

		} else if(ganador == true){
			clearInterval(juego);
		}

	}, 1000);
}

function inicio() {
	var init = Math.ceil((tdcol*trfil)*0.5);

	for (let i = 0; i < trfil; i++) {
			for (let j = 0; j < tdcol; j++) {
				tabla.rows[i].cells[j].id = "revisado";
			}
	}
	
	var vercartas = setInterval(function(){
		tiempo.innerHTML = "El juego comenzará en "+init+" segundos";
		init--;

		if(init == 0){
			tiempo.innerHTML = "El juego comenzará en 0 segundos";
			for (let i = 0; i < trfil; i++) {
				for (let j = 0; j < tdcol; j++) {
					tabla.rows[i].cells[j].id = "sinTocar";
				}
			}
			tiempo.innerHTML = "";
			var tempojuego = Math.ceil((tdcol*trfil)*3.5);
			tempo(tempojuego);
			clearInterval(vercartas);
		}

	}, 1000);

}