import { getDetails, getCredits, getVideos, getSimilar } from '$lib/tmdb';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { type, id } = params;

	if (type !== 'movie' && type !== 'tv') {
		throw error(404, 'Invalid media type');
	}

	try {
		const mediaId = parseInt(id);
		const [details, credits, videos, similar] = await Promise.all([
			getDetails(type, mediaId),
			getCredits(type, mediaId),
			getVideos(type, mediaId),
			getSimilar(type, mediaId)
		]);

		return {
			details,
			credits,
			videos,
			similar,
			type
		};
	} catch (err) {
		console.error('Error loading details:', err);
		throw error(404, 'Media not found');
	}
};
