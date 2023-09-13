import homeIcon from "../public/assets/Home.png";
import calendarIcon from "../public/assets/Calendar.png";
import tvShowIcon from "../public/assets/tv-show.png";
// import movies from "../public/assets/Movie.png";
import videoIcon from "../public/assets/videoIcon.svg";
import { StaticImageData } from "next/image";

interface SideLinkProps {
	name: string;
	link: string;
	icon: StaticImageData;
}

export const sidebarLinks: SideLinkProps[] = [
	{
		name: "Home",
		link: "/",
		icon: homeIcon,
	},
	{
		name: "Movies",
		link: "/movies",
		icon: videoIcon,
	},
	{
		name: "TV Series",
		link: "/tv-series",
		icon: tvShowIcon,
	},
	{
		name: "Upcoming",
		link: "/discover",
		icon: calendarIcon,
	},
];
