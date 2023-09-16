import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const Error404 = () => {
	const router = useRouter();
	return (
		<div
			id="error-wrapper"
			className="w-full text-white flex flex-col items-center justify-start text-[color:var(--color)] perspective-12 pt-24 lg:pt-32"
		>
			<h1
				id="error-heading"
				className="text-[5rem] sm:text-[10rem] xl:text-[15rem] uppercase"
			>
				Error
			</h1>
			<div className="text-center uppercase leading-8 z-50">
				<h2 className="text-2xl sm:text-3xl xl:text-4xl">
					We can't find that page OR Something went wrong
				</h2>
				<p className="tracking-wide">
					We're fairly sure that page used to be here, but seems to have gone
					missing. We do apologise on it's behalf.
				</p>

				<div className="mt-4 sm:mt-8">
					<div className="flex w-full justify-center gap-3">
						<Link
							href="/"
							className="border border-gray-200 rounded-full px-4 py-2 w-fit flex gap-2 items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
								/>
							</svg>
							Go-to Home
						</Link>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0 top-0 left-0 right-0 overflow-hidden">
				<div className="cloak__container">
					<div className="cloak"></div>
				</div>
			</div>
		</div>
	);
};
