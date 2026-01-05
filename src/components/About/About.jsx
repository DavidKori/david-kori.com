import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('/about');
      setAboutData(response.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  if (!aboutData) return null;

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div 
          ref={elementRef}
          className={`about-content fade-in ${isVisible ? 'visible' : ''}`}
        >
          <div className="about-text">
            <p className="about-summary">{aboutData.bio}</p>
            
            {aboutData.highlights && aboutData.highlights.length > 0 && (
              <div className="about-highlights">
                <h3>Key Strengths</h3>
                <ul className="highlight-list">
                  {aboutData.highlights.map((highlight, index) => (
                    <li key={index} className="highlight-item">
                      <span className="highlight-icon">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/*i will add this later if needed*/}
          {aboutData.stats && (
            <div className="about-stats">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <h3>My Goal</h3>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;