<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Play, Info } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		items: any[];
	}

	let { items }: Props = $props();
	let currentIndex = $state(0);
	let reducedMotion = false;

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % items.length;
		}, 5000);

		return () => clearInterval(interval);
	});

	const currentItem = $derived(items[currentIndex] || {});
	const backdropUrl = $derived(
		currentItem.backdrop_path
			? `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`
			: ''
	);
</script>

<div class="relative h-[70vh] w-full overflow-hidden">
	{#if backdropUrl}
		<div class="absolute inset-0 overflow-hidden">
			<img
				src={backdropUrl}
				alt={currentItem.title}
				class="w-full h-full object-cover transform will-change-transform hero-zoom"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
		</div>
	{/if}

	<!-- Full-bleed hero, inner content constrained to 85rem -->
	<div class="relative h-full w-full px-4 flex items-end pb-16">
		<div class="mx-auto w-full max-w-[85rem]">
			{#key currentIndex}
				<div
					in:fade={{ duration: reducedMotion ? 0 : 400 }}
					class="max-w-2xl space-y-4 text-white"
				>
					<h1 class="text-5xl md:text-6xl font-bold" style="color:var(--color-foreground)">
						{currentItem.title || currentItem.name}
					</h1>
					<p class="text-lg text-muted-foreground line-clamp-3">
						{currentItem.overview}
					</p>
					<div class="flex gap-4">
						<Button href="/movie/{currentItem.id}" size="lg" class="gap-2">
							<Play class="w-5 h-5" />
							Watch Now
						</Button>
						<Button href="/movie/{currentItem.id}" variant="secondary" size="lg" class="gap-2">
							<Info class="w-5 h-5" />
							More Info
						</Button>
					</div>
				</div>
			{/key}
		</div>
	</div>

	<div class="absolute bottom-4 right-4 flex gap-2">
		{#each items as _, index}
			<button
				onclick={() => (currentIndex = index)}
				class="rounded-full transition-all duration-300 ease-in-out bg-muted-foreground/40"
				class:active={index === currentIndex}
				aria-label="Go to slide {index + 1}"
				style="width: {index === currentIndex ? '2rem' : '0.5rem'}; height: 0.5rem;"
			></button>
		{/each}
	</div>
</div>

<style>
	:global(.hero-zoom) {
		animation: hero-zoom 12s ease-in-out infinite alternate;
		transform-origin: center;
	}

	@keyframes hero-zoom {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.06);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.hero-zoom) {
			animation: none;
			transform: none;
		}
	}
</style>
