<script lang="ts">
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';

	let {
		sentence = 'True Focus',
		manualMode = false,
		blurAmount = 4,
		borderColor = 'var(--accent-color)',
		glowColor = 'rgba(0, 255, 153, 0.4)',
		animationDuration = 0.5,
		pauseBetweenAnimations = 1.5
	} = $props();

	let words = $derived(sentence.split(' '));
	let currentIndex = $state(0);
	let lastActiveIndex = $state(0);
	let focusBox: HTMLElement;
	let wordRefs: HTMLElement[] = [];
	let hasInitialized = $state(false);

	onMount(() => {
		// Start auto-play if not manual
		let interval: any;
		if (!manualMode) {
			interval = setInterval(
				() => {
					lastActiveIndex = currentIndex;
					currentIndex = (currentIndex + 1) % words.length;
				},
				(animationDuration + pauseBetweenAnimations) * 1000
			);
		}

		// Initial placement needs a tick to ensure DOM is drawn
		tick().then(() => {
			hasInitialized = true;
			updateFocusBox(currentIndex, 0); // Jump instantly on mount
		});

		return () => {
			if (interval) clearInterval(interval);
		};
	});

	// Reactively update focus shape whenever index changes
	$effect(() => {
		if (hasInitialized) {
			updateFocusBox(currentIndex, animationDuration);
		}
	});

	function updateFocusBox(index: number, duration: number) {
		const target = wordRefs[index];
		if (!target || !focusBox) return;

		// Move the focus box to exactly encompass the target word
		gsap.to(focusBox, {
			width: target.offsetWidth,
			height: target.offsetHeight,
			x: target.offsetLeft,
			y: target.offsetTop,
			duration: duration,
			ease: 'power3.out'
		});
	}

	function handleMouseEnter(i: number) {
		if (!manualMode) return;
		lastActiveIndex = currentIndex;
		currentIndex = i;
	}

	function handleMouseLeave() {
		if (!manualMode) return;
		currentIndex = lastActiveIndex;
	}
</script>

<span class="true-focus-container">
	{#each words as word, i}
		<span
			bind:this={wordRefs[i]}
			class="word"
			style="
                filter: blur({i === currentIndex ? 0 : blurAmount}px); 
                transition: filter {animationDuration}s ease;
                opacity: {i === currentIndex ? 1 : 0.8};
            "
			onmouseenter={() => handleMouseEnter(i)}
			onmouseleave={handleMouseLeave}
		>
			{word}
		</span>
	{/each}

	<div
		bind:this={focusBox}
		class="focus-box"
		style:opacity={hasInitialized ? 1 : 0}
		style:filter="drop-shadow(0 0 6px {glowColor})"
	>
		<!-- 4 Corners forming the focus bracket -->
		<span class="corner top-left" style:border-color={borderColor}></span>
		<span class="corner top-right" style:border-color={borderColor}></span>
		<span class="corner bottom-left" style:border-color={borderColor}></span>
		<span class="corner bottom-right" style:border-color={borderColor}></span>
	</div>
</span>

<style>
	.true-focus-container {
		position: relative;
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.35rem; /* Space between words */
		align-items: center;
		white-space: nowrap;
	}

	.word {
		display: inline-block;
		cursor: pointer;
		position: relative;
		z-index: 2;
		font-weight: inherit; /* inherit the <b> weight from the parent */
	}

	.focus-box {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 1;
		box-sizing: border-box;
		transition: opacity 0.3s ease;
	}

	.corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border: 0 solid transparent;
		transition: border-color 0.3s ease;
	}

	.top-left {
		top: -4px;
		left: -6px;
		border-top: 2px solid;
		border-left: 2px solid;
		border-top-left-radius: 4px;
	}

	.top-right {
		top: -4px;
		right: -6px;
		border-top: 2px solid;
		border-right: 2px solid;
		border-top-right-radius: 4px;
	}

	.bottom-left {
		bottom: -4px;
		left: -6px;
		border-bottom: 2px solid;
		border-left: 2px solid;
		border-bottom-left-radius: 4px;
	}

	.bottom-right {
		bottom: -4px;
		right: -6px;
		border-bottom: 2px solid;
		border-right: 2px solid;
		border-bottom-right-radius: 4px;
	}
</style>
