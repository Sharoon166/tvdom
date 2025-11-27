import { getPopular, getGenres, getTrending, getTopRated, getUpcoming, getNowPlaying } from '$lib/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const section = url.searchParams.get('section') || 'popular';

	try {
		const [popularData, trendingData, topRatedData, upcomingData, nowPlayingData, genresData] = await Promise.all([
			getPopular('movie', 1),
			getTrending('movie', 'week'),
			getTopRated('movie', 1),
			getUpcoming(1),
			getNowPlaying(1),
			getGenres('movie')
		]);

		// Get the main section data based on selection
		let mainData;
		switch (section) {
			case 'trending':
				mainData = await getTrending('movie', 'week');
				break;
			case 'top_rated':
				mainData = await getTopRated('movie', page);
				break;
			case 'upcoming':
				mainData = await getUpcoming(page);
				break;
			case 'now_playing':
				mainData = await getNowPlaying(page);
				break;
			default:
				mainData = await getPopular('movie', page);
		}

		return {
			movies: mainData.results || [],
			popular: popularData.results?.slice(0, 10) || [],
			trending: trendingData.results?.slice(0, 10) || [],
			topRated: topRatedData.results?.slice(0, 10) || [],
			upcoming: upcomingData.results?.slice(0, 10) || [],
			nowPlaying: nowPlayingData.results?.slice(0, 10) || [],
			genres: genresData.genres || [],
			currentPage: page,
			totalPages: mainData.total_pages || 0,
			currentSection: section
		};
	} catch (error) {
		console.error('Error loading movies:', error);
		return {
			movies: [],
			popular: [],
			trending: [],
			topRated: [],
			upcoming: [],
			nowPlaying: [],
			genres: [],
			currentPage: 1,
			totalPages: 0,
			currentSection: section
		};
	}
};
