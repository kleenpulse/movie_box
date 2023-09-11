import Image from "next/image";
import React from "react";

export const Nav = () => {
	return (
		<nav className="flex justify-between items-center text-white py-2 max-container w-full">
			<div className="flex items-center gap-4">
				<Image src={"/assets/tv.png"} width={40} height={40} alt="logo" />
				<span>MovieBox</span>
			</div>
			<form className="lg:flex items-center gap-4 hidden w-full max-w-[32.8125rem] relative ">
				<input
					type="text"
					className=" bg-transparent p-2 outline-none border-[2px] border-white rounded-md text-white w-full"
					placeholder="What do you want to watch?"
				/>
				<button className="absolute right-3">
					<Image
						src={"/assets/search.svg"}
						width={20}
						height={20}
						alt="search"
					/>
				</button>
			</form>
			<div className="flex items-center gap-4">
				<button>Sign in</button>
				<Image
					src={"/assets/burger.svg"}
					width={40}
					height={40}
					alt="menu"
					className="bg-rose-700 rounded-full p-1"
				/>
			</div>
		</nav>
	);
};
