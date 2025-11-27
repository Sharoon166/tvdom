<script lang="ts">
	import Icon from '@iconify/svelte';

	const githubUser = 'haider-9';
	const avatar = `https://github.com/${githubUser}.png`;

	const tech = [
		{ name: 'Svelte 5', icon: 'logos:svelte-icon' },
		{ name: 'SvelteKit', icon: 'logos:svelte-kit' },
		{ name: 'TypeScript', icon: 'logos:typescript-icon' },
		{ name: 'Vite', icon: 'logos:vitejs' },
		{ name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
		{ name: 'Tailwind-variants', icon: 'lucide:wand-sparkles' },
		{ name: 'Lucide (icons)', icon: 'lucide:pen' },
		{ name: 'PostCSS', icon: 'logos:postcss' },
		{ name: 'TMDB API', icon: 'simple-icons:themoviedatabase' },
		{ name: 'Bits-UI', icon: 'lucide:square' }
	];

	const repos = [
		{ name: 'GitHub', href: `https://github.com/${githubUser}` }
	];
</script>

<section class="mx-auto max-w-4xl px-4 py-12">
	<div class="bg-card border border-border rounded-lg p-6 shadow-sm">
		<div class="flex flex-col md:flex-row items-center gap-6">
			<img
				src={avatar}
				alt="Haider's GitHub avatar"
				class="w-28 h-28 rounded-full ring-2 ring-primary object-cover"
			/>

			<div class="flex-1">
				<div class="flex items-center justify-between gap-4">
					<div>
						<h1 class="text-2xl font-semibold">Haider (haider-9)</h1>
						<p class="text-sm text-muted-foreground">Developer — creator of this site</p>
					</div>

					<div class="hidden sm:flex items-center gap-2">
						{#each repos as r}
							<a
								href={r.href}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-primary hover:underline"
							>
								{r.name}
							</a>
						{/each}
					</div>
				</div>

				<p class="mt-4 text-muted-foreground">
					This site is a small personal project showcasing movies and TV shows using the TMDB API.
					It was built with modern web tooling and focuses on a minimal, fast UX powered by SvelteKit and Tailwind.
				</p>

				<!-- Tech list with icons -->
				<div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
					{#each tech as t}
						<span class="flex items-center gap-2 px-3 py-1 text-xs rounded bg-accent/5 text-muted-foreground">
							<Icon icon={t.icon} class="w-4 h-4" />
							{t.name}
						</span>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
			<h3 class="font-semibold text-foreground mb-2">About this build</h3>
			<ul class="list-inside list-disc space-y-1">
				<li>Frontend framework: Svelte + SvelteKit (routing, server rendering)</li>
				<li>Bundler / dev server: Vite</li>
				<li>Styling: Tailwind CSS with utility-first classes and small custom components</li>
				<li>Icons: lucide-svelte & Iconify</li>
				<li>Type checking: TypeScript</li>
				<li>Third-party data: The Movie Database (TMDB) API</li>
				<li>Small design helpers: bits-ui and tailwind-variants (used for component patterns)</li>
				<li>Deploy: any static/node host that supports SvelteKit</li>
			</ul>

			<p class="mt-3">
				If you'd like, I can wire this page to fetch live GitHub profile info (stars, followers)
				or add a short timeline of this project's commits.
			</p>
		</div>
	</div>
</section>
