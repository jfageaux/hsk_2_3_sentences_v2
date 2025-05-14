/**
 * timeService.js
 * Handles the display of time and date in Chinese
 */

// Chinese numbers for hours, minutes, seconds
const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', 
                        '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', 
                        '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', 
                        '二十八', '二十九', '三十', '三十一'];

// Chinese characters for time units
const timeUnits = {
    hour: '点',
    minute: '分',
    second: '秒',
    year: '年',
    month: '月',
    day: '日',
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};

/**
 * Converts any number to Chinese representation
 * @param {number} num - The number to convert
 * @returns {string} Chinese representation of the number
 */
function getChineseNumber(num) {
    if (num <= 31) {
        return chineseNumbers[num];
    }
    
    // For numbers > 31, use the tens-ones format (e.g., 34 = 三十四)
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    
    let result = '';
    
    // Add tens digit (二十, 三十, 四十, 五十)
    if (tens === 2) {
        result = '二十';
    } else if (tens === 3) {
        result = '三十';
    } else if (tens === 4) {
        result = '四十';
    } else if (tens === 5) {
        result = '五十';
    }
    
    // Add ones digit if not zero
    if (ones > 0) {
        result += chineseNumbers[ones];
    }
    
    return result;
}

/**
 * Updates the Chinese clock display
 */
function updateChineseClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Format: 十一点三十分二十秒 (11:30:20)
    const chineseTime = 
        getChineseNumber(hours) + timeUnits.hour + 
        getChineseNumber(minutes) + timeUnits.minute + 
        getChineseNumber(seconds) + timeUnits.second;
    
    document.getElementById('chinese-clock').textContent = chineseTime;
}

/**
 * Updates the Chinese date display
 */
function updateChineseDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    const day = now.getDate();
    const weekday = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Convert year to Chinese numerals (e.g., 2023 -> 二零二三年)
    const yearString = year.toString().split('').map(digit => chineseNumbers[parseInt(digit)]).join('');
    
    // Format: 二零二三年五月九日 星期二 (2023年5月9日 Tuesday)
    const chineseDate = 
        yearString + timeUnits.year + 
        chineseNumbers[month] + timeUnits.month + 
        chineseNumbers[day] + timeUnits.day + ' ' + 
        timeUnits.weekdays[weekday];
    
    document.getElementById('chinese-date').textContent = chineseDate;
}

/**
 * Initialize the clock and date, update every second
 */
function initializeTimeDisplay() {
    // Initial update
    updateChineseClock();
    updateChineseDate();
    
    // Update clock every second
    setInterval(updateChineseClock, 1000);
    
    // Update date every minute (to catch day changes at midnight)
    setInterval(updateChineseDate, 60000);
}

// Start the clock when the page loads
document.addEventListener('DOMContentLoaded', initializeTimeDisplay); 