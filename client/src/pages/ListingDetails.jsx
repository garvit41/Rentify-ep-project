import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { getListingById } from "../services/ListingsService.js";
import { createBooking } from "../services/BookingService.js";

const ListingDetails = () => {
	const [loading, setLoading] = useState(true);
	const { listingId } = useParams();
	const [listing, setListing] = useState(null);

	const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);

	const customerId = useSelector((state) => state?.user?._id);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const data = await getListingById(listingId);
				setListing(data);
				setLoading(false);
			} catch (err) {
				console.log("Fetch Listing Details Failed:", err.message);
			}
		};
		fetchListing();
	}, [listingId]);

	const handleSelect = (ranges) => setDateRange([ranges.selection]);

	const start = new Date(dateRange[0].startDate);
	const end = new Date(dateRange[0].endDate);
	const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

	const handleSubmit = async () => {
		try {
			const bookingForm = {
				customerId,
				listingId,
				hostId: listing.creator._id,
				startDate: dateRange[0].startDate.toDateString(),
				endDate: dateRange[0].endDate.toDateString(),
				totalPrice: listing.price * dayCount,
			};
			await createBooking(bookingForm);
			navigate(`/${customerId}/trips`);
		} catch (err) {
			console.log("Submit Booking Failed:", err.message);
		}
	};

	if (loading) return <Loader />;

	return (
		<>
			<Navbar />
			<div className="listing-details">
				<h1>{listing.title}</h1>
				<div className="photos">
					{listing.listingPhotoPaths?.map((photo, idx) => (
						<img key={idx} src={`http://localhost:3001/${photo.replace("public", "")}`} alt="listing" />
					))}
				</div>

				<h2>
					{listing.type} in {listing.city}, {listing.province}, {listing.country}
				</h2>
				<p>
					{listing.guestCount} guests - {listing.bedroomCount} bedrooms - {listing.bedCount} beds - {listing.bathroomCount} bathrooms
				</p>

				<hr />
				<div className="profile">
					<img src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`} alt="host" />
					<h3>
						Hosted by {listing.creator.firstName} {listing.creator.lastName}
					</h3>
				</div>
				<hr />
				<h3>Description</h3>
				<p>{listing.description}</p>
				<hr />
				<h3>{listing.highlight}</h3>
				<p>{listing.highlightDesc}</p>
				<hr />

				<div className="booking">
					<div>
						<h2>What this place offers?</h2>
						<div className="amenities">
							{listing.amenities[0].split(",").map((item, idx) => (
								<div className="facility" key={idx}>
									<div className="facility_icon">{facilities.find((f) => f.name === item)?.icon}</div>
									<p>{item}</p>
								</div>
							))}
						</div>
					</div>

					<div>
						<h2>How long do you want to stay?</h2>
						<DateRange ranges={dateRange} onChange={handleSelect} />
						<h2>
							${listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
						</h2>
						<h2>Total price: ${listing.price * dayCount}</h2>
						<p>Start Date: {dateRange[0].startDate.toDateString()}</p>
						<p>End Date: {dateRange[0].endDate.toDateString()}</p>
						<button onClick={handleSubmit}>BOOKING</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ListingDetails;
