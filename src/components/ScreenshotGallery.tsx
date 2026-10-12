'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type Props = {
	images: string[]
	alt: string
	prevLabel: string
	nextLabel: string
	slideLabel: string
}

export default function ScreenshotGallery({
	images,
	alt,
	prevLabel,
	nextLabel,
	slideLabel,
}: Props) {
	const [index, setIndex] = useState(0)
	const touchStartX = useRef<number | null>(null)
	const count = images.length
	const multiple = count > 1

	const go = (i: number) => setIndex((i + count) % count)

	const arrowClass =
		'absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-opacity hover:bg-black/65 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100'

	return (
		<div
			role='region'
			aria-roledescription='carousel'
			aria-label={alt}
			tabIndex={multiple ? 0 : undefined}
			onKeyDown={e => {
				if (!multiple) return
				if (e.key === 'ArrowLeft') {
					e.preventDefault()
					go(index - 1)
				} else if (e.key === 'ArrowRight') {
					e.preventDefault()
					go(index + 1)
				}
			}}
			onTouchStart={e => {
				touchStartX.current = e.touches[0].clientX
			}}
			onTouchEnd={e => {
				if (!multiple || touchStartX.current === null) return
				const dx = e.changedTouches[0].clientX - touchStartX.current
				touchStartX.current = null
				if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1)
			}}
			className='group relative mb-1 aspect-16/10 overflow-hidden rounded-xl border border-(--line) focus-visible:outline-2 focus-visible:outline-(--accent)'
		>
			<div
				className='flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none'
				style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
			>
				{images.map((src, i) => (
					<div
						key={src}
						className='relative h-full w-full shrink-0'
						aria-hidden={i !== index}
					>
						<Image
							src={src}
							alt={multiple ? `${alt} (${i + 1}/${count})` : alt}
							fill
							sizes='(min-width: 640px) 50vw, 100vw'
							className='object-cover object-top'
						/>
					</div>
				))}
			</div>

			{multiple && (
				<>
					<button
						type='button'
						onClick={() => go(index - 1)}
						aria-label={prevLabel}
						className={`${arrowClass} left-2`}
					>
						<svg
							viewBox='0 0 24 24'
							className='h-4 w-4'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
							aria-hidden
						>
							<path d='m15 18-6-6 6-6' />
						</svg>
					</button>
					<button
						type='button'
						onClick={() => go(index + 1)}
						aria-label={nextLabel}
						className={`${arrowClass} right-2`}
					>
						<svg
							viewBox='0 0 24 24'
							className='h-4 w-4'
							fill='none'
							stroke='currentColor'
							strokeWidth='2.5'
							strokeLinecap='round'
							strokeLinejoin='round'
							aria-hidden
						>
							<path d='m9 18 6-6-6-6' />
						</svg>
					</button>

					<div className='absolute inset-x-0 bottom-2 flex justify-center'>
						<div className='flex items-center rounded-full bg-black/40 px-1.5'>
							{images.map((_, i) => (
								<button
									key={i}
									type='button'
									onClick={() => setIndex(i)}
									aria-label={`${slideLabel} ${i + 1}`}
									aria-current={i === index}
									className='p-1'
								>
									<span
										className={`block h-1.5 rounded-full transition-all ${
											i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
										}`}
									/>
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
