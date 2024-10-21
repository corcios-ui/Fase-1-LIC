function realizarRetiro(event) {
    event.preventDefault();
    const montoRetiro = parseFloat(document.getElementById('monto-retiro').value);
    if (isNaN(montoRetiro) || montoRetiro <= 0) {
        alert('Por favor, ingrese un monto válido.');
        return;
    }

    let saldoActual = parseFloat(localStorage.getItem('saldo'));
    if (montoRetiro > saldoActual) {
        alert('Saldo insuficiente. Por favor, ingrese un monto menor.');
    } else {
        saldoActual -= montoRetiro;
        localStorage.setItem('saldo', saldoActual);

        const transaccion = {
            servicio: 'Retiro',
            fecha: new Date().toLocaleDateString(),
            monto: `-$${montoRetiro}`
        };

        let historial = JSON.parse(localStorage.getItem('historial')) || [];
        historial.push(transaccion);
        localStorage.setItem('historial', JSON.stringify(historial));
        window.location.href = "/FASE 1 CS232913/retiro/exito.html";
    }
}
