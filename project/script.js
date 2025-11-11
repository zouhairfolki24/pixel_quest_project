const url = "https://debuggers-games-api.duckdns.org/api/games";
const cardGames = document.getElementById('card-games');

async function main() {
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        const cardGame = document.createElement('div');
        cardGame.className =
            "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform";

        cardGame.innerHTML = `
                <div class="w-full h-48 bg-gray-700">
                  <img src="${data.results[i].background_image}" alt="${data.results[i].name}" class="w-full h-full object-cover" />
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-lg mb-2">${data.results[i].name}</h3>
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
}

main();