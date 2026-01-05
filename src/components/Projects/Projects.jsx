import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <p className="section-subtitle">
          Real-world applications built with modern technologies
        </p>
        
        <div 
          ref={elementRef}
          className={`projects-grid fade-in ${isVisible ? 'visible' : ''}`}
        >
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-media">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    poster={project.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-placeholder">
                    <div className="placeholder-content">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="project-link live"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
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

export default Projects;