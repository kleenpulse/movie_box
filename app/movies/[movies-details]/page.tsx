import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import { Sidebar } from "@/components/Sidebar";

import Image from "next/image";
import {
	formatCurrencyUSD,
	formatHoursAndMinutes,
	formatMonthAndYear,
} from "@/constants/formatter";
import TrendingMoviesCard from "@/components/cards/TrendingMoviesCard";
import { fetchFilmDetails } from "@/libs/data-fetcher";
import { Metadata } from "next";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: { title: string };
}): Promise<Metadata> {
	return {
		title: `Movie | ${searchParams.title}`,
	};
}

const baseUrl = "http://image.tmdb.org/t/p";
export default async function FeaturedMovies({
	searchParams,
}: {
	searchParams: { movieId: string };
}) {
	const { movieId } = searchParams;

	const data = await fetchFilmDetails(movieId, true);

	const movieData = {
		revenue: data.revenue,
		poster: `${baseUrl}/original${data.backdrop_path}`,
		title: data.title,
		release_date: data.release_date,
		rotten_tomatoes: data.rotten_tomatoes,
		location: data.production_countries[0].name,
		overview: data.overview,
		imdb: data.vote_average,
		runtime: data.runtime,
		genres: data.genres,
		adult: data.adult,
		vote_count: data.vote_count,
		budget: data.budget,
		directors: data.credits.crew.filter(
			(crew: { known_for_department: string; job: string }) =>
				crew.known_for_department === "Directing" && crew.job === "Director"
		),
		writers: data.credits.crew.filter(
			(crew: { department: string; job: string }) =>
				crew.department === "Writing"
		),
		stars: data.credits.cast.filter(
			(cast: {
				character: string;
				order: number;
				known_for_department: string;
			}) => cast.order <= 3 && cast.known_for_department === "Acting"
		),
		trailer: data.videos.results.filter(
			(video: { type: string; site: string; official: boolean }) =>
				video.type === "Trailer" &&
				video.site === "YouTube" &&
				video.official === true
		),
	};

	const youtubeId = movieData.trailer[0].key;

	const seen = new Set();
	const uniqueWritters = movieData.writers.filter(
		(el: { id: number; name: string }) => {
			const duplicate = seen.has(el.id);
			seen.add(el.id);
			return !duplicate;
		}
	);

	return (
		<main className="w-full flex justify-center items-center relative">
			<Sidebar />
			<section className="max-container pt-6 px-6 min-h-screen w-full lg:ml-[226px] xl:ml-[300px] flex justify-between items-center flex-col pb-6">
				{!movieData ? (
					<div className="flex w-full justify-center items-center flex-col h-screen">
						<LoadingAnimation text="Loading Movies..." />
					</div>
				) : (
					<div className="flex w-full justify-center items-center flex-col ">
						<div className="w-full  h-[500px] flex flex-1 justify-center">
							{!youtubeId ? (
								<LoadingAnimation text="Loading Trailer..." />
							) : (
								<iframe
									src={`https://www.youtube.com/embed/${youtubeId}`}
									allowFullScreen
									title="Embedded YouTube Video"
									className="rounded-xl lg:object-cover w-full h-auto aspect-video"
								></iframe>
							)}
							{/* <Image
								src={
									movieData.poster
										? movieData.poster
										: "/assets/placeholder.png"
								}
								alt={movieData.title}
								width={1000}
								height={500}
								priority={true}
								className="rounded-xl lg:object-cover"
							/> */}
						</div>
						<div className="flex justify-between items-center mt-6 w-full">
							<div className="flex gap-2 font-medium text-gray-700 text-[20px]">
								<p className="">{movieData.title}</p>•
								<p>{formatMonthAndYear(movieData.release_date, true)}</p>•
								<p>{movieData.adult ? "18+" : "PG-13"}</p>•
								<p>{formatHoursAndMinutes(Number(movieData.runtime))}</p>
								<div className="flex gap-2 ml-4 text-rose-700 text-[10px] sm:text-[12px] items-center">
									{movieData.genres.map(
										(genre: { id: number; name: string }) => (
											<span
												key={genre.id}
												className="border border-rose-700/30 rounded-full px-2 py-1"
											>
												{genre.name}
											</span>
										)
									)}
								</div>
							</div>

							<p className="flex gap-2 items-center justify-center sm:text-lg text-gray-700">
								<img
									src="/assets/Star.png"
									alt="star"
									className="w-5 h-5 mb-1"
								/>{" "}
								<span className="text-yellow-500 ">
									{movieData.imdb.toFixed(1)}
								</span>
								| {movieData.vote_count / 1000}k
							</p>
						</div>

						<div className="flex  justify-between w-full mt-10">
							<div className="text-gray-900 text-lg tracking-wide flex flex-col items-start  gap-6 w-full max-w-[60%] my-10">
								<p>{movieData.overview}</p>
								<p>
									{movieData.directors.length > 1
										? "Directors: "
										: "Director: "}
									{movieData.directors.map(
										(director: { id: number; name: string }) => (
											<span
												key={director.id}
												className="text-rose-700 font-medium"
											>
												{director.name}
											</span>
										)
									)}
								</p>
								<p className="flex gap-2 flex-wrap">
									{movieData.writers.length > 1 ? "Writers: " : "Writer: "}
									{uniqueWritters.map(
										(
											writer: { id: number; name: string },
											index: number,
											uniqueWritters: { id: number; name: string }[]
										) => {
											if (index === uniqueWritters.length - 1) {
												return (
													<span className="text-rose-700 font-medium">
														{writer.name}
													</span>
												);
											} else {
												return (
													<span className="text-rose-700 font-medium">
														{writer.name},
													</span>
												);
											}
										}
									)}
								</p>
								<p className="flex gap-2 flex-wrap">
									Stars:
									{movieData.stars.map(
										(
											star: { id: number; name: string },
											index: number,
											stars: { id: number; name: string }[]
										) => {
											if (index === stars.length - 1) {
												return (
													<span className="text-rose-700 font-medium">
														{star.name}
													</span>
												);
											} else {
												return (
													<span className="text-rose-700 font-medium">
														{star.name},
													</span>
												);
											}
										}
									)}
								</p>
								<div className="flex gap-4">
									<p>
										Budget:
										<span className="text-blue-700 font-medium">
											{" "}
											${formatCurrencyUSD(Number(movieData.budget))}{" "}
										</span>
									</p>
									<p>
										Revenue:
										<span
											className={`font-medium ${
												movieData.revenue > movieData.budget
													? "text-green-700"
													: "text-red-700"
											}`}
										>
											{" "}
											${formatCurrencyUSD(Number(movieData.revenue))}
										</span>
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-4 items-center justify-center mt-10">
								<button className="bg-rose-700 text-white p-2 w-[95%] rounded-xl text-lg md:text-2xl">
									Similar Movies
								</button>
								<p className="text-gray-700 text-xl lg:text-2xl uppercase font-bold tracking-wide">
									Trending Movies
								</p>
								<TrendingMoviesCard />
							</div>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
