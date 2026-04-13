/**
 * nav-loader.js
 * Handles dynamic injection of Header and Footer for Gavin O'Hanlon's Portfolio
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Inject Header HTML
    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load header.html");
            return response.text();
        })
        .then(data => {
            // Insert the snippet into the <header id="header"> tag
            document.getElementById('header').innerHTML = data;

            // --- Handling the "Active" Page Link ---
            // Get the current file name (e.g., "about.html")
            // The '|| index.html' handles cases where the URL ends in a "/"
            const currentPath = window.location.pathname.split("/").pop() || 'index.html';
            
            // Select all links in the newly injected navigation
            const navLinks = document.querySelectorAll('.navbar-nav a');
            
            navLinks.forEach(link => {
                // Remove existing active classes to start fresh
                link.parentElement.classList.remove('active');
                
                // Compare link href to current path
                if (link.getAttribute('href') === currentPath) {
                    link.parentElement.classList.add('active');
                }
            });
        })
        .catch(err => console.error("Header Error:", err));

    // 2. Inject Footer HTML
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load footer.html");
            return response.text();
        })
        .then(data => {
            // Insert the snippet into the <footer id="footer"> tag
            document.getElementById('footer').innerHTML = data;
        })
        .catch(err => console.error("Footer Error:", err));
});