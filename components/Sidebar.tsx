import { sidebarLinks } from "@/constants/sidebar-links";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
	return (
		<section className="fixed top-0 left-0 min-h-screen hidden lg:flex flex-col  items-center w-[226px] border-r border-gray-400/90 py-4 lg:py-8 rounded-r-[3rem]">
			<div className="flex  items-center gap-4">
				<Image src={"/assets/tv.png"} width={40} height={40} alt="logo" />
				<span className="text-gray-900 font-medium text-lg lg:text-2xl">
					MovieBox
				</span>
			</div>
			<div className="flex w-full flex-col justify-between flex-1">
				<div className="flex flex-col gap-4 justify-between mt-10 sm:mt-40 items-start pl-10">
					{sidebarLinks.map((link) => {
						return (
							<Link
								key={link.name}
								href={link.link}
								className="flex items-center gap-3 mb-8"
							>
								<Image src={link.icon} alt={link.name} width={30} height={30} />
								{link.name}
							</Link>
						);
					})}
				</div>
				<div className="flex">Modal</div>
			</div>
		</section>
	);
};
