import { searchMulti } from '$lib/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q') || '';
	const page = parseInt(url.searchParams.get('page') || '1');

	if (!query) {
		return {
			results: [],
			query: '',
			totalPages: 0,
			currentPage: 1
		};
	}

	try {
		const data = await searchMulti(query, page);
		return {
			results: data.results || [],
			query,
			totalPages: data.total_pages || 0,
			currentPage: page
		};
	} catch (error) {
		console.error('Search error:', error);
		return {
			results: [],
			query,
			totalPages: 0,
			currentPage: 1
		};
	}
};
