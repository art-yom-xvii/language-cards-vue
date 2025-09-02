# Language Flashcards App

A simple, elegant single-page flashcard application built with Vue 3 (Composition API) and TailwindCSS v3. Practice Latvian-English vocabulary in an Anki-like experience. All data is local and stats are persisted in your browser.

## Features

-   Random Latvian word shown, reveal English translation on button
-   Mark if you guessed correctly or incorrectly
-   Skip word button
-   Prevents immediate repeats
-   Per-word statistics: correct, incorrect, accuracy %
-   Highlights most/least guessed words
-   Dark mode toggle
-   Responsive, minimal UI
-   Stats persist in localStorage

## Usage

1. **Install dependencies:**
    ```sh
    npm install
    ```
2. **Start the development server:**
    ```sh
    npm run dev
    ```
3. Open your browser to the local address shown in the terminal (usually http://localhost:5173).

### How to Use

-   On load, a random Latvian word is shown.
-   Click **Show Translation** to reveal the English meaning.
-   After revealing, choose **Guessed Correctly** or **Guessed Incorrectly** to track your progress.
-   Use **Skip Word** to move to another word without recording a guess.
-   View your stats at the bottom: see which words you get right/wrong most often, and your accuracy.
-   Toggle dark mode with the button in the header.

### Customization

-   To add or change words, edit the `words` array in `src/words.js`.
-   Stats are saved in your browser's localStorage. To reset, clear site data in your browser.

## Deployment to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

### Setup Instructions:

1. **Push your code to GitHub** (if you haven't already)
2. **Enable GitHub Pages** in your repository:
    - Go to your repository → Settings → Pages
    - Set "Source" to "GitHub Actions"
3. **Push to main/master branch** - the workflow will automatically:
    - Build your Vue app
    - Deploy it to GitHub Pages
    - Make it available at `https://yourusername.github.io/007-language-cards/`

### Manual Deployment:

If you prefer to deploy manually:

```sh
npm run build
# Upload the contents of the 'dist' folder to your GitHub Pages branch
```

---
