"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import SearchLoader from "./loaders/SearchLoader";
import Link from "next/link";
import { formatMonthAndYear } from "@/constants/formatter";
import { genres } from "@/constants/genres";

import closeIcon from "../public/assets/close.svg";
import searchIcon from "../public/assets/search.svg";

const baseUrl = "http://image.tmdb.org/t/p";
export const Nav = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = async (searchQuery: string) => {
		setIsLoading(true);

		const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

		try {
			const response = await fetch(apiUrl, {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEBOX_API_KEY}`,
				},
			});

			if (!response.ok) {
				console.error("Error fetching data:", response.statusText);
			} else {
				const data = await response.json();

				setResults(data.results);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (query.trim() !== "") {
			handleSearch(query);
		} else {
			setResults([]);
		}
	}, [query]);

	return (
		<>
			<nav className="flex justify-between items-center text-white py-2  w-full relative ">
				<div className="flex items-center gap-4">
					<Image src={"/assets/tv.png"} width={40} height={40} alt="logo" />
					<span className="max-sm:hidden">MovieBox</span>
				</div>
				<form className="lg:flex items-center gap-4 hidden w-full max-w-[32.8125rem] relative ">
					<input
						type="text"
						className=" bg-transparent p-2 outline-none border-[2px] border-white rounded-md text-white w-full"
						placeholder="What do you want to watch?"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button
						className={`absolute right-6 ${
							query.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
						} `}
						disabled={!query.length}
						onClick={() => setQuery("")}
						title={query.length > 0 ? "Clear" : "type something"}
					>
						<Image
							src={query.length > 0 ? closeIcon : searchIcon}
							width={20}
							height={20}
							alt="search"
						/>
					</button>
				</form>
				<div className="flex items-center gap-4">
					<button className="max-sm:hidden">Sign in</button>
					<Image
						src={"/assets/burger.svg"}
						width={40}
						height={40}
						alt="menu"
						className="bg-rose-700 rounded-full p-1"
					/>
				</div>
			</nav>
			{isLoading ? (
				<div className=" lg:flex hidden justify-center items-center  w-full relative  max-h-[500px]">
					<div className="flex justify-center items-center gap-4  w-full max-w-[32.8125rem]  bg-black/80 absolute top-0 backdrop-blur-3xl rounded-b-3xl py-2">
						<SearchLoader text="Searching..." />
					</div>
				</div>
			) : (
				<div
					className={`flex flex-col justify-center items-center text-white py-2  w-full relative max-h-[500px] xl:max-h-[700px] ${
						query.length > 0 ? "" : "hidden"
					}`}
				>
					<div className="lg:flex flex-col justify-start items-start gap-4 hidden w-full max-w-lg  bg-black/20 h-[500px] xl:h-[700px] overflow-y-scroll overflow-x-hidden absolute top-0 backdrop-blur-2xl rounded-b-3xl py-2">
						{results.length > 0 ? (
							results.map((movie) => (
								<div
									className="lg:flex justify-start items-start gap-4 hidden w-full max-w-lg  bg-black/20 h-[500px] xl:h-full backdrop-blur-2xl rounded-3xl py-2"
									key={movie.id}
								>
									<Link
										href={`/movies/movie-details?title=${encodeURIComponent(
											movie.title
										)}&movieId=${encodeURIComponent(movie.id)}`}
										className="flex gap-3 px-2"
									>
										<div className="flex w-[270px]">
											<Image
												src={`${baseUrl}/w300/${movie.poster_path}`}
												alt={movie.title}
												width={100}
												height={100}
												objectFit="contain"
												data-testid="movie-poster"
												className="rounded-xl "
											/>
										</div>

										<div className="flex flex-col">
											<p>
												{movie.overview && movie.overview.length > 140
													? movie.overview.slice(0, 140) + "...."
													: movie.overview}
											</p>
											<div className="flex justify-between w-full items-center mt-2">
												<p
													data-testid="movie-release-date"
													className=" text-gray-400 font-medium"
												>
													{formatMonthAndYear(movie.release_date)}
												</p>
												<p className="flex items-center gap-2">
													<Image
														src={"/assets/imdb.png"}
														width={40}
														height={20}
														alt="imdb"
													/>
													{movie.vote_average}/100
												</p>
											</div>
											<p
												data-testid="movie-title"
												className="mt-1 font-bold capitalize"
											>
												{movie.title}
											</p>

											<p className="flex gap-2 text-gray-400 text-sm">
												{movie.genre_ids.map((tag: any) => {
													const tagsDisplay: JSX.Element[] = [];
													genres.map((genre) => {
														if (tag === genre.id) {
															tagsDisplay.push(
																<span key={genre.id}>{genre.name}</span>
															);
														}
													});
													return tagsDisplay;
												})}
											</p>
										</div>
									</Link>
								</div>
							))
						) : results.length === 0 ? (
							<div className="lg:flex flex-col justify-start items-center gap-4 hidden w-full h-[200px] max-w-[32.8125rem]  bg-black/60  absolute top-0 backdrop-blur-3xl rounded-b-3xl py-2">
								<p className="mt-8">No results for "{query}"</p>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			)}
		</>
	);
};
