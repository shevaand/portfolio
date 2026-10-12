import { getTranslations } from 'next-intl/server'

const facts = ['location', 'education', 'experience', 'languages'] as const

export default async function About() {
	const t = await getTranslations('about')

	return (
		<section id='about' className='mx-auto max-w-5xl px-6 py-16'>
			<h2 className='mb-6 text-2xl font-bold'>{t('title')}</h2>

			<div className='grid gap-10 md:grid-cols-[3fr_2fr]'>
				<div className='space-y-4 text-(--muted)'>
					<p>{t('p1')}</p>
					<p>{t('p2')}</p>
				</div>

				<dl className='space-y-4 rounded-2xl border border-(--line) bg-(--card) p-6 text-sm'>
					{facts.map(key => (
						<div key={key}>
							<dt className='text-xs uppercase tracking-wide text-(--muted)'>
								{t(`facts.${key}.label`)}
							</dt>
							<dd className='mt-1 whitespace-pre-line'>
								{t(`facts.${key}.value`)}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	)
}
