import './pages.css'

export const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'JavaScript', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'AWS', 'GitHub', 'VS Code', 'Figma'],
    },
  ]

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <div className="skills__grid">
          {skillCategories.map((category) => (
            <div key={category.category} className="skill__category">
              <h3>{category.category}</h3>
              <div className="skill__list">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill__item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
