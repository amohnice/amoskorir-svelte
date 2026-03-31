<script lang="ts">
	import './layout.css';
	import Profile from '$lib/components/Profile.svelte';
	import GridPattern from '$lib/components/GridPattern.svelte';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import ChatWidget from '$lib/components/ChatWidget.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import SplashCursor from '$lib/components/SplashCursor.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<SplashCursor />
<GridPattern />
<Navbar />
<ScrollIndicator />
<ChatWidget />

{#if $page.url.pathname === '/'}
	<Profile />
	<div id="display">
		{@render children()}
	</div>
{:else}
	{@render children()}
{/if}

<style>
	#display {
		width: 70vw;
		padding: 12vh 5vw;
		min-height: 100vh;
		display: inline-block;
		margin-left: 30vw;
		box-sizing: border-box;
	}

	:global(#display h1) {
		font-size: 50px;
		color: var(--text-color);
		font-weight: bold;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif;
		overflow-wrap: break-word;
		margin: 2vh 0 1vh 0;
	}

	@media (max-width: 800px) {
		#display {
			width: 100%;
			padding: 4vh 5vw;
			height: auto;
			display: inline-block;
			margin-left: 0;
			box-sizing: border-box;
		}

		:global(#display h1) {
			font-size: 32px;
		}
	}
</style>
