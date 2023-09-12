import React from "react";

const LoadingAnimation = ({ text }: { text: string }) => {
	return (
		<>
			<div className="animate-spin rounded-full h-28 w-28 border-t-8 border-b-[6px] border-rose-700 border-opacity-70">
				<div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-rose-700"></div>
			</div>
			<div className="animate-blink">
				<p className=" mt-4 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-rose-700 w-fit text-transparent bg-clip-text ">
					{text}
				</p>
			</div>
		</>
	);
};

export default LoadingAnimation;
