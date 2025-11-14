const cardGames = document.getElementById('card-games');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderFavorites() {
  cardGames.innerHTML = "";

  favorites.forEach(game => {
    const card = document.createElement('div');
    card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform";

    card.innerHTML = `
      <div class="w-full h-48 bg-gray-700">
        <img src="${game.background_image}" alt="${game.name}" class="w-full h-full object-cover" />
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">${game.name}</h3>
        <p class="text-gray-400 text-sm mb-4">⭐ ${game.rating}</p>

        <button class="remove-btn bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Remove Favorite
        </button>
      </div>
    `;

    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => removeFavorite(game.id, card));

    cardGames.appendChild(card);
  });
}

function removeFavorite(id, cardElement) {
  favorites = favorites.filter(g => g.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Remove the card from page
  cardElement.remove();
}

renderFavorites();
