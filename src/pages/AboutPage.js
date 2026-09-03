import SectionTitle from '../components/SectionTitle';
import aboutImage from '../assets/myself2.jpg';
import { profile } from '../data/portfolioData';

function AboutPage() {
  return (
    <section className="about-layout">
      <div className="card-elevated identity-card">
        <figure className="profile-thumb-wrap">
          <img src={aboutImage} alt={`${profile.name} profile`} className="profile-thumb" />
        </figure>
        <p className="chip">Nickname</p>
        <h2>{profile.nickname}</h2>
        <p>{profile.location}</p>
        <ul className="hobby-list">
          {profile.hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>

      <div className="card-elevated about-card">
        <SectionTitle
          eyebrow="About Me"
          title="The *story* behind the code."
          subtitle="A deeper dive into my background, interests, and what drives me in the tech world."
        />
        <div className="about-paragraphs">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
