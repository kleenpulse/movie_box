import Image from "next/image";
import listIcon from "../../public/assets/list-icon.png";
import { fetchTrendingMovies } from "@/libs/data-fetcher";

const baseUrl = "http://image.tmdb.org/t/p";
export default async function TrendingMoviesCard() {
	const data = await fetchTrendingMovies(true);
	const trending = data.results;

	// list all the months
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const month = months[new Date().getUTCMonth()];
	return (
		<div className="flex h-[400px] max-lg:h-[500px] p-4 w-full ">
			<div className="flex h-[229px] w-full min-w-[360px] max-lg:justify-center rounded-xl overflow-hidden gap-1 relative">
				{trending.slice(0, 3).map((movie: any) => (
					<Image
						key={movie.id}
						src={`${baseUrl}/w154${movie.poster_path}`}
						alt={movie.title}
						width={120}
						height={229}
						loading="lazy"
						className={`object-cover`}
					/>
				))}
				<p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl w-[95%] text-gray-100 p-2 flex items-center max-lg:w-full max-lg:justify-center">
					<Image
						src={listIcon}
						width={20}
						height={20}
						alt="play button"
						className="mx-2 invert"
					/>
					Trending Movies in {month}
				</p>
			</div>
		</div>
	);
}
