<script lang="ts">
	import { onMount, tick } from 'svelte';

	type Message = {
		role: 'user' | 'assistant';
		content: string;
	};

	let isOpen = $state(false);
	let attentionGrabbing = $state(false);
	let hasInteracted = $state(false);
	let inputValue = $state('');
	let isStreaming = $state(false);
	let chatBodyEl: HTMLDivElement | undefined = $state();

	let messages = $state<Message[]>([
		{
			role: 'assistant',
			content:
				"Hi there! 👋 I'm Amos's AI assistant. Ask me anything about his skills, projects, or services — or reach out directly via WhatsApp or email!"
		}
	]);

	const quickQuestions = [
		'What are your top skills?',
		'Tell me about your projects',
		'Are you available for hire?',
		'What services do you offer?'
	];

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

	async function scrollToBottom() {
		await tick();
		if (chatBodyEl) {
			chatBodyEl.scrollTop = chatBodyEl.scrollHeight;
		}
	}

	async function sendMessage(text?: string) {
		const messageText = text || inputValue.trim();
		if (!messageText || isStreaming) return;

		inputValue = '';

		// Add user message
		messages.push({ role: 'user', content: messageText });
		await scrollToBottom();

		// Add placeholder for assistant
		messages.push({ role: 'assistant', content: '' });
		isStreaming = true;
		await scrollToBottom();

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages
						.filter((m) => m.content !== '')
						.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }))
				})
			});

			if (!response.ok) {
				const err = await response.json().catch(() => ({ error: 'Something went wrong' }));
				messages[messages.length - 1].content =
					err.error || 'Sorry, something went wrong. Please try again.';
				isStreaming = false;
				return;
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (!reader) {
				messages[messages.length - 1].content = 'Failed to read response stream.';
				isStreaming = false;
				return;
			}

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value, { stream: true });
				messages[messages.length - 1].content += chunk;
				await scrollToBottom();
			}
		} catch {
			messages[messages.length - 1].content =
				"I'm having trouble connecting right now. You can reach Amos directly at amoskorir631@gmail.com or WhatsApp +254 719 388 139.";
		} finally {
			isStreaming = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<!-- Chat Widget -->
<div class="chat-container">
	{#if isOpen}
		<div class="chat-panel">
			<div class="chat-header">
				<div class="chat-header-info">
					<div class="header-avatar">
						<i class="fas fa-robot"></i>
					</div>
					<div class="header-text">
						<span class="header-name">Amos's Assistant</span>
						<span class="header-status">
							<span class="online-dot"></span>
							Online
						</span>
					</div>
				</div>
				<button class="chat-close" onclick={toggleChat} aria-label="Close chat">
					<i class="fas fa-times"></i>
				</button>
			</div>

			<div class="chat-body" bind:this={chatBodyEl}>
				{#each messages as msg, i}
					<div class="chat-message {msg.role}">
						{#if msg.role === 'assistant' && msg.content === '' && isStreaming}
							<div class="typing-indicator">
								<span></span><span></span><span></span>
							</div>
						{:else}
							<p>{msg.content}</p>
						{/if}
					</div>
				{/each}

				<!-- Quick Questions (show only at the start) -->
				{#if messages.length === 1 && !isStreaming}
					<div class="quick-questions">
						{#each quickQuestions as q}
							<button class="quick-q" onclick={() => sendMessage(q)}>{q}</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="chat-input-area">
				<input
					type="text"
					bind:value={inputValue}
					onkeydown={handleKeydown}
					placeholder={isStreaming ? 'Thinking...' : 'Ask me anything...'}
					disabled={isStreaming}
					class="chat-input"
				/>
				<button
					class="send-btn"
					onclick={() => sendMessage()}
					disabled={isStreaming || !inputValue.trim()}
					aria-label="Send message"
				>
					<i class="fas fa-paper-plane"></i>
				</button>
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
			<span class="attention-text">Ask my AI 🤖</span>
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

	/* ===== Toggle Button ===== */
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
		box-shadow: 0 4px 20px rgba(34, 197, 94, 0.35);
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		overflow: hidden;
		padding: 0;
	}

	.chat-toggle.expanded {
		width: 155px;
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
		font-size: 0.9rem;
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
		box-shadow: 0 6px 24px rgba(34, 197, 94, 0.5);
	}

	/* ===== Chat Panel ===== */
	.chat-panel {
		width: 370px;
		max-height: 520px;
		background: var(--card-bg, #1a1a1a);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 16px 60px rgba(0, 0, 0, 0.4);
		animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(15px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* ===== Header ===== */
	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 18px;
		background: linear-gradient(135deg, var(--accent-color), #16a34a);
		color: #fff;
	}

	.chat-header-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.header-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
	}

	.header-text {
		display: flex;
		flex-direction: column;
	}

	.header-name {
		font-weight: 700;
		font-size: 0.9rem;
		line-height: 1.2;
	}

	.header-status {
		font-size: 0.7rem;
		opacity: 0.9;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.online-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #bbf7d0;
		box-shadow: 0 0 6px #bbf7d0;
	}

	.chat-close {
		background: rgba(255, 255, 255, 0.15);
		border: none;
		color: #fff;
		cursor: pointer;
		font-size: 0.9rem;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.chat-close:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	/* ===== Chat Body ===== */
	.chat-body {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		overflow-y: auto;
		flex: 1;
		min-height: 200px;
		max-height: 340px;
		scroll-behavior: smooth;
	}

	.chat-body::-webkit-scrollbar {
		width: 4px;
	}

	.chat-body::-webkit-scrollbar-track {
		background: transparent;
	}

	.chat-body::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	/* ===== Messages ===== */
	.chat-message {
		max-width: 85%;
		padding: 10px 14px;
		border-radius: 16px;
		font-size: 0.85rem;
		line-height: 1.55;
		animation: msgIn 0.25s ease-out forwards;
	}

	@keyframes msgIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.chat-message.assistant {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
		color: var(--text-color, #e0e0e0);
		align-self: flex-start;
		border-bottom-left-radius: 4px;
	}

	.chat-message.user {
		background: linear-gradient(135deg, var(--accent-color), #16a34a);
		color: #fff;
		align-self: flex-end;
		border-bottom-right-radius: 4px;
	}

	.chat-message p {
		margin: 0;
		word-wrap: break-word;
		white-space: pre-wrap;
	}

	/* ===== Typing Indicator ===== */
	.typing-indicator {
		display: flex;
		gap: 4px;
		padding: 4px 0;
	}

	.typing-indicator span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent-color);
		opacity: 0.5;
		animation: typingBounce 1.4s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}
	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typingBounce {
		0%,
		80%,
		100% {
			transform: scale(0.7);
			opacity: 0.4;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* ===== Quick Questions ===== */
	.quick-questions {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 4px;
	}

	.quick-q {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.12));
		color: var(--accent-color);
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.quick-q:hover {
		background: rgba(34, 197, 94, 0.15);
		border-color: var(--accent-color);
		transform: translateY(-1px);
	}

	/* ===== Input Area ===== */
	.chat-input-area {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 14px;
		border-top: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
		background: rgba(0, 0, 0, 0.15);
	}

	.chat-input {
		flex: 1;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
		border-radius: 12px;
		padding: 10px 14px;
		color: var(--text-color, #e0e0e0);
		font-size: 0.85rem;
		outline: none;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	.chat-input::placeholder {
		color: rgba(255, 255, 255, 0.3);
	}

	.chat-input:focus {
		border-color: var(--accent-color);
		box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
	}

	.chat-input:disabled {
		opacity: 0.5;
	}

	.send-btn {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: var(--accent-color);
		border: none;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.send-btn:hover:not(:disabled) {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
	}

	.send-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* ===== Mobile ===== */
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
			width: 145px;
		}

		.chat-toggle i {
			width: 45px;
			height: 45px;
		}

		.chat-panel {
			width: calc(100vw - 40px);
			max-height: 70vh;
			border-radius: 16px;
		}
	}
</style>
