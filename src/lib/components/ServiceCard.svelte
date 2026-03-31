<script lang="ts">
	let {
		title,
		description,
		icon
	}: {
		title: string;
		description: string;
		icon: string;
	} = $props();
</script>

<div class="service-card">
	<div class="service-icon"><i class={icon}></i></div>
	<h3>{title}</h3>
	<p>{description}</p>
</div>

<style>
	.service-card {
		padding: 25px;
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		border-radius: 16px;
		color: var(--text-color);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.service-card:hover {
		transform: translateY(-5px);
		background: var(--glass-border);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		border-color: var(--accent-color);
	}

	.service-icon {
		width: 50px;
		height: 50px;
		background: rgba(34, 197, 94, 0.1);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 5px;
	}

	.service-icon i {
		font-size: 24px;
		color: var(--accent-color);
		transition: transform 0.3s ease;
	}

	.service-card:hover .service-icon i {
		transform: scale(1.1);
	}

	.service-card h3 {
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-color);
	}

	.service-card p {
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--text-color);
		opacity: 0.9;
		flex-shrink: 0;
		margin: 0;
	}
</style>
