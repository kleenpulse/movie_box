import React from "react";
import { Nav } from "./Nav";
import Image from "next/image";

export const Hero = () => {
	return (
		<section className="bg-hero-bg w-full xl:h-screen h-[37.5rem] bg-cover bg-no-repeat flex flex-col items-center px-8 xl:bg-center pt-4">
			<Nav />
			<div className="max-container flex w-full justify-between items-center h-full">
				<div className="flex flex-col items-start w-full max-w-[500px] ">
					<p className="   font-bold text-white xl:text-[4rem] text-[48px] xl:leading-[70px] leading-[56px]">
						John Wick 3 : Parabellum
					</p>
					<div className="flex justify-between items-center mt-6">
						<p className="flex items-center gap-2 text-lg">
							<Image
								src={"/assets/imdb.png"}
								width={40}
								height={20}
								alt="search"
							/>
							<span className="text-gray-300">86/100</span>
						</p>
						<p className="flex items-center gap-2 ml-8 text-lg">
							<Image
								src={"/assets/tomatoes.png"}
								width={20}
								height={20}
								alt="search"
							/>
							<span className="text-gray-300">97%</span>
						</p>
					</div>
					<div className="w-full mt-6 max-w-[19.875rem] xl:max-w-[25.8125rem]">
						<p className=" text-gray-300">
							John Wick is on the run after killing a member of the
							international assassins' guild, and with a $14 million price tag
							on his head, he is the target of hit men and women everywhere.
						</p>
						<button className="mt-4 bg-rose-700 rounded-md pr-3 p-2 flex items-center uppercase text-white font-bold text-lg xl:text-2xl">
							<Image
								src={"/assets/play.svg"}
								width={30}
								height={30}
								alt="play button"
								className="mx-2"
							/>
							Watch trailer
						</button>
					</div>
				</div>
				<div>
					{[1, 2, 3, 4, 5].map((i) => (
						<div
							key={i}
							className="relative flex items-center justify-center mb-2 lg:mb-4"
						>
							<div
								className={`bg-gray-400 h-1 w-5 absolute right-0 mr-4 lg:mr-6 rounded ${
									i === 3 ? "font-bold !bg-white scale-105" : ""
								} `}
							/>
							<p
								className={`text-gray-400 text-lg xl:text-3xl ${
									i === 3 ? "font-bold !text-white scale-105" : ""
								}`}
							>
								{i}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
