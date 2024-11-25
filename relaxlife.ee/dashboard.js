// Funktsioon mängijate arvu saatmiseks API-le
function sendPlayersCountToAPI() {
    // Kõigepealt loe mängijate arv tekstifailist
    fetch('https://relaxlife.ee/player_count.txt')
        .then(response => response.text()) // Loeb faili sisu
        .then(text => {
            const currentPlayerCount = parseInt(text.trim()); // Konverteeri tekst arvu

            // Kontrollige, kas mängijate arv on number
            if (isNaN(currentPlayerCount)) {
                console.error('Mängijate arv pole korrektne:', text);
                return;
            }

            // Saada mängijate arv API-le
            fetch('https://relaxlife.ee/update_players.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Tagame, et saame saata JSON formaadis andmeid
                },
                body: JSON.stringify({ players: currentPlayerCount }) // Mängijate arvu saatmine JSON'is
            })
            .then(response => response.json()) // Parseeri vastus JSON-iks
            .then(data => {
                if (data.status === 'success') {
                    console.log('Mängijate arv edukalt saadetud:', data.players);
                    document.getElementById('players').textContent = data.players; // Uuenda veebileht
                } else {
                    console.error('API viga:', data.message); // Vea kuvamine, kui API vastus ei ole edukas
                }
            })
            .catch(error => {
                console.error('Viga API päringus:', error);
            });
        })
        .catch(error => {
            console.error('Viga mängijate arvu saamisel tekstifailist:', error);
        });
}

// Kutsu funktsiooni iga 5 sekundi tagant
setInterval(sendPlayersCountToAPI, 5000);
