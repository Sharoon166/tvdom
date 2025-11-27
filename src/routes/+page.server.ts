import { getTrending, getPopular } from '$lib/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const [trendingMovies, trendingTV, popularMovies, popularTV] = await Promise.all([
			getTrending('movie', 'week'),
			getTrending('tv', 'week'),
			getPopular('movie', 1),
			getPopular('tv', 1)
		]);

		return {
			trendingMovies: trendingMovies.results || [],
			trendingTV: trendingTV.results || [],
			popularMovies: popularMovies.results || [],
			popularTV: popularTV.results || []
		};
	} catch (error) {
		console.error('Error loading data:', error);
		return {
			trendingMovies: [],
			trendingTV: [],
			popularMovies: [],
			popularTV: []
		};
	}
};
