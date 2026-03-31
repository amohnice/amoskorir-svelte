<script lang="ts">
	import { onMount } from 'svelte';
	import { certificates, skills, projects, services, contacts } from '$lib/data';
	import CertCard from '$lib/components/CertCard.svelte';
	import SkillShowcase from '$lib/components/SkillShowcase.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import CardSwap from '$lib/components/CardSwap.svelte';
	import SwapCard from '$lib/components/SwapCard.svelte';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('reveal-visible');
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Amos Korir - Full-Stack Web Developer</title>
</svelte:head>

<!-- Certifications Section -->
<section id="certifications" class="reveal">
	<h1>Certifications.</h1>
	<div class="cert-grid">
		{#each certificates as cert}
			<CertCard {...cert} />
		{/each}
	</div>
</section>

<!-- Skills Section -->
<section id="skills" class="reveal">
	<h1>Skills.</h1>
	<SkillShowcase {skills} />
</section>

<!-- Projects Section -->
<section id="projects" class="reveal">
	<h1>Projects.</h1>
	<div class="projects">
		{#each projects as project}
			<ProjectCard {...project} />
		{/each}
	</div>
</section>

<!-- Services Section -->
<section id="services" class="reveal">
	<h1>Services.</h1>
	<div class="services-grid-container">
		<p class="services-description">
			I offer specialized services to bring your digital vision to life—from architecture to final
			polish, with a focus on performance and user experience.
		</p>

		<div class="services-visual">
			<CardSwap cardDistance={40} verticalDistance={40} delay={3000} width={800} height={280}>
				{#each services as service}
					<SwapCard>
						{#snippet icon()}<i class={service.icon}></i>{/snippet}
						{#snippet label()}{service.label}{/snippet}
						<h3>{service.title}</h3>
						<p>{service.description}</p>
					</SwapCard>
				{/each}
			</CardSwap>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="reveal">
	<h1>Contacts.</h1>
	<div class="contact-grid">
		{#each contacts as contact}
			<a
				href={contact.href}
				class="contact-item"
				class:location-item={contact.isLocation}
				target={contact.isLocation ? '_self' : '_blank'}
				rel="noopener noreferrer"
			>
				<i class={contact.icon}></i>
				<span>{contact.label}</span>
			</a>
		{/each}
	</div>
</section>

<!-- Footer Section -->
<div id="footer">
	<span>© 2026 Amos Korir. Built with passion.</span>
</div>

<style>
	section {
		margin-bottom: 6vh;
	}

	/* Reveal Animation Base Styles */
	.reveal {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
		will-change: transform, opacity;
	}

	:global(.reveal-visible) {
		opacity: 1 !important;
		transform: translateY(0) !important;
	}

	.cert-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		margin-top: 15px;
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
		margin-left: -15px;
	}

	.services-grid-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		text-align: left;
		margin-top: 1rem;
		min-height: auto;
	}

	.services-description {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #888;
		max-width: 800px;
		margin: 0;
	}

	.services-visual {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-top: 9rem;
	}

	#services {
		margin-bottom: 2vh;
	}

	@media (max-width: 1100px) {
		/* Services alignment matches other sections now */
	}

	@media (max-width: 800px) {
		.services-visual {
			margin-top: 7rem;
		}
	}

	@media (max-width: 600px) {
		.services-grid-container {
			gap: 2.5rem;
		}

		#services h1 {
			margin-bottom: 0.5rem;
		}
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 20px;
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		border-radius: 16px;
		color: var(--text-color);
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}

	.contact-item:hover:not(.location-item) {
		transform: translateY(-3px) scale(1.02);
		background: var(--glass-border);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		border-color: var(--accent-color);
	}

	.contact-item i {
		font-size: 24px;
		color: var(--accent-color);
		transition: transform 0.3s ease;
	}

	.contact-item:hover i {
		transform: scale(1.1) rotate(5deg);
	}

	.contact-item span {
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.5px;
	}

	#footer {
		width: 100%;
		padding: 8vh 0px;
		text-align: center;
		opacity: 0.8;
	}

	@media (max-width: 800px) {
		.projects {
			grid-template-columns: 1fr;
			margin-left: 0;
		}
	}

	@media (max-width: 600px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-item {
			padding: 16px;
		}
	}
</style>
