let rngod = Math.floor(Math.random() * 100) + 1;
	const intentos = document.querySelector(".intentos");
	const ultimoResultado = document.querySelector(".ultimoResultado");
	const menorOMayor = document.querySelector(".menorOMayor");
	const panorama = document.querySelector(".panoramas");

	const intentoEnviado = document.querySelector(".intentoEnviado");
	const intentoCampo = document.querySelector(".intentoCamp");

	let intentoContador = 1;
	const botonReset = document.querySelector(".reiniciar");
	const botonVolver = document.querySelector(".volver");

	function revisarIntento() {
		let intentoUsuario = Number(intentoCampo.value);
		if (intentoContador === 1) {
			intentos.style.display = "";
			intentos.textContent = "Intentos previos: ";
		}
		intentos.textContent += intentoUsuario + " ";

		if (intentoUsuario === rngod) {
			ultimoResultado.style.display = "";
			ultimoResultado.textContent = "Felicidades! Adivinaste el número!"
			panorama.style.backgroundColor = "green";
			menorOMayor.style.display = "";
			menorOMayor.textContent = " ";
			GameOver();
		} else if (intentoContador === 10) {
			ultimoResultado.style.display = "";
			ultimoResultado.textContent = "Uuhhh has perdido!!";
			GameOver();
		} else {
			ultimoResultado.style.display = "";
			ultimoResultado.textContent = "Equivocado!";
			panorama.style.backgroundColor = "red";
			if (intentoUsuario < rngod) {
				menorOMayor.style.display = "";
				menorOMayor.textContent = "Tu número es muy bajo";
			} else if (intentoUsuario > rngod) {
				menorOMayor.style.display = "";
				menorOMayor.textContent = "Tu número es muy alto";
			}
		}

		intentoContador++;
		intentoCampo.value = " ";
		intentoCampo.focus();
	}
	intentoEnviado.addEventListener("click", revisarIntento);

	function GameOver(){
		intentoCampo.disabled = true;
		intentoEnviado.disabled = true;
		botonReset.style.display = "";
		botonReset.addEventListener("click", resetJuego);
	}

	function resetJuego(){
		intentoContador = 1;

		const resetParas = document.querySelectorAll("p.resultParas");
		for (let i = 0; i < resetParas.length; i++) {
			resetParas[i].textContent = " ";
		}

		botonReset.style.display = "none";

		intentoCampo.disabled = false;
		intentoEnviado.disabled = false;
		intentoCampo.value = " ";
		intentoCampo.focus();

		ultimoResultado.style.display = "none";
		menorOMayor.style.display = "none";
		intentos.style.display = "none";
		panorama.style.backgroundColor = "#3586ff";

		rngod = Math.floor(Math.random() * 100) + 1;
	}

	function atras(){
		document.location.href = "index.html";
	}

	botonVolver.addEventListener("click", atras);