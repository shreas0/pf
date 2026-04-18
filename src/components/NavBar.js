import { NavLink } from 'react-router-dom';
import { navLinks, profile } from '../data/portfolioData';
import { useRef, useState } from 'react';

function NavBar() {
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, width: 0, height: 0, transform: 'translate(0px, 0px)' });
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark
  const navRef = useRef(null);

  const LightMode = () => {
    const root = document.documentElement;
    root.style.setProperty('--bg-deep', '#f4f1eb');
    root.style.setProperty('--bg-surface', '#eae7e0');
    root.style.setProperty('--bg-elevated', '#e0ded7');
    root.style.setProperty('--bg-card', 'rgba(234, 231, 224, 0.6)');
    root.style.setProperty('--ink', '#1a1816');
    root.style.setProperty('--ink-dim', '#5a5650');
    root.style.setProperty('--muted', '#8a8580');
    root.style.setProperty('--rule', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--rule-strong', 'rgba(0, 0, 0, 0.14)');
    root.style.setProperty('--accent', '#9a7b3c');
    root.style.setProperty('--accent-glow', 'rgba(154, 123, 60, 0.12)');
    root.style.setProperty('--accent-warm', '#b08e48');
    root.style.setProperty('--accent-dim', 'rgba(154, 123, 60, 0.06)');
    root.style.setProperty('--glass-bg', 'rgba(244, 241, 235, 0.7)');
    root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.06)');

    document.body.style.backgroundColor = '#f4f1eb';
    setIsDarkMode(false);
  };

  const DarkMode = () => {
    const root = document.documentElement;
    root.style.setProperty('--bg-deep', '#0c0e12');
    root.style.setProperty('--bg-surface', '#13161c');
    root.style.setProperty('--bg-elevated', '#1a1e26');
    root.style.setProperty('--bg-card', 'rgba(26, 30, 38, 0.6)');
    root.style.setProperty('--ink', '#e8e4dc');
    root.style.setProperty('--ink-dim', '#a09a90');
    root.style.setProperty('--muted', '#6e6960');
    root.style.setProperty('--rule', 'rgba(255, 255, 255, 0.07)');
    root.style.setProperty('--rule-strong', 'rgba(255, 255, 255, 0.12)');
    root.style.setProperty('--accent', '#c8a55c');
    root.style.setProperty('--accent-glow', 'rgba(200, 165, 92, 0.15)');
    root.style.setProperty('--accent-warm', '#d4b068');
    root.style.setProperty('--accent-dim', 'rgba(200, 165, 92, 0.06)');
    root.style.setProperty('--glass-bg', 'rgba(19, 22, 28, 0.65)');
    root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.06)');

    document.body.style.backgroundColor = '#0c0e12';
    setIsDarkMode(true);
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
        className="theme-toggle"
        style={{
          background: 'transparent',
          border: '1px solid var(--rule-strong)',
          borderRadius: '6px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--muted)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'var(--accent)';
          e.target.style.color = 'var(--bg-deep)';
          e.target.style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = 'var(--muted)';
          e.target.style.borderColor = 'var(--rule-strong)';
        }}
        aria-label="Toggle Theme"
      >
        {isDarkMode ? '☀ Light' : '☾ Dark'}
      </button>
    </header>
  );
}

export default NavBar;
