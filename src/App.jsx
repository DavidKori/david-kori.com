import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import SocialLinks from './components/SocialLinks/SocialLinks';
import './styles/globals.css';
import './App.css'

const App = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Define available sections (these would be determined by available data)
    const availableSections = [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'education', label: 'Education' },
      { id: 'contact', label: 'Contact' },
    ];
    
    setSections(availableSections);
  }, []);

  return (
    <div className="app">
      <Navbar sections={sections} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <SocialLinks />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} David Kori. All rights reserved.</p>
          <p>Built with React & modern CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;