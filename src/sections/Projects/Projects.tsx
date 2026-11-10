import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { PROJECTS } from '@/constants';
import { useTranslation } from '@/hooks';

import { ComingSoonCard } from './ComingSoonCard';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.scss';

const FEATURED = PROJECTS.filter((project) => project.featured);
const OTHERS = PROJECTS.filter((project) => !project.featured);
const STAGGER = 0.12;

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <SectionHeading
        id="projects-title"
        kicker={t.projects.kicker}
        title={t.projects.title}
        description={t.projects.description}
      />

      <ul className={styles.featured}>
        {FEATURED.map((project) => (
          <Reveal
            key={project.id}
            as="li"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>

      <ul className={styles.grid}>
        {OTHERS.map((project, index) => (
          <Reveal
            key={project.id}
            as="li"
            delay={index * STAGGER}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
        <Reveal
          as="li"
          delay={OTHERS.length * STAGGER}
        >
          <ComingSoonCard />
        </Reveal>
      </ul>
    </section>
  );
};
