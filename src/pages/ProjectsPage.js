import SectionTitle from '../components/SectionTitle';
import { projects } from '../data/portfolioData';

function ProjectsPage() {
  return (
    <section>
      <SectionTitle
        eyebrow="My Work"
        title="Featured Projects"
        subtitle="A collection of web applications highlighting my backend logic, API integration, and frontend experiences."
      />
      <div className="projects-grid" style={{ display: 'grid', gap: '2rem' }}>
        {projects.map((project, index) => (
          <article 
            key={index} 
            className="card-elevated project-card" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div 
              className="project-video-wrapper" 
              style={{
                width: '100%', 
                aspectRatio: '16 / 9', 
                background: 'var(--line)', 
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden'
              }}
            >
              {}
              <video 
                src={project.videoUrl} 
                controls 
                muted 
                loop 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="project-content">
              <h3>{project.name}</h3>
              <p className="chip" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>{project.stack}</p>
              <p>{project.description}</p>
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary" 
                style={{ marginTop: '1rem', display: 'inline-block', marginRight: '0.5rem' }}
              >
                Live Demo
              </a>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary" 
                  style={{ marginTop: '1rem', display: 'inline-block' }}
                >
                  GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;