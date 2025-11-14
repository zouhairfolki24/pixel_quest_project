const cardGames = document.getElementById('card-games');

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

favorites.forEach(game => {
  const card = document.createElement('div');
  card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform";

  card.innerHTML = `
    <div class="w-full h-48 bg-gray-700">
      <img src="${game.background_image}" alt="${game.name}" class="w-full h-full object-cover" />
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">${game.name}</h3>
      <p class="text-gray-400 text-sm mb-2">⭐ ${game.rating}</p>
    </div>
  `;

  cardGames.appendChild(card);
});
