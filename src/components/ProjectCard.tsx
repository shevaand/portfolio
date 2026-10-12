import type { Project } from '@/data/projects'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import DemoModal from './DemoModal'
import ScreenshotGallery from './ScreenshotGallery'

export default async function ProjectCard({ project }: { project: Project }) {
	const t = await getTranslations('projects')
	const title = t(`${project.id}.title`)

	return (
		<article
			className='relative flex flex-col gap-3 rounded-2xl border border-(--line) bg-(--card) p-6
				[transition:transform_1000ms_ease-out,box-shadow_600ms_ease-out,border-color_150ms_ease-out]
				hover:z-10 hover:-translate-y-1 hover:scale-102 hover:border-(--accent) hover:shadow-xl hover:shadow-black/10
				focus-within:border-(--accent)
				motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100'
		>
			{project.images && project.images.length > 0 && (
				<ScreenshotGallery
					images={project.images}
					alt={t('screenshotAlt', { title })}
					prevLabel={t('galleryPrev')}
					nextLabel={t('galleryNext')}
					slideLabel={t('gallerySlide')}
				/>
			)}

			<h3 className='text-lg font-semibold'>{title}</h3>
			<p className='text-sm text-(--muted)'>{t(`${project.id}.description`)}</p>
			<ul className='flex flex-wrap gap-2'>
				{project.stack.map(s => (
					<li
						key={s}
						className='rounded-full border border-(--line) px-2.5 py-0.5 text-xs'
					>
						{s}
					</li>
				))}
			</ul>
			<div className='mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm'>
				{project.caseStudy && (
					<Link
						href={project.caseStudy}
						className='font-medium text-(--accent) hover:underline'
					>
						{t('caseStudy')} →
					</Link>
				)}
				{project.demo &&
					(project.embed ? (
						<DemoModal
							url={project.demo}
							title={title}
							openLabel={t('demo')}
							closeLabel={t('demoClose')}
							newTabLabel={t('demoNewTab')}
							hintLabel={t('demoHint')}
						/>
					) : (
						<a
							href={project.demo}
							className='text-(--accent) hover:underline'
							target='_blank'
							rel='noreferrer'
						>
							{t('demo')}
						</a>
					))}
				<a
					href={project.github}
					className='text-(--accent) hover:underline'
					target='_blank'
					rel='noreferrer'
				>
					GitHub
				</a>
			</div>
		</article>
	)
}
