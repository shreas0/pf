import { NavLink } from 'react-router-dom';
import { navLinks, profile } from '../data/portfolioData';
import { useRef, useState } from 'react';

function NavBar() {
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, width: 0, height: 0, transform: 'translate(0px, 0px)' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRef = useRef(null);

  const DarkMode = () => {
    const root = document.documentElement;
    root.style.setProperty('--bg', '#0f172a');
    root.style.setProperty('--ink', '#f8fafc');
    root.style.setProperty('--muted', '#cbd5e1');
    root.style.setProperty('--card', 'rgba(30, 41, 59, 0.78)');
    root.style.setProperty('--card-strong', '#1e293b');
    root.style.setProperty('--line', 'rgba(148, 163, 184, 0.15)');
    
    
    document.body.style.backgroundColor = '#0f172a';
    
    
    const grid = document.querySelector('.backdrop-grid');
    if (grid) {
      grid.style.backgroundImage = 'linear-gradient(rgba(248, 250, 252, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 250, 252, 0.05) 1px, transparent 1px)';
    }
    const glow = document.querySelector('.backdrop-glow');
    if (glow) {
      glow.style.background = 'radial-gradient(circle at 8% 12%, rgba(14, 165, 233, 0.15), transparent 32%), radial-gradient(circle at 89% 10%, rgba(34, 197, 94, 0.1), transparent 26%), radial-gradient(circle at 82% 86%, rgba(56, 189, 248, 0.1), transparent 30%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)';
    }

    setIsDarkMode(true);
  };

  const LightMode = () => {
    const root = document.documentElement;
    root.style.setProperty('--bg', '#f4f8ff');
    root.style.setProperty('--ink', '#0f172a');
    root.style.setProperty('--muted', '#475569');
    root.style.setProperty('--card', 'rgba(255, 255, 255, 0.78)');
    root.style.setProperty('--card-strong', '#ffffff');
    root.style.setProperty('--line', 'rgba(148, 163, 184, 0.28)');
    
    document.body.style.backgroundColor = '#f4f8ff';
    
    const grid = document.querySelector('.backdrop-grid');
    if (grid) {
      grid.style.backgroundImage = 'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)';
    }
    const glow = document.querySelector('.backdrop-glow');
    if (glow) {
      glow.style.background = 'radial-gradient(circle at 8% 12%, rgba(14, 165, 233, 0.24), transparent 32%), radial-gradient(circle at 89% 10%, rgba(34, 197, 94, 0.2), transparent 26%), radial-gradient(circle at 82% 86%, rgba(56, 189, 248, 0.18), transparent 30%), linear-gradient(180deg, #f8fbff 0%, #ecf5ff 100%)';
    }

    setIsDarkMode(false);
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      LightMode();
    } else {
      DarkMode();
    }
  };

  const handleMouseEnter = (e) => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.target.getBoundingClientRect();

    setHoverStyle({
      opacity: 1,
      width: linkRect.width,
      height: linkRect.height,
      transform: `translate(${linkRect.left - navRect.left}px, ${linkRect.top - navRect.top}px)`,
    });
  };

  const handleMouseLeave = () => {
    setHoverStyle(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <header className="site-header">
      <NavLink to="/" className="brand-mark">
        <span className="brand-dot" aria-hidden="true" />
        {profile.name}
      </NavLink>
      <nav aria-label="Main navigation" ref={navRef} onMouseLeave={handleMouseLeave} style={{ position: 'relative' }}>
        <div 
          className="nav-liquid-selector" 
          style={{
            ...hoverStyle,
          }}
        />
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onMouseEnter={handleMouseEnter}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' nav-link-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button 
        onClick={toggleTheme} 
        style={{
          background: 'transparent',
          border: '1px solid var(--line)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--ink)',
          fontSize: '1.1rem',
          transition: 'all 0.3s ease'
        }}
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default NavBar;
