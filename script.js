const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
  window.location.href = 'auth.html';
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'auth.html';
}

const API_KEY = 'b2fc5f4e';
let currentSearchData = [];
let currentView = 'search';

function getUserWatchlist() {
  const allWatchlists = JSON.parse(localStorage.getItem('userWatchlists')) || {};
  return allWatchlists[currentUser.email] || [];
}

function saveUserWatchlist(watchlist) {
  const allWatchlists = JSON.parse(localStorage.getItem('userWatchlists')) || {};
  allWatchlists[currentUser.email] = watchlist;
  localStorage.setItem('userWatchlists', JSON.stringify(allWatchlists));
  updateWatchlistBadge();
}

function updateWatchlistBadge() {
  const watchlist = getUserWatchlist();
  const badge = document.getElementById('favCount');
  if (badge) {
    badge.textContent = watchlist.length;
  }
}

function toggleWatchlist(event, item) {
  if (event) event.stopPropagation();
  let watchlist = getUserWatchlist();
  const exists = watchlist.some(fav => fav.imdbID === item.imdbID);

  if (exists) {
    watchlist = watchlist.filter(fav => fav.imdbID !== item.imdbID);
  } else {
    watchlist.push(item);
  }

  saveUserWatchlist(watchlist);

  if (currentView === 'favorites') {
    renderGrid(getUserWatchlist());
  } else {
    applyFilters();
  }
}

function switchView(view) {
  currentView = view;
  const searchBtn = document.getElementById('viewSearchBtn');
  const favBtn = document.getElementById('viewFavoritesBtn');
  const searchControls = document.getElementById('searchControls');
  const resultsGrid = document.getElementById('resultsGrid');
  const detailPage = document.getElementById('detailPage');

  detailPage.classList.add('hidden');
  resultsGrid.classList.remove('hidden');

  if (view === 'search') {
    searchBtn.classList.add('active');
    favBtn.classList.remove('active');
    searchControls.classList.remove('hidden');
    applyFilters();
  } else {
    favBtn.classList.add('active');
    searchBtn.classList.remove('active');
    searchControls.classList.add('hidden');
    renderGrid(getUserWatchlist());
  }
}

