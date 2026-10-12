'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export default function LocaleSwitcher() {
	const current = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className='flex gap-1 rounded-full border border-(--line) p-1 text-xs'>
			{routing.locales.map(l => (
				<button
					key={l}
					onClick={() => router.replace(pathname, { locale: l, scroll: false })}
					aria-current={l === current}
					className={`rounded-full px-3 py-1 uppercase ${
						l === current ? 'bg-(--accent) text-white' : 'text-(--muted)'
					}`}
				>
					{l}
				</button>
			))}
		</div>
	)
}
