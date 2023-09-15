import calendarIcon from "../public/assets/calendar.svg";
import tvShowIcon from "../public/assets/tv-show.svg";

import videoIcon from "../public/assets/videoIcon.svg";
import homeIcon from "../public/assets/home-icon.svg";
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
