<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/data';

	let projectId = $derived($page.params.id);
	let projectIndex = $derived(projects.findIndex((p) => p.id === projectId));
	let project = $derived(projects[projectIndex]);
	let prevProject = $derived(projectIndex > 0 ? projects[projectIndex - 1] : null);
	let nextProject = $derived(
		projectIndex >= 0 && projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null
	);
</script>

<svelte:head>
	<title
		>{project
			? `${project.title} | Amos Korir Portfolio`
			: 'Project Not Found | Amos Korir Portfolio'}</title
	>
</svelte:head>

{#if project}
	<div id="project-container">
		<header>
			<a href="/"><i class="fas fa-arrow-left"></i> Home</a>
			<a
				href={project.liveDemo}
				target="_blank"
				class="btn btn-secondary live-demo-link"
				rel="noopener noreferrer">Live Demo</a
			>
		</header>

		<section class="project-hero">
			<h1>{project.title}</h1>

			<div class="hero-sidebar-container">
				<div class="hero-image">
					<img src={project.heroImage} alt={project.title} loading="lazy" />
				</div>

				<div class="sidebar">
					<div class="tech-stack">
						<h2>Tech Stack</h2>
						<div class="tech-list">
							{#each project.techStack as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</div>

					<div class="action-buttons">
						<a
							href={project.liveDemo}
							target="_blank"
							class="btn btn-primary"
							rel="noopener noreferrer"
						>
							<i class="fas fa-external-link-alt"></i> View Demo
						</a>
						<a
							href={project.sourceCode}
							target="_blank"
							class="btn btn-secondary"
							rel="noopener noreferrer"
						>
							<i class="fab fa-github"></i> Source Code
						</a>
					</div>
				</div>
			</div>

			<div class="content-section">
				<h2>About the Project</h2>
				<p>{project.about}</p>

				<h2>Key Features</h2>
				<ul id="project-features">
					{#each project.features as feature}
						<li>
							<i class={feature.icon}></i>
							<strong>{feature.title}:</strong>
							{feature.desc}
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<nav class="project-nav">
			{#if prevProject}
				<a href="/projects/{prevProject.id}" class="nav-btn nav-prev">
					<i class="fas fa-arrow-left"></i>
					<div>
						<span class="nav-direction">Previous</span>
						<span class="nav-label">{prevProject.title}</span>
					</div>
				</a>
			{:else}
				<div style="flex: 1;"></div>
			{/if}

			{#if nextProject}
				<a href="/projects/{nextProject.id}" class="nav-btn nav-next">
					<div>
						<span class="nav-direction">Next</span>
						<span class="nav-label">{nextProject.title}</span>
					</div>
					<i class="fas fa-arrow-right"></i>
				</a>
			{:else}
				<div style="flex: 1;"></div>
			{/if}
		</nav>

		<footer id="footer">
			<span>&copy; 2026 Amos Korir. Built with passion.</span>
		</footer>
	</div>
{:else}
	<div class="error-container">
		<i class="fas fa-exclamation-triangle"></i>
		<h1>Project Not Found</h1>
		<p>The project you're looking for doesn't exist.</p>
		<a href="/" class="btn btn-primary">Go Home</a>
	</div>
{/if}

<style>
	#project-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px 5vw;
		box-sizing: border-box;
		animation: fadeInPage 0.6s ease-out;
	}

	@keyframes fadeInPage {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		margin-bottom: 40px;
		gap: 25px;
	}

	header a {
		text-decoration: none;
		color: var(--text-color);
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 10px;
		transition: color 0.3s;
	}

	header a:hover {
		color: var(--accent-color);
	}

	.project-hero h1 {
		font-size: 2.5rem;
		margin-bottom: 30px;
		color: var(--text-color);
		text-align: left;
		word-wrap: break-word;
	}

	.hero-sidebar-container {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 40px;
		margin-bottom: 60px;
		align-items: stretch;
	}

	.hero-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		background: var(--card-bg);
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--glass-border);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.sidebar {
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		border-radius: 20px;
		padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		backdrop-filter: blur(10px);
	}

	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 30px;
	}

	.tech-tag {
		background: rgba(34, 197, 94, 0.1);
		color: var(--accent-color);
		padding: 5px 12px;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 12px 24px;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
		width: 100%;
		margin-bottom: 10px;
	}

	header .btn {
		width: auto;
		margin-bottom: 0;
	}

	.btn-primary {
		background: var(--accent-color);
		color: #fff !important;
	}

	.btn-secondary {
		background: transparent;
		border: 1px solid var(--text-color);
		color: var(--text-color);
	}

	.btn-secondary:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
	}

	.content-section h2,
	.sidebar h2 {
		font-size: 1.5rem;
		margin: 30px 0 20px;
		color: var(--text-color);
		border-bottom: 2px solid var(--accent-color);
		display: inline-block;
		padding-bottom: 5px;
	}

	.sidebar h2 {
		margin-top: 0;
	}

	.content-section p {
		line-height: 1.8;
		margin-bottom: 40px;
		font-size: 1.05rem;
		opacity: 0.9;
	}

	#project-features {
		list-style: none;
		padding: 0;
	}

	#project-features li {
		margin-bottom: 15px;
	}

	#project-features i {
		color: var(--accent-color);
		margin-right: 10px;
	}

	.project-nav {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		margin-top: 60px;
		padding-top: 40px;
		border-top: 1px solid var(--glass-border);
		margin-bottom: 20px;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 20px 25px;
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		border-radius: 16px;
		text-decoration: none;
		color: var(--text-color);
		transition: all 0.3s ease;
		flex: 1;
		max-width: 300px;
	}

	.nav-btn:hover {
		background: var(--glass-border);
		transform: translateY(-2px);
		border-color: var(--accent-color);
	}

	.nav-btn i {
		font-size: 1.2rem;
		color: var(--accent-color);
	}

	.nav-btn div {
		display: flex;
		flex-direction: column;
		gap: 5px;
		text-align: left;
	}

	.nav-next div {
		text-align: right;
	}

	.nav-direction {
		font-size: 0.75rem;
		text-transform: uppercase;
		opacity: 0.6;
		letter-spacing: 1px;
	}

	.nav-label {
		font-weight: 600;
		font-size: 0.95rem;
	}

	.nav-next {
		margin-left: auto;
		flex-direction: row;
		justify-content: flex-end;
	}

	@media (max-width: 600px) {
		.project-nav {
			flex-direction: column;
		}

		.nav-btn {
			max-width: none;
		}

		.nav-next {
			margin-left: 0;
		}
	}

	.error-container {
		text-align: center;
		padding: 100px 20px;
	}

	.error-container i {
		font-size: 4rem;
		color: var(--accent-color);
		margin-bottom: 20px;
	}

	#footer {
		width: 100%;
		padding: 40px 0;
		text-align: center;
		opacity: 0.8;
		font-size: 0.9rem;
		border-top: 1px solid var(--glass-border);
		margin-top: 20px;
	}

	@media (max-width: 800px) {
		.hero-sidebar-container {
			grid-template-columns: 1fr;
		}
	}
</style>
