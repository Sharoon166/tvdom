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
    <Card.Root class="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/50">
        <div class="relative aspect-[2/3] w-full bg-muted">
            {#if person.profile_path}
                <img 
                    src={imageUrl} 
                    alt={person.name} 
                    class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy" 
                />
            {:else}
                <div class="w-full h-full flex items-center justify-center bg-muted">
                    <Users class="w-16 h-16 text-muted-foreground" />
                </div>
            {/if}

            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            <div class="absolute inset-x-0 bottom-0 p-4">
                <div class="space-y-2">
                    <Card.Title class="text-base md:text-lg font-bold text-white line-clamp-2 group-hover:text-primary transition-colors">
                        {person.name}
                    </Card.Title>

                    {#if person.known_for_department}
                        <p class="text-xs text-gray-200/90">{person.known_for_department}</p>
                    {/if}

                    {#if person.popularity}
                        <Badge variant="secondary" class="inline-flex items-center gap-1 bg-white/10 backdrop-blur text-xs">
                            <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{person.popularity.toFixed(0)}</span>
                        </Badge>
                    {/if}
                </div>
            </div>
        </div>
    </Card.Root>
</a>
