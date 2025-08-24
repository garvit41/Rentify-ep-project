import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { setListings } from "../redux/state";
import { getListingsBySearch } from "../services/ListingsService";

const SearchPage = () => {
	const [loading, setLoading] = useState(true);
	const { search } = useParams();
	const listings = useSelector((state) => state.listings);
	const dispatch = useDispatch();

	const fetchSearchListings = async () => {
		try {
			const data = await getListingsBySearch(search); // service layer
			dispatch(setListings({ listings: data }));
			setLoading(false);
		} catch (err) {
			console.log("Fetch Search List failed!", err.message);
		}
	};

	useEffect(() => {
		fetchSearchListings();
	}, [search]);

	return loading ? (
		<Loader />
	) : (
		<>
			<Navbar />
			<h1 className="title-list">{search}</h1>
			<div className="list">
				{listings?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
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
			<Footer />
		</>
	);
};

export default SearchPage;
