<script lang="ts">
	let {
		id,
		title,
		description,
		emoji
	}: {
		id: string;
		title: string;
		description: string;
		emoji: string;
	} = $props();
</script>

<a href="/projects/{id}" class="project-link">
	<section class="project-card">
		<div class="section_title">
			<span class="alignleft">{emoji} {title}</span>
			<span class="alignright">→</span>
		</div>
		<div class="about_section">
			<span style="display:block;">{description}</span>
		</div>
	</section>
</a>

<style>
	.project-link {
		display: flex;
		text-decoration: none;
		width: 100%;
	}

	.project-card {
		width: 100%;
		padding: 3vh 6%;
		margin: 1.5vh 0px;
		display: inline-block;
		border-radius: 20px;
		color: var(--text-color);
		background: var(--card-bg);
		border: 1px solid var(--glass-border);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateY(0);
		box-sizing: border-box;
	}

	.project-card:hover {
		cursor: pointer;
		border: 1px solid var(--accent-color);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.1),
			0 0 15px rgba(34, 197, 94, 0.1);
		transform: translateY(-8px);
	}

	.project-card:hover .alignright {
		color: var(--accent-color);
		transform: translateX(5px);
	}

	.section_title {
		font-size: 24px;
		font-weight: bold;
		margin: 1vh 0px;
		padding: 0px 1px;
		word-wrap: break-word;
		display: inline-block;
		width: 100%;
		color: var(--accent-color);
	}

	.alignleft {
		float: left;
	}

	.alignright {
		float: right;
		color: lightslategray;
		transition: all 0.3s ease;
	}

	.about_section {
		font-size: 18px;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif;
		margin: 2vh 0px;
		font-weight: bold;
		word-wrap: break-word;
	}

	@media (max-width: 800px) {
		.project-card {
			padding: 3vh 20px;
		}
	}
</style>
