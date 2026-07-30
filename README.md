# 🎬 MovieVerse

A modern, responsive web application for discovering movies, TV series, and details using the OMDb API. Built with vanilla HTML, CSS, JavaScript, and local browser storage.

---

## ✨ Features

- **User Authentication:** 
  - Account registration (Sign Up) and Login system.
  - Session persistence using `localStorage`.
  - Individual user watchlists tied to specific user accounts.

- **Movie & TV Search:**
  - Real-time search powered by the OMDb API.
  - Graceful fallback for missing posters with clean "No Poster" placeholders.

- **Filtering & Navigation:**
  - Genre filtering (Action, Comedy, Sci-Fi, Horror, etc.).
  - Type filtering (Movies vs. TV Series).
  - Quick tab switching between Search and Watchlist views.

- **Personal Watchlist / Favorites:**
  - Add or remove movies/shows from your personal watchlist with a single click.
  - Dynamic watchlist item counter in the navigation bar.

- **Detailed Movie View:**
  - Dedicated view showing full plot, IMDb ratings, release date, runtime, director, writers, actors, and box office details.

- **Sleek UI/UX:**
  - Dark cinema-inspired aesthetic with custom gradients and glassmorphism hover effects.
  - Fully responsive design for desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **API:** [OMDb API](https://www.omdbapi.com/)
- **Storage:** Browser `localStorage`

---

## 📁 Project Structure

```text
MovieVerse/
├── index.html     # Main dashboard (Search, Watchlist, Movie Details)
├── styles.css     # Modern CSS styles & UI theme
├── script.js      # Main application logic & API fetch operations
├── auth.html      # Login and Sign-up interface
├── auth.css       # Styling for authentication forms
├── auth.js        # Authentication logic & session handling
└── README.md      # Project documentation
---

## 🚀 Getting Started

### 1. Clone or Download the Repository
```bash
git clone [https://github.com/your-username/MovieVerse.git](https://github.com/BushraLiaqat20/MovieVerse.git)
