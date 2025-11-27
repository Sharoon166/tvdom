<script lang="ts">
	import { Search, Film, Tv, Home, Users, Menu, X } from 'lucide-svelte';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import ThemeToggle from './ThemeToggle.svelte';

	let searchQuery = '';

	function handleSearch(e: Event) {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
		}
	}
</script>

<nav class="sticky top-0 z-50 bg-gradient-to-b from-transparent to-card/80 backdrop-blur-md shadow-sm">
	<div class="mx-auto w-full max-w-[85rem] px-4">
		<div class="flex items-center justify-between h-16">
			<!-- Logo + brand -->
			<div class="flex items-center gap-4">
				<a href="/" class="flex items-center gap-3">
					<div class="rounded-md p-1 bg-primary/10 backdrop-blur-sm">
						<Film class="w-7 h-7 text-primary" />
					</div>
					<span class="text-2xl font-semibold text-foreground font-mono tracking-tight" style="font-family: 'Fira Code', ui-monospace, monospace;">TVDom</span>
				</a>
				<span class="hidden md:inline-block text-sm text-muted-foreground">Discover movies & TV shows</span>
			</div>

			<!-- Centered search (larger on desktop) -->
			<div class="flex-1 mx-6 hidden md:flex items-center justify-center">
				<form on:submit|preventDefault={handleSearch} class="w-full max-w-lg">
					<div class="relative">
						<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
						<Input type="text" bind:value={searchQuery} placeholder="Search movies, TV shows, people..." class="pl-10 pr-4" />
					</div>
				</form>
			</div>

			<!-- Desktop links + actions -->
			<div class="hidden md:flex items-center gap-4">
				<a href="/movies" class="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
					<Film class="w-4 h-4" />
					<span>Movies</span>
				</a>
				<a href="/tv" class="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
					<Tv class="w-4 h-4" />
					<span>TV</span>
				</a>
				<a href="/people" class="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
					<Users class="w-4 h-4" />
					<span>People</span>
				</a>

				<Button href="/" variant="secondary" class="ml-2 hidden lg:inline-flex">Explore</Button>
				<ThemeToggle />
			</div>

			<!-- Mobile controls using Dialog sheet -->
			<div class="flex items-center md:hidden">
				<DialogPrimitive.Root>
					<DialogPrimitive.Trigger >
						<button aria-label="Open menu" class="p-2 rounded-md hover:bg-accent/10">
							<Menu class="w-6 h-6" />
						</button>
					</DialogPrimitive.Trigger>

					<DialogPrimitive.Portal>
						<DialogPrimitive.Overlay class="fixed inset-0 bg-black/40 backdrop-blur-sm" />

						<DialogPrimitive.Content
							class="sheet-content fixed right-0 top-0 h-full w-[78%] max-w-xs bg-background p-4 shadow-lg"
						>
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-center gap-3">
									<div class="rounded-md p-1 bg-primary/10">
										<Film class="w-6 h-6 text-primary" />
									</div>
									<span class="font-semibold">TVDom</span>
								</div>
								<DialogPrimitive.Close >
									<button class="p-2 rounded-md hover:bg-accent/10">
										<X class="w-5 h-5" />
									</button>
								</DialogPrimitive.Close>
							</div>

							<form on:submit|preventDefault={handleSearch} class="mb-4">
								<div class="relative">
									<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
									<Input type="text" bind:value={searchQuery} placeholder="Search..." class="pl-10 pr-4" />
								</div>
							</form>

							<nav class="flex flex-col gap-2">
								<a href="/" class="flex items-center gap-3 p-2 rounded-md hover:bg-accent/5">
									<Home class="w-5 h-5" />
									<span>Home</span>
								</a>
								<a href="/movies" class="flex items-center gap-3 p-2 rounded-md hover:bg-accent/5">
									<Film class="w-5 h-5" />
									<span>Movies</span>
								</a>
								<a href="/tv" class="flex items-center gap-3 p-2 rounded-md hover:bg-accent/5">
									<Tv class="w-5 h-5" />
									<span>TV Shows</span>
								</a>
								<a href="/people" class="flex items-center gap-3 p-2 rounded-md hover:bg-accent/5">
									<Users class="w-5 h-5" />
									<span>People</span>
								</a>
								<div class="flex items-center gap-3 p-2">
									<ThemeToggle />
									<span>Theme</span>
								</div>
							</nav>
						</DialogPrimitive.Content>
					</DialogPrimitive.Portal>
				</DialogPrimitive.Root>
			</div>
		</div>

        
	</div>
</nav>

<style>
	/* Sheet enter/exit animations for the dialog content. bits-ui sets a data-state attribute
	   on the content element (open / closed). We use transform + opacity for a smooth slide. */
	.sheet-content {
		transform: translateX(100%);
		opacity: 0;
		transition: transform 260ms cubic-bezier(.2,.9,.2,1), opacity 180ms linear;
		will-change: transform, opacity;
	}

	.sheet-content[data-state="open"] {
		transform: translateX(0%);
		opacity: 1;
	}

	.sheet-content[data-state="closed"] {
		transform: translateX(100%);
		opacity: 0;
	}

	/* Slight overlay fade handled by the overlay element; ensure it transitions nicely */
	.fixed.inset-0.bg-black\/40 {
		opacity: 0;
		transition: opacity 200ms linear;
	}
	.fixed.inset-0.bg-black\/40[data-state="open"] {
		opacity: 1;
	}
</style>
