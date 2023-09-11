"use client";
import FeaturedMovies from "@/components/FeaturedMovies";
import { Hero } from "@/components/Hero";

export default function Home() {
	return (
		<main>
			<Hero />
			<section className=" flex justify-center w-full">
				<FeaturedMovies />
			</section>
		</main>
	);
}
