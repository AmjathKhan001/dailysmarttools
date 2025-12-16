// navigation.js - Complete Navigation System for Daily Smart Tools
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
    
    function initNavigation() {
        loadNavigation();
        setupMobileMenu();
        setActiveNavLink();
        closeMenuOnResize();
    }
    
    function loadNavigation() {
        // Don't load if already exists
        if (document.querySelector('nav')) return;
        
        // Calculate path prefix based on current location
        let prefix = '';
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/tools/')) {
            prefix = '../';
        } else if (currentPath.includes('/text/') || 
                   currentPath.includes('/image/') || 
                   currentPath.includes('/calculators/') || 
                   currentPath.includes('/converters/') || 
                   currentPath.includes('/generators/') || 
                   currentPath.includes('/developers/')) {
            prefix = '../';
        }
        
        // Navigation HTML
        const navHTML = `
            <nav>
                <ul>
                    <li><a href="${prefix}index.html" id="nav-home">Home</a></li>
                    <li><a href="${prefix}all-tools.html" id="nav-all-tools">All Tools</a></li>
                    <li><a href="${prefix}text-tools.html" id="nav-text-tools">Text Tools</a></li>
                    <li><a href="${prefix}image-tools.html" id="nav-image-tools">Image Tools</a></li>
                    <li><a href="${prefix}calculators.html" id="nav-calculators">Calculators</a></li>
                    <li><a href="${prefix}converters.html" id="nav-converters">Converters</a></li>
                    <li><a href="${prefix}generators.html" id="nav-generators">Generators</a></li>
                    <li><a href="${prefix}developer-tools.html" id="nav-developer">Developer</a></li>
                </ul>
            </nav>
        `;
        
        // Insert navigation into header
        const headerContainer = document.querySelector('.header-container');
        if (headerContainer) {
            const existingNav = headerContainer.querySelector('nav');
            if (existingNav) existingNav.remove();
            
            const logo = headerContainer.querySelector('.logo');
            const mobileBtn = headerContainer.querySelector('.mobile-menu-btn');
            
            if (logo) {
                if (mobileBtn) {
                    // Insert between logo and mobile button
                    mobileBtn.insertAdjacentHTML('beforebegin', navHTML);
                } else {
                    // Insert after logo
                    logo.insertAdjacentHTML('afterend', navHTML);
                }
            }
        }
    }
    
    function setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        if (mobileMenuBtn && nav) {
            // Set initial icon
            mobileMenuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
            
            mobileMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nav.classList.toggle('active');
                mobileMenuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (nav && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                }
            });
            
            // Close menu when clicking a link (mobile only)
            if (window.innerWidth <= 768) {
                nav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', function() {
                        nav.classList.remove('active');
                        mobileMenuBtn.innerHTML = '☰';
                    });
                });
            }
        }
    }
    
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Reset all active states
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Define active page logic
        let activeNavId = 'nav-home'; // Default
        
        // Main pages
        if (currentPage === 'index.html') activeNavId = 'nav-home';
        else if (currentPage === 'all-tools.html') activeNavId = 'nav-all-tools';
        else if (currentPage === 'text-tools.html') activeNavId = 'nav-text-tools';
        else if (currentPage === 'image-tools.html') activeNavId = 'nav-image-tools';
        else if (currentPage === 'calculators.html') activeNavId = 'nav-calculators';
        else if (currentPage === 'converters.html') activeNavId = 'nav-converters';
        else if (currentPage === 'generators.html') activeNavId = 'nav-generators';
        else if (currentPage === 'developer-tools.html') activeNavId = 'nav-developer';
        
        // Tool pages detection
        else if (currentPath.includes('/text/') || 
                 currentPage.includes('word-counter') || 
                 currentPage.includes('character-counter') || 
                 currentPage.includes('text-') || 
                 currentPage.includes('base64') || 
                 currentPage.includes('url-encoder') || 
                 currentPage.includes('lorem-ipsum')) {
            activeNavId = 'nav-text-tools';
        }
        else if (currentPath.includes('/image/') || 
                 currentPage.includes('image-') || 
                 currentPage.includes('jpg-to-png') || 
                 currentPage.includes('pdf-to-image') || 
                 currentPage.includes('youtube-thumbnail')) {
            activeNavId = 'nav-image-tools';
        }
        else if (currentPath.includes('/calculators/') || 
                 currentPage.includes('calculator') || 
                 currentPage.includes('bmi') || 
                 currentPage.includes('age') || 
                 currentPage.includes('tip') || 
                 currentPage.includes('percentage') || 
                 currentPage.includes('tax') || 
                 currentPage.includes('random-number')) {
            activeNavId = 'nav-calculators';
        }
        else if (currentPath.includes('/converters/') || 
                 currentPage.includes('converter') || 
                 currentPage.includes('unit-converter') || 
                 currentPage.includes('currency') || 
                 currentPage.includes('temperature') || 
                 currentPage.includes('color-converter') || 
                 currentPage.includes('pdf-to-word')) {
            activeNavId = 'nav-converters';
        }
        else if (currentPath.includes('/generators/') || 
                 currentPage.includes('password') || 
                 currentPage.includes('qr-code') || 
                 currentPage.includes('barcode') || 
                 currentPage.includes('generator')) {
            activeNavId = 'nav-generators';
        }
        else if (currentPath.includes('/developers/') || 
                 currentPage.includes('json') || 
                 currentPage.includes('css-') || 
                 currentPage.includes('html-') || 
                 currentPage.includes('regex') || 
                 currentPage.includes('http-header')) {
            activeNavId = 'nav-developer';
        }
        
        // Set active class
        const activeLink = document.getElementById(activeNavId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    function closeMenuOnResize() {
        window.addEventListener('resize', function() {
            const nav = document.querySelector('nav');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (nav && mobileBtn && window.innerWidth > 768) {
                nav.classList.remove('active');
                mobileBtn.innerHTML = '☰';
            }
        });
    }
    
    // Make functions available globally if needed
    window.Navigation = {
        reload: loadNavigation,
        setActive: setActiveNavLink
    };
})();
