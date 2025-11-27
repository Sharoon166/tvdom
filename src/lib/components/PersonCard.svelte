<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Users, Star } from 'lucide-svelte';

    interface Props {
        person: any;
    }

    let { person }: Props = $props();

    const imageUrl = person.profile_path
        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
        : '/placeholder.svg';
</script>

<a href="/person/{person.id}" class="group block">
    <Card.Root class="relative overflow-hidden rounded-3xl bg-card/40 border border-border/60 transition-colors duration-300">
        <div class="relative h-80 md:h-96 w-full">
            {#if person.profile_path}
                <img 
                    src={imageUrl} 
                    alt={person.name} 
                    class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy" 
                />
            {:else}
                <div class="w-full h-full flex items-center justify-center bg-muted">
                    <Users class="w-20 h-20 text-muted-foreground/30" />
                </div>
            {/if}

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <!-- Content -->
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div class="space-y-3">
                    <!-- Badges -->
                    <div class="flex items-center gap-2 text-xs md:text-sm">
                        {#if person.known_for_department}
                            <Badge class="bg-white/10 backdrop-blur px-3 py-1 uppercase tracking-wide text-[0.7rem] md:text-xs">
                                {person.known_for_department}
                            </Badge>
                        {/if}

                        {#if person.popularity}
                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur text-[0.7rem] md:text-xs text-gray-200 ml-auto">
                                <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span class="font-semibold">{person.popularity.toFixed(0)}</span>
                            </span>
                        {/if}
                    </div>

                    <!-- Name -->
                    <Card.Title class="text-xl md:text-2xl font-bold text-white drop-shadow-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {person.name}
                    </Card.Title>

                    <!-- Known for -->
                    {#if person.known_for && person.known_for.length > 0}
                        <p class="text-xs md:text-sm text-gray-200/90 leading-relaxed line-clamp-2">
                            Known for: {person.known_for.slice(0, 2).map((item: any) => item.title || item.name).join(', ')}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </Card.Root>
</a>
