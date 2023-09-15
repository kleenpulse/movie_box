import React from "react";

const SearchLoader = ({ text }: { text: string }) => {
	return (
		<>
			<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-[2px] border-rose-700 border-opacity-70">
				<div className="w-4 h-4 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-rose-700"></div>
			</div>
			<div className="animate-blink">
				<p className=" ml-4 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-rose-700 w-fit text-transparent bg-clip-text ">
					{text}
				</p>
			</div>
		</>
	);
};

export default SearchLoader;
