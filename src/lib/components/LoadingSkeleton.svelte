<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
	<Skeleton class="aspect-[2/3] rounded-t-lg" />
	<Card.Content class="p-3 space-y-2">
		<Skeleton class="h-4 w-3/4" />
		<Skeleton class="h-3 w-1/2" />
	</Card.Content>
</Card.Root>
