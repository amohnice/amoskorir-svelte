<script lang="ts">
	let { children, icon, label, class: className = '', style = '' } = $props();
</script>

<div class="card {className}" {style}>
	<div class="window-header">
		<div class="header-left">
			<div class="header-icon">
				{@render icon?.()}
			</div>
			<span class="header-label">{@render label?.()}</span>
		</div>
	</div>
	<div class="window-content">
		{@render children()}
	</div>
</div>

<style>
	.card {
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 0.75rem;
		border: 1px solid var(--glass-border);
		background: var(--bg-color);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		transform: translate(-50%, -50%);
		transform-style: preserve-3d;
		will-change: transform;
		backface-visibility: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
		color: var(--text-color);
		box-sizing: border-box;
		overflow: hidden;
	}

	.window-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border-bottom: 1px solid var(--glass-border);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.header-icon {
		font-size: 0.9rem;
		color: var(--accent-color);
		display: flex;
		align-items: center;
	}

	.header-label {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-color);
		opacity: 0.8;
		letter-spacing: 0.5px;
	}

	.window-content {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Global overrides for card content */
	:global(.window-content h3) {
		margin: 1.5rem 1.5rem 0.5rem;
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text-color);
	}

	:global(.window-content p) {
		margin: 0 1.5rem 1.5rem;
		font-size: 0.9rem;
		color: var(--blog-gray-color);
		line-height: 1.5;
	}

	:global(.window-content img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.8;
	}
</style>
