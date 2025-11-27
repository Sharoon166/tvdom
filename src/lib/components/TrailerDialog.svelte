<script lang="ts">
	import { Play } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		title: string;
		trailerKey?: string;
	}

	let { title, trailerKey }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class="inline-flex">
		<span class="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 text-sm cursor-pointer">
			<Play class="w-4 h-4" />
			Watch Trailer
		</span>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-4xl">
		<Dialog.Header>
			<Dialog.Title>{title} - Trailer</Dialog.Title>
			<Dialog.Description>Watch the official trailer</Dialog.Description>
		</Dialog.Header>
		<div class="aspect-video bg-muted rounded-lg flex items-center justify-center">
			{#if trailerKey}
				<iframe
					width="100%"
					height="100%"
					src="https://www.youtube.com/embed/{trailerKey}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					class="rounded-lg"
				></iframe>
			{:else}
				<p class="text-muted-foreground">Trailer not available</p>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
