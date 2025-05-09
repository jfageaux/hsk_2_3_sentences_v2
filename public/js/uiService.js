/**
 * UI Service for Chinese Sentence Trainer
 * Responsible for rendering sentences, handling hover/touch events,
 * and updating the UI.
 */

const uiService = (() => {
  // DOM elements (cached for performance)
  const sentenceContainer = document.getElementById('sentence-container');
  const translationBar = document.getElementById('translation-bar');
  const pinyinDisplay = document.getElementById('pinyin-display');
  const translationDisplay = document.getElementById('translation-display');
  
  /**
   * Initialize the UI service
   * 
   * Pseudocode:
   * 1. Set up event listeners for mobile devices
   * 2. Generate and render the Matrix background animation
   */
  function init() {
    // Set up event delegation for mobile touch
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    // Create the Matrix rain background
    createMatrixBackground();
  }
  
  /**
   * Render a batch of sentences
   * 
   * Pseudocode:
   * 1. Clear the current sentences from container
   * 2. For each sentence:
   *    a. Create a sentence element
   *    b. Store sentence data (id, translation) as attributes
   *    c. Split sentence into individual characters
   *    d. For each character:
   *       i. Create glyph element with character
   *       ii. Create tooltip with pinyin
   *       iii. Attach tooltip to glyph
   *       iv. Add glyph to sentence
   *    e. Add event listeners to sentence
   *    f. Add sentence to container
   */
  function renderBatch(sentences) {
    sentenceContainer.innerHTML = '';
    
    sentences.forEach(sentence => {
      const sentenceElement = document.createElement('div');
      sentenceElement.classList.add('sentence');
      sentenceElement.setAttribute('data-id', sentence.id);
      sentenceElement.setAttribute('data-en', sentence.en);
      
      // Split each sentence into individual characters
      Array.from(sentence.chars).forEach(char => {
        const glyphElement = document.createElement('span');
        glyphElement.classList.add('glyph');
        glyphElement.setAttribute('data-char', char);
        glyphElement.textContent = char;
        
        // Create pinyin tooltip
        const tooltipElement = document.createElement('span');
        tooltipElement.classList.add('pinyin-tooltip');
        
        // Get character data and set tooltip
        const charData = dataService.getCharacterData(char);
        tooltipElement.textContent = charData.py;
        
        glyphElement.appendChild(tooltipElement);
        sentenceElement.appendChild(glyphElement);
      });
      
      // Add event listeners
      sentenceElement.addEventListener('mouseover', handleHover);
      sentenceElement.addEventListener('mouseout', hideTranslation);
      
      sentenceContainer.appendChild(sentenceElement);
    });
  }
  
  /**
   * Handle hover events on characters
   * 
   * Pseudocode:
   * 1. Check if target is a Chinese character glyph
   * 2. If not, exit function
   * 3. Get character data from data service
   * 4. Find parent sentence element
   * 5. Get English translation from sentence element
   * 6. Show translation in footer bar
   * 7. CSS handles the pinyin tooltip display
   */
  function handleHover(event) {
    const target = event.target;
    
    // Only process glyph elements
    if (!target.classList.contains('glyph')) return;
    
    const char = target.getAttribute('data-char');
    const charData = dataService.getCharacterData(char);
    const sentence = target.closest('.sentence');
    const translation = sentence.getAttribute('data-en');
    
    // Show translation in footer
    showTranslation(translation);
    
    // No need to do anything with the pinyin tooltip, CSS handles it
  }
  
  /**
   * Show translation in the footer bar
   * 
   * Pseudocode:
   * 1. Set the text content of the translation display
   * 2. Add 'active' class to slide the footer up into view
   */
  function showTranslation(translation) {
    translationDisplay.textContent = translation;
    translationBar.classList.add('active');
  }
  
  /**
   * Hide the translation bar
   * 
   * Pseudocode:
   * 1. Remove 'active' class to slide footer down
   */
  function hideTranslation() {
    translationBar.classList.remove('active');
  }
  
  /**
   * Handle touch events for mobile
   * 
   * Pseudocode:
   * 1. Check if target is a Chinese character glyph
   * 2. If not, exit function
   * 3. Get character data from data service
   * 4. Find parent sentence element
   * 5. Get English translation from sentence element
   * 6. Show pinyin for specific character in pinyin display
   * 7. Show translation in footer bar
   */
  function handleTouchStart(event) {
    const target = event.target;
    
    // Only process glyph elements
    if (!target.classList.contains('glyph')) return;
    
    const char = target.getAttribute('data-char');
    const charData = dataService.getCharacterData(char);
    const sentence = target.closest('.sentence');
    const translation = sentence.getAttribute('data-en');
    
    // Show pinyin and translation
    pinyinDisplay.textContent = `${char}: ${charData.py}`;
    showTranslation(translation);
  }
  
  /**
   * Handle touch end events
   * 
   * Pseudocode:
   * 1. If translation bar is active (visible)
   * 2. Hide it (second tap anywhere dismisses)
   */
  function handleTouchEnd(event) {
    // For second tap anywhere, hide translation
    if (translationBar.classList.contains('active')) {
      hideTranslation();
    }
  }
  
  /**
   * Create the Matrix-style raining code background
   * 
   * Pseudocode:
   * 1. Get the matrix background container
   * 2. Calculate how many columns based on screen width
   * 3. Define Matrix characters to use (Chinese for authentic look)
   * 4. For each column:
   *    a. Create a column element
   *    b. Position it randomly
   *    c. Set random animation speed and delay
   *    d. Generate random characters for this column
   *    e. Make first character brighter (glow effect)
   *    f. Add column to background
   */
  function createMatrixBackground() {
    const matrixBg = document.querySelector('.matrix-bg');
    const width = window.innerWidth;
    
    // Create around 50 columns, based on screen width
    const columnCount = Math.floor(width / 20);
    
    // Matrix characters (mostly Chinese characters for authentic look)
    const matrixChars = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑';
    
    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.classList.add('matrix-column');
      
      // Random position
      column.style.left = `${(i / columnCount) * 100}%`;
      
      // Random animation duration (3-8 seconds)
      const duration = 3 + Math.random() * 5;
      column.style.animationDuration = `${duration}s`;
      
      // Random delay
      column.style.animationDelay = `${Math.random() * 2}s`;
      
      // Generate random characters for this column
      const charCount = 10 + Math.floor(Math.random() * 15);
      for (let j = 0; j < charCount; j++) {
        const matrixChar = document.createElement('div');
        matrixChar.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Make the first character brighter
        if (j === 0) {
          matrixChar.style.color = 'rgba(49, 255, 77, 0.9)';
          matrixChar.style.textShadow = '0 0 8px rgba(49, 255, 77, 0.5)';
        }
        
        // Fade out as we go down
        matrixChar.style.opacity = 1 - (j / charCount);
        
        column.appendChild(matrixChar);
      }
      
      matrixBg.appendChild(column);
    }
  }
  
  // Public API
  return {
    init,
    renderBatch
  };
})(); 