import { Card } from '../components/Common'
import './pages.css'

export const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project Name 1',
      description: 'A brief description of your project and what technologies you used.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
    },
    {
      id: 2,
      title: 'Project Name 2',
      description: 'A brief description of your project and what technologies you used.',
      tags: ['React', 'Firebase', 'TailwindCSS'],
      link: '#',
    },
    {
      id: 3,
      title: 'Project Name 3',
      description: 'A brief description of your project and what technologies you used.',
      tags: ['Vue.js', 'Django', 'PostgreSQL'],
      link: '#',
    },
  ]

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section__title">My Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <Card key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.link} className="project__link">
                View Project →
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
