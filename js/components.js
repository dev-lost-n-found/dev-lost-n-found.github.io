// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found`);
        return;
    }

    try {
        // Add loading state
        element.innerHTML = '<div class="loading">Loading...</div>';
        
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        element.innerHTML = `<div class="error">Error loading component. Please try refreshing the page.</div>`;
    }
}

// Load header and footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = window.location.origin; // e.g., http://localhost:8000
    loadComponent('header-component', `${baseURL}/header.html`);
    loadComponent('footer-component', `${baseURL}/footer.html`);
}); 
