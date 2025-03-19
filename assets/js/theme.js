/**
 * Theme Toggle Functionality
 * Handles switching between light and dark mode
 * Saves user preference to localStorage
 */

// DOM Elements
const themeToggleBtn = document.querySelector('.theme-toggle');
const themeToggleIcon = themeToggleBtn.querySelector('i');

// Check for saved user preference, if any
const getUserThemePreference = () => {
    return localStorage.getItem('theme') || 'light'; // Default to light theme
};

// Set theme on initial load
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
    }
};

// Initialize theme
const initTheme = () => {
    // First check if user has previously selected a theme
    const savedTheme = getUserThemePreference();
    setTheme(savedTheme);
    
    // Then check if user has system preference for dark mode
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches && !localStorage.getItem('theme')) {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
};

// Toggle theme
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set the new theme
    setTheme(newTheme);
    
    // Save user preference
    localStorage.setItem('theme', newTheme);
    
    // Add animation effect
    themeToggleBtn.classList.add('theme-toggle-animation');
    setTimeout(() => {
        themeToggleBtn.classList.remove('theme-toggle-animation');
    }, 500);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme on page load
    initTheme();
    
    // Add click event to theme toggle button
    themeToggleBtn.addEventListener('click', toggleTheme);
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    }
});
