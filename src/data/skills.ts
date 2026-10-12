// Namen der Technologien werden nicht übersetzt; die Gruppentitel stehen in messages/*.json unter "skills.groups".
// `learning: true` = im Jobs-Board eingesetzt, aber noch im Lernprozess (wird gestrichelt dargestellt).
// Sobald du etwas sicher beherrschst, entferne einfach `learning: true`.
export type Skill = { name: string; learning?: boolean }
export type SkillGroup = {
	id: 'frontend' | 'backend' | 'integrations' | 'tools'
	items: Skill[]
}

export const skillGroups: SkillGroup[] = [
	{
		id: 'frontend',
		items: [
			{ name: 'HTML' },
			{ name: 'CSS' },
			{ name: 'JavaScript' },
			{ name: 'React' },
			{ name: 'MobX' },
			{ name: 'TypeScript', learning: true },
			{ name: 'Next.js', learning: true },
			{ name: 'Tailwind CSS', learning: true },
			{ name: 'shadcn/ui', learning: true },
			{ name: 'React Hook Form', learning: true },
		],
	},
	{
		id: 'backend',
		items: [
			{ name: 'Next.js', learning: true },
			{ name: 'Drizzle ORM', learning: true },
			{ name: 'PostgreSQL', learning: true },
			{ name: 'Neon', learning: true },
			{ name: 'Zod', learning: true },
		],
	},
	{
		id: 'integrations',
		items: [
			{ name: 'Open-Meteo API' },
			{ name: 'Clerk', learning: true },
			{ name: 'Inngest', learning: true },
			{ name: 'Resend', learning: true },
			{ name: 'UploadThing', learning: true },
			{ name: 'Google Gemini API', learning: true },
		],
	},
	{
		id: 'tools',
		items: [
			{ name: 'GitHub' },
			{ name: 'Figma' },
			{ name: 'Docker', learning: true },
			{ name: 'Vercel', learning: true },
		],
	},
]
