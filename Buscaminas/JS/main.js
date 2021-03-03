var div = document.getElementById("base");
var tabla, row, cells, minas, derrota = false, ganador = false, adivino = 0, campo = [], valcelda, valfila;
var f = document.querySelector(".facil");
var m = document.querySelector(".intermedio");
var d = document.querySelector(".dificil");
var h2 = document.getElementsByTagName("H2")[0];
var h1 = document.getElementsByTagName("H1")[0];
var p = document.querySelector(".adivino");
var pp = document.querySelector(".ganaroperder");

f.addEventListener("click", facil);
m.addEventListener("click", medio);
d.addEventListener("click", dificil);

function crearTabla(row, cells) {
	tabla = document.createElement("table");
	tabla.className = "tabla";
	div.appendChild(tabla);

	 for(var i = 0; i < row; i++){
        var fila = document.createElement("tr");        
        for(var j = 0; j < cells; j++){
            var celda = document.createElement("td");
            celda.onmousedown = function() {
            	click(this, event);
            };
            celda.oncontextmenu = function() {
            	return false;
            };
            celda.classList.add("false");
            celda.setAttribute("id", "sinTocar");
            fila.appendChild(celda);
        }
        
        tabla.appendChild(fila);
    }
    var plus = row+cells;
    crearArreglo();
	aggMinas(plus, row, cells);

	p.innerHTML = "Banderas disponibles: "+(minas-adivino)+".";
}

function crearArreglo(){
	campo = new Array(row);
		for (let i = 0; i < cells; i++) {
			campo[i] = new Array(cells);
		}

		for (var i = 0; i < row; i++) {
			for (var j = 0; j < cells; j++) {
				campo[i][j] = 0;
			}
		}
}

function aggMinas(num, row, cells) {
	var faltaminas = 0;
	var celda;

	switch(num){
		case 16:
			minas = 10;
			
			while(minas > faltaminas){
				
			for (var i = 0; i < minas; i++) {
				var hori = Math.floor(Math.random()*cells);
				var vert = Math.floor(Math.random()*row);
				
				if (campo[hori][vert] != "A") {
					campo[hori][vert] = "A";
					celda = tabla.rows[hori].cells[vert];
					celda.classList.remove("false");
					celda.classList.add("true");
					faltaminas++;
				} else {
					i--;
				}

			}
			}
			
		break;

		case 32:
			minas = 40;

			while(minas > faltaminas){
				
			for (var i = 0; i < minas; i++) {
				var hori = Math.floor(Math.random()*cells);
				var vert = Math.floor(Math.random()*row);
				
				if (campo[hori][vert] != "A") {
					campo[hori][vert] = "A";
					celda = tabla.rows[hori].cells[vert];
					celda.classList.remove("false");
					celda.classList.add("true");
					faltaminas++;
				} else {
					i--;
				}

			}
			}
		break;

		case 46:
		minas = 99;

		while(minas > faltaminas){
			
		for (var i = 0; i < minas; i++) {

			var hori = Math.floor(Math.random()*cells);
			var vert = Math.floor(Math.random()*row);
			
			if (campo[hori][vert] != "A") {
				campo[hori][vert] = "A";
				celda = tabla.rows[vert].cells[hori];
				celda.classList.remove("false");
				celda.classList.add("true");
				faltaminas++;
			} else {
				i--;
			}

		}
		}
		break;
	}
}

function facil() {
	row = 8;
	cells = 8;
	f.style.display = "none";
	m.style.display = "none";
	d.style.display = "none";
	h1.style.display = "none";
	h2.style.display = "none";
	crearTabla(row,cells);
}
function medio() {
	row = 16;
	cells = 16;
	f.style.display = "none";
	m.style.display = "none";
	d.style.display = "none";
	h1.style.display = "none";
	h2.style.display = "none";
	crearTabla(row,cells);
}
function dificil() {
	row = 16;
	cells = 30;
	f.style.display = "none";
	m.style.display = "none";
	d.style.display = "none";
	h1.style.display = "none";
	h2.style.display = "none";
	crearTabla(row,cells);
}

function comprobarVictoria(){
	var celda;
	ganador = true;
	for (var i = 0; i < row; i++) {
     		for(var j = 0; j < cells; j++) {
       			celda = tabla.rows[i].cells[j];
       			   if ((celda.classList.contains("false")) && (celda.id == "sinTocar")) {
       			   	ganador = false;
       			   }   			
      		}
   		}
   		ganadorOderrotado();
}

function numerarCasilla(cell){
	valfila = cell.parentNode.rowIndex;
	valcelda = cell.cellIndex;
	var celda, posicion = tabla.rows[valfila].cells[valcelda];
	var ctdMinas = 0;
		for (var i=Math.max(valfila-1,0); i<=Math.min(valfila+1,cells-1); i++) {
     		for(var j=Math.max(valcelda-1,0); j<=Math.min(valcelda+1,cells-1); j++) {
     			
       			if (j < cells && i < row && j > -1 && i > -1) {
       				celda = tabla.rows[i].cells[j];
       				if (celda.classList.contains("true")){
       				ctdMinas++;
       				}
       			}
      		}
   		}
   		var attr = document.createAttribute("num");
   		attr.value = ctdMinas;
   		posicion.setAttributeNode(attr);
   		
   	posicion.innerHTML = ctdMinas;

   	if (ctdMinas == 0) {
   		for (var i=Math.max(valfila-1,0); i<=Math.min(valfila+1,cells-1); i++) {
     		for(var j=Math.max(valcelda-1,0); j<=Math.min(valcelda+1,cells-1); j++) {
       			if (j < cells && i < row && j > -1 && i > -1) {
       				celda = tabla.rows[i].cells[j];
       				if ((celda.innerHTML == "") && (celda.classList.contains("false"))){
       				numerarCasilla(celda);
       				celda.id = "revisado";
       				celda.style.cursor = "default";
       				}
       			}
      		}
   		}
   	}
   	comprobarVictoria();
}

function click(cell, event) {
	if (derrota == false && ganador == false) {

		if (event.button == 0) {
			if ((cell.classList.contains("true"))&&(cell.id != "adivinar")) {
			revelarDerrota();
			} else if((cell.classList.contains("false"))&&(cell.id != "adivinar")){

				cell.id = "revisado";
				cell.style.cursor = "default";
				numerarCasilla(cell);
			}
		} else if (event.button == 2) {
		adivinanza(cell);
		}

	} else if(derrota == true){
		alert("Has perdido el juego, por favor refresca la página para intentar otra vez!");
	} else if(ganador == true){
		alert("Ya has ganado el juego, por favor refresca la página para intentar otra vez!");
	}
}

function adivinanza(cell) {

	if ((adivino < minas)&&(cell.id == "sinTocar")) {
		cell.id = "adivinar";
		adivino++;
		p.innerHTML = "Banderas disponibles: "+(minas-adivino)+".";
	} else if((adivino == minas)&&(cell.id == "sinTocar")){
		p.innerHTML = "No te quedan mas banderas.";
	} else if(cell.id == "adivinar"){
		cell.id = "sinTocar";
		adivino--;
		p.innerHTML = "Banderas disponibles: "+(minas-adivino)+".";
	}
}

function revelarDerrota(){
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < cells; j++) {
			var recorrer = tabla.rows[i].cells[j];
			if (recorrer.classList.contains("true")) {
				recorrer.id = "explotado";
				recorrer.onmousedown = function(){ return false;};
				recorrer.style.cursor = "default";
				
		} else {
			recorrer.onclick = function(){};
			recorrer.style.cursor = "default";
		}
		}
	}
	derrota = true;
	ganadorOderrotado();
}

function ganadorOderrotado(){
	if (derrota == true) {
		p.innerHTML = "";
		pp.className = "derrota";
		pp.innerHTML = "Que lástima, perdiste el juego.";
	} else if (ganador == true) {
		p.innerHTML = "";
		pp.className = "ganador";
		pp.innerHTML = "Felicidades!! Has ganado el juego.";
	}
}