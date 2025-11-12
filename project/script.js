const url = "https://debuggers-games-api.duckdns.org/api/games";
const cardGames = document.getElementById('card-games');
const buttonLoad = document.getElementById('load-more');
const filterGenre = document.getElementById('filter-genre');
const filterPlatform = document.getElementById('filter-platform');
const searchInput = document.getElementById('search-input');

let gamesData = [];
let visibleCount = 8;

async function main() {
  const response = await fetch(url);
  const data = await response.json();
  gamesData = data.results;

  populateFilters(gamesData);
  renderGames();

  buttonLoad.addEventListener('click', () => {
    visibleCount += 8;
    renderGames();
  });

  filterGenre.addEventListener('change', renderGames);
  filterPlatform.addEventListener('change', renderGames);
  searchInput.addEventListener('input', renderGames);
}

function populateFilters(games) {
  const genres = new Set();
  const platforms = new Set();

  games.forEach(game => {
    game.genres?.forEach(g => genres.add(g.name));
    game.platforms?.forEach(p => platforms.add(p.platform.name));
  });

  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    filterGenre.appendChild(opt);
  });

  platforms.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    filterPlatform.appendChild(opt);
  });
}

function renderGames() {
  cardGames.innerHTML = "";

  let filteredGames = gamesData.filter(game => {
    const genreMatch = !filterGenre.value || game.genres?.some(g => g.name === filterGenre.value);
    const platformMatch = !filterPlatform.value || game.platforms?.some(p => p.platform.name === filterPlatform.value);
    const searchMatch = !searchInput.value || game.name.toLowerCase().includes(searchInput.value.toLowerCase());
    return genreMatch && platformMatch && searchMatch;
  });

  for (let i = 0; i < visibleCount && i < filteredGames.length; i++) {
    const game = filteredGames[i];
    const card = document.createElement('div');
    card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform";

    card.innerHTML = `
      <div class="w-full h-48 bg-gray-700">
        <img src="${game.background_image}" alt="${game.name}" class="w-full h-full object-cover" />
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">${game.name}</h3>
        <p class="text-gray-400 text-sm mb-2">⭐ ${game.rating}</p>
        <div class="flex justify-between items-center text-sm text-gray-400">
          <div class="flex gap-2">
            <button class="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-600">Detail</button>
            <button class="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-600">Favorite</button>
          </div>
        </div>
      </div>
    `;
    cardGames.appendChild(card);
  }

  buttonLoad.style.display = visibleCount >= filteredGames.length ? 'none' : 'block';
}

main();
