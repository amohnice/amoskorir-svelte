<script lang="ts">
	import { onMount } from 'svelte';

	let {
		width = 40,
		height = 40,
		x = -1,
		y = -1,
		strokeDasharray = '0',
		squares = [],
		className = ''
	}: {
		width?: number;
		height?: number;
		x?: number;
		y?: number;
		strokeDasharray?: string;
		squares?: [number, number][];
		className?: string;
	} = $props();

	let id = `grid-pattern-${Math.random().toString(36).substr(2, 9)}`;
</script>

<svg
	aria-hidden="true"
	class="pointer-events-none {className}"
	width="100%"
	height="100%"
	style="position: fixed; top: 0; left: 0; z-index: -1; fill: rgb(209 213 219 / 0.15); stroke: rgb(209 213 219 / 0.15);"
>
	<defs>
		<pattern {id} {width} {height} {x} {y} patternUnits="userSpaceOnUse">
			<path d="M.5 {height}V.5H{width}" fill="none" stroke-dasharray={strokeDasharray} />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#{id})" stroke-width="0" />
	{#if squares && squares.length > 0}
		<svg
			aria-label="Grid squares"
			role="img"
			class="overflow-visible"
			{x}
			{y}
			width="100%"
			height="100%"
			style="pointer-events: none;"
		>
			{#each squares as [sqX, sqY]}
				<rect
					width={width - 1}
					height={height - 1}
					x={sqX * width + 1}
					y={sqY * height + 1}
					stroke-width="0"
				/>
			{/each}
		</svg>
	{/if}
</svg>

<style>
	svg {
		/* The colors are set via inline styles in the original, but we can also use CSS variables */
		fill: var(--grid-fill-color, rgb(209 213 219 / 0.15));
		stroke: var(--grid-stroke-color, rgb(209 213 219 / 0.15));
	}

	:global([data-theme='light']) svg {
		--grid-fill-color: rgb(51 65 85 / 0.4);
		--grid-stroke-color: rgb(51 65 85 / 0.4);
	}
</style>
