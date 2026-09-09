import SectionTitle from '../components/SectionTitle';
import { projects } from '../data/portfolioData';


function ProjectsPage() {
  return (
    <section>
      <SectionTitle
        eyebrow="My Work"
        title="Featured *Projects*"
        subtitle="A collection of web applications highlighting my backend logic, API integration, and frontend experiences."
      />
      <div className="projects-grid" style={{ display: 'grid', gap: '2rem' }}>
        {projects.map((project, index) => {
          const videoWidth = project.videoWidth || (project.name === "Face Unlock" ? 608 : null);
          const videoHeight = project.videoHeight || (project.name === "Face Unlock" ? 1080 : null);
          const aspectRatio = videoWidth && videoHeight ? `${videoWidth} / ${videoHeight}` : '16 / 9';

          return (
            <article
              key={index}
              className="card-elevated project-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                className="project-video-wrapper"
                style={{
                  width: videoWidth ? `min(${videoWidth}px, 100%)` : '100%',
                  maxWidth: videoWidth ? `${videoWidth}px` : '100%',
                  aspectRatio: aspectRatio,
                  background: 'var(--bg-elevated)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--rule-strong)'
                }}
              >
                <video
                  src={project.videoUrl}
                  controls
                  muted
                  loop
                  width={videoWidth || undefined}
                  height={videoHeight || undefined}
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
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                {project.name === "Face Unlock" ? "Project Link" : "Live Demo"}
              </a>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsPage;