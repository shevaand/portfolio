export type Project = {
	id: string
	stack: string[]
	github: string
	demo?: string
	images?: string[]
	embed?: boolean
	caseStudy?: string
	demoAccount?: { email: string; password: string }
}

export const projects: Project[] = [
	{
		id: 'jobsBoard',
		stack: ['Next.js', 'TypeScript', 'Drizzle', 'Clerk', 'Inngest', 'Tailwind'],
		github: 'https://github.com/shevaand/job-board',
		demo: 'https://job-board-eta-ochre.vercel.app/',
		images: [
			'/projects/job-board/1.png',
			'/projects/job-board/2.png',
			'/projects/job-board/3.png',
			'/projects/job-board/4.png',
			'/projects/job-board/5.png',
			'/projects/job-board/6.png',
			'/projects/job-board/7.png',
		],
		embed: false,
		caseStudy: '/projects/jobs-board',
		demoAccount: { email: 'test@test.com', password: 'Tester12345.' },
	},
	{
		id: 'kanban',
		stack: ['JavaScript', 'Drag & Drop', 'Bootstrap Icons'],
		github: 'https://github.com/shevaand/kanban-task-board',
		demo: 'https://kanban-task-board-one-wine.vercel.app/',
		images: [
			'/projects/kanban/1.png',
			'/projects/kanban/2.png',
			'/projects/kanban/3.png',
			'/projects/kanban/4.png',
			'/projects/kanban/5.png',
		],
		embed: true,
	},
	{
		id: 'movies',
		stack: ['React', 'REST API'],
		github: 'https://github.com/shevaand/movie-app',
		demo: 'https://movie-app-3f4p.vercel.app/',
		images: [
			'/projects/movie/1.png',
			'/projects/movie/2.png',
			'/projects/movie/3.png',
			'/projects/movie/4.png',
			'/projects/movie/5.png',
			'/projects/movie/6.png',
		],
		embed: true,
	},
	{
		id: 'weather',
		stack: ['JavaScript', 'Open-Meteo API'],
		github: 'https://github.com/shevaand/weather-app',
		demo: 'https://weather-app-omega-lac-8r1fp432ev.vercel.app/',
		images: [
			'/projects/weather/1.png',
			'/projects/weather/2.png',
			'/projects/weather/3.png',
		],
		embed: true,
	},
]
