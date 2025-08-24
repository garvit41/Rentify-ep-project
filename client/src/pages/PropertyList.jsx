import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { setPropertyList } from "../redux/state";
import { getUserProperties } from "../services/PropertyService";

const PropertyList = () => {
	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.user);
	const propertyList = user?.propertyList;

	const dispatch = useDispatch();

	const getPropertyList = async () => {
		try {
			const data = await getUserProperties(user._id);
			dispatch(setPropertyList(data));
			setLoading(false);
		} catch (err) {
			console.log("Fetch all properties failed", err.message);
		}
	};

	useEffect(() => {
		if (user?._id) getPropertyList();
	}, [user?._id]);

	return loading ? (
		<Loader />
	) : (
		<>
			<Navbar />
			<h1 className="title-list">Your Property List</h1>
			<div className="list">
				{propertyList?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
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

export default PropertyList;
