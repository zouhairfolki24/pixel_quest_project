const url = "https://debuggers-games-api.duckdns.org/api/games";
const cardGames = document.getElementById('card-games');
const buttonLoad = document.getElementById('load-more');

let gamesData = []; // store all games
let visibleCount = 8; // initial number of games

async function main() {
    const response = await fetch(url);
    const data = await response.json();
    gamesData = data.results; // save all fetched games

    renderGames(); // display first batch

    buttonLoad.addEventListener('click', () => {
        visibleCount += 8; // show 8 more games
        renderGames();
    });
}

function renderGames() {
    cardGames.innerHTML = ""; // clear existing cards

    for (let i = 0; i < visibleCount && i < gamesData.length; i++) {
        const game = gamesData[i];

        // same card design
        const cardGame = document.createElement('div');
        cardGame.className =
            "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform";

        cardGame.innerHTML = `
            <div class="w-full h-48 bg-gray-700">
              <img src="${game.background_image}" alt="${game.name}" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2">${game.name}</h3>
              <div class="flex justify-between items-center text-sm text-gray-400">
                <div class="flex gap-2">
                  <button class="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-600">Detail</button>
                  <button class="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-600">Favorite</button>
                </div>
              </div>
            </div>
        `;

        cardGames.appendChild(cardGame);
    }

    // hide Load More if all games are shown
    buttonLoad.style.display = visibleCount >= gamesData.length ? 'none' : 'block';
}

main();
