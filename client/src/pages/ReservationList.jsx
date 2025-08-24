import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { setReservationList } from "../redux/state";
import { getReservationsByUser } from "../services/ReservationService";

const ReservationList = () => {
	const [loading, setLoading] = useState(true);
	const userId = useSelector((state) => state.user._id);
	const reservationList = useSelector((state) => state.user.reservationList);
	const dispatch = useDispatch();

	const fetchReservationList = async () => {
		try {
			const data = await getReservationsByUser(userId); // service layer
			dispatch(setReservationList(data));
			setLoading(false);
		} catch (err) {
			console.log("Fetch Reservation List failed!", err.message);
		}
	};

	useEffect(() => {
		fetchReservationList();
	}, [userId]);

	return loading ? (
		<Loader />
	) : (
		<>
			<Navbar />
			<h1 className="title-list">Your Reservation List</h1>
			<div className="list">
				{reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
					<ListingCard
						key={listingId._id}
						listingId={listingId._id}
						creator={hostId._id}
						listingPhotoPaths={listingId.listingPhotoPaths}
						city={listingId.city}
						province={listingId.province}
						country={listingId.country}
						category={listingId.category}
						startDate={startDate}
						endDate={endDate}
						totalPrice={totalPrice}
						booking={booking}
					/>
				))}
			</div>
			<Footer />
		</>
	);
};

export default ReservationList;
