/**
 * Main application entry point for Chinese Sentence Trainer
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  // PSEUDOCODE:
  // 1. Wait for DOM content to be fully loaded
  // 2. Initialize the application components
  // 3. Set up event listeners for user interactions
  
  // Initialize the application
  await initializeApp();
  
  // Set up UI controls
  setupEventListeners();
});

/**
 * Initialize the application by loading data and rendering the first batch
 * 
 * PSEUDOCODE:
 * 1. Try to initialize the data service
 *    a. If failed, show error message and stop
 * 2. Initialize the UI service
 * 3. Get first batch of random sentences
 * 4. Render sentences to the UI
 * 5. Populate dataset selector
 * 6. Handle any errors during initialization
 */
async function initializeApp() {
  try {
    // Initialize the data service
    const success = await dataService.init();
    if (!success) {
      showError('Failed to initialize data. Please check your connection and try again.');
      return;
    }
    
    // Initialize UI service
    uiService.init();
    
    // Get and render the first batch of sentences
    const sentences = dataService.getRandomSentences(5);
    uiService.renderBatch(sentences);
    
    // Populate dataset selector
    populateDatasetSelector();
  } catch (error) {
    console.error('Error initializing app:', error);
    showError('An error occurred while initializing the app.');
  }
}

/**
 * Set up event listeners for UI controls
 * 
 * PSEUDOCODE:
 * 1. Add click handler to shuffle button:
 *    a. Get new batch of random sentences
 *    b. Render them to the UI
 * 
 * 2. Add change handler to dataset selector:
 *    a. Get selected dataset name
 *    b. Load that dataset
 *    c. If successful, render new batch of sentences
 *    d. If failed, show error message
 * 
 * 3. Add keyboard shortcut for power users:
 *    a. Listen for keydown events
 *    b. If spacebar is pressed, trigger shuffle
 */
function setupEventListeners() {
  // Shuffle button
  const shuffleBtn = document.getElementById('shuffle-btn');
  shuffleBtn.addEventListener('click', () => {
    const sentences = dataService.getRandomSentences(5);
    uiService.renderBatch(sentences);
  });
  
  // Dataset selector
  const datasetSelector = document.getElementById('dataset-selector');
  datasetSelector.addEventListener('change', async (event) => {
    const selectedDataset = event.target.value;
    const success = await dataService.loadSentencePool(selectedDataset);
    
    if (success) {
      // Get and render a fresh batch of sentences
      const sentences = dataService.getRandomSentences(5);
      uiService.renderBatch(sentences);
    } else {
      showError(`Failed to load dataset: ${selectedDataset}`);
    }
  });

  // Add keyboard navigation for power users
  document.addEventListener('keydown', (event) => {
    // Space bar for shuffle
    if (event.code === 'Space') {
      event.preventDefault();
      shuffleBtn.click();
    }
  });
}

/**
 * Populate the dataset selector dropdown
 * 
 * PSEUDOCODE:
 * 1. Get the dataset selector element
 * 2. Get list of available datasets
 * 3. Clear existing options
 * 4. For each dataset:
 *    a. Create option element
 *    b. Set its value to dataset filename
 *    c. Format display name (remove .json, replace _ with space, capitalize)
 *    d. Add option to selector
 */
function populateDatasetSelector() {
  const datasetSelector = document.getElementById('dataset-selector');
  const datasets = dataService.listAvailableDatasets();
  
  // Clear existing options
  datasetSelector.innerHTML = '';
  
  // Add available datasets
  datasets.forEach(dataset => {
    const option = document.createElement('option');
    option.value = dataset;
    
    // Format the display name (remove .json and capitalize)
    const displayName = dataset
      .replace('.json', '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    option.textContent = displayName;
    datasetSelector.appendChild(option);
  });
}

/**
 * Show an error message to the user
 * 
 * PSEUDOCODE:
 * 1. Display error message using browser's alert
 * 
 * NOTE: In a production app, we would use a custom
 * error modal or toast notification instead
 */
function showError(message) {
  alert(message);
} 