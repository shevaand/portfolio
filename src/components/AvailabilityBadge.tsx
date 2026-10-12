import { getTranslations } from 'next-intl/server'

export default async function AvailabilityBadge() {
	const t = await getTranslations('hero')

	return (
		<a
			href='#contact'
			className='mb-6 inline-flex items-center gap-2 rounded-full border border-(--line) bg-(--card) px-3 py-1 text-xs transition-colors hover:border-(--accent)'
		>
			<span className='relative flex h-2 w-2'>
				<span className='absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping' />
				<span className='relative inline-flex h-2 w-2 rounded-full bg-green-500' />
			</span>
			{t('available')}
		</a>
	)
}
