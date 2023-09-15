import { MovieCard } from "./cards/MovieCard";

import Link from "next/link";
import LoadingAnimation from "./loaders/LoadingAnimation";
import { fetchFeaturedMovies } from "@/libs/data-fetcher";
import { Foobar } from "./Foobar";

const baseUrl = "http://image.tmdb.org/t/p";
export default async function FeaturedMovies() {
	const data = await fetchFeaturedMovies(true);
	const movies = data.results;

	return (
		<section className="max-container pt-6 px-6 xl:px-12 min-h-screen w-full flex justify-center items-center flex-col pb-6">
			<div className="flex w-full justify-between items-center">
				<p className="font-bold text-[22px] uppercase sm:text-[2.25rem] text-slate-800 ">
					Featured Movies
				</p>
				<Link
					href={"/movies"}
					className="flex items-center gap-2 text-rose-700  sm:text-[1.25rem] max-sm:bg-white rounded-full  p-1 max-sm:font-bold max-sm:hover:bg-rose-700 max-sm:hover:text-white max-sm:border border-rose-700 transition-all duration-200 text-sm"
				>
					See more <span>&gt;</span>
				</Link>
			</div>

			{!movies ? (
				<LoadingAnimation text="Loading Movies..." />
			) : (
				<div className=" mt-4 py-2 flex flex-wrap gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  relative w-full justify-center ">
					{movies.slice(0, 10).map((movie: any) => (
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
	);
}
