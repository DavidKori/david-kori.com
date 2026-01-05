import React, { useState, useEffect, useRef } from 'react';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ sections = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero'); // Default to hero
  const observerRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer with better configuration
    observerRef.current = new IntersectionObserver(
      (entries) => {
        let currentActive = '';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all intersecting sections and find the one with highest intersection ratio
            if (entry.intersectionRatio > 0.5) {
              currentActive = entry.target.id;
            }
          }
        });

        // Update active section if found
        if (currentActive) {
          setActiveSection(currentActive);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -80% 0px', // Adjusted margins for better detection
        threshold: [0.1, 0.5, 0.8]
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  // Also update active section on scroll for better accuracy
  useEffect(() => {
    const handleScroll = () => {
      // Fallback scroll detection if IntersectionObserver fails
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    // Add scroll listener as fallback
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Temporarily set active section
      setActiveSection(id);
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
      
      // Small delay to prevent flicker
      setTimeout(() => {
        setActiveSection(id);
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div 
          className="navbar-logo" 
          onClick={() => scrollToSection('hero')}
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-text">DK</span>
          <span className="logo-name">David Kori</span>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

