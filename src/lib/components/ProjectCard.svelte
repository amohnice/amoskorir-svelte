<script lang="ts">
	let {
		id,
		title,
		description,
		emoji,
		heroImage,
		techStack = []
	}: {
		id: string;
		title: string;
		description: string;
		emoji: string;
		heroImage?: string;
		techStack?: string[];
	} = $props();

	let cardElement = $state<HTMLElement | null>(null);
	let rotateX = $state(0);
	let rotateY = $state(0);
	let isHovered = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!cardElement) return;
		const rect = cardElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		// Calculate rotation based on cursor position relative to center
		// Max tilt around 15 degrees
		rotateX = (centerY - y) / 10;
		rotateY = (x - centerX) / 15;
	}

	function handleMouseLeave() {
		isHovered = false;
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div class="perspective-container">
	<a
		href="/projects/{id}"
		class="project-link"
		onmouseenter={() => (isHovered = true)}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		bind:this={cardElement}
		style="transform: rotateX({rotateX}deg) rotateY({rotateY}deg) scale({isHovered ? 1.05 : 1})"
	>
		<section class="project-card">
			{#if heroImage}
				<div class="card-bg">
					<img src={heroImage} alt={title} loading="lazy" />
					<div class="overlay"></div>
				</div>
			{/if}

			<div class="card-content">
				<div class="section_title">
					<span class="alignleft">{emoji} {title}</span>
					<span class="alignright">→</span>
				</div>

				<div class="about_section">
					<p>{description}</p>
				</div>

				{#if techStack.length > 0}
					<div class="tech-stack">
						{#each techStack.slice(0, 4) as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Dynamic light/glare effect -->
			<div
				class="glare"
				style="opacity: {isHovered ? 0.3 : 0}; transform: translate({rotateY * 5}px, {rotateX * 5}px)"
			></div>
		</section>
	</a>
</div>

<style>
	.perspective-container {
		perspective: 1000px;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.project-link {
		display: flex;
		text-decoration: none;
		width: 100%;
		transition: transform 0.1s ease-out;
		transform-style: preserve-3d;
		border-radius: 20px;
	}

	.project-card {
		position: relative;
		width: 100%;
		min-height: 280px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 30px;
		background: rgba(20, 20, 20, 0.4);
		border: 1px solid var(--glass-border);
		border-radius: 20px;
		overflow: hidden;
		transform-style: preserve-3d;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-sizing: border-box;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
	}

	.card-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		transform: translateZ(-20px); /* Push image back slightly */
	}

	.card-bg img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.4;
		transition: opacity 0.4s ease;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 80%);
	}

	.project-link:hover .card-bg img {
		opacity: 0.6;
	}

	.card-content {
		position: relative;
		z-index: 2;
		transform: translateZ(50px); /* Pull text forward for depth */
		pointer-events: none;
	}

	.section_title {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--accent-color);
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.alignright {
		font-size: 1.2rem;
		color: #fff;
		transition: transform 0.3s ease;
	}

	.about_section {
		margin-bottom: 20px;
	}

	.about_section p {
		font-size: 0.95rem;
		color: #ccc;
		line-height: 1.5;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		transform: translateZ(30px); /* Middle layer */
	}

	.tech-tag {
		font-size: 0.7rem;
		padding: 4px 10px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: #eee;
		backdrop-filter: blur(5px);
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.glare {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
		z-index: 5;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}

	@media (max-width: 800px) {
		.perspective-container {
			perspective: none; /* Disable 3D on mobile for performance/UX */
		}
		
		.project-link {
			transform: none !important;
		}

		.card-content, .tech-stack, .card-bg {
			transform: none !important;
		}

		.project-card {
			padding: 24px;
			min-height: 240px;
		}
	}
</style>
