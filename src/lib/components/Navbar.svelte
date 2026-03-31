<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isOpen = $state(false);
	let isHidden = $state(false);
	let lastScrollY = $state(0);

	function handleScroll() {
		const currentScrollY = window.scrollY;

		// Don't hide if menu is open
		if (isOpen) {
			isHidden = false;
			return;
		}

		// Show on scroll up, hide on scroll down
		if (currentScrollY > lastScrollY && currentScrollY > 100) {
			isHidden = true;
		} else {
			isHidden = false;
		}

		lastScrollY = currentScrollY;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		isOpen = !isOpen;
		if (isOpen) {
			isHidden = false;
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isOpen = false;
		document.body.style.overflow = '';
	}

	const links = [
		{ name: 'Home', href: '#' },
		{ name: 'Certifications', href: '#certifications' },
		{ name: 'Skills', href: '#skills' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Contact', href: '#contact' }
	];
</script>

{#if $page.url.pathname === '/'}
	<button
		class="hamburger {isOpen ? 'is-active' : ''} {isHidden ? 'is-hidden' : ''}"
		onclick={toggleMenu}
		aria-label="Menu"
	>
		<div class="hamburger-box">
			<div class="hamburger-inner"></div>
		</div>
	</button>

	<div class="nav-overlay {isOpen ? 'is-open' : ''}">
		<nav class="nav-menu">
			{#each links as link}
				<a href={link.href} class="nav-link" onclick={closeMenu}>{link.name}</a>
			{/each}
		</nav>
	</div>
{/if}

<style>
	.hamburger {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 2001;
		cursor: pointer;
		background: var(--card-bg, rgba(26, 26, 26, 0.8));
		/* Force a more visible background in light mode since card-bg is very thin */
		background: color-mix(in srgb, var(--bg-color), var(--text-color) 3%);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
		border-radius: 50%;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.hamburger.is-hidden {
		transform: translateY(-100px);
		opacity: 0;
		pointer-events: none;
	}

	.hamburger:hover {
		transform: scale(1.05);
	}

	.hamburger-box {
		width: 20px;
		height: 14px;
		display: inline-block;
		position: relative;
	}

	.hamburger-inner {
		display: block;
		top: 50%;
		margin-top: -1px;
	}

	.hamburger-inner,
	.hamburger-inner::before,
	.hamburger-inner::after {
		width: 20px;
		height: 2px;
		background-color: var(--text-color, #fff);
		border-radius: 2px;
		position: absolute;
		transition: transform 0.15s ease;
	}

	.hamburger-inner::before,
	.hamburger-inner::after {
		content: '';
		display: block;
	}

	.hamburger-inner::before {
		top: -6px;
	}

	.hamburger-inner::after {
		bottom: -6px;
	}

	.hamburger.is-active .hamburger-inner {
		transform: rotate(45deg);
	}

	.hamburger.is-active .hamburger-inner::before {
		top: 0;
		opacity: 0;
	}

	.hamburger.is-active .hamburger-inner::after {
		bottom: 0;
		transform: rotate(-90deg);
	}

	.nav-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: var(--bg-color);
		opacity: 0;
		visibility: hidden;
		z-index: 2000;
		transition: all 0.4s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Optional: subtle blur overlay effect if supported */
	@supports (backdrop-filter: blur(20px)) {
		.nav-overlay {
			background: color-mix(in srgb, var(--bg-color) 80%, transparent);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
		}
	}

	.nav-overlay.is-open {
		opacity: 1;
		visibility: visible;
	}

	.nav-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		transform: translateY(20px);
		transition: all 0.4s ease;
	}

	.nav-overlay.is-open .nav-menu {
		transform: translateY(0);
	}

	.nav-link {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-color, #fff);
		text-decoration: none;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		transition: color 0.3s ease;
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		width: 0%;
		height: 3px;
		background: var(--accent-color, #4caf50);
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		transition: width 0.3s ease;
		border-radius: 2px;
	}

	.nav-link:hover {
		color: var(--accent-color, #4caf50);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	@media (max-width: 800px) {
		.hamburger {
			top: 15px;
			left: 15px;
			width: 40px;
			height: 40px;
		}

		.nav-link {
			font-size: 2rem;
		}
	}
</style>
