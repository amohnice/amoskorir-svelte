<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let {
		texts = ['robust', 'scalable', 'beautiful', 'modern', 'user-centered'],
		intervalDelay = 2500,
		textColor = 'var(--accent-color)'
	} = $props();

	let currentIndex = $state(0);
	// Store the clientWidth of each word to smoothly animate the container
	let wordWidths: Record<number, number> = $state({});
	let currentWidth = $derived(wordWidths[currentIndex] ? `${wordWidths[currentIndex]}px` : 'auto');

	onMount(() => {
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % texts.length;
		}, intervalDelay);
		return () => clearInterval(interval);
	});
</script>

<span class="rotating-container" style:color={textColor} style:width={currentWidth}>
	<!-- Invisible elements purely to measure the width of each possible word -->
	{#each texts as text, i}
		<span class="measure-text" bind:clientWidth={wordWidths[i]} aria-hidden="true">
			{text}
		</span>
	{/each}

	{#key currentIndex}
		<span
			class="rotating-text"
			in:fly={{ y: 20, duration: 600, delay: 100 }}
			out:fly={{ y: -20, duration: 600 }}
		>
			{texts[currentIndex]}
		</span>
	{/key}
</span>

<style>
	.rotating-container {
		position: relative;
		display: inline-flex;
		vertical-align: bottom;
		font-weight: 700;
		/* Smoothly glide the rest of the sentence when width changes */
		transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
		height: 1.5em; /* Match line height completely */
		overflow: visible;
	}

	.rotating-text {
		position: absolute;
		left: 0;
		bottom: 0;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}

	.measure-text {
		position: absolute;
		visibility: hidden;
		pointer-events: none;
		white-space: nowrap;
		opacity: 0;
	}
</style>
