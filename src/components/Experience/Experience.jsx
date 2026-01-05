import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FiBriefcase } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experience:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Work Experience</h2>
        <p className="section-subtitle">
          Professional journey and contributions
        </p>
        
        <div 
          ref={elementRef}
          className={`experience-timeline fade-in ${isVisible ? 'visible' : ''}`}
        >
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <FiBriefcase />
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <div className="timeline-meta">
                    <span className="company">{exp.company}</span>
                    <span className="period">{exp.period}</span>
                  </div>
                </div>
                
                <div className="timeline-description">
                  <p>{exp.description}</p>
                  
                  {exp.technologies && (
                    <div className="timeline-tech">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;