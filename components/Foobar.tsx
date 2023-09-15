import React from "react";
import { FbIcon } from "./icons/FbIcon";
import { InstaIcon } from "./icons/InstaIcon";
import { XIcon } from "./icons/XIcon";
import { YTIcon } from "./icons/YTIcon";

export const Foobar = () => {
	return (
		<div
			id="footer"
			className="w-full flex flex-col items-center mt-6 sm:mt-8 md:mt-16 xl:mt-24 mb-6 md:mb-8 xl:mb-12"
		>
			<div className="flex gap-2 sm:gap-4 lg:gap-10 xl:gap-16 mb-6 md:mb-8 xl:mb-12">
				<FbIcon />
				<InstaIcon />
				<XIcon />
				<YTIcon />
			</div>
			<div className="flex max-sm:flex-col text-center gap-2 sm:gap-4 lg:gap-10 xl:gap-16 font-medium text-lg mb-6 md:mb-8 xl:mb-12">
				<p>Condition of Use</p>
				<p>Privacy & Policy</p>
				<p>Press Room</p>
			</div>
			<div className="flex">
				<p>© 2021 MovieBox by Adriana Eka Prayudha</p>
			</div>
		</div>
	);
};
