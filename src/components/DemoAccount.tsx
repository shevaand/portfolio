import { getTranslations } from 'next-intl/server'
import CopyButton from './CopyButton'

type Props = { email: string; password: string }

export default async function DemoAccount({ email, password }: Props) {
	const t = await getTranslations('jobsBoardCase.demoAccount')

	const rows = [
		{ label: t('email'), value: email },
		{ label: t('password'), value: password },
	]

	return (
		<section className='mt-12 rounded-2xl border border-(--line) bg-(--card) p-6'>
			<h2 className='mb-2 text-xl font-bold'>{t('title')}</h2>
			<p className='mb-4 text-sm text-(--muted)'>{t('text')}</p>

			<dl className='space-y-3 text-sm'>
				{rows.map(row => (
					<div key={row.label} className='flex flex-wrap items-center gap-3'>
						<dt className='w-24 text-(--muted)'>{row.label}</dt>
						<dd className='flex items-center gap-3'>
							<code className='rounded-md bg-(--bg) px-2 py-1'>
								{row.value}
							</code>
							<CopyButton
								value={row.value}
								label={t('copy')}
								copiedLabel={t('copied')}
							/>
						</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
