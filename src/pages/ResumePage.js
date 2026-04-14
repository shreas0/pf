import SectionTitle from '../components/SectionTitle';
import resumeImage from '../assets/myself3.png';
import certificateFive from '../assets/cerc-5.png';
import { profile } from '../data/portfolioData';
import resumeDoc from '../data/Shreshtha_Sharma_Resume.pdf';

const education = [
  {
    level: 'BCA - Data Science + Artificial Intelligence',
    institute: 'Shri Ramswaroop Memorial University',
    note: 'Focused on core CS concepts while actively exploring AI/ML practical use cases.'
  },
  {
    level: 'Schooling',
    institute: 'Sky Public School, Lucknow',
    note: 'Built a strong foundation in logical reasoning and analytical thinking.'
  }
];

const focusAreas = [
  'Data Science & Artificial Intelligence',
  'Frontend Development with React.js',
  'Data Analysis & Visualization',
  'Full-Stack Web Application Development'
];

function ResumePage() {
  return (
    <section className="resume-layout">
      <div className="card-elevated resume-main">
        <SectionTitle
          eyebrow="Resume"
          title="Profile Snapshot"
          subtitle="A concise overview of education, focus areas, and current direction."
        />
        <h2>{profile.name}</h2>
        <p className="resume-role">{profile.title}</p>

        <div className="resume-block">
          <h3>Education</h3>
          {education.map((item) => (
            <article key={item.level} className="resume-item">
              <h4>{item.level}</h4>
              <p className="resume-institute">{item.institute}</p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>

        <div className="resume-block">
          <h3>Core Focus</h3>
          <ul className="focus-list">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="resume-block">
          <h3>Certifications</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <img src={process.env.PUBLIC_URL + "/cerc-1.jpg"} alt="Certification 1" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }} />
            <img src={process.env.PUBLIC_URL + "/cerc-2.jpg"} alt="Certification 2" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }} />
            <img src={process.env.PUBLIC_URL + "/cer3.jpg"} alt="Certification 3" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }} />
            <img src={process.env.PUBLIC_URL + "/cerc-4.jpg"} alt="Certification 4" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }} />
            <img src={certificateFive} alt="Certification 5" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }} />
          </div>
        </div>
      </div>

      <aside className="card-elevated resume-side">
        <figure className="resume-shot-wrap">
          <img src={resumeImage} alt={`${profile.name} resume portrait`} className="resume-shot" />
        </figure>
        <p className="chip">Download</p>
        <h3>Need a Document version?</h3>
        <p>
          Download locally to view detailed resume.
        </p>
        <a className="btn btn-primary" href={resumeDoc} download="Shreshtha_Sharma_Resume.pdf">
          Download Resume
        </a>
      </aside>
    </section>
  );
}

export default ResumePage;
