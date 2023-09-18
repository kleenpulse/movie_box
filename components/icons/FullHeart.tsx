export default function FullHeart() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className="w-10 h-10"
		>
			<defs>
				<linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style={{ stopColor: "#be0505", stopOpacity: 1 }} />
					<stop
						offset="100%"
						style={{ stopColor: "#ff0000", stopOpacity: 1 }}
					/>
				</linearGradient>
			</defs>
			<path
				d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001"
				fill="url(#redGradient)"
				stroke="#fff"
				strokeWidth={0.6}
			/>
		</svg>
	);
}
