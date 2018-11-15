const celeste = document.getElementById("celeste")
const violeta = document.getElementById("violeta")
const naranja = document.getElementById("naranja")
const verde = document.getElementById("verde")
const btnEmpezar = document.getElementById("btnEmpezar")
const ultimoNivel = 10

class Juego {
	constructor(){
		this.inicializar()
		setTimeout(() => {
			this.generarSecuencia()
			this.siguienteNivel()
		}, 500)
	}

	inicializar(){
		this.elegirColor = this.elegirColor.bind(this)
		this.siguienteNivel = this.siguienteNivel.bind(this)
		this.toggleBtnEmpezar()
		this.nivel = 1
		this.colores = {
			celeste,
			violeta,
			naranja,
			verde
		}
		celeste.num = 0
		violeta.num = 1
		naranja.num = 2
		verde.num = 3
	}

	toggleBtnEmpezar(){
		if(btnEmpezar.classList.contains("hide")){
			btnEmpezar.classList.remove("hide")
		}else{
			btnEmpezar.classList.add("hide")
		}
		
	}

	generarSecuencia(){
		this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4))
	}

	siguienteNivel(){
		this.subnivel = 0
		this.iluminarSecuencia()
		this.agregarEventosClick()
	}

	colorDelNumero(n){
		switch(n){
			case 0:
			return celeste
			case 1:
			return violeta
			case 2:
			return naranja
			case 3:
			return verde
		}
	}

	colorDelColor(c){
		switch(c){
			case 'celeste':
			return celeste
			case 'violeta':
			return violeta
			case 'naranja':
			return naranja
			case 'verde':
			return verde
		}
	}

	iluminarSecuencia(){
		for (let i = 0; i < this.nivel; i++) {
			const color = this.colorDelNumero(this.secuencia[i])
			setTimeout(() => this.iluminarColor(color), 500 * i)
		}
	}

	iluminarColor(color){
		color.classList.add("light")
		setTimeout(() => this.apagarColor(color), 300)
	}

	apagarColor(color){
		color.classList.remove("light")
	}

	agregarEventosClick(){
		this.colores.celeste.addEventListener("click", this.elegirColor)
		this.colores.violeta.addEventListener("click", this.elegirColor)
		this.colores.naranja.addEventListener("click", this.elegirColor)
		this.colores.verde.addEventListener("click", this.elegirColor)
	}

	eliminarEventosClick(){
		this.colores.celeste.removeEventListener("click", this.elegirColor)
		this.colores.violeta.removeEventListener("click", this.elegirColor)
		this.colores.naranja.removeEventListener("click", this.elegirColor)
		this.colores.verde.removeEventListener("click", this.elegirColor)
	}

	elegirColor(ev){
		const nombreColor = ev.target.dataset.color
		const color = this.colorDelColor(ev.target.dataset.color)
		this.iluminarColor(color)
		if(color.num === this.secuencia[this.subnivel]){
			this.subnivel++
			if(this.subnivel === this.nivel){
				this.nivel++
				this.eliminarEventosClick()
				if(this.nivel === (ultimoNivel+1)){
					this.win()
				}else{
					setTimeout(this.siguienteNivel, 600)
				}
			}
		}else{
			this.lose()
		}
	}

	win(){
		swal("Ganaste!", "Wooww", "success").then(this.inicializar())
	}

	lose(){
		swal("Perdiste!", "Lo lamentamos :(", "error").then(() => {
			this.eliminarEventosClick()
			this.inicializar()
		})
	}
}

function empezarJuego(){
	window.juego = new Juego()
}