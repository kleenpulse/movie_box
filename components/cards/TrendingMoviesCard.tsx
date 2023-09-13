"use client";
import axios from "axios";
import Image from "next/image";
import listIcon from "../../public/assets/list-icon.png";
import React, { useEffect, useState } from "react";

const baseUrl = "http://image.tmdb.org/t/p";
export const TrendingMoviesCard = () => {
	const [trending, setTrending] = useState([]);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
			},
		};
		const fetchDetails = async () => {
			try {
				await axios
					.request(options)
					.then(function (response) {
						console.log(response.data.results);
						setTrending(response.data.results);
					})
					.catch(function (error) {
						console.error(error);
					});
			} catch (error) {
				console.error(error);
			}
		};
		fetchDetails();
	}, []);
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
		<div className="flex h-[400px] p-4 w-full">
			<div className="flex h-[229px] w-full min-w-[360px] rounded-xl overflow-hidden gap-1 relative">
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
				<p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl w-[95%] text-gray-100 p-2 flex items-center">
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
};
