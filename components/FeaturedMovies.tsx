import React from "react";

export default function FeaturedMovies() {
	return (
		<section className="max-container pt-6 px-6 h-screen">
			<div className="flex justify-between items-center">
				<p className="font-bold text-[2.25rem] text-slate-800 ">
					Featured Movies
				</p>
				<button className="flex items-center gap-2 text-rose-700  text-[1.25rem]">
					See more <span>&gt;</span>
				</button>
			</div>
		</section>
	);
}
