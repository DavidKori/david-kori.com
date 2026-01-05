import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FiAward } from 'react-icons/fi';
import './Education.css';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await axios.get('/education');
      setEducation(response.data);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="education">
      <div className="container">
        <h2>Education</h2>
        <p className="section-subtitle">
          Academic background and qualifications
        </p>
        
        <div 
          ref={elementRef}
          className={`education-grid fade-in ${isVisible ? 'visible' : ''}`}
        >
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-icon">
                <FiAward />
              </div>
              
              <div className="education-content">
                <h3>{edu.degree}</h3>
                <div className="education-meta">
                  <span className="institution">{edu.institution}</span>
                  <span className="period">{edu.period}</span>
                </div>
                
                <p className="education-description">{edu.description}</p>
                
                {edu.certificateUrl && (
                  <a
                    href={edu.certificateUrl}
                    className="certificate-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;