<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';

	let {
		width = 500,
		height = 400,
		cardDistance = 60,
		verticalDistance = 70,
		delay = 5000,
		pauseOnHover = false,
		skewAmount = 6,
		easing = 'elastic',
		children
	} = $props();

	let container: HTMLElement;
	let leftElements: HTMLElement[] = $state([]);
	let rightElements: HTMLElement[] = $state([]);
	let orderL: number[] = $state([]);
	let orderR: number[] = $state([]);
	let interval: any;
	let timelines: gsap.core.Timeline[] = [];
	let isMobile = $state(false);
	let swapToggle = $state(false);

	const makeSlot = (i: number, total: number, side: 'left' | 'right') => {
		const xMult = side === 'left' ? -1 : 1;

		if (isMobile) {
			// Single centered stack on mobile
			// Treat the 8 cards as a single continuous 1-8 sequence
			const globalIndex = side === 'left' ? i : i + leftElements.length;
			const globalTotal = leftElements.length + rightElements.length;
			return {
				x: 0,
				y: -globalIndex * 25, // Tighter vertical stacking for 8 cards
				z: -globalIndex * 60,
				zIndex: globalTotal - globalIndex
			};
		}

		const gap = 30; // Horizontal gap between wings at center
		return {
			x: (i * cardDistance + gap) * xMult,
			y: -i * verticalDistance,
			z: -i * 100,
			zIndex: total - i
		};
	};

	const placeNow = (el: HTMLElement, slot: any, side: 'left' | 'right') =>
		gsap.set(el, {
			x: slot.x,
			y: slot.y,
			z: slot.z,
			xPercent: isMobile ? -50 : side === 'left' ? -100 : 0,
			// Note: No yPercent needed — SwapCard CSS already centers via translate(-50%,-50%)
			transformOrigin: isMobile
				? 'center center'
				: side === 'left'
					? 'right center'
					: 'left center',
			zIndex: slot.zIndex,
			force3D: true,
			scale: isMobile ? 1 : 1
		});

	onMount(() => {
		const updateMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		updateMobile();
		window.addEventListener('resize', updateMobile);

		if (!container) return;

		const config = {
			ease: 'power3.inOut',
			durDrop: 1.2,
			durMove: 1.0,
			durReturn: 1.0,
			promoteOverlap: 0.9,
			returnDelay: 0.05
		};

		const allElements = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
		const half = Math.floor(allElements.length / 2);
		leftElements = allElements.slice(0, half);
		rightElements = allElements.slice(half);

		orderL = Array.from({ length: leftElements.length }, (_, i) => i);
		orderR = Array.from({ length: rightElements.length }, (_, i) => i);

		leftElements.forEach((el, i) => placeNow(el, makeSlot(i, leftElements.length, 'left'), 'left'));
		rightElements.forEach((el, i) =>
			placeNow(el, makeSlot(i, rightElements.length, 'right'), 'right')
		);

		const swapSide = (side: 'left' | 'right') => {
			const elements = side === 'left' ? leftElements : rightElements;
			const order = side === 'left' ? orderL : orderR;
			const setOrder = (val: number[]) => (side === 'left' ? (orderL = val) : (orderR = val));

			if (order.length < 2) return;

			const [front, ...rest] = order;
			const elFront = elements[front];
			const tl = gsap.timeline();
			timelines.push(tl);

			// Fall and Fade Out
			tl.to(elFront, {
				y: isMobile ? '-=150' : '+=200', // Fly back or drop
				opacity: 0,
				scale: 0.8,
				duration: config.durDrop,
				ease: 'power2.in'
			});

			// Promote others immediately
			tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
			rest.forEach((idx, i) => {
				const el = elements[idx];
				const slot = makeSlot(i, elements.length, side);
				tl.set(el, { zIndex: slot.zIndex }, 'promote');
				tl.to(
					el,
					{
						x: slot.x,
						y: slot.y,
						z: slot.z,
						xPercent: isMobile ? -50 : side === 'left' ? -100 : 0,
						scale: isMobile ? 1 : 1,
						duration: config.durMove,
						ease: 'power3.out'
					},
					`promote+=${i * 0.1}`
				);
			});

			// Return front to back quickly
			const backSlot = makeSlot(elements.length - 1, elements.length, side);
			tl.addLabel('return', `promote+=${config.durMove * 0.1}`);
			tl.call(
				() => {
					gsap.set(elFront, { zIndex: backSlot.zIndex });
				},
				[],
				'return'
			);

			tl.to(
				elFront,
				{
					x: backSlot.x,
					y: backSlot.y,
					z: backSlot.z,
					opacity: 1,
					scale: isMobile ? 1 : 1,
					duration: config.durReturn,
					ease: 'power2.out'
				},
				'return'
			);

			tl.call(() => {
				setOrder([...rest, front]);
			}, []);
		};

		const handleSwap = () => {
			if (isMobile) {
				// Sequential swap on mobile for better focus
				swapSide(swapToggle ? 'left' : 'right');
				swapToggle = !swapToggle;
			} else {
				// Simultaneous dual swap on desktop
				swapSide('left');
				swapSide('right');
			}
		};

		interval = setInterval(handleSwap, delay);

		if (pauseOnHover) {
			container.onmouseenter = () => {
				timelines.forEach((t) => t.pause());
				clearInterval(interval);
			};
			container.onmouseleave = () => {
				timelines.forEach((t) => t.play());
				interval = setInterval(handleSwap, delay);
			};
		}

		return () => {
			window.removeEventListener('resize', updateMobile);
			clearInterval(interval);
			timelines.forEach((t) => t.kill());
		};
	});
</script>

<div
	bind:this={container}
	class="card-swap-container"
	style:width="{width}px"
	style:height="{height}px"
>
	{@render children()}
</div>

<style>
	@media (max-width: 768px) {
		.card-swap-container {
			margin: 2rem auto;
			width: 90vw !important;
			height: 320px !important;
		}

		:global(.card-swap-container .card) {
			width: 360px;
			height: 270px;
			max-width: 88vw;
		}
	}

	@media (max-width: 480px) {
		.card-swap-container {
			margin: 1.5rem auto;
			width: 95vw !important;
			height: 320px !important;
		}

		:global(.card-swap-container .card) {
			width: 85vw;
			height: 270px;
			max-width: 95vw;
		}
	}

	:global(.card-swap-container .card) {
		width: 280px;
		height: 220px;
		max-width: 85vw;
	}
</style>
