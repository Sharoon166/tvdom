export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
	poster: {
		small: 'w185',
		medium: 'w342',
		large: 'w500',
		xlarge: 'w780',
		original: 'original',
	},
	backdrop: {
		small: 'w300',
		medium: 'w780',
		large: 'w1280',
		original: 'original',
		xlarge: 'w780',
	},
	profile: {
		small: 'w45',
		medium: 'w185',
		large: 'h632',
		original: 'original',
		xlarge: 'w780',
	}
};

export const getImageUrl = (
	path: string | null,
	type: 'poster' | 'backdrop' | 'profile' = 'poster',
	size: 'small' | 'medium' | 'large' | 'xlarge' | 'original' = 'medium'
): string => {
	if (!path) return '/placeholder.svg';
	const sizeKey = IMAGE_SIZES[type][size as keyof typeof IMAGE_SIZES.poster];
	return `${TMDB_IMAGE_BASE_URL}/${sizeKey}${path}`;
};
