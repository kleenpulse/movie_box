"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MobileSidebar } from "./MobileSidebar";

export default function MobileNav({ title }: { title: string }) {
	const [open, setOpen] = useState(false);
	return (
		<section className="lg:hidden w-full relative">
			<div className="flex justify-between items-center w-full px-3 fixed top-0 left-0 text-white font-bold tracking-wide bg-black/25 h-16 backdrop-blur-xl">
				<Link href={"/"} className="flex items-center gap-4">
					<Image src={"/assets/tv.png"} width={40} height={40} alt="logo" />
					<span className="max-sm:hidden">MovieBox</span>
				</Link>
				<h1 className="text-2xl uppercase">{title}</h1>
				<div
					className="flex items-center gap-4 cursor-pointer"
					onClick={() => setOpen(!open)}
				>
					{!open && (
						<Image
							src={"/assets/burger.svg"}
							width={40}
							height={40}
							alt="menu"
							className="bg-rose-700 rounded-full p-1"
						/>
					)}
				</div>
			</div>
			{open && (
				<>
					<div className=" fixed top-0 right-0 w-full min-h-screen h-screen bg-black/25 backdrop-blur-md" />
					<MobileSidebar setOpen={setOpen} />
				</>
			)}
		</section>
	);
}
