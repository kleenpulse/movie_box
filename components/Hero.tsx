"use client";
export const revalidate = 86400;

import { fetchTrendingMovies } from "@/libs/data-fetcher";
import { Nav } from "./Nav";
import Image from "next/image";

import { useEffect, useState } from "react";
import HeroSlider, { MenuNav, Slide, SideNav, ButtonsNav } from "hero-slider";
import Link from "next/link";

interface MovieProps {
	id: string;
	backdrop_path: string;
	title: string;
	release_date: string;
	rotten_tomatoes?: string;
	location?: string;
	overview?: string;
	vote_average: number;
	tags: number[];
}

const baseUrl = "http://image.tmdb.org/t/p";
export const Hero = () => {
	const [data, setData] = useState([]);

	const [windowSize, setWindowSize] = useState(1279);

	useEffect(() => {
		// Define your data fetching logic here
		fetch("/api/popular")
			.then((response) => response.json())
			.then((data) => {
				setData(data.results);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
		const handleWindowResize = () => {
			if (typeof window !== "undefined") {
				setWindowSize(window.innerWidth);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleWindowResize);
		}

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (
		<section className="w-full xl:h-[900px] min-[1440px]:h-[900px] h-[500px] sm:h-[700px] max-sm:h-[500px]  bg-cover bg-no-repeat px-8 xl:bg-center pt-4  relative bg-black/20">
			<div className="relative z-20 w-full">
				<Nav />
			</div>
			<div className="absolute top-0 left-0 w-full h-full  xl:h-[900px] min-[1440px]:h-[900px] h-[500px] sm:h-[700px] max-sm:h-[500px]">
				<HeroSlider
					// make the height prop responsive for all screens
					autoplay
					height={
						windowSize > 1279
							? "900px"
							: "900px"
							? windowSize >= 700
								? "700px"
								: "700px"
								? windowSize >= 300 && windowSize <= 640
									? "500px"
									: "700px"
								: "700px"
							: "900px"
					}
					style={{
						backgroundColor: "#000",
					}}
					width={"100%"}
					animations={{
						shouldManageAnimationSequence: true,
						sliderFadeInDuration: 200,
						slidingAnimation: "fade",
					}}
					controller={{
						initialSlide: 1,
						slidingDuration: 200,
						slidingDelay: 0,

						onSliding: (nextSlide) =>
							console.debug("onSliding(nextSlide): ", nextSlide),
						onBeforeSliding: (previousSlide, nextSlide) =>
							console.debug(
								"onBeforeSliding(previousSlide, nextSlide): ",
								previousSlide,
								nextSlide
							),
						onAfterSliding: (nextSlide) =>
							console.debug("onAfterSliding(nextSlide): ", nextSlide),
					}}
					accessibility={{
						shouldDisplayButtons: false,
						thresholdToSlide: 50,
					}}
				>
					{data.slice(0, 5).map((movie: MovieProps, index) => (
						<Slide label={movie.title} key={movie.id}>
							<div>
								<Image
									src={`${baseUrl}/original${movie.backdrop_path}`}
									fill
									priority
									objectFit="center"
									sizes="(max-width: 768px) 100vw,"
									alt="movie poster"
									loading="eager"
								/>
							</div>
							<div className="relative z-40 h-full bg-black/10">
								<div className="flex w-full justify-start items-center h-full text-gray-50 bg-black/30 ">
									<div className="flex flex-col items-center md:items-start w-full md:max-w-[500px] md:pl-10 xl:max-w-[700px] xl:pl-12">
										<p className="  font-bold text-white xl:text-[5rem] text-[48px] xl:leading-[90px] leading-[56px]">
											{movie.title}
										</p>
										<div className="flex justify-between items-center mt-6">
											<p className="flex items-center gap-2 text-lg">
												<Image
													src={"/assets/imdb.png"}
													width={40}
													height={20}
													alt="search"
												/>
												<span className="text-gray-300">
													{movie.vote_average * 10}/100
												</span>
											</p>
											<p className="flex items-center gap-2 ml-8 text-lg">
												<Image
													src={"/assets/tomatoes.png"}
													width={20}
													height={20}
													alt="search"
												/>
												<span className="text-gray-300">
													{movie.vote_average * 10 - 10}%
												</span>
											</p>
										</div>
										<div className="w-full max-w-sm mt-6 md:max-w-[400px] xl:max-w-[550px] flex justify-center flex-col items-center md:items-start max-md:text-center ">
											<div className="text-gray-100 sm:text-xl">
												{windowSize < 768 ? (
													<p>
														{movie.overview && movie.overview.length > 140
															? movie.overview.slice(0, 140) + "...."
															: movie.overview}
													</p>
												) : (
													<p>{movie.overview}</p>
												)}
											</div>

											<Link
												href={`/movies/movie-details?title=${encodeURIComponent(
													movie.title
												)}&movieId=${encodeURIComponent(movie.id)}`}
											>
												<button className="mt-4 bg-rose-700 rounded-md pr-3 p-2 flex items-center uppercase text-white font-bold text-lg xl:text-2xl hover:bg-white hover:text-rose-700 hover:border border-rose-700 transition-all duration-200 group/play">
													<Image
														src={"/assets/play.svg"}
														width={30}
														height={30}
														alt="play button"
														className="mx-2 group-hover/play:invert transition-all duration-200"
													/>
													Watch trailer
												</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</Slide>
					))}
					{windowSize > 700 ? (
						<>
							<SideNav activeColor="#fff" isPositionedRight right={"3rem"} />
							<MenuNav activeColor="#BE123C" />
						</>
					) : (
						<ButtonsNav activeColor="#BE123C" />
					)}
				</HeroSlider>
			</div>
		</section>
	);
};
