export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
	popularity: number;
	adult: boolean;
	original_language: string;
	original_title: string;
	video: boolean;
}

export interface TVShow {
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
	popularity: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
}

export interface MovieDetails extends Movie {
	runtime: number;
	genres: Genre[];
	production_companies: ProductionCompany[];
	tagline: string;
	budget: number;
	revenue: number;
	status: string;
}

export interface TVShowDetails extends TVShow {
	number_of_seasons: number;
	number_of_episodes: number;
	genres: Genre[];
	production_companies: ProductionCompany[];
	tagline: string;
	status: string;
	type: string;
	episode_run_time: number[];
}

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	name: string;
	logo_path: string | null;
	origin_country: string;
}

export interface SearchResult {
	page: number;
	results: (Movie | TVShow)[];
	total_pages: number;
	total_results: number;
}

export interface CastMember {
	id: number;
	name: string;
	character: string;
	profile_path: string | null;
	order: number;
}

export interface CrewMember {
	id: number;
	name: string;
	job: string;
	department: string;
	profile_path: string | null;
}

export interface Credits {
	cast: CastMember[];
	crew: CrewMember[];
}

export interface Video {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
	official: boolean;
}

export interface VideosResult {
	results: Video[];
}
