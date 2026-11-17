class Display {
    constructor(pantallaArriba, pantallaAbajo, mensaje) {
        this.pantallaArriba = pantallaArriba;
        this.pantallaAbajo = pantallaAbajo;
        this.mensaje = mensaje;

        this.calc = new Calculadora();
        this.operacion = undefined;
        this.actual = '';
        this.anterior = '';
        this.acabaDeCalcular = false;

        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'x',
            dividir: '÷'
        };

        this.frases = [
            '¡listo! 🎉',
            'fácil 😎',
            'cerebro grande 🧠',
            'y eso que yo no sabía mates 🤓',
            '¡toma! 💥'
        ];
    }

    imprimir() {
        this.pantallaAbajo.textContent = this.actual || '0';
        this.pantallaArriba.textContent = this.anterior + ' ' + (this.signos[this.operacion] || '');
    }

    decir(texto) {
        this.mensaje.textContent = texto;
    }

    agregarNumero(numero) {
        if (this.acabaDeCalcular) {
            this.actual = '';
            this.acabaDeCalcular = false;
        }

        if (numero === '.') {
            if (this.actual.includes('.')) return;
            if (this.actual === '') this.actual = '0';
        }

        this.actual = this.actual + numero;
        this.decir('');
        this.imprimir();
    }

    borrar() {
        this.actual = this.actual.toString().slice(0, -1);
        this.imprimir();
    }

    borrarTodo() {
        this.actual = '';
        this.anterior = '';
        this.operacion = undefined;
        this.acabaDeCalcular = false;
        this.decir('');
        this.imprimir();
    }

    computar(tipo) {
        if (tipo === 'igual') {
            this.igual();
            return;
        }

        if (this.operacion && this.actual !== '' && this.anterior !== '') {
            const salioBien = this.calcular();
            if (!salioBien) return;
        }

        this.operacion = tipo;
        this.anterior = this.actual !== '' ? this.actual : this.anterior;
        this.actual = '';
        this.acabaDeCalcular = false;
        this.imprimir();
    }

    igual() {
        if (!this.operacion || this.actual === '' || this.anterior === '') return;

        const salioBien = this.calcular();
        if (!salioBien) return;

        this.anterior = '';
        this.operacion = undefined;
        this.acabaDeCalcular = true;
        this.decir(this.frases[Math.floor(Math.random() * this.frases.length)]);
        this.imprimir();
    }

    calcular() {
        const a = parseFloat(this.anterior);
        const b = parseFloat(this.actual);

        if (isNaN(a) || isNaN(b)) return false;

        if (this.operacion === 'dividir' && b === 0) {
            this.borrarTodo();
            this.decir('¡no se puede dividir entre 0! 💥');
            return false;
        }

        let resultado = this.calc[this.operacion](a, b);

        resultado = parseFloat(resultado.toFixed(10));

        this.actual = resultado.toString();
        return true;
    }
}
