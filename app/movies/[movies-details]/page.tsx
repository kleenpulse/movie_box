"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MovieCard } from "@/components/cards/MovieCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Sidebar } from "@/components/Sidebar";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
	formatHoursAndMinutes,
	formatMonthAndYear,
} from "@/constants/formatDate";

export default function FeaturedMovies({
	searchParams: { movieId },
}: {
	searchParams: { movieId: string };
}) {
	const pathname = useParams();
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
	});

	const baseUrl = "http://image.tmdb.org/t/p";
	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=videos`,
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU1MTY1MGM1NDA5NzcwYTEyNjAzMWQwOThhMzhlZCIsInN1YiI6IjY0ZmVjOTU1MmRmZmQ4MDEwMDE0M2NjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tV56ctRSvA8CFDGcEXB6v5GbJ20opdUx-eQ5t-Bge3Y",
		},
	};
	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				setMovieData({
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
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	return (
		<main className="w-full flex justify-center items-center relative">
			<Sidebar />
			<section className="max-container pt-6 px-6 min-h-screen w-full lg:ml-[226px] flex justify-between items-center flex-col pb-6">
				<div className="flex w-full justify-center items-center flex-col ">
					<div className="w-full  h-auto ">
						<Image
							src={movieData.poster}
							alt={movieData.title}
							width={1000}
							height={500}
							className="rounded-xl object-contain"
							style={{
								width: "100%",
							}}
						/>
					</div>
					<div className="flex justify-between items-center mt-6 w-full">
						<div className="flex gap-2 font-medium text-gray-700 text-[20px]">
							<p className="">{movieData.title}</p>•
							<p>{formatMonthAndYear(movieData.release_date, true)}</p>•
							<p>{movieData.adult ? "18+" : "PG-13"}</p>•
							<p>{formatHoursAndMinutes(Number(movieData.runtime))}</p>
							<div className="flex gap-2 ml-4 text-rose-700 text-sm items-center">
								{movieData.genres.map((genre: { id: number; name: string }) => (
									<span
										key={genre.id}
										className="border border-rose-700/50 rounded-full px-2 py-1"
									>
										{genre.name}
									</span>
								))}
							</div>
						</div>

						<p className="flex gap-2 items-center justify-center">
							<img src="/assets/Star.png" alt="star" className="w-5 h-5" />{" "}
							{movieData.imdb.toFixed(1)} | {movieData.vote_count / 1000}k
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
