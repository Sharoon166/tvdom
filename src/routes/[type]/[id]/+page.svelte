<script lang="ts">
	import { Star, Calendar, Clock, Play, Users, Film } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import MediaCard from '$lib/components/MediaCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { details, credits, videos, similar, type } = data;
	const mediaType = type as 'movie' | 'tv';
	const title = type === 'movie' ? details.title : details.name;
	const releaseDate = type === 'movie' ? details.release_date : details.first_air_date;
	const backdropUrl = details.backdrop_path
		? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
		: '';
	const posterUrl = details.poster_path
		? `https://image.tmdb.org/t/p/w500${details.poster_path}`
		: '';

		const cast = credits?.cast?.slice(0, 12) || [];
	const crew = credits?.crew?.filter((c: any) => 
		['Director', 'Writer', 'Screenplay', 'Producer'].includes(c.job)
	).slice(0, 6) || [];
	
	const trailer = videos?.results?.find((v: any) => 
		v.type === 'Trailer' && v.site === 'YouTube'
	) || videos?.results?.[0];
</script>

<svelte:head>
	<title>{title} - TVDom</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section with Backdrop -->
	<div class="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
		{#if backdropUrl}
			<img src={backdropUrl} alt={title} class="w-full h-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30"></div>
			<div class="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent"></div>
		{/if}
	</div>

	<!-- Main Content -->
	<div class="container mx-auto px-4 -mt-40 md:-mt-48 relative z-10 pb-12">
		<div class="flex flex-col md:flex-row gap-8 mb-12">
			<!-- Poster -->
			<div class="flex-shrink-0">
				<img
					src={posterUrl}
					alt={title}
					class="w-48 md:w-72 rounded-xl shadow-2xl border-4 border-card/50 backdrop-blur"
				/>
			</div>

			<!-- Main Info -->
			<div class="flex-1 space-y-6">
				<div>
					<h1 class="text-4xl md:text-6xl font-bold text-foreground mb-3 drop-shadow-lg">{title}</h1>
					{#if details.tagline}
						<p class="text-xl md:text-2xl text-muted-foreground italic">{details.tagline}</p>
					{/if}
				</div>

				<div class="flex flex-wrap gap-3 items-center">
					<Badge variant="secondary" class="flex items-center gap-2 px-4 py-2 text-lg bg-card/80 backdrop-blur">
						<Star class="w-5 h-5 fill-yellow-400 text-yellow-400" />
						<span class="font-bold">{details.vote_average?.toFixed(1)}</span>
						<span class="text-muted-foreground text-sm">/ 10</span>
					</Badge>

					{#if releaseDate}
						<Badge variant="secondary" class="flex items-center gap-2 px-4 py-2 text-base bg-card/80 backdrop-blur">
							<Calendar class="w-5 h-5" />
							<span>{new Date(releaseDate).getFullYear()}</span>
						</Badge>
					{/if}

					{#if type === 'movie' && details.runtime}
						<Badge variant="secondary" class="flex items-center gap-2 px-4 py-2 text-base bg-card/80 backdrop-blur">
							<Clock class="w-5 h-5" />
							<span>{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
						</Badge>
					{:else if type === 'tv' && details.number_of_seasons}
						<Badge variant="secondary" class="flex items-center gap-2 px-4 py-2 text-base bg-card/80 backdrop-blur">
							<Film class="w-5 h-5" />
							<span>{details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}</span>
						</Badge>
					{/if}
				</div>

				{#if details.genres && details.genres.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each details.genres as genre}
							<Badge variant="outline" class="px-4 py-1.5 text-sm bg-card/50 backdrop-blur">
								{genre.name}
							</Badge>
						{/each}
					</div>
				{/if}

				{#if trailer}
					<Button 
						class="gap-2 px-6 py-6 text-lg"
						onclick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
					>
						<Play class="w-5 h-5 fill-current" />
						Watch Trailer
					</Button>
				{/if}

				<div>
					<h2 class="text-2xl font-bold mb-3 flex items-center gap-2">
						<Film class="w-6 h-6" />
						Overview
					</h2>
					<p class="text-muted-foreground leading-relaxed text-lg">{details.overview}</p>
				</div>

				{#if crew.length > 0}
					<div>
						<h3 class="text-xl font-bold mb-3">Key Crew</h3>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
							{#each crew as member}
								<div>
									<p class="font-semibold text-foreground">{member.name}</p>
									<p class="text-sm text-muted-foreground">{member.job}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Cast Section -->
		{#if cast.length > 0}
			<section class="mb-16">
				<div class="mb-8">
					<h2 class="text-3xl md:text-4xl font-bold flex items-center gap-3">
						<Users class="w-8 h-8" />
						Cast
					</h2>
				</div>
				<div class="overflow-x-auto scrollbar-hide -mx-4 md:mx-0">
					<div class="flex gap-6 px-4 md:px-0 pb-4">
							{#each cast as actor}
								<a href="/person/{actor.id}" class="flex-shrink-0 w-[160px]">
									<Card.Root class="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
									<div class="aspect-[2/3] overflow-hidden bg-muted">
										{#if actor.profile_path}
											<img
												src="https://image.tmdb.org/t/p/w300{actor.profile_path}"
												alt={actor.name}
												class="w-full h-full object-cover"
											/>
										{:else}
											<div class="w-full h-full flex items-center justify-center bg-muted">
												<Users class="w-12 h-12 text-muted-foreground" />
											</div>
										{/if}
									</div>
									<Card.Content class="p-4">
										<p class="font-semibold text-sm line-clamp-2 mb-1">{actor.name}</p>
										<p class="text-xs text-muted-foreground line-clamp-2">{actor.character}</p>
									</Card.Content>
								</Card.Root>
								</a>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- Additional Info -->
		<section class="mb-16">
			<div class="grid md:grid-cols-2 gap-8">
				{#if type === 'tv'}
					<Card.Root class="p-6">
						<h3 class="text-xl font-bold mb-4">TV Show Info</h3>
						<div class="space-y-2 text-sm">
							{#if details.number_of_seasons}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Seasons:</span>
									<span class="font-semibold">{details.number_of_seasons}</span>
								</div>
							{/if}
							{#if details.number_of_episodes}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Episodes:</span>
									<span class="font-semibold">{details.number_of_episodes}</span>
								</div>
							{/if}
							{#if details.status}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Status:</span>
									<span class="font-semibold">{details.status}</span>
								</div>
							{/if}
						</div>
					</Card.Root>
				{:else}
					<Card.Root class="p-6">
						<h3 class="text-xl font-bold mb-4">Movie Info</h3>
						<div class="space-y-2 text-sm">
							{#if details.budget}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Budget:</span>
									<span class="font-semibold">${(details.budget / 1000000).toFixed(1)}M</span>
								</div>
							{/if}
							{#if details.revenue}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Revenue:</span>
									<span class="font-semibold">${(details.revenue / 1000000).toFixed(1)}M</span>
								</div>
							{/if}
							{#if details.status}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Status:</span>
									<span class="font-semibold">{details.status}</span>
								</div>
							{/if}
						</div>
					</Card.Root>
				{/if}

				{#if details.production_companies && details.production_companies.length > 0}
					<Card.Root class="p-6">
						<h3 class="text-xl font-bold mb-4">Production</h3>
						<div class="flex flex-wrap gap-4">
							{#each details.production_companies.slice(0, 4) as company}
								<div class="flex items-center gap-2">
									{#if company.logo_path}
										<img
											src="https://image.tmdb.org/t/p/w200{company.logo_path}"
											alt={company.name}
											class="h-6 object-contain"
										/>
									{:else}
										<span class="text-sm text-muted-foreground">{company.name}</span>
									{/if}
								</div>
							{/each}
						</div>
					</Card.Root>
				{/if}
			</div>
		</section>

		<!-- Similar Content -->
		{#if similar?.results && similar.results.length > 0}
			<section class="mb-16">
				<div class="mb-8">
					<h2 class="text-3xl md:text-4xl font-bold">More Like This</h2>
				</div>
				<div class="overflow-x-auto scrollbar-hide -mx-4 md:mx-0">
					<div class="flex gap-16 px-4 md:px-0 pb-4">
						{#each similar.results.slice(0, 12) as item}
							<div class="flex-shrink-0 w-[280px]">
								<MediaCard media={item} type={mediaType} />
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
		scroll-behavior: smooth;
	}
	
	.overflow-x-auto {
		scroll-snap-type: x proximity;
	}
	
	.flex-shrink-0 {
		scroll-snap-align: start;
	}
</style>
