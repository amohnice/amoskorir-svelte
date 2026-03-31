<script lang="ts">
	let { services }: { services: any[] } = $props();

	// Default to the first service being expanded on desktop for the immediate 'wow' effect
	let activeIndex = $state<number | null>(0);
	let isMobile = $state(false);
	let isPaused = $state(false);

	$effect(() => {
		const mql = window.matchMedia('(max-width: 800px)');
		isMobile = mql.matches;
		const handler = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			if (!isMobile && activeIndex === null) {
				activeIndex = 0; // Always keep one open on desktop to preserve shape
			}
		};
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	});

	// Auto-play logic: Cycle through services every 5 seconds unless paused/hovered
	$effect(() => {
		if (isPaused) return;

		const interval = setInterval(() => {
			if (services.length > 0) {
				activeIndex = ((activeIndex ?? 0) + 1) % services.length;
			}
		}, 5000);

		return () => clearInterval(interval);
	});

	function handleInteraction(index: number) {
		if (isMobile) {
			// On mobile, tap toggles it open and closed
			activeIndex = activeIndex === index ? null : index;
		} else {
			// On desktop, hover snaps it open
			activeIndex = index;
		}
	}
</script>

<div
	class="accordion-container"
	role="listbox"
	tabindex="0"
	aria-label="Services"
	onmouseenter={() => (isPaused = true)}
	onmouseleave={() => {
		isPaused = false;
		if (!isMobile && activeIndex === null) activeIndex = 0;
	}}
>
	{#each services as service, i}
		<button
			class="accordion-item"
			class:active={activeIndex === i}
			onmouseenter={() => !isMobile && handleInteraction(i)}
			onclick={() => handleInteraction(i)}
			aria-expanded={activeIndex === i}
		>
			<!-- The collapsed header strip -->
			<div class="item-header">
				<div class="icon-box">
					<i class={service.icon}></i>
				</div>
				<h3 class="title-collapsed">{service.title}</h3>
			</div>

			<!-- The expanding rich content payload -->
			<div class="item-content">
				<div class="content-inner">
					<span class="label">{service.label}</span>
					<div class="text-block">
						<h3>{service.title}</h3>
						<p>{service.description}</p>
					</div>
				</div>
			</div>
		</button>
	{/each}
</div>

<style>
	/* === DESKTOP: THE HOVER-EXPAND HORIZONTAL ACCORDION === */
	.accordion-container {
		display: flex;
		flex-direction: row;
		gap: 6px;
		width: 100%;
		max-width: 1100px; /* Give it a slightly wider berth */
		height: 480px;
		margin: 0 auto;
		padding: 10px 0;
	}

	.accordion-item {
		flex: 1;
		min-width: 65px; /* Critically ensures collapsed cards don't squish */
		position: relative;
		border-radius: 16px; /* Slightly softer radius for thin columns */
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		outline: none;
		transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
		padding: 0;
		color: var(--text-color);
	}

	.accordion-item:hover {
		background: rgba(var(--profile-bg-rgb), 0.1);
	}

	.accordion-item.active {
		flex: 10;
		min-width: 320px;
		background: var(--bg-color);
		border-color: var(--accent-color);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
	}

	/* Header logic (The icon and the rotated text strip) */
	.item-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		width: 100%;
		height: 100%;
		transition: opacity 0.3s ease;
		position: absolute; /* Sits perfectly perfectly in the middle of the skinny slice */
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.icon-box {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: color-mix(in srgb, var(--accent-color) 15%, transparent);
		color: var(--accent-color);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		flex-shrink: 0;
		transition: all 0.5s ease;
	}

	.title-collapsed {
		writing-mode: vertical-rl; /* Rotate text perfectly */
		transform: rotate(180deg);
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		letter-spacing: 1px;
		color: var(--blog-gray-color);
		white-space: nowrap;
	}

	/* Hide the vertical strip when the card expands */
	.accordion-item.active .item-header {
		opacity: 0;
		pointer-events: none;
	}

	/* Expanded Content Layout */
	.item-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		display: flex;
		align-items: flex-end;
		padding: 40px;
		box-sizing: border-box;
		pointer-events: none;
		transform: translateY(20px);
		transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition-delay: 0s;
	}

	.accordion-item.active .item-content {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
		transition-delay: 0.2s; /* Wait slightly for flex row to physically expand before fading in text */
	}

	.content-inner {
		text-align: left;
		min-width: 240px;
	}

	.label {
		display: inline-block;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		font-weight: 600;
		color: var(--bg-color);
		background: var(--accent-color);
		padding: 6px 14px;
		border-radius: 20px;
		margin-bottom: 20px;
	}

	.text-block h3 {
		font-size: 2rem;
		color: var(--text-color);
		margin: 0 0 10px 0;
		font-weight: 700;
		line-height: 1.2;
	}

	.text-block p {
		font-size: 1rem;
		color: var(--text-color);
		opacity: 0.8;
		line-height: 1.6;
		margin: 0;
		max-width: 90%;
	}

	/* === MOBILE: THE SLEEK VERTICAL ACCORDION === */
	@media (max-width: 800px) {
		.accordion-container {
			flex-direction: column;
			height: auto;
			gap: 12px;
			padding: 0;
		}

		.accordion-item {
			flex: none;
			width: 100%;
			height: auto;
			min-height: auto;
			justify-content: flex-start;
			border-radius: 16px;
			padding: 0;
		}

		.accordion-item.active {
			flex: none; /* No flex expanding on mobile, we use max-height */
		}

		.item-header {
			position: relative;
			top: auto;
			left: auto;
			transform: none;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 20px;
			opacity: 1 !important; /* Always visible on mobile */
		}

		.accordion-item.active .icon-box {
			background: var(--accent-color);
			color: var(--bg-color);
			box-shadow: 0 0 15px rgba(0, 255, 153, 0.4);
		}

		.title-collapsed {
			writing-mode: horizontal-tb;
			transform: none;
			font-size: 1.1rem;
			color: var(--text-color);
			margin-left: 10px;
		}

		.item-content {
			position: relative;
			bottom: auto;
			left: auto;
			padding: 0 20px;
			height: auto;
			min-height: 0;
			/* We use an aggressive max-height transition to animate vertical slide */
			max-height: 0;
			transform: none;
			transition: all 0.4s ease;
			overflow: hidden;
			opacity: 0;
		}

		.accordion-item.active .item-content {
			max-height: 800px;
			opacity: 1;
			padding: 10px 20px 25px 20px;
			transform: none;
			transition-delay: 0s;
		}

		.content-inner {
			min-width: 0;
		}

		/* Hide the label on mobile since the item-header title acts as the descriptor already */
		.label {
			display: none;
		}

		.text-block h3 {
			display: none; /* Already showing in item-header */
		}

		.text-block p {
			max-width: 100%;
			font-size: 0.95rem;
			color: var(--text-color);
			opacity: 0.7;
			margin: 0;
			line-height: 1.6;
		}
	}
</style>
