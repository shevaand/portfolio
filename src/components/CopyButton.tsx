'use client'

import { useState } from 'react'

type Props = { value: string; label: string; copiedLabel: string }

export default function CopyButton({ value, label, copiedLabel }: Props) {
	const [copied, setCopied] = useState(false)

	return (
		<button
			type='button'
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(value)
					setCopied(true)
					setTimeout(() => setCopied(false), 1500)
				} catch {}
			}}
			className='rounded-full border border-(--line) px-3 py-1 text-xs hover:border-(--accent)'
		>
			{copied ? copiedLabel : label}
		</button>
	)
}
