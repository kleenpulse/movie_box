"use client";
import { formatMonthAndYear } from "@/constants/formatter";
import { genres } from "@/constants/genres";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Heart from "../icons/Heart";
import FullHeart from "../icons/FullHeart";

interface Props {
	poster: string;
	title: string;
	release_date: string;
	rotten_tomatoes?: string;
	location?: string;
	overview?: string;
	imdb?: string;
	tags: number[];
	movieId: string;
}
export const MovieCard = ({
	poster,
	title,
	release_date,
	rotten_tomatoes,
	location,
	overview,
	imdb,
	tags,
	movieId,
}: Props) => {
	const localStorageKey = `liked-${movieId}`;

	const router = useRouter();
	const [liked, setLiked] = useState<boolean>(() => {
		// Check if localStorage is available
		if (typeof localStorage !== "undefined") {
			const storedValue = localStorage.getItem(localStorageKey);
			return storedValue ? JSON.parse(storedValue) : false;
		} else {
			return false; // Default value when localStorage is not available
		}
	});
	// Use useEffect to save the liked state to localStorage whenever it changes
	// Also prefetch the details route
	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(liked));

		// Prefetch the details route
		router.prefetch(
			"/movies/movie-details?title=" + title + "&movieId=" + movieId
		);
	}, [liked, localStorageKey, title, movieId]);

	const tagsDisplay: JSX.Element[] = [];
	// map and display tags
	tags.map((tag) => {
		genres.map((genre) => {
			if (tag === genre.id) {
				tagsDisplay.push(<span key={genre.id}>{genre.name}</span>);
			}
			return null;
		});
	});

	return (
		<div
			data-testid="movie-card"
			className="cursor-pointer relative flex flex-col w-[300px]  h-[530px] overflow-hidden"
		>
			{liked ? (
				<div
					className={`absolute top-2 left-2 cursor-pointer hover:text-white text-red-500 transition-all duration-300`}
					onClick={() => {
						setLiked(false);
					}}
				>
					<FullHeart />
				</div>
			) : (
				<div
					className="absolute top-2 left-2 cursor-pointer hover:text-red-500 transition-all duration-300 bg-black/30 rounded-full"
					onClick={() => {
						setLiked(true);
					}}
				>
					<Heart />
				</div>
			)}
			<Link
				href={`/movies/movie-details?title=${encodeURIComponent(
					title
				)}&movieId=${encodeURIComponent(movieId)}`}
			>
				<Image
					src={poster}
					alt={title}
					width={300}
					height={300}
					data-testid="movie-poster"
					className="rounded-xl peer"
				/>
				<p
					className={`text-white h-[0px] w-[280px] absolute bottom-[14px] px-1 pt-1 peer-hover:bg-black/50 backdrop-blur-xl peer-hover:h-[128px] transition-all duration-300 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-t-xl overflow-hidden pointer-events-none`}
				>
					{overview && overview.length > 140
						? overview.slice(0, 140) + "...."
						: overview}
				</p>
				<div className="flex justify-between w-full items-center mt-2">
					<p
						data-testid="movie-release-date"
						className=" text-gray-400 font-medium"
					>
						{formatMonthAndYear(release_date)}
					</p>
					<p className="flex items-center gap-2">
						<Image src={"/assets/imdb.png"} width={40} height={20} alt="imdb" />
						{imdb}/10
					</p>
				</div>
				<p data-testid="movie-title" className="mt-1 font-bold capitalize">
					{title}
				</p>

				<p className="flex gap-2 text-gray-400 text-sm">{tagsDisplay}</p>
			</Link>
		</div>
	);
};
