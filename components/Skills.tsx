const skillGroups = [
  {
    label: 'Languages',
    skills: ['Python', 'JavaScript', 'PHP', 'Java', 'C#', 'C++', 'SQL'],
  },
  {
    label: 'Web',
    skills: ['HTML', 'CSS', 'React', 'Node.js'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Docker', 'Linux', 'VS Code', 'Unity', 'Unreal Engine'],
  },
  {
    label: 'Other',
    skills: ['AI/ML', 'Cybersecurity', 'Database design', 'Game Dev'],
  },
]

export default function Skills() {
  return (
    <section className="pb-20">
      <h2
        className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em] mb-8"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        — Skills
      </h2>
      <div className="space-y-5">
        {skillGroups.map((group) => (
          <div key={group.label} className="flex flex-wrap items-start gap-x-4 gap-y-3">
            <span
              className="text-[0.75rem] text-[#888] pt-0.5 shrink-0"
              style={{ fontFamily: 'var(--font-dm-mono)', minWidth: '4rem' }}
            >
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[0.75rem] text-[#f5f5f5] border border-[#222] px-3 py-1 transition-colors duration-150 ease-in hover:border-[#555] cursor-default"
                  style={{ fontFamily: 'var(--font-dm-mono)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
