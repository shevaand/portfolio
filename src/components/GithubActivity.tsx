import { getTranslations } from 'next-intl/server'

const USER = 'shevaand'
type Repo = {
	id: number
	name: string
	html_url: string
	language: string | null
	pushed_at: string
	fork: boolean
}

export default async function GithubActivity() {
	const t = await getTranslations('github')
	// const format = await getFormatter()

	let repos: Repo[] = []
	try {
		const res = await fetch(
			`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=10`,
			{
				next: { revalidate: 3600 },
			}
		)
		if (res.ok)
			repos = ((await res.json()) as Repo[]).filter(r => !r.fork).slice(0, 5)
	} catch {}

	if (repos.length === 0) return null

	return (
		<section id='activity' className='mx-auto max-w-5xl px-6 py-16'>
			<h2 className='mb-2 text-2xl font-bold'>{t('title')}</h2>
			<p className='mb-6 text-sm text-(--muted)'>{t('subtitle')}</p>
			<ul className='divide-y divide-(--line) rounded-2xl border border-(--line) bg-(--card)'>
				{repos.map(r => (
					<li
						key={r.id}
						className='flex items-center justify-between gap-4 px-5 py-3 text-sm'
					>
						<a
							href={r.html_url}
							target='_blank'
							rel='noreferrer'
							className='font-medium hover:text-(--accent)'
						>
							{r.name}
						</a>
						{/* <span className='flex items-center gap-4 text-(--muted)'>
							{r.language && <span>{r.language}</span>}
							<time dateTime={r.pushed_at}>
								{format.relativeTime(new Date(r.pushed_at))}
							</time>
						</span> */}
					</li>
				))}
			</ul>
		</section>
	)
}
