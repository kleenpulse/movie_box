"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import Link from "next/link";

import LoadingAnimation from "@/components/LoadingAnimation";
import { Sidebar } from "@/components/Sidebar";

import Image from "next/image";
import {
	formatCurrencyUSD,
	formatHoursAndMinutes,
	formatMonthAndYear,
} from "@/constants/formatter";
import { TrendingMoviesCard } from "@/components/cards/TrendingMoviesCard";

const baseUrl = "http://image.tmdb.org/t/p";
export default function FeaturedMovies({
	searchParams: { movieId },
}: {
	searchParams: { movieId: string };
}) {
	const [movieData, setMovieData] = useState({
		poster: "",
		title: "",
		release_date: "",
		rotten_tomatoes: "",
		location: "",
		overview: "",
		imdb: 0,
		runtime: "",
		genres: [],
		adult: false,
		vote_count: 0,
		budget: 0,
		revenue: 0,
		directors: [],
		writers: [],
		stars: [],
	});

	const seen = new Set();
	const uniqueWritters = movieData.writers.filter(
		(el: { id: number; name: string }) => {
			const duplicate = seen.has(el.id);
			seen.add(el.id);
			return !duplicate;
		}
	);
	useEffect(() => {
		const options = {
			method: "GET",
			url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
			},
		};
		const fetchMovies = async () => {
			try {
				await axios
					.request(options)
					.then(function (response) {
						console.log(response.data);
						setMovieData({
							revenue: response.data.revenue,
							poster: `${baseUrl}/original${response.data.backdrop_path}`,
							title: response.data.title,
							release_date: response.data.release_date,
							rotten_tomatoes: response.data.rotten_tomatoes,
							location: response.data.production_countries[0].name,
							overview: response.data.overview,
							imdb: response.data.vote_average,
							runtime: response.data.runtime,
							genres: response.data.genres,
							adult: response.data.adult,
							vote_count: response.data.vote_count,
							budget: response.data.budget,
							directors: response.data.credits.crew.filter(
								(crew: { known_for_department: string; job: string }) =>
									crew.known_for_department === "Directing" &&
									crew.job === "Director"
							),
							writers: response.data.credits.crew.filter(
								(crew: { department: string; job: string }) =>
									crew.department === "Writing"
							),
							stars: response.data.credits.cast.filter(
								(cast: {
									character: string;
									order: number;
									known_for_department: string;
								}) => cast.order <= 3 && cast.known_for_department === "Acting"
							),
						});
					})
					.catch(function (error) {
						console.error(error);
					});
			} catch (error) {
				console.log("ERROR", error);
			}
		};

		fetchMovies();
	}, []);
	console.log(movieData.writers);
	return (
		<main className="w-full flex justify-center items-center relative">
			<Sidebar />
			<section className="max-container pt-6 px-6 min-h-screen w-full lg:ml-[226px] flex justify-between items-center flex-col pb-6">
				{!movieData ? (
					<div className="flex w-full justify-center items-center flex-col h-screen">
						<LoadingAnimation text="Loading Movies..." />
					</div>
				) : (
					<div className="flex w-full justify-center items-center flex-col ">
						<div className="w-full  h-auto ">
							{/* TODO: Add Video Trail from YT base URL:https://www.youtube.com/watch?v=${movieData.videos.results[0].key} */}
							<Image
								src={
									movieData.poster
										? movieData.poster
										: "/assets/placeholder.png"
								}
								alt={movieData.title}
								width={1000}
								height={500}
								priority={true}
								className="rounded-xl object-contain"
							/>
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
											<span key={director.id}>{director.name}</span>
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
												return <span>{writer.name}</span>;
											} else {
												return <span>{writer.name},</span>;
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
												return <span>{star.name}</span>;
											} else {
												return <span>{star.name},</span>;
											}
										}
									)}
								</p>
								<div className="flex gap-4">
									<p>
										Budget:
										<span>
											{" "}
											${formatCurrencyUSD(Number(movieData.budget))}{" "}
										</span>
									</p>
									<p>
										Revenue:
										<span
											className={`${
												movieData.revenue > movieData.budget
													? "text-green-500"
													: "text-rose-700"
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
