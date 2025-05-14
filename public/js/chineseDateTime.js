/**
 * Chinese Clock and Date Display
 * 
 * This module handles displaying the current time and date in Chinese format.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the clock and date displays
  initChineseDateTime();
});

/**
 * Initialize the Chinese clock and date functionality
 */
function initChineseDateTime() {
  // Get the DOM elements
  const clockElement = document.getElementById('chinese-clock');
  const dateElement = document.getElementById('chinese-date');
  
  // Update immediately on load
  updateChineseClock(clockElement);
  updateChineseDate(dateElement);
  
  // Set up interval to update the clock every second
  setInterval(() => updateChineseClock(clockElement), 1000);
  
  // Set up interval to update the date once per day at midnight
  // (or every hour to be safer with timezone changes)
  setInterval(() => updateChineseDate(dateElement), 3600000); // 1 hour in milliseconds
}

/**
 * Update the Chinese clock display
 * @param {HTMLElement} element - The DOM element to update
 */
function updateChineseClock(element) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Convert numbers to Chinese characters
  const chineseTime = `${numberToChinese(hours)}时${numberToChinese(minutes)}分${numberToChinese(seconds)}秒`;
  
  // Update the element
  element.textContent = chineseTime;
}

/**
 * Update the Chinese date display
 * @param {HTMLElement} element - The DOM element to update
 */
function updateChineseDate(element) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  const day = now.getDate();
  
  // Get Chinese weekday
  const weekday = getChineseWeekday(now.getDay());
  
  // Convert numbers to Chinese characters
  const chineseDate = `${numberToChinese(year)}年${numberToChinese(month)}月${numberToChinese(day)}日 ${weekday}`;
  
  // Update the element
  element.textContent = chineseDate;
}

/**
 * Convert an Arabic numeral to a Chinese numeral string
 * @param {number} num - The number to convert
 * @returns {string} The Chinese representation of the number
 */
function numberToChinese(num) {
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const positions = ['', '十', '百', '千', '万'];
  
  // Simple formatting for small numbers (adequate for time display)
  if (num < 10) {
    return digits[num];
  } else if (num < 20) {
    return '十' + (num > 10 ? digits[num - 10] : '');
  } else if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return digits[tens] + '十' + (ones > 0 ? digits[ones] : '');
  } else if (num >= 1000 && num <= 9999) {
    // For years like 2023
    return num.toString().split('').map(d => digits[parseInt(d)]).join('');
  }
  
  // For numbers >= 100
  let result = '';
  let numString = num.toString();
  
  for (let i = 0; i < numString.length; i++) {
    const digit = parseInt(numString[i]);
    const position = numString.length - i - 1;
    
    if (digit !== 0) {
      result += digits[digit] + positions[position];
    } else if (result.charAt(result.length - 1) !== '零') {
      // Add zero only if the previous character isn't already zero
      result += '零';
    }
  }
  
  // Clean up trailing zeros
  if (result.endsWith('零')) {
    result = result.slice(0, -1);
  }
  
  return result;
}

/**
 * Get the Chinese representation of a weekday
 * @param {number} day - Day of week (0-6, where 0 is Sunday)
 * @returns {string} Chinese weekday name
 */
function getChineseWeekday(day) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekdays[day];
} 