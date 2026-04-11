import { useState, useEffect } from "react";
import axios from "../../services/axios";
import "./Alert.css"; // We'll create this CSS file

const Alert = () => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlert();
  }, []);

  const fetchAlert = async () => {
    try {
      const response = await axios.get('/alerts');
      // Since only ONE alert exists in the database, response.data is a single object, not an array
      if (response.status === 200 && response.data) {
        // Check if response.data has the alert properties
        if (response.data.alertType || response.data.alertMessage) {
          setAlert(response.data);
        } else {
          setAlert(null);
        }
      } else {
        setAlert(null);
      }
    } catch (error) {
      console.error('Failed to load alert:', error);
      setAlert(null);
    } finally {
      setLoading(false);
    }
  };

  // If still loading, show nothing
  if (loading) return null;
  
  // If no alert or alert is not published, don't show anything
  if (!alert || !alert.publishAlert) return null;

  // Get icon based on alert type
  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return (
          <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4M12 17h.01"/>
            <path d="M12 2L2 20h20L12 2z"/>
          </svg>
        );
      case 'success':
        return (
          <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      default: // info
        return (
          <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
    }
  };

  // Get CSS class names based on alert type
  const getAlertClass = (type) => {
    switch (type) {
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'success':
        return 'alert-success';
      default:
        return 'alert-info';
    }
  };

  // Get title text based on alert type
  const getAlertTitle = (type) => {
    switch (type) {
      case 'error':
        return 'Critical Issue';
      case 'warning':
        return 'Warning';
      case 'success':
        return 'Success';
      default:
        return 'Information';
    }
  };

  const alertClass = getAlertClass(alert.alertType);
  const alertIcon = getAlertIcon(alert.alertType);
  const alertTitle = getAlertTitle(alert.alertType);

  return (
    <section className="alert" id="alert">
      <div className={`alert-container ${alertClass}`}>
        <div className="alert-wrapper">
          <div className="alert-icon-wrapper">
            {alertIcon}
          </div>
          <div className="alert-content">
            <div className="alert-header">
              <h4 className="alert-title">{alertTitle}</h4>
              <span className="alert-badge">LIVE</span>
            </div>
            <p className="alert-message">{alert.alertMessage}</p>
          </div>
          <button 
            className="alert-close"
            onClick={() => setAlert(null)}
            aria-label="Close alert"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Alert;