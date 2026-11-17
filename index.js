const pantallaArriba = document.getElementById('arriba');
const pantallaAbajo = document.getElementById('abajo');
const mensaje = document.getElementById('mensaje');

const display = new Display(pantallaArriba, pantallaAbajo, mensaje);

document.querySelectorAll('.numero').forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.textContent));
});

document.querySelectorAll('.operador').forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value));
});

document.getElementById('btn-c').addEventListener('click', () => display.borrarTodo());
document.getElementById('btn-borrar').addEventListener('click', () => display.borrar());

document.addEventListener('keydown', e => {
    if (/^[0-9]$/.test(e.key) || e.key === '.') display.agregarNumero(e.key);
    else if (e.key === '+') display.computar('sumar');
    else if (e.key === '-') display.computar('restar');
    else if (e.key === '*' || e.key === 'x') display.computar('multiplicar');
    else if (e.key === '/') display.computar('dividir');
    else if (e.key === 'Enter' || e.key === '=') display.computar('igual');
    else if (e.key === 'Backspace') display.borrar();
    else if (e.key === 'Escape') display.borrarTodo();
});

display.imprimir();
