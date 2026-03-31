<script lang="ts">
	import SkillItem from './SkillItem.svelte';

	let { skills }: { skills: { title: string; icon: string }[] } = $props();
</script>

<div class="skill-showcase" role="region" aria-label="Skills Showcase">
	<div class="skills-grid">
		{#each skills as skill}
			<SkillItem title={skill.title} icon={skill.icon} />
		{/each}
	</div>
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

	@media (max-width: 800px) {
		.skills-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
			gap: 12px;
		}
	}
</style>
