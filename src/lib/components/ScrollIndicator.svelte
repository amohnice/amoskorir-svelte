<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let scrolled = $state(0);
	let showBackToTop = $state(false);
	let showScrollDown = $state(true);

	onMount(() => {
		const handleScroll = () => {
			const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

			if (height > 0) {
				scrolled = (winScroll / height) * 100;
			} else {
				scrolled = 0;
			}

			showBackToTop = winScroll > 300;
			showScrollDown = winScroll < 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<!-- Progress Bar -->
<div class="progress-container" aria-hidden="true">
	<div class="progress-bar" style="transform: scaleX({scrolled / 100})"></div>
</div>

<!-- Scroll Down Indicator (Legacy Style) -->
{#if $page.url.pathname === '/' && showScrollDown}
	<div class="scroll-down">
		<div class="mouse">
			<div class="wheel"></div>
		</div>
		<div class="arrow">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
{/if}

<!-- Back to Top Button -->
<button
	class="back-to-top {showBackToTop ? 'visible' : ''}"
	aria-label="Back to top"
	onclick={scrollToTop}
>
	<i class="fas fa-arrow-up"></i>
</button>

<style>
	.progress-container {
		width: 100%;
		height: 4px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10000;
		background: transparent;
	}

	.progress-bar {
		height: 100%;
		background: var(--accent-color);
		width: 100%;
		transform-origin: left;
		will-change: transform;
	}

	/* Scroll Down Indicator Styling */
	.scroll-down {
		position: fixed;
		bottom: 30px;
		left: 65vw;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 20;
		transition: opacity 0.5s ease;
	}

	@media (max-width: 800px) {
		.scroll-down {
			left: 50% !important;
			right: auto !important;
			bottom: 40px;
			transform: translateX(-50%) !important;
		}
	}

	.mouse {
		width: 26px;
		height: 42px;
		border: 2px solid var(--text-color);
		border-radius: 20px;
		position: relative;
		margin-bottom: 5px;
	}

	.wheel {
		width: 4px;
		height: 6px;
		background: var(--accent-color);
		border-radius: 2px;
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		animation: scroll 1.5s infinite;
	}

	@keyframes scroll {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(15px);
		}
	}

	.arrow {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.arrow span {
		display: block;
		width: 10px;
		height: 10px;
		border-bottom: 2px solid var(--text-color);
		border-right: 2px solid var(--text-color);
		transform: rotate(45deg);
		margin: -3px;
		animation: arrow-anim 2s infinite;
	}

	.arrow span:nth-child(2) {
		animation-delay: -0.2s;
	}

	.arrow span:nth-child(3) {
		animation-delay: -0.4s;
	}

	@keyframes arrow-anim {
		0% {
			opacity: 0;
			transform: rotate(45deg) translate(-5px, -5px);
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: rotate(45deg) translate(5px, 5px);
		}
	}

	.back-to-top {
		position: fixed;
		bottom: 90px;
		right: 30px;
		width: 50px;
		height: 50px;
		background: var(--accent-color);
		color: #fff;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: 1000;
	}

	.back-to-top.visible {
		opacity: 1;
		visibility: visible;
	}

	.back-to-top:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
	}

	@media (max-width: 600px) {
		.back-to-top {
			bottom: 75px;
			right: 20px;
			width: 45px;
			height: 45px;
		}
	}
</style>
