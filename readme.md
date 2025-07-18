# FocusFlow

FocusFlow is a lightweight AI productivity assistant that helps creators brainstorm, summarize, and transform content. Powered by Google Gemini, FocusFlow provides structured, creative, and helpful responses for writers, educators, and designers.

## Features

- **Brainstorm Ideas:** Expand questions or concepts into actionable suggestions.
- **Summarize Content:** Generate concise summaries of your text.
- **Transform Text:** Rewrite and enhance your content in creative tones.
- **Copy & Save:** Easily copy responses or save your session as a JSON file.
- **Dark/Light Theme:** Toggle between light and dark modes for comfortable viewing.
- **Responsive UI:** Optimized for desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/focusflow.git
   cd focusflow
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

### Build for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Usage

- Select a mode (Brainstorm, Summarize, Transform) from the header.
- Enter your message or content in the input panel.
- View AI-generated responses in the response panel.
- Use the Copy or Save buttons to export your results.
- Toggle theme using the moon/sun icon.

## Project Structure

```
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── chatPanel.tsx
│   │   ├── header.tsx
│   │   ├── markdownRenderer.tsx
│   │   └── responsePanel.tsx
│   └── contexts/
│       └── themeContext.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── ...
```

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Lucide Icons](https://lucide.dev/)

## Configuration

- **API Key:** The Google Gemini API key is set in [`src/App.tsx`](src/App.tsx). Replace it with your own key for production use.
- **Styling:** Tailwind CSS configuration is in [`tailwind.config.js`](tailwind.config.js).

## License

MIT

## Acknowledgements

- [Google GenAI](https://ai.google.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)