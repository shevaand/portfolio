'use client'

import { useRef, useState } from 'react'

type Props = {
	url: string
	title: string
	openLabel: string
	closeLabel: string
	newTabLabel: string
	hintLabel: string
}

export default function DemoModal({
	url,
	title,
	openLabel,
	closeLabel,
	newTabLabel,
	hintLabel,
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [open, setOpen] = useState(false)
	const [loaded, setLoaded] = useState(false)

	const openDialog = () => {
		if (
			window.matchMedia('(pointer: coarse)').matches ||
			window.innerWidth < 640
		) {
			window.open(url, '_blank', 'noopener,noreferrer')
			return
		}
		setLoaded(false)
		setOpen(true)
		dialogRef.current?.showModal()
	}

	return (
		<>
			<button onClick={openDialog} className='text-(--accent) hover:underline'>
				{openLabel}
			</button>

			<dialog
				ref={dialogRef}
				onClose={() => setOpen(false)}
				onClick={e => {
					if (e.target === dialogRef.current) dialogRef.current?.close()
				}}
				className='m-auto h-[88dvh] w-[min(1100px,94vw)] overflow-hidden rounded-2xl border border-(--line) bg-(--card) p-0 text-(--fg) backdrop:bg-black/60 open:flex open:flex-col'
			>
				<div className='flex items-center justify-between gap-4 border-b border-(--line) px-5 py-3 text-sm'>
					<span className='font-semibold'>{title}</span>
					<button
						onClick={() => dialogRef.current?.close()}
						className='text-(--muted) hover:text-(--fg)'
					>
						{closeLabel}
					</button>
				</div>

				<div className='relative min-h-0 flex-1'>
					{!loaded && (
						<div
							className='absolute inset-0 z-10 flex items-center justify-center bg-(--card)'
							aria-hidden
						>
							<span className='h-8 w-8 animate-spin rounded-full border-2 border-(--line) border-t-(--accent)' />
						</div>
					)}
					<iframe
						src={open ? url : undefined}
						title={title}
						onLoad={() => {
							if (open) setLoaded(true)
						}}
						sandbox='allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox'
						className='absolute inset-0 h-full w-full bg-white'
					/>
				</div>

				<div className='flex flex-wrap items-center gap-x-2 border-t border-(--line) px-5 py-2 text-xs text-(--muted)'>
					<span>{hintLabel}</span>
					<a
						href={url}
						target='_blank'
						rel='noreferrer'
						className='text-(--accent) hover:underline'
					>
						{newTabLabel}
					</a>
				</div>
			</dialog>
		</>
	)
}
