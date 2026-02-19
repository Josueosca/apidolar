document.addEventListener('DOMContentLoaded', function() {
    fetch("https://ve.dolarapi.com/v1/dolares/oficial", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Estado de la respuesta:', response.status);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos de la API:', data);

        // Verificar que los datos existen
        if (data) {
            const fechaElement = document.getElementById('dolarFecha');
            const valorElement = document.getElementById('dolarValor');

            // Verificar si los elementos existen en el DOM
            if (!fechaElement || !valorElement) {
                console.error('No se encontraron los elementos HTML necesarios');
                return;
            }

            // Formatear y mostrar la fecha
            if (data.fechaActualizacion) {
                const fecha = new Date(data.fechaActualizacion);
                const fechaFormateada = fecha.toLocaleDateString('es-VE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                fechaElement.textContent = fechaFormateada;
                console.log('Fecha formateada:', fechaFormateada);
            } else {
                fechaElement.textContent = 'Fecha no disponible';
                console.warn('No se recibió fechaActualizacion');
            }

            // Mostrar el valor del dólar
            if (data.promedio !== undefined && data.promedio !== null) {
                valorElement.textContent = `Bs. ${data.promedio.toFixed(2)}`;
                console.log('Valor mostrado:', `Bs. ${data.promedio.toFixed(2)}`);
            } 
            // Por si la API cambia el nombre del campo
            else if (data.venta !== undefined) {
                valorElement.textContent = `Bs. ${data.venta.toFixed(2)}`;
            }
            else if (data.precio !== undefined) {
                valorElement.textContent = `Bs. ${data.precio.toFixed(2)}`;
            }
            else {
                valorElement.textContent = 'Valor no disponible';
                console.error('No se encontró el campo del valor en:', data);
            }
        } else {
            throw new Error('No se recibieron datos de la API');
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error.message);
        
        // Mostrar error en la página si los elementos existen
        const fechaElement = document.getElementById('dolarFecha');
        const valorElement = document.getElementById('dolarValor');
        
        if (fechaElement) {
            fechaElement.textContent = 'Error de conexión';
        }
        if (valorElement) {
            valorElement.textContent = '❌';
        }
    });
});
 // Mostrar error en la página si los elementos existen