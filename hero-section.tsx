import React, { useState, useEffect } from "react";

interface ListItem {
	id: number;
	text: string;
	liked: boolean;
}

function LikedList() {
	const [items, setItems] = useState<ListItem[]>(() => {
		const storedItems = localStorage.getItem("items");
		return storedItems ? JSON.parse(storedItems) : [];
	});

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items));
	}, [items]);

	const toggleLiked = (itemId: number) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, liked: !item.liked } : item
			)
		);
	};

	return (
		<div>
			<h1>Liked List Example</h1>
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						{item.text}{" "}
						<button onClick={() => toggleLiked(item.id)}>
							{item.liked ? "Unlike" : "Like"}
						</button>
						{item.liked ? " (Liked)" : ""}
					</li>
				))}
			</ul>
		</div>
	);
}

export default LikedList;
