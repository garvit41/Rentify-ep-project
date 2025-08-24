import { useEffect, useState } from "react";
import { categories } from "../data";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const listings = useSelector((state) => state.listings);

	const getFeedListings = async () => {
		try {
			const response = await fetch(
				selectedCategory !== "All" ? `http://localhost:3001/properties?category=${selectedCategory}` : "http://localhost:3001/properties"
			);
			const data = await response.json();
			dispatch(setListings({ listings: data }));
			setLoading(false);
		} catch (err) {
			console.log("Fetch Listings Failed", err.message);
		}
	};

	useEffect(() => {
		getFeedListings();
	}, [selectedCategory]);

	return (
		<>
			{/* Category List */}
			<div className="flex flex-wrap justify-center gap-14 px-5 sm:px-5 py-12">
				{categories?.map((category, index) => (
					<div
						key={index}
						onClick={() => setSelectedCategory(category.label)}
						className={`flex flex-col items-center cursor-pointer transition-colors ${
							category.label === selectedCategory ? "text-pink-500" : "text-gray-600"
						} hover:text-pink-500`}
					>
						<div className="text-2xl">{category.icon}</div>
						<p className="text-lg font-bold">{category.label}</p>
					</div>
				))}
			</div>

			{/* Listings */}
			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-wrap justify-center gap-1 px-5 lg:px-5 pb-32">
					{listings.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
						<ListingCard
							key={_id}
							listingId={_id}
							creator={creator}
							listingPhotoPaths={listingPhotoPaths}
							city={city}
							province={province}
							country={country}
							category={category}
							type={type}
							price={price}
							booking={booking}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default Listings;
