import Image from "next/image";
import React from "react";

interface Props {
	poster: string;
	title: string;
	release_date: string;
	rotten_tomatoes?: string;
	location?: string;
	overview?: string;
}
export const MovieCard = ({
	poster,
	title,
	release_date,
	rotten_tomatoes,
	location,
	overview,
}: Props) => {
	return (
		<div data-testid="movie-card" className="cursor-pointer peer">
			<Image
				src={poster}
				alt={title}
				width={300}
				height={300}
				data-testid="movie-poster"
				className="rounded-xl"
			/>

			<p
				data-testid="movie-release-date"
				className="mt-2 text-gray-400 font-medium"
			>
				{release_date.replace(/-/g, " ")}
			</p>
			<p data-testid="movie-title" className="mt-1 font-bold capitalize">
				{title}
			</p>
		</div>
	);
};