async function searchMedia() {
  const query = document.getElementById('searchInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  if (!query) {
    errorMsg.textContent = 'Please enter a search term.';
    return;
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.Response === "False") {
      currentSearchData = [];
      throw new Error(data.Error || 'No results found.');
    }

    const detailedItems = await Promise.all(
      data.Search.map(async (item) => {
        try {
          const detailRes = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}`);
          return await detailRes.json();
        } catch (e) {
          return item;
        }
      })
    );

    currentSearchData = detailedItems;
    applyFilters();

  } catch (err) {
    currentSearchData = [];
    renderGrid([]);
    errorMsg.textContent = err.message;
  }
}

function applyFilters() {
  if (currentView === 'favorites') return;

  const genreFilter = document.getElementById('genreFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;

  let filtered = currentSearchData;

  if (typeFilter !== 'ALL') {
    filtered = filtered.filter(item => item.Type === typeFilter);
  }

  if (genreFilter !== 'ALL') {
    filtered = filtered.filter(item => item.Genre && item.Genre.includes(genreFilter));
  }

  renderGrid(filtered);
}

function renderGrid(items) {
  const resultsGrid = document.getElementById('resultsGrid');
  const errorMsg = document.getElementById('errorMsg');
  resultsGrid.innerHTML = '';

  if (!items || items.length === 0) {
    if (currentView === 'favorites') {
      errorMsg.textContent = 'Your watchlist is empty. Add some movies or series!';
    } else if (currentSearchData.length > 0) {
      errorMsg.textContent = 'No results match your selected filters.';
    }
    return;
  }

  errorMsg.textContent = '';
  const watchlist = getUserWatchlist();

  items.forEach(item => {
    const isFav = watchlist.some(fav => fav.imdbID === item.imdbID);
    const poster = (item.Poster && item.Poster !== 'N/A') 
      ? item.Poster 
      : 'https://placehold.co/300x440/1e293b/94a3b8?text=No+Poster';

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => openDetailPage(item.imdbID);

    card.innerHTML = `
      <button class="fav-btn" onclick="toggleWatchlist(event, ${JSON.stringify(item).replace(/"/g, '&quot;')})">
        ${isFav ? '❤️' : '🤍'}
      </button>
      <img 
        class="poster-img" 
        src="${poster}" 
        alt="${item.Title}" 
        onerror="this.onerror=null; this.src='https://placehold.co/300x440/1e293b/94a3b8?text=No+Poster';"
      />
      <div class="card-info">
        <h3 class="card-title">${item.Title}</h3>
        <div class="card-meta">
          <span>${item.Year}</span>
          <span>${item.Type}</span>
        </div>
      </div>
    `;
    resultsGrid.appendChild(card);
  });
}

async function openDetailPage(imdbID) {
  const resultsGrid = document.getElementById('resultsGrid');
  const searchControls = document.getElementById('searchControls');
  const detailPage = document.getElementById('detailPage');
  const detailContent = document.getElementById('detailContent');

  resultsGrid.classList.add('hidden');
  searchControls.classList.add('hidden');
  detailPage.classList.remove('hidden');

  detailContent.innerHTML = '<p>Loading full movie details...</p>';

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await res.json();

    const watchlist = getUserWatchlist();
    const isFav = watchlist.some(fav => fav.imdbID === data.imdbID);

    const poster = (data.Poster && data.Poster !== 'N/A') 
      ? data.Poster 
      : 'https://placehold.co/300x440/1e293b/94a3b8?text=No+Poster';

    detailContent.innerHTML = `
      <img 
        class="detail-poster" 
        src="${poster}" 
        alt="${data.Title}" 
        onerror="this.onerror=null; this.src='https://placehold.co/300x440/1e293b/94a3b8?text=No+Poster';"
      />
      <div class="detail-info">
        <h2>${data.Title}</h2>
        <div class="detail-badges">
          <span class="detail-badge">⭐ ${data.imdbRating} / 10</span>
          <span class="detail-badge">${data.Rated || 'N/A'}</span>
          <span class="detail-badge">${data.Runtime || 'N/A'}</span>
          <span class="detail-badge">${data.Type}</span>
        </div>
        <p class="detail-plot">${data.Plot}</p>
        <div class="detail-row"><strong>Genre:</strong> ${data.Genre}</div>
        <div class="detail-row"><strong>Released:</strong> ${data.Released}</div>
        <div class="detail-row"><strong>Director:</strong> ${data.Director}</div>
        <div class="detail-row"><strong>Writer:</strong> ${data.Writer}</div>
        <div class="detail-row"><strong>Actors:</strong> ${data.Actors}</div>
        <div class="detail-row"><strong>Box Office:</strong> ${data.BoxOffice || 'N/A'}</div>
        <button 
          class="fav-action-btn" 
          onclick="toggleWatchlist(null, ${JSON.stringify(data).replace(/"/g, '&quot;')}); openDetailPage('${data.imdbID}')"
        >
          ${isFav ? '❤️ Remove from Watchlist' : '🤍 Add to Watchlist'}
        </button>
      </div>
    `;
  } catch (err) {
    detailContent.innerHTML = `<p style="color:#ef4444;">Failed to load movie details.</p>`;
  }
}

function closeDetailPage() {
  const resultsGrid = document.getElementById('resultsGrid');
  const searchControls = document.getElementById('searchControls');
  const detailPage = document.getElementById('detailPage');

  detailPage.classList.add('hidden');
  resultsGrid.classList.remove('hidden');

  if (currentView === 'search') {
    searchControls.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (currentUser) {
    document.getElementById('userDisplayName').textContent = currentUser.name;
  }
  updateWatchlistBadge();
  searchMedia();
});