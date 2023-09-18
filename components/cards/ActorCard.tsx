"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
	image: string;
	name: string;
	character: string;
	gender: string;
}

const baseUrl = "http://image.tmdb.org/t/p";
export const ActorCard = ({ image, name, character, gender }: Props) => {
	return (
		<div
			data-testid="movie-card"
			className="flex items-center gap-4 border-gray-300 border p-2 rounded-full"
		>
			<Image
				src={`${baseUrl}/w185${image}`}
				alt={name}
				width={150}
				height={150}
				data-testid="actor-poster"
				objectPosition="center"
				className="ml-4 my-2 rounded-full object-cover h-[170px] w-[170px]"
			/>
			<div className="flex flex-col gap-4">
				<p className="font-bold text-gray-700 text-xl">{name}</p>
				<p>({character})</p>
			</div>
		</div>
	);
};
