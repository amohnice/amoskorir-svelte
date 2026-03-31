<script lang="ts">
	let {
		title,
		issuer,
		date,
		location,
		href,
		icon
	}: {
		title: string;
		issuer: string;
		date: string;
		location: string;
		href: string;
		icon: string;
	} = $props();
</script>

<a {href} target="_blank" class="cert-card" rel="noopener noreferrer">
	<div class="cert-icon">
		<i class={icon}></i>
	</div>
	<div class="cert-content">
		<h3>{title}</h3>
		<span class="cert-issuer">{issuer}</span>
		<div class="cert-meta">
			<span><i class="far fa-calendar-alt"></i> {date}</span>
			<span><i class="fas fa-map-marker-alt"></i> {location}</span>
		</div>
	</div>
	<div class="cert-action">
		<i class="fas fa-external-link-alt"></i>
	</div>
</a>

<style>
	.cert-card {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 20px;
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		border-radius: 16px;
		text-decoration: none;
		color: var(--text-color);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		position: relative;
		overflow: hidden;
		height: 100%;
		box-sizing: border-box;
	}

	.cert-card:hover {
		transform: translateY(-4px);
		background: var(--glass-border);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
		border-color: var(--accent-color);
	}

	.cert-icon {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(34, 197, 94, 0.1);
		border-radius: 12px;
		flex-shrink: 0;
	}

	.cert-icon i {
		font-size: 24px;
		color: var(--accent-color);
	}

	.cert-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.cert-content h3 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
		color: var(--text-color);
		line-height: 1.3;
		overflow-wrap: break-word;
	}

	.cert-issuer {
		font-size: 0.9rem;
		color: var(--text-color);
		opacity: 0.8;
		overflow-wrap: break-word;
	}

	.cert-meta {
		display: flex;
		gap: 15px;
		margin-top: 5px;
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.cert-meta span {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.cert-action {
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
		color: var(--accent-color);
	}

	.cert-card:hover .cert-action {
		opacity: 1;
		transform: translateX(0);
	}
</style>
