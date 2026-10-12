import { getTranslations } from 'next-intl/server'
import ContactForm from './ContactForm'

const EMAIL = 'shevchenkoandrey97@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/andrii-shevchenko-036174182/'

export default async function Contact() {
	const t = await getTranslations('contact')

	return (
		<section id='contact' className='mx-auto max-w-5xl px-6 py-16'>
			<h2 className='mb-4 text-2xl font-bold'>{t('title')}</h2>
			<p className='mb-8 max-w-2xl text-(--muted)'>{t('text')}</p>

			<div className='grid gap-10 md:grid-cols-[2fr_3fr]'>
				<div className='space-y-3 text-sm'>
					<p className='text-(--muted)'>{t('direct')}</p>
					<ul className='space-y-2 text-(--accent)'>
						<li>
							<a href={`mailto:${EMAIL}`} className='hover:underline'>
								{EMAIL}
							</a>
						</li>
						<li>
							<a
								href='https://github.com/shevaand'
								target='_blank'
								rel='noreferrer'
								className='hover:underline'
							>
								GitHub
							</a>
						</li>
						<li>
							<a
								href={LINKEDIN}
								target='_blank'
								rel='noreferrer'
								className='hover:underline'
							>
								LinkedIn
							</a>
						</li>
					</ul>
				</div>

				<ContactForm />
			</div>
		</section>
	)
}
