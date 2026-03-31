<script lang="ts">
	import { onMount } from 'svelte';

	let isOpen = $state(false);
	let attentionGrabbing = $state(false);
	let hasInteracted = $state(false);

	onMount(() => {
		const expandTimer = setTimeout(() => {
			if (!hasInteracted && !isOpen) {
				attentionGrabbing = true;
			}
		}, 3000);

		const collapseTimer = setTimeout(() => {
			attentionGrabbing = false;
		}, 8000);

		return () => {
			clearTimeout(expandTimer);
			clearTimeout(collapseTimer);
		};
	});

	function toggleChat() {
		hasInteracted = true;
		attentionGrabbing = false;
		isOpen = !isOpen;
	}
</script>

<!-- Chat Button -->
<div class="chat-container">
	{#if isOpen}
		<div class="chat-panel">
			<div class="chat-header">
				<span>💬 Chat with Amos</span>
				<button class="chat-close" onclick={toggleChat} aria-label="Close chat">
					<i class="fas fa-times"></i>
				</button>
			</div>
			<div class="chat-body">
				<div class="chat-message bot">
					<p>Hi there! 👋 Thanks for visiting my portfolio.</p>
				</div>
				<div class="chat-message bot">
					<p>
						Feel free to reach out via
						<a href="mailto:amoskorir631@gmail.com">email</a>
						or
						<a href="https://wa.me/254719388139" target="_blank" rel="noopener noreferrer"
							>WhatsApp</a
						>
						for any inquiries.
					</p>
				</div>
			</div>
		</div>
	{/if}

	<button
		class="chat-toggle {attentionGrabbing && !isOpen ? 'expanded' : ''}"
		onclick={toggleChat}
		aria-label={isOpen ? 'Close chat' : 'Open chat'}
	>
		<div class="chat-toggle-inner">
			<i class={isOpen ? 'fas fa-times' : 'fas fa-comment-dots'}></i>
			<span class="attention-text">Say hi! 👋</span>
		</div>
	</button>
</div>

<style>
	.chat-container {
		position: fixed;
		bottom: 30px;
		right: 30px;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;
	}

	.chat-toggle {
		width: 50px;
		height: 50px;
		background: var(--accent-color);
		color: #fff;
		border: none;
		border-radius: 25px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 1.2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		overflow: hidden;
		padding: 0;
	}

	.chat-toggle.expanded {
		width: 135px;
	}

	.chat-toggle-inner {
		display: flex;
		align-items: center;
		width: max-content;
	}

	.chat-toggle i {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.attention-text {
		font-size: 0.95rem;
		font-weight: 600;
		white-space: nowrap;
		padding-right: 18px;
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
	}

	.chat-toggle.expanded .attention-text {
		opacity: 1;
		transform: translateX(0);
		transition-delay: 0.1s;
	}

	.chat-toggle:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
	}

	.chat-panel {
		width: 320px;
		max-height: 380px;
		background: var(--card-bg, #1a1a1a);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
		animation: slideUp 0.3s ease-out forwards;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		background: var(--accent-color);
		color: #fff;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.chat-close {
		background: none;
		border: none;
		color: #fff;
		cursor: pointer;
		font-size: 1rem;
		opacity: 0.8;
		transition: opacity 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chat-close:hover {
		opacity: 1;
	}

	.chat-body {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		overflow-y: auto;
	}

	.chat-message {
		padding: 10px 14px;
		border-radius: 12px;
		font-size: 0.85rem;
		line-height: 1.5;
		max-width: 90%;
	}

	.chat-message.bot {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
		color: var(--text-color, #e0e0e0);
	}

	.chat-message p {
		margin: 0;
	}

	.chat-message a {
		color: var(--accent-color);
		text-decoration: underline;
		font-weight: 500;
	}

	.chat-message a:hover {
		opacity: 0.8;
	}

	@media (max-width: 600px) {
		.chat-container {
			bottom: 20px;
			right: 20px;
		}

		.chat-toggle {
			width: 45px;
			height: 45px;
			border-radius: 22.5px;
		}

		.chat-toggle.expanded {
			width: 125px;
		}

		.chat-toggle i {
			width: 45px;
			height: 45px;
		}

		.chat-panel {
			width: 280px;
		}
	}
</style>
