'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
	const t = useTranslations('nav')
	const [theme, setTheme] = useState<Theme | null>(null)

	useEffect(() => {
		const explicit = document.documentElement.dataset.theme as Theme | undefined
		const system: Theme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light'
		setTheme(explicit ?? system)
	}, [])

	const toggle = () => {
		const next: Theme = theme === 'dark' ? 'light' : 'dark'
		setTheme(next)
		document.documentElement.dataset.theme = next
		document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`
	}

	return (
		<button
			onClick={toggle}
			aria-label={t('theme')}
			title={t('theme')}
			className='flex h-8 w-8 items-center justify-center rounded-full border border-(--line) text-sm'
		>
			{theme === 'dark' ? '☀️' : theme === 'light' ? '🌙' : '◐'}
		</button>
	)
}
