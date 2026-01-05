import React, { useState, useEffect, useRef } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Hero.css';

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [elementRef, isVisible] = useIntersectionObserver();
  const bgImageRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.heroImageUrl) {
      const img = new Image();
      img.src = profile.heroImageUrl;
      img.onload = () => setBgLoaded(true);
      img.onerror = () => setBgLoaded(false);
    }
  }, [profile?.heroImageUrl]);

  const fetchProfile = async () => {
    try {
      const [profileRes, resumeRes] = await Promise.all([
        axios.get('/profile'),
        axios.get('/resume')
      ]);
      setProfile(profileRes.data);
      setResume(resumeRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = () => {
    if (resume?.resumePdfUrl) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = resume.resumePdfUrl;
      
      // Extract filename from URL or use a default name
      const fileName = resume.resumePdfUrl.split('/').pop() || 'resume.pdf';
      link.download = fileName;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: Track download (for analytics)
      console.log('Resume download initiated:', fileName);
    } else {
      console.error('No resume URL available');
      // Fallback: Open in new tab if download attribute isn't supported
      if (resume?.resumePdfUrl) {
        window.open(resume.resumePdfUrl, '_blank');
      }
    }
  };

  const viewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (loading) return (
    <section id="hero" className="hero loading">
      <div className="loading-spinner"></div>
    </section>
  );

  if (!profile) return null;

  return (
    <section id="hero" className="hero">
      {/* Dynamic Background with Parallax Effect */}
      {profile.heroImageUrl && bgLoaded && (
        <div className="hero-dynamic-background">
          <div 
            ref={bgImageRef}
            className="hero-bg-image"
            style={{ backgroundImage: `url(${profile.heroImageUrl})` }}
          />
          <div className="hero-bg-overlay"></div>
          <div className="hero-bg-gradient"></div>
          <div className="hero-bg-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
                '--duration': `${3 + Math.random() * 4}s`,
                '--size': `${5 + Math.random() * 15}px`,
                opacity: 0.1 + Math.random() * 0.3
              }}></div>
            ))}
          </div>
        </div>
      )}
      
      {/* Fallback gradient background if no hero image */}
      {(!profile.heroImageUrl || !bgLoaded) && (
        <div className="hero-gradient-background">
          <div className="gradient-layer gradient-1"></div>
          <div className="gradient-layer gradient-2"></div>
          <div className="gradient-layer gradient-3"></div>
        </div>
      )}

      <div className="container">
        <div 
          ref={elementRef}
          className={`hero-content fade-in ${isVisible ? 'visible' : ''}`}
        >
          <div className="hero-text">
            {/* Decorative element */}
            <div className="hero-badge">
              <span className="badge-text">MERN Developer</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-greeting">Hello, I'm</span>
              <span className="gradient-text">{profile.fullName || profile.name}</span>
            </h1>
            
            <h2 className="hero-subtitle">
              <span className="typing-text">{profile.professionalTitle || profile.title}</span>
            </h2>
            
            <p className="hero-tagline">
              <span className="tagline-highlight">{profile.tagline}</span>
            </p>
            
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-glow"
                onClick={viewProjects}
              >
                <span className="btn-text">Explore Projects</span>
                <span className="btn-icon">→</span>
              </button>
              
              {resume?.resumePdfUrl && (
                <button 
                  className="btn btn-secondary btn-outline"
                  onClick={downloadResume}
                >
                  <span className="btn-text">Download Resume</span>
                  <span className="btn-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </span>
                </button>
              )}
            </div>

            {/* Optional: View Resume in new tab */}
            {resume?.resumePdfUrl && (
              <div className="resume-options">
                <button 
                  className="resume-view-link"
                  onClick={() => window.open(resume.resumePdfUrl, '_blank')}
                >
                  <span>View Resume Online</span>
                  <span className="link-icon">↗</span>
                </button>
              </div>
            )}

            {/* Social proof badges */}
            <div className="hero-badges">
              <div className="badge">
                <span className="badge-number">50+</span>
                <span className="badge-label">Projects</span>
              </div>
              <div className="badge">
                <span className="badge-number">100%</span>
                <span className="badge-label">Satisfaction</span>
              </div>
              <div className="badge">
                <span className="badge-number">24/7</span>
                <span className="badge-label">Available</span>
              </div>
            </div>
          </div>
          
          {/* Profile image with futuristic effects */}
          {profile.profileImageUrl && (
            <div className="hero-image">
              <div className="image-container">
                <div className="image-frame">
                  <img 
                    src={profile.profileImageUrl} 
                    alt={profile.fullName || profile.name}
                    loading="lazy"
                    className="profile-image"
                  />
                </div>
                <div className="image-glow-effect"></div>
                <div className="image-orbits">
                  <div className="orbit orbit-1"></div>
                  <div className="orbit orbit-2"></div>
                  <div className="orbit orbit-3"></div>
                </div>
                <div className="image-tech-dots">
                  {['React', 'Node', 'MongoDb', 'Express'].map((tech, i) => (
                    <div key={tech} className="tech-dot" style={{
                      '--angle': `${i * 90}deg`,
                      '--delay': `${i * 0.2}s`
                    }}>
                      <span className="dot-text">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Animated tech stack scroll */}
        <div className="tech-scroll">
          <div className="tech-scroll-track">
            <div className="tech-list">
              {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Next.js', 
                'GraphQL', 'AWS', 'Docker', 'Redux', 'Tailwind', 'Sass'].map((tech) => (
                <div key={tech} className="tech-item">
                  <span className="tech-icon">⚡</span>
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Next.js', 
                'GraphQL', 'AWS', 'Docker', 'Redux', 'Tailwind', 'Sass'].map((tech, i) => (
                <div key={`${tech}-${i}`} className="tech-item">
                  <span className="tech-icon">⚡</span>
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-down">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
