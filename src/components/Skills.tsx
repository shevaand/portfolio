import { skillGroups } from '@/data/skills'
import { getTranslations } from 'next-intl/server'

export default async function Skills() {
	const t = await getTranslations('skills')
	const hasLearning = skillGroups.some(g => g.items.some(i => i.learning))

	return (
		<section id='skills' className='mx-auto max-w-5xl px-6 py-16'>
			<h2 className='mb-2 text-2xl font-bold'>{t('title')}</h2>
			<p className='mb-8 text-sm text-(--muted)'>{t('subtitle')}</p>

			<div className='grid gap-5 sm:grid-cols-2'>
				{skillGroups.map(group => (
					<div
						key={group.id}
						className='rounded-2xl border border-(--line) bg-(--card) p-6'
					>
						<h3 className='mb-3 text-sm font-semibold'>
							{t(`groups.${group.id}`)}
						</h3>
						<ul className='flex flex-wrap gap-2'>
							{group.items.map(item => (
								<li
									key={item.name}
									className={`rounded-full border px-2.5 py-0.5 text-xs ${
										item.learning
											? 'border-dashed border-(--accent) text-(--accent)'
											: 'border-(--line)'
									}`}
								>
									{item.name}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{hasLearning && (
				<p className='mt-4 text-xs text-(--muted)'>{t('learningNote')}</p>
			)}
		</section>
	)
}
