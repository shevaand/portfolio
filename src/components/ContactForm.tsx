'use client'

import { sendContact, type ContactState } from '@/actions/contact'
import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

const initialState: ContactState = { status: 'idle' }

const fieldClass =
	'w-full rounded-xl border border-(--line) bg-(--card) px-4 py-2.5 text-sm outline-none focus:border-(--accent) aria-invalid:border-red-500'

export default function ContactForm() {
	const t = useTranslations('contact.form')
	const [state, formAction, pending] = useActionState(sendContact, initialState)
	const errors = state.errors ?? {}
	const genericError =
		state.status === 'error' && Object.keys(errors).length === 0

	return (
		<form action={formAction} className='space-y-4' noValidate>
			<div>
				<label htmlFor='cf-name' className='mb-1 block text-sm font-medium'>
					{t('name')}
				</label>
				<input
					id='cf-name'
					name='name'
					type='text'
					autoComplete='name'
					required
					defaultValue={state.values?.name}
					aria-invalid={errors.name ? true : undefined}
					aria-describedby={errors.name ? 'cf-name-error' : undefined}
					className={fieldClass}
				/>
				{errors.name && (
					<p id='cf-name-error' className='mt-1 text-xs text-red-500'>
						{t('errors.name')}
					</p>
				)}
			</div>

			<div>
				<label htmlFor='cf-email' className='mb-1 block text-sm font-medium'>
					{t('email')}
				</label>
				<input
					id='cf-email'
					name='email'
					type='email'
					autoComplete='email'
					required
					defaultValue={state.values?.email}
					aria-invalid={errors.email ? true : undefined}
					aria-describedby={errors.email ? 'cf-email-error' : undefined}
					className={fieldClass}
				/>
				{errors.email && (
					<p id='cf-email-error' className='mt-1 text-xs text-red-500'>
						{t('errors.email')}
					</p>
				)}
			</div>

			<div>
				<label htmlFor='cf-message' className='mb-1 block text-sm font-medium'>
					{t('message')}
				</label>
				<textarea
					id='cf-message'
					name='message'
					rows={6}
					required
					defaultValue={state.values?.message}
					aria-invalid={errors.message ? true : undefined}
					aria-describedby={errors.message ? 'cf-message-error' : undefined}
					className={fieldClass}
				/>
				{errors.message && (
					<p id='cf-message-error' className='mt-1 text-xs text-red-500'>
						{t('errors.message')}
					</p>
				)}
			</div>

			<div aria-hidden style={{ position: 'absolute', left: '-9999px' }}>
				<label>
					Website
					<input type='text' name='website' tabIndex={-1} autoComplete='off' />
				</label>
			</div>

			<div className='flex items-center gap-4'>
				<button
					type='submit'
					disabled={pending}
					className='rounded-full bg-(--accent) px-5 py-2.5 text-sm text-white disabled:opacity-60'
				>
					{pending ? t('sending') : t('send')}
				</button>

				{state.status === 'success' && (
					<p
						role='status'
						className='text-sm text-green-600 dark:text-green-400'
					>
						{t('success')}
					</p>
				)}
				{genericError && (
					<p role='alert' className='text-sm text-red-500'>
						{t('errorGeneric')}
					</p>
				)}
			</div>
		</form>
	)
}
