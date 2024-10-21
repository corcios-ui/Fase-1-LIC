function realizarPago(servicio) {
    const montoPago = parseFloat(document.getElementById('monto-pago').value);
    if (isNaN(montoPago) || montoPago <= 0) {
        alert('Por favor, ingrese un monto válido.');
        return;
    }

    let saldoActual = parseFloat(localStorage.getItem('saldo')) || 500; // Default $500 si no hay saldo

    if (montoPago > saldoActual) {
        alert('Saldo insuficiente. Por favor, ingrese un monto menor.');
        return; // Asegurarse de terminar la función si no hay suficiente saldo
    }

    // Actualizar saldo
    saldoActual -= montoPago;
    localStorage.setItem('saldo', saldoActual.toString()); // Convertir a cadena para almacenar en localStorage

    // Registrar la transacción en el historial
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    const nuevaTransaccion = {
        servicio: servicio,
        fecha: new Date().toLocaleDateString(),
        monto: `-$${montoPago.toFixed(2)}`
    };
    historial.push(nuevaTransaccion);
    localStorage.setItem('historial', JSON.stringify(historial)); // Guardar el historial actualizado en localStorage

    // Redirección a la página de éxito
    window.location.href = "/FASE 1 CS232913/pago/exito.html";
}

// Inicializar saldo si no existe en localStorage
if (!localStorage.getItem('saldo')) {
    localStorage.setItem('saldo', '500'); // Saldo inicial de $500
}
