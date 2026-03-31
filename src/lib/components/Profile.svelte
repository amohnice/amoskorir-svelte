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
</script>

<div id="profile">
	<button id="theme-toggle" onclick={toggleTheme} title="Toggle Theme" aria-label="Toggle Theme">
		<i class={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
	</button>
	<div class="profile-img-container">
		<div
			id="profile_img"
			style="background: url({profileImg}) center; background-size: cover;"
		></div>
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
				texts={['robust', 'scalable', 'beautiful', 'modern', 'user-centered']}
			/> web applications.
		</p>
		<p>
			I'm proficient in JavaScript, TypeScript, and Python, with hands-on experience in MySQL,
			PostgreSQL, and MongoDB.
		</p>
		<p>
			Currently, I am a freelance developer, delivering modern web solutions for clients and
			collaborators.
		</p>
		<p>I’m open to work, connections, collaborations, and new opportunities.</p>
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
		background: var(--card-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-right: 1px solid var(--glass-border);
		position: fixed;
		color: var(--text-color) !important;
		transition: all 0.3s ease;
		z-index: 10;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.profile-img-container {
		position: relative;
		width: 124px;
		height: 124px;
		margin-bottom: 2vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 22px;
		background: var(--glass-border);
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
		font-size: 18px;
		font-weight: bold;
		margin: 1vh 0;
	}

	#username b {
		color: var(--accent-color) !important;
	}

	#username span {
		font-size: 24px;
	}

	#about {
		font-size: 0.9rem;
		font-weight: 400;
		line-height: 1.5;
		word-wrap: break-word;
		color: var(--text-color) !important;
	}

	#about p {
		margin: 1vh 0;
	}

	#about b {
		color: var(--accent-color) !important;
	}

	.socials {
		margin: 4vh 0 !important;
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
			padding: 10vh 6vw 6vh;
			min-height: 100vh !important;
			text-align: left;
			position: relative;
			justify-content: space-between !important;
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
	}
</style>
