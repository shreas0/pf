import { useEffect, useRef, useState } from 'react';

function SkillGroup({ category, items }) {
  const [isVisible, setIsVisible] = useState(false);
  const groupRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (groupRef.current) {
      observer.observe(groupRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article ref={groupRef} className="skill-group card-elevated">
      <h2>{category}</h2>
      <div className="skill-items">
        {items.map((item, index) => (
          <div key={item.name} className="skill-item">
            <div className="skill-meta">
              <h3>{item.name}</h3>
              <span>{item.level}%</span>
            </div>
            <div className="skill-track" role="presentation">
              <div
                className="skill-fill"
                style={{ 
                  width: isVisible ? `${item.level}%` : '0%',
                  transition: `width 2.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + index * 0.2}s`
                }}
                aria-hidden="true"
              />
            </div>
            <p>{item.summary}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default SkillGroup;
