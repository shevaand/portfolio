import About from '@/components/About'
import AvailabilityBadge from '@/components/AvailabilityBadge'
import Contact from '@/components/Contact'
import GithubActivity from '@/components/GithubActivity'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import ProjectCard from '@/components/ProjectCard'
import Skills from '@/components/Skills'
import ThemeToggle from '@/components/ThemeToggle'
import { projects } from '@/data/projects'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function Home() {
	const t = await getTranslations()
	const locale = await getLocale()

	return (
		<>
			<header className='sticky top-0 z-10 border-b border-(--line) bg-(--bg)/80 backdrop-blur'>
				<nav className='mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-sm'>
					<span className='font-semibold'>Andrii Shevchenko</span>
					<div className='flex items-center gap-5'>
						<a href='#projects' className='hidden sm:inline'>
							{t('nav.projects')}
						</a>
						<a href='#skills' className='hidden sm:inline'>
							{t('nav.skills')}
						</a>
						<a href='#about' className='hidden sm:inline'>
							{t('nav.about')}
						</a>
						<a href='#contact' className='hidden sm:inline'>
							{t('nav.contact')}
						</a>
						<LocaleSwitcher />
						<ThemeToggle />
					</div>
				</nav>
			</header>

			<main>
				<section className='mx-auto max-w-5xl px-6 py-24'>
					<AvailabilityBadge />
					<p className='mb-3 text-sm text-(--accent)'>{t('hero.role')}</p>
					<h1 className='mb-5 text-4xl font-bold tracking-tight sm:text-6xl'>
						{t('hero.title')}
					</h1>
					<p className='mb-8 max-w-2xl text-lg text-(--muted)'>
						{t('hero.subtitle')}
					</p>
					<div className='flex flex-wrap gap-3 text-sm'>
						<a
							href='#projects'
							className='rounded-full bg-(--accent) px-5 py-2.5 text-white'
						>
							{t('hero.ctaProjects')}
						</a>
					</div>
				</section>

				<section id='projects' className='mx-auto max-w-5xl px-6 py-16'>
					<h2 className='mb-8 text-2xl font-bold'>{t('nav.projects')}</h2>
					<div className='grid gap-5 sm:grid-cols-2'>
						{projects.map(p => (
							<ProjectCard key={p.id} project={p} />
						))}
					</div>
				</section>

				<Skills />

				<GithubActivity />

				<About />

				<Contact />
			</main>

			<footer className='border-t border-(--line) py-6 text-center text-xs text-(--muted)'>
				© {new Date().getFullYear()} Andrii Shevchenko
			</footer>
		</>
	)
}
