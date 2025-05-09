# Matrix-Style Chinese Sentence Trainer

A lightweight, Matrix-themed web application for studying Chinese sentences. Designed to help learners practice reading and understanding Chinese at HSK 2-3 level.

## Features

- Shows five random Chinese sentences at a time
- Hover/tap on characters to see pinyin and full English translation
- Matrix-style green-on-black design with animated background
- Shuffle button to get new sentences
- Mobile-friendly design
- Keyboard shortcuts for power users (Space to shuffle)
- Extensible dataset system - just add new JSON files to `/data` folder

## How to Use

1. Clone this repository
2. Open `public/index.html` in your browser (no server required)

## Dataset Format

The application uses two JSON files:

1. `chars.json` - Dictionary mapping Chinese characters to pinyin and meaning
2. `sentences_hsk2.json` - Array of sentence objects with the following structure:
   - `id`: Integer ID
   - `chars`: Complete Chinese sentence
   - `en`: English translation

To add a new dataset, follow the same format as `sentences_hsk2.json` and place it in the `/data` folder.

## Technical Details

- Pure JavaScript, HTML and CSS
- No external dependencies
- Mobile-optimized with touch support
- Character pinyin lookup is performed client-side using the dictionary
- Maintains tracking of shown sentences to prevent repeats until full dataset is exhausted

## License

MIT License 