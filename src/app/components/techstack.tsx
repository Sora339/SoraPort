import { Card } from "@/components/ui/card"

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "shadcn/ui"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "PHP", "PostgreSQL", "MySQL"],
  },
  {
    category: "Design & Movies",
    skills: ["Affinity Designer", "Adobe Premiere Pro", "Adobe After Effects", "Blender", "DaVinci Resolve"],
  },
  {
    category: "Tools",
    skills: ["VS Code", "Figma", "Git",],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-6">
          <h3 className="text-xl font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/70 text-white px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/90"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}