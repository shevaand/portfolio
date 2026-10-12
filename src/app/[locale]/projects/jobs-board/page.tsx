import DemoAccount from '@/components/DemoAccount'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import { projects } from '@/data/projects'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type StackItem = { name: string; role: string }

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('jobsBoardCase')
	return {
		title: `${t('title')} – Andrii Shevchenko`,
		description: t('summary'),
	}
}

function Section({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<section className='mt-12'>
			<h2 className='mb-4 text-xl font-bold'>{title}</h2>
			{children}
		</section>
	)
}

function BulletList({ items }: { items: string[] }) {
	return (
		<ul className='space-y-2 text-(--muted)'>
			{items.map(item => (
				<li key={item} className='flex gap-3'>
					<span
						className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)'
						aria-hidden
					/>
					<span>{item}</span>
				</li>
			))}
		</ul>
	)
}

export default async function JobsBoardCase() {
	const t = await getTranslations('jobsBoardCase')
	const project = projects.find(p => p.id === 'jobsBoard')

	const features = t.raw('features') as string[]
	const stack = t.raw('stack') as StackItem[]
	const architecture = t.raw('architecture') as string[]

	const challenges = t.has('challenges')
		? (t.raw('challenges') as string[])
		: []
	const learned = t.has('learned') ? (t.raw('learned') as string[]) : []

	return (
		<>
			<header className='sticky top-0 z-10 border-b border-(--line) bg-(--bg)/80 backdrop-blur'>
				<nav className='mx-auto flex max-w-3xl items-center justify-between px-6 py-3 text-sm'>
					<Link href='/#projects' className='text-(--accent) hover:underline'>
						← {t('back')}
					</Link>
					<div className='flex items-center gap-5'>
						<LocaleSwitcher />
						<ThemeToggle />
					</div>
				</nav>
			</header>

			<main className='mx-auto max-w-3xl px-6 py-16'>
				<h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
					{t('title')}
				</h1>
				<p className='mb-6 text-lg text-(--muted)'>{t('summary')}</p>

				{project && (
					<div className='flex flex-wrap gap-3 text-sm'>
						{project.demo && (
							<a
								href={project.demo}
								target='_blank'
								rel='noreferrer'
								className='rounded-full bg-(--accent) px-5 py-2.5 text-white'
							>
								{t('linkDemo')}
							</a>
						)}
						<a
							href={project.github}
							target='_blank'
							rel='noreferrer'
							className='rounded-full border border-(--line) px-5 py-2.5'
						>
							{t('linkGithub')}
						</a>
					</div>
				)}

				{project?.demoAccount && (
					<DemoAccount
						email={project.demoAccount.email}
						password={project.demoAccount.password}
					/>
				)}

				<Section title={t('overviewTitle')}>
					<p className='text-(--muted)'>{t('overview')}</p>
				</Section>

				<Section title={t('featuresTitle')}>
					<BulletList items={features} />
				</Section>

				<Section title={t('stackTitle')}>
					<dl className='divide-y divide-(--line) rounded-2xl border border-(--line) bg-(--card)'>
						{stack.map(item => (
							<div
								key={item.name}
								className='flex flex-col gap-1 px-5 py-3 text-sm sm:flex-row sm:gap-6'
							>
								<dt className='font-semibold sm:w-48 sm:shrink-0'>
									{item.name}
								</dt>
								<dd className='text-(--muted)'>{item.role}</dd>
							</div>
						))}
					</dl>
				</Section>

				<Section title={t('architectureTitle')}>
					<BulletList items={architecture} />
				</Section>

				{challenges.length > 0 && (
					<Section title={t('challengesTitle')}>
						<BulletList items={challenges} />
					</Section>
				)}

				{learned.length > 0 && (
					<Section title={t('learnedTitle')}>
						<BulletList items={learned} />
					</Section>
				)}
			</main>

			<footer className='border-t border-(--line) py-6 text-center text-xs text-(--muted)'>
				© {new Date().getFullYear()} Andrii Shevchenko
			</footer>
		</>
	)
}
