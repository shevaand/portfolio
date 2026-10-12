'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
	name: z.string().trim().min(2).max(100),
	email: z.email().max(200),
	message: z.string().trim().min(10).max(3000),
})

export type ContactState = {
	status: 'idle' | 'success' | 'error'
	errors?: Partial<Record<'name' | 'email' | 'message', true>>
	values?: { name: string; email: string; message: string }
}

const EMPTY = { name: '', email: '', message: '' }

export async function sendContact(
	_prev: ContactState,
	formData: FormData
): Promise<ContactState> {
	const raw = {
		name: String(formData.get('name') ?? ''),
		email: String(formData.get('email') ?? ''),
		message: String(formData.get('message') ?? ''),
	}

	if (String(formData.get('website') ?? '') !== '')
		return { status: 'success', values: EMPTY }

	const parsed = schema.safeParse(raw)
	if (!parsed.success) {
		const errors: NonNullable<ContactState['errors']> = {}
		for (const issue of parsed.error.issues) {
			const key = issue.path[0]
			if (key === 'name' || key === 'email' || key === 'message')
				errors[key] = true
		}
		return { status: 'error', errors, values: raw }
	}

	const apiKey = process.env.RESEND_API_KEY
	const to = process.env.CONTACT_TO_EMAIL
	const from = process.env.CONTACT_FROM_EMAIL
	if (!apiKey || !to || !from) {
		console.error(
			'Kontaktformular: RESEND_API_KEY, CONTACT_TO_EMAIL oder CONTACT_FROM_EMAIL fehlt.'
		)
		return { status: 'error', values: raw }
	}

	const { name, email, message } = parsed.data

	try {
		const resend = new Resend(apiKey)
		const { error } = await resend.emails.send({
			from,
			to,
			replyTo: email,
			subject: `Portfolio: Nachricht von ${name.replace(/[\r\n]+/g, ' ')}`,
			text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
		})
		if (error) {
			console.error('Kontaktformular: Resend-Fehler', error)
			return { status: 'error', values: raw }
		}
	} catch (err) {
		console.error('Kontaktformular: Senden fehlgeschlagen', err)
		return { status: 'error', values: raw }
	}

	return { status: 'success', values: EMPTY }
}
