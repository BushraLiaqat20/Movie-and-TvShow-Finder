
Bushra Liaqat
11:49 AM (0 minutes ago)
to me

# 🎬 MovieVerse

A modern, responsive web application for discovering movies and TV series using the **OMDb API**. Built with vanilla HTML, CSS, JavaScript, and browser local storage.

---

## ✨ Features

### 🔐 User Authentication
- User registration (Sign Up) and Login system.
- Session persistence using `localStorage`.
- Individual watchlists linked to each user account.

### 🔍 Movie & TV Search
- Real-time search powered by the OMDb API.
- Graceful fallback for missing posters with a clean **"No Poster"** placeholder.

### 🎯 Filtering & Navigation
- Filter by genre (Action, Comedy, Sci-Fi, Horror, etc.).
- Filter by type (Movies or TV Series).
- Quick navigation between **Search** and **Watchlist** tabs.

### ❤️ Personal Watchlist
- Add or remove movies and TV shows with a single click.
- Dynamic watchlist counter displayed in the navigation bar.

### 🎥 Movie Details
- Dedicated details page displaying:
  - Plot
  - IMDb Rating
  - Release Date
  - Runtime
  - Director
  - Writers
  - Actors
  - Box Office Collection

### 🎨 Modern UI
- Dark cinema-inspired theme.
- Glassmorphism effects and smooth animations.
- Fully responsive for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **API:** OMDb API
- **Storage:** Browser `localStorage`

---

## 📁 Project Structure

```text
MovieVerse/
├── index.html      # Main dashboard
├── styles.css      # Main styling
├── script.js       # Application logic & API requests
├── auth.html       # Login & Sign Up page
├── auth.css        # Authentication styles
├── auth.js         # Authentication logic
└── README.md       # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BushraLiaqat20/MovieVerse.git
```

### 2. Open the Project

Open `auth.html` or `index.html` in any modern web browser.

**OR**

Open the project folder in **VS Code** and launch it using the **Live Server** extension.

---

## 📖 Usage

1. Open **auth.html**.
2. Create a new account.
3. Log in using your email and password.
4. Search for any movie or TV series.
5. Apply genre or type filters if needed.
6. Click on a movie card to view detailed information.
7. Click the ❤️ icon to add or remove titles from your watchlist.

---

## 💾 Local Storage

The application stores data locally in your browser using `localStorage`.

| Key | Description |
|------|-------------|
| `users` | Stores registered user accounts. |
| `currentUser` | Stores the currently logged-in user session. |
| `userWatchlists` | Stores each user's personal watchlist. |

---

## 🔑 API Key

The project uses the **OMDb API**.

```javascript
const API_KEY = "b2fc5f4e";
```

> **Note:** The free OMDb API plan allows up to **1,000 requests per day**.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

**Bushra Liaqat**

GitHub: https://github.com/BushraLiaqat20
