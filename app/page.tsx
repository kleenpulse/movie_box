import FeaturedMovies from "@/components/FeaturedMovies";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";

export default function Home() {
	return (
		<main className="">
			<Hero />
			<FeaturedMovies />
		</main>
	);
}
