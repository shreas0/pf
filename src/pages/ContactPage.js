import SectionTitle from '../components/SectionTitle';
import { contactLinks } from '../data/portfolioData';

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
            <li key={item.label}>
              <span>{item.label}</span>
              <a href={item.href} target="_blank" rel="noreferrer">
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
