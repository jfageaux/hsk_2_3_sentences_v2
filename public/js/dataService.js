/**
 * Data Service for Chinese Sentence Trainer
 * Responsible for fetching JSON data, caching character dictionary,
 * and serving random sentences without repeats.
 */

const dataService = (() => {
  // Private variables
  let charDictionary = {};       // Store character -> pinyin/meaning mapping
  let sentencePool = [];         // All available sentences
  let shownSentenceIds = new Set(); // Track which sentences have been shown
  let currentDataset = 'sentences_hsk2.json'; // Current active dataset filename

  /**
   * Initialize the data service by loading the character dictionary and sentence pool
   * 
   * Pseudocode:
   * 1. Fetch the character dictionary JSON
   * 2. Store dictionary in memory for fast lookups
   * 3. Load the initial sentence pool
   * 4. Return success/failure status
   */
  async function init() {
    try {
      // Load character dictionary
      const charsResponse = await fetch('data/chars.json');
      charDictionary = await charsResponse.json();
      
      // Load initial sentence pool
      await loadSentencePool(currentDataset);
      
      return true;
    } catch (error) {
      console.error('Error initializing data service:', error);
      return false;
    }
  }

  /**
   * Load a sentence pool from a given JSON file
   * 
   * Pseudocode:
   * 1. Fetch the requested sentence dataset
   * 2. Parse JSON response into sentence objects
   * 3. Reset the tracking of shown sentences
   * 4. Update current dataset name
   * 5. Return success/failure status
   */
  async function loadSentencePool(datasetFilename) {
    try {
      const sentencesResponse = await fetch(`data/${datasetFilename}`);
      sentencePool = await sentencesResponse.json();
      shownSentenceIds.clear(); // Reset shown sentences when loading new pool
      currentDataset = datasetFilename;
      return true;
    } catch (error) {
      console.error(`Error loading sentence pool from ${datasetFilename}:`, error);
      return false;
    }
  }

  /**
   * Get character metadata (pinyin and meaning)
   * 
   * Pseudocode:
   * 1. Look up character in dictionary
   * 2. If found, return its data
   * 3. If not found, log warning and return placeholder
   */
  function getCharacterData(char) {
    if (charDictionary[char]) {
      return charDictionary[char];
    } else {
      console.log(`Character ${char} not found in dictionary`);
      return { py: '—', mean: 'unknown' };
    }
  }

  /**
   * Get random sentences without repeating until the pool is exhausted
   * 
   * Pseudocode:
   * 1. Check if we've shown all sentences already
   *    a. If yes, reset tracking to start over
   * 2. Find all sentences we haven't shown yet
   * 3. Shuffle these available sentences using Fisher-Yates
   * 4. Select requested number of sentences
   * 5. Mark these sentences as "shown"
   * 6. Return the selected sentences
   */
  function getRandomSentences(count) {
    // If we've shown all sentences, reset the shown set
    if (shownSentenceIds.size >= sentencePool.length) {
      shownSentenceIds.clear();
    }
    
    // Find unshown sentences
    const availableSentences = sentencePool.filter(sentence => !shownSentenceIds.has(sentence.id));
    
    // Get random samples from available sentences
    const randomSentences = [];
    const numToSelect = Math.min(count, availableSentences.length);
    
    // Fisher-Yates shuffle algorithm on a copy of available sentences
    const shuffled = [...availableSentences];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Take the first 'count' sentences
    for (let i = 0; i < numToSelect; i++) {
      randomSentences.push(shuffled[i]);
      shownSentenceIds.add(shuffled[i].id);
    }
    
    return randomSentences;
  }

  /**
   * List available datasets in the data directory
   * 
   * Pseudocode:
   * NOTE: In a real implementation, this would:
   * 1. Make an API call to backend to list files
   * 2. Filter for JSON files in the data directory
   * 3. Return the list of available datasets
   * 
   * For this demo, we hardcode the default dataset
   */
  function listAvailableDatasets() {
    // In a real implementation, this would dynamically list JSON files
    return ['sentences_hsk2.json'];
  }

  // Public API
  return {
    init,
    loadSentencePool,
    getCharacterData,
    getRandomSentences,
    listAvailableDatasets
  };
})();