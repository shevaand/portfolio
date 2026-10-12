import Cursor from '@/components/Cursor'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import '../globals.css'

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('meta')
	return { title: t('title'), description: t('description') }
}

export default async function LocaleLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const locale = await getLocale()

	const saved = (await cookies()).get('theme')?.value
	const theme = saved === 'light' || saved === 'dark' ? saved : undefined

	return (
		<html lang={locale} data-theme={theme}>
			<body>
				<div className='bg-blobs' aria-hidden />
				<Cursor />
				<NextIntlClientProvider>{children}</NextIntlClientProvider>
			</body>
		</html>
	)
}
