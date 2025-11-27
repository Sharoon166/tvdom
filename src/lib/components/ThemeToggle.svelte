<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = (stored as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
		applyTheme(theme);
	});

	function applyTheme(newTheme: 'light' | 'dark') {
		if (newTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', newTheme);
	}

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		applyTheme(theme);
	}
</script>

<button
	onclick={toggleTheme}
	class="p-2 rounded-md hover:bg-accent/10 transition-colors"
	aria-label="Toggle theme"
>
	{#if theme === 'light'}
		<Moon class="w-5 h-5" />
	{:else}
		<Sun class="w-5 h-5" />
	{/if}
</button>
