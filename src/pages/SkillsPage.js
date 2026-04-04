import SectionTitle from '../components/SectionTitle';
import SkillGroup from '../components/SkillGroup';
import { skillGroups } from '../data/portfolioData';

function SkillsPage() {
  return (
    <section>
      <SectionTitle
        eyebrow="Capabilities"
        title="My Skills"
        subtitle="A structured overview of technical and creative strengths with practical confidence levels."
      />
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <SkillGroup key={group.category} category={group.category} items={group.items} />
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
