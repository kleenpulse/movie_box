import { MovieCard } from "@/components/cards/MovieCard";
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import { Sidebar } from "@/components/Sidebar";
import {
	fetchFeaturedMovies,
	fetchTrendingMovies,
} from "../../libs/data-fetcher";

const baseUrl = "http://image.tmdb.org/t/p";
export default async function FeaturedMoviesPage() {
	const data = await fetchTrendingMovies(true);
	const movies = data.results;

	return (
		<main className="w-full flex justify-center items-center relative">
			<Sidebar />
			<section className="max-container pt-6 px-6 min-h-screen w-full lg:ml-[226px] flex justify-between items-center flex-col pb-6">
				<div className="flex w-full justify-center items-center">
					<p className="font-bold text-[2.25rem] text-slate-800 uppercase">
						Popular Movies
					</p>
				</div>

				{!movies ? (
					<LoadingAnimation text="Loading Movies..." />
				) : (
					<div className=" pl-3  mt-12 grid grid-cols-1 gap-6  lg:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 relative w-full ">
						{movies.map((movie: any) => (
							<MovieCard
								key={movie.id}
								poster={`${baseUrl}/w300${movie.poster_path}`}
								title={movie.title}
								release_date={movie.release_date}
								overview={movie.overview}
								imdb={movie.vote_average}
								tags={movie.genre_ids}
								movieId={movie.id}
							/>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
