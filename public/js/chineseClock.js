/**
 * Chinese Clock Module
 * Displays current time and date in Chinese
 */

// Chinese numerals
const chineseNumerals = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

// Chinese weekdays
const chineseWeekdays = ['日', '一', '二', '三', '四', '五', '六'];

// Chinese month names
const chineseMonths = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

/**
 * Convert number to Chinese numerals
 * @param {Number} num - The number to convert
 * @return {String} The Chinese representation
 */
function numberToChinese(num) {
    if (num <= 10) {
        return chineseNumerals[num];
    } else if (num < 20) {
        return '十' + (num > 10 ? chineseNumerals[num - 10] : '');
    } else if (num < 100) {
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        return chineseNumerals[tens] + '十' + (ones > 0 ? chineseNumerals[ones] : '');
    }
    return num.toString(); // Fallback for large numbers
}

/**
 * Update the clock and date display
 */
function updateChineseClock() {
    const now = new Date();
    
    // Get date components
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();
    const weekday = now.getDay(); // 0-6, 0 is Sunday
    
    // Get time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Format date in Chinese: YYYY年MM月DD日 星期X
    const chineseDate = `${year}年${chineseMonths[month]}月${numberToChinese(day)}日 星期${chineseWeekdays[weekday]}`;
    
    // Format time in Chinese: HH时MM分SS秒
    const chineseTime = `${numberToChinese(hours)}时${numberToChinese(minutes)}分${numberToChinese(seconds)}秒`;
    
    // Update the DOM
    document.getElementById('date-display').textContent = chineseDate;
    document.getElementById('time-display').textContent = chineseTime;
}

/**
 * Initialize the Chinese clock
 */
function initChineseClock() {
    // Update immediately
    updateChineseClock();
    
    // Then update every second
    setInterval(updateChineseClock, 1000);
}

// Start the clock when the page loads
document.addEventListener('DOMContentLoaded', initChineseClock); 