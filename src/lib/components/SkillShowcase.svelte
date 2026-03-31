<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import SkillItem from './SkillItem.svelte';

	let { skills }: { skills: { title: string; icon: string }[] } = $props();

	let isMobile = $state(false);
	let isExpanded = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 800px)');
		isMobile = mediaQuery.matches;

		const handler = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			if (!isMobile) isExpanded = false; // Reset state natively automatically when returning to desktop width
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	});

	// Derive the list of skills to display
	let visibleSkills = $derived(isMobile && !isExpanded ? skills.slice(0, 9) : skills);
</script>

<div class="skill-showcase" role="region" aria-label="Skills Showcase">
	<div class="skills-grid">
		{#each visibleSkills as skill (skill.title)}
			<div class="skill-wrapper" in:fade={{ duration: 300 }}>
				<SkillItem title={skill.title} icon={skill.icon} />
			</div>
		{/each}
	</div>

	{#if isMobile && skills.length > 9}
		<div class="toggle-container" in:fade={{ duration: 200 }}>
			<button class="toggle-button" onclick={() => (isExpanded = !isExpanded)}>
				{isExpanded ? 'Show Less' : 'Show All Skills'}
			</button>
		</div>
	{/if}
</div>

<style>
	.skill-showcase {
		width: 100%;
		margin-top: 2vh;
		padding-bottom: 20px;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 16px;
	}

	.skill-wrapper {
		width: 100%;
		height: 100%;
		display: flex; /* Ensure the wrapped SkillItem fills its grid cell perfectly */
	}

	.toggle-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.toggle-button {
		background: transparent;
		color: var(--accent-color);
		border: 1px solid var(--accent-color);
		padding: 0.6rem 2rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
		outline: none;
	}

	.toggle-button:hover,
	.toggle-button:focus-visible {
		background: var(--accent-color);
		color: var(--bg-color);
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(0, 255, 153, 0.2);
	}

	@media (max-width: 800px) {
		.skills-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
			gap: 12px;
		}
	}
</style>
