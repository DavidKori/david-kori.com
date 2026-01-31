import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get('/contact');
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending...' });

    try {
      const sendToUser = await axios.post("/messages",formData)
    
      // Replace with your Formspree endpoint
      const response = await fetch('https://formspree.io/f/xdkddonq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok || sendToUser) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
              setStatus({ type: '', message: '' });
        },3000)
      };
       if (!response.ok && !sendToUser) {
        setFormData({ name: '', email: '', message: '' });
        throw new Error('Failed to send message');
        
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
              setStatus({ type: '', message: '' });
      },3000)
    }
  };

  if (loading) return null;
  if (!contactInfo) return null;

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">
          Let's discuss opportunities or collaborate on projects
        </p>
        
        <div 
          ref={elementRef}
          className={`contact-content fade-in ${isVisible ? 'visible' : ''}`}
        >
          <div className="contact-info">
            <h3>Contact Information</h3>
            
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h4>Email</h4>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${contactInfo.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              {contactInfo.phone && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <FiPhone />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                  </div>
                </div>
              )}
              
              {contactInfo.location && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <FiMapPin />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <span>{contactInfo.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="contact-form-container">
            <h3>Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Your message here..."
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
              
              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;