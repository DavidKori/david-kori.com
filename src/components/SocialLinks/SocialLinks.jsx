import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiGlobe } from 'react-icons/fi';
import './SocialLinks.css';

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await axios.get('/social');
      setSocialLinks(response.data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  if (!socialLinks || socialLinks.length === 0) return null;

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <FiGithub />;
      case 'linkedin': return <FiLinkedin />;
      case 'twitter': return <FiTwitter />;
      case 'instagram': return <FiInstagram />;
      default: return <FiGlobe />;
    }
  };

  return (
    <section id="social" className="social">
      <div className="container">
        <h2>Connect With Me</h2>
        <p className="section-subtitle">
          Let's stay connected on professional networks
        </p>
        
        <div 
          ref={elementRef}
          className={`social-links fade-in ${isVisible ? 'visible' : ''}`}
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              title={link.platform}
            >
              <div className="social-icon">
                {link.iconUrl ? (
                  <img src={link.iconUrl} alt={link.platform} />
                ) : (
                  getIcon(link.platform)
                )}
              </div>
              <span className="social-platform">{link.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;