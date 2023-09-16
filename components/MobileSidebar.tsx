"use client";
import { sidebarLinks } from "@/constants/sidebar-links";
import Image from "next/image";
import Link from "next/link";
import logoutIcon from "../public/assets/logout-icon.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import closeIcon from "../public/assets/close.svg";
function getActiveLink(path: string) {
	const match = path.match(/\/([^/]+)/);
	return match ? match[1] : null;
}
export const MobileSidebar = ({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const currPath = usePathname();
	const activeLink = getActiveLink(currPath);

	return (
		<section className="fixed top-0 left-0 min-h-screen flex lg:hidden flex-col  items-center w-[270px] sm:w-[300px]  border-r border-gray-400/90 py-4 rounded-r-[2rem] bg-white">
			<div className=" mt-2 flex justify-evenly items-center w-full">
				<Link
					href={"/"}
					className="flex w-full justify-start pl-8 items-center gap-4"
				>
					<Image src={"/assets/tv.png"} width={40} height={40} alt="logo" />
					<span className="text-gray-900 font-medium text-lg lg:text-2xl max-sm:hidden">
						MovieBox
					</span>
				</Link>
				<button className="mr-2 cursor-pointer" onClick={() => setOpen(false)}>
					<Image
						src={closeIcon}
						alt="logout"
						width={40}
						height={40}
						className="invert"
					/>
				</button>
			</div>
			<div className="flex w-full flex-col justify-between flex-1">
				<div className="flex flex-col  justify-between mt-10 sm:mt-36  items-start">
					{sidebarLinks.map((link) => {
						return (
							<Link
								key={link.name}
								href={link.link}
								className={`flex items-center gap-4 py-6 lg:py-8 hover:bg-rose-700/10 w-full pl-8 transition-colors duration-300 text-gray-800 text-lg lg:text-2xl font-medium hover:text-rose-700 hover:font-bold ${
									link.link.substring(1) === activeLink
										? "!text-rose-700 bg-rose-700/10 border-r-[5px] border-rose-700 !font-bold"
										: null
								}`}
							>
								<Image src={link.icon} alt={link.name} width={30} height={30} />
								<span className=""> {link.name}</span>
							</Link>
						);
					})}
				</div>
				<div className="flex flex-col items-start w-full px-5 ">
					<div className="flex flex-col items-center bg-rose-300/5 p-4 border-2 border-rose-700/40 rounded-3xl mb-10 lg:mb-20 xl:mb-24">
						<p className="font-bold text-[16px] py-4 text-gray-700/90">
							Play movie quizes and earn free tickets
						</p>
						<p className="text-gray-700 text-[13px]">
							40k people are playing now
						</p>
						<button className="bg-rose-700/20 text-rose-700 font-medium py-1 px-2 mt-2 rounded-full w-[90%]">
							Start playing
						</button>
					</div>
					<button className="flex items-center gap-2 mb-6 h-[50px]">
						<Image src={logoutIcon} alt="logout" width={40} height={40} />
						<span className="text-gray-700 text-lg lg:text-2xl font-medium">
							Logout
						</span>
					</button>
				</div>
			</div>
		</section>
	);
};
