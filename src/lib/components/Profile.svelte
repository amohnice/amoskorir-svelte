<script lang="ts">
	import { onMount } from 'svelte';
	import profileImg from '$lib/assets/profile.jpeg';
	import TrueFocus from './TrueFocus.svelte';
	import RotatingText from './RotatingText.svelte';

	const storageKey = 'amos-portfolio-theme';
	let theme = $state('light');

	function getTheme() {
		if (typeof window === 'undefined') return 'light';
		const savedTheme = localStorage.getItem(storageKey);
		if (savedTheme) return savedTheme;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function setTheme(newTheme: string) {
		theme = newTheme;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem(storageKey, theme);
	}

	function toggleTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	onMount(() => {
		setTheme(getTheme());

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem(storageKey)) {
				setTheme(e.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	});

	// Tilt effect state
	let rotateX = $state(0);
	let rotateY = $state(0);
	let isHovered = $state(false);

	function handleMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		rotateX = (centerY - y) / 5;
		rotateY = (x - centerX) / 5;
	}

	function handleMouseLeave() {
		isHovered = false;
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div id="profile">
	<button id="theme-toggle" onclick={toggleTheme} title="Toggle Theme" aria-label="Toggle Theme">
		<i class={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
	</button>
	<div class="profile-header">
		<div
			class="profile-img-container"
			role="img"
			aria-label="Profile photo of Amos Korir with interactive 3D tilt effect"
			onmouseenter={() => (isHovered = true)}
			onmousemove={handleMouseMove}
			onmouseleave={handleMouseLeave}
			style="transform: rotateX({rotateX}deg) rotateY({rotateY}deg) scale({isHovered ? 1.05 : 1});"
		>
			<div
				id="profile_img"
				style="background: url({profileImg}) center; background-size: cover;"
			></div>
		</div>

		<div class="status-badge">
			<span class="status-dot"></span>
			<span class="status-text">Available</span>
		</div>
	</div>
	<div id="username">
		<span style="display: flex; align-items: center; justify-content: flex-start; gap: 0.4rem;">
			Hi, I'm <b><TrueFocus sentence="Amos Korir" borderColor="var(--accent-color)" /></b> 👋🏽
		</span>
	</div>
	<div id="about">
		<p><b>Full-Stack Web Developer</b></p>
		<p>
			I build <RotatingText
			texts={['responsive', 'interactive', 'scalable', 'modern', 'beautiful']}
			/> web applications.
		</p>
		<p>
			Whether you need a stunning website, or a powerful web app,
			I'm here to bring your ideas to life with clean code and creative design.
		</p>

		<div class="mini-stack">
			<span class="skill-pill">JavaScript</span>
			<span class="skill-pill">TypeScript</span>
			<span class="skill-pill">React</span>
			<span class="skill-pill">Next.js</span>
		</div>
	</div>
	<div id="socials">
		<div class="socials">
			<a
				href="https://wa.me/254719388139"
				target="_blank"
				title="WhatsApp"
				rel="noopener noreferrer"
			>
				<i class="fab fa-whatsapp"></i>
			</a>
			<a
				href="mailto:amoskorir631@gmail.com"
				target="_blank"
				title="Email"
				rel="noopener noreferrer"
			>
				<i class="fas fa-envelope"></i>
			</a>
			<a
				href="https://github.com/amohnice"
				target="_blank"
				title="GitHub"
				rel="noopener noreferrer"
			>
				<i class="fab fa-github"></i>
			</a>
			<a
				href="https://linkedin.com/in/amos-korir"
				target="_blank"
				title="LinkedIn"
				rel="noopener noreferrer"
			>
				<i class="fab fa-linkedin"></i>
			</a>
		</div>
	</div>
</div>

<style>
	/* We will migrate these styles from the original index.css */
	#profile {
		width: 30vw;
		padding: 3vh 2.5vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		background: rgba(var(--profile-bg-rgb, 20, 20, 20), 0.03);
		backdrop-filter: blur(40px);
		-webkit-backdrop-filter: blur(40px);
		border-right: 1px solid var(--glass-border);
		/* High-end edge light effect */
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		position: fixed;
		color: var(--text-color) !important;
		transition: all 0.3s ease;
		z-index: 10;
		overflow-y: auto;
		box-sizing: border-box;
		box-shadow: 10px 0 30px rgba(0, 0, 0, 0.02);
	}

	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 2vh;
		perspective: 1000px;
	}

	.profile-img-container {
		position: relative;
		width: 124px;
		height: 124px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 22px;
		background: var(--glass-border);
		transform-style: preserve-3d;
		transition: transform 0.1s ease-out;
		cursor: crosshair;
	}

	.profile-img-container::before {
		content: '';
		position: absolute;
		width: 180%;
		height: 180%;
		background: conic-gradient(
			from 0deg,
			transparent 0deg 90deg,
			var(--accent-color) 180deg,
			transparent 270deg 360deg
		);
		animation: rotate 4s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	#profile_img {
		width: 120px;
		height: 120px;
		min-width: 120px;
		min-height: 120px;
		max-width: 120px;
		max-height: 120px;
		border-radius: 20px;
		position: relative;
		z-index: 1;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		border: 1px solid var(--bg-color);
		background-size: cover;
	}

	#username {
		font-size: 20px;
		font-weight: bold;
		margin: 1.5vh 0;
	}

	#username b {
		color: var(--accent-color) !important;
	}

	#username span {
		font-size: 32px;
		line-height: 1.2;
	}

	#about {
		font-size: 1.05rem;
		font-weight: 400;
		line-height: 1.6;
		word-wrap: break-word;
		color: var(--text-color) !important;
	}

	#about p {
		margin: 1.5vh 0;
	}

	#about b {
		color: var(--accent-color) !important;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 12px;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 20px;
		transition: all 0.3s ease;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: #22c55e;
		border-radius: 50%;
		box-shadow: 0 0 8px #22c55e;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
		}
	}

	.status-text {
		font-size: 0.75rem;
		font-weight: 600;
		color: #22c55e;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.mini-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 1.5rem;
	}

	.skill-pill {
		font-size: 0.7rem;
		padding: 4px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
		color: var(--text-color);
		font-weight: 500;
		opacity: 0.8;
		transition: all 0.3s ease;
	}

	.skill-pill:hover {
		border-color: var(--accent-color);
		color: var(--accent-color);
		opacity: 1;
		transform: translateY(-2px);
	}

	.socials {
		margin: 0;
		display: flex;
		gap: 1.5rem;
	}

	.socials a {
		color: var(--accent-color) !important;
		font-size: 1.2rem;
		opacity: 0.7;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.socials a:hover {
		opacity: 1;
		transform: translateY(-3px);
		color: var(--text-color) !important;
	}

	#theme-toggle {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 1000;
		cursor: pointer;
		width: 44px;
		height: 44px;
		padding: 0;
		border-radius: 50%;
		background: color-mix(in srgb, var(--bg-color), var(--text-color) 3%);
		border: 1px solid var(--glass-border);
		color: var(--text-color);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#theme-toggle:hover {
		transform: scale(1.1);
		background: var(--glass-border);
	}

	@media (max-width: 800px) {
		#profile {
			width: 100%;
			padding: 8vh 6vw;
			min-height: 100vh !important;
			text-align: left;
			position: relative;
			justify-content: center !important;
			gap: 2rem;
			backdrop-filter: none;
			border-right: none;
			border-bottom: 2px solid var(--glass-border);
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		#theme-toggle {
			top: 15px;
			right: 15px;
			width: 40px;
			height: 40px;
			padding: 0;
		}

		#username span {
			font-size: 26px;
			white-space: nowrap;
			display: block;
			width: 100%;
		}

		#about {
			font-size: 1.05rem;
		}
	}
</style>
