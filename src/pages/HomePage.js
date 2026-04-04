import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import heroImage from '../assets/myself.png';
import { profile, projects } from '../data/portfolioData';

function HomePage() {
  return (
    <section className="hero-stack">
      <div className="card-elevated hero-card">
        <div className="hero-lead">
          <figure className="portrait-frame">
            <img src={heroImage} alt={`${profile.name} portrait`} className="portrait-image" />
          </figure>
          <div>
            <SectionTitle
              eyebrow="Portfolio"
              title={profile.name}
              subtitle={profile.title}
            />
            <p className="hero-copy">{profile.tagline}</p>
            <div className="hero-actions">
              <Link to="/about" className="btn btn-primary">
                Explore About
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="highlights-grid">
        {projects.map((project) => (
          <article key={project.name} className="card-elevated project-card">
            <p className="chip">{project.stack}</p>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
