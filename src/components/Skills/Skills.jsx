import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FiStar, FiCode, FiDatabase, FiTool, FiBox, FiTrendingUp } from 'react-icons/fi';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/skills');
      
      // Validate response is an array
      if (Array.isArray(response.data)) {
        setSkills(response.data);
      } else {
        console.warn('Skills API returned non-array data:', response.data);
        setSkills([]);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills. Please try again later.');
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend':
        return <FiCode className="category-icon" />;
      case 'Backend':
        return <FiTrendingUp className="category-icon" />;
      case 'Database':
        return <FiDatabase className="category-icon" />;
      case 'Tools':
        return <FiTool className="category-icon" />;
      case 'Other':
        return <FiBox className="category-icon" />;
      default:
        return <FiCode className="category-icon" />;
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Frontend':
        return '#3b82f6'; // Blue
      case 'Backend':
        return '#10b981'; // Green
      case 'Database':
        return '#8b5cf6'; // Purple
      case 'Tools':
        return '#f59e0b'; // Amber
      case 'Other':
        return '#6b7280'; // Gray
      default:
        return '#3b82f6';
    }
  };

  // Get level stars
  const getLevelStars = (level) => {
    switch (level) {
      case 'Beginner':
        return (
          <div className="skill-level">
            <FiStar className="star filled" />
            <FiStar className="star" />
            <FiStar className="star" />
            <FiStar className="star" />
            <FiStar className="star" />
            <span className="level-text">Beginner</span>
          </div>
        );
      case 'Intermediate':
        return (
          <div className="skill-level">
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star" />
            <FiStar className="star" />
            <span className="level-text">Intermediate</span>
          </div>
        );
      case 'Advanced':
        return (
          <div className="skill-level">
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star" />
            <span className="level-text">Advanced</span>
          </div>
        );
      case 'Expert':
        return (
          <div className="skill-level">
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <FiStar className="star filled" />
            <span className="level-text">Expert</span>
          </div>
        );
      default:
        return (
          <div className="skill-level">
            <FiStar className="star" />
            <FiStar className="star" />
            <FiStar className="star" />
            <FiStar className="star" />
            <FiStar className="star" />
            <span className="level-text">Learning</span>
          </div>
        );
    }
  };

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Sort skills within each category by level
  const sortSkillsByLevel = (skillsArray) => {
    const levelOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
    return [...skillsArray].sort((a, b) => {
      const levelA = levelOrder[a.level] || 0;
      const levelB = levelOrder[b.level] || 0;
      return levelB - levelA; // Higher level first
    });
  };

  // Loading state
  if (loading) {
    return (
      <section id="skills" className="skills">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-loading">
            <div className="loading-spinner"></div>
            <p>Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="skills" className="skills">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-error">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <button onClick={fetchSkills} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state - don't render section if no skills
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="skills-header">
          <h2>Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with - showing proficiency levels
          </p>
          
          {/* Skills Stats */}
          <div className="skills-stats">
            <div className="stat-card">
              <div className="stat-number">{skills.length}</div>
              <div className="stat-label">Total Skills</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(groupedSkills).length}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {skills.filter(s => s.level === 'Expert' || s.level === 'Advanced').length}
              </div>
              <div className="stat-label">Advanced+</div>
            </div>
          </div>
        </div>

        <div 
          ref={elementRef}
          className={`skills-content fade-in ${isVisible ? 'visible' : ''}`}
        >
          {/* Skills by Category */}
          <div className="skills-by-category">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="category-section">
                <div className="category-header">
                  <div 
                    className="category-icon-wrapper"
                    style={{ backgroundColor: `${getCategoryColor(category)}20` }}
                  >
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="category-title">{category}</h3>
                  <span className="category-count">{categorySkills.length} skills</span>
                </div>
                
                <div className="skills-grid">
                  {sortSkillsByLevel(categorySkills).map((skill) => (
                    <div 
                      key={skill._id || skill.id} 
                      className="skill-card"
                      style={{ borderLeftColor: getCategoryColor(category) }}
                    >
                      <div className="skill-header">
                        {skill.iconUrl ? (
                          <div className="skill-icon">
                            <img 
                              src={skill.iconUrl} 
                              alt={skill.name}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = skill.name.charAt(0);
                              }}
                            />
                          </div>
                        ) : (
                          <div 
                            className="skill-icon fallback"
                            style={{ backgroundColor: `${getCategoryColor(category)}20` }}
                          >
                            {skill.name.charAt(0)}
                          </div>
                        )}
                        
                        <div className="skill-info">
                          <h4 className="skill-name">{skill.name}</h4>
                          {skill.level && getLevelStars(skill.level)}
                        </div>
                      </div>
                      
                      <div className="skill-meta">
                        {skill.level && (
                          <span 
                            className="skill-level-badge"
                            style={{ backgroundColor: getCategoryColor(category) }}
                          >
                            {skill.level}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* All Skills Grid View */}
          <div className="all-skills-section">
            <h3 className="section-title">All Skills at a Glance</h3>
            <div className="all-skills-grid">
              {skills.map((skill) => (
                <div 
                  key={skill._id || skill.id} 
                  className="skill-pill"
                  style={{ 
                    backgroundColor: `${getCategoryColor(skill.category)}15`,
                    borderColor: getCategoryColor(skill.category)
                  }}
                >
                  {skill.iconUrl ? (
                    <img 
                      src={skill.iconUrl} 
                      alt={skill.name}
                      className="pill-icon"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="pill-name">{skill.name}</span>
                  <span 
                    className="pill-level"
                    style={{ color: getCategoryColor(skill.category) }}
                  >
                    {skill.level || 'Learning'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

