<script lang="ts">
	let { title, icon }: { title: string; icon: string } = $props();
</script>

<div class="skill-item">
	<i class={icon}></i>
	<span class="skill-title">{title}</span>
</div>

<style>
	.skill-item {
		width: 100%;
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		background: var(--card-bg, rgba(20, 20, 20, 0.5));
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
		border-radius: 16px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.skill-item:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.03);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		border-color: var(--accent-color, #4caf50);
	}

	.skill-item i {
		font-size: 44px;
		transition: transform 0.3s ease;
		color: var(--accent-color, #4caf50);
	}

	.skill-item:hover i {
		transform: scale(1.1);
	}

	.skill-title {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--text-muted, #999);
		transition: color 0.3s ease;
		max-width: 90%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.skill-item:hover .skill-title {
		color: var(--text-color, #fff);
	}
</style>
