document.addEventListener('DOMContentLoaded', function () {
    // Establecer la fecha límite (1 de diciembre de 2023)
    const fechaLimite = new Date('December 1, 2023 00:00:00 GMT-03:00');

    function actualizarContador() {
        // Obtener la fecha y hora actual
        const fechaActual = new Date();

        // Calcular la diferencia entre la fecha límite y la fecha actual
        const diferencia = fechaLimite - fechaActual;

        // Calcular días, horas, minutos y segundos restantes
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Actualizar el contenido del elemento HTML con el contador
        document.getElementById('cuentaRegresiva').innerHTML = `
            <p>${dias} días</p>
            <p>${horas} horas</p>
            <p>${minutos} minutos</p>
            <p>${segundos} segundos</p>
        `;
    }

    // Actualizar el contador cada segundo
    setInterval(actualizarContador, 1000);

    // Actualizar el contador al cargar la página
    actualizarContador();

    
});

function buscar() {
    var searchTerm = document.getElementById('searchInput').value;
    var apiUrl = `https://api.tibiadata.com/v3/character/${searchTerm}`;

    // Make a GET request to the API endpoint
    fetch(apiUrl)
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            // Parse the JSON data in the response
            return response.json();
        })
        .then(data => {
            // Handle the data
            console.log(data);
            // You can now work with the data retrieved from the API
            document.getElementById('chars').innerHTML = `
                <p>Name: ${data.characters.character.name}</p>
                <p>Level: ${data.characters.character.level}</p>
                <p>Vocation: ${data.characters.character.vocation}</p>
                <!-- Agrega más información según la estructura de tus datos -->
            `;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error during fetch:', error);
        });
}


function fetchCharacterData(characterName, elementId) {
    var apiUrl = `https://api.tibiadata.com/v3/character/${characterName}`;

    // Make a GET request to the API endpoint
    fetch(apiUrl)
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            // Parse the JSON data in the response
            return response.json();
        })
        .then(data => {
            // Handle the data
            console.log(data);

            var statusColor = data.characters.character.account_status === 'Free Account' ? 'red' : 'green';

            // You can now work with the data retrieved from the API
            document.getElementById(elementId).innerHTML = `
                <p>Name: ${data.characters.character.name}</p>
                <p>Level: ${data.characters.character.level}</p>
                <p>Vocation: ${data.characters.character.vocation}</p>
                <p>Status: <span style="color: ${statusColor};">${data.characters.character.account_status}</span></p>
                <!-- Agrega más información según la estructura de tus datos -->
            `;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error during fetch:', error);
        });
}

// Llamar a la función para cada personaje
fetchCharacterData('Ansietat', 'charAnsietat');
fetchCharacterData('Tynanthus', 'charTynanthus');
fetchCharacterData('Pim Pirim Pim', 'charPim');
fetchCharacterData('Mosby Unstoppable', 'charMosby');
// Puedes agregar más personajes según sea necesario

