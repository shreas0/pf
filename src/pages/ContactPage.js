import SectionTitle from '../components/SectionTitle';
import { contactLinks } from '../data/portfolioData';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const getIcon = (label) => {
  switch(label.toLowerCase()) {
    case 'email': return <MailIcon />;
    case 'github': return <GithubIcon />;
    case 'linkedin': return <LinkedinIcon />;
    default: return null;
  }
};

function ContactPage() {
  return (
    <section className="contact-layout">
      <div className="card-elevated contact-card">
        <SectionTitle
          eyebrow="Contact"
          title="Let us connect"
          subtitle="Open to collaboration, project discussions, and internships in software or AI/ML domains."
        />
        <ul className="contact-list">
          {contactLinks.map((item) => (
            <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                {getIcon(item.label)}
              </div>
              <span style={{ fontWeight: '500' }}>{item.label}:</span>
              <a href={item.href} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto' }}>
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-elevated note-card">
        <h3>Quick Note</h3>
        <p>
          I am actively seeking internship opportunities in web development and AI/ML. If you have any leads or would like to discuss potential collaborations, please feel free to reach out through the contact information provided above. I am eager to contribute my skills and learn from real-world projects in these domains.
        </p>
      </div>
    </section>
  );
}

export default ContactPage;
