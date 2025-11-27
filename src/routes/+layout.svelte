<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Toaster richColors position="top-right" />
<Navbar />

<div class="flex flex-col min-h-screen">
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
