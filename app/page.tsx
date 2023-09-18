import FeaturedMovies from "@/components/FeaturedMovies";
import { Foobar } from "@/components/Foobar";
import { Hero } from "@/components/Hero";
import Image from "next/image";

export default function Home() {
	return (
		<main>
			<Hero />
			<section className=" flex justify-center w-full">
				<FeaturedMovies />
			</section>
			<Foobar />
		</main>
	);
}
