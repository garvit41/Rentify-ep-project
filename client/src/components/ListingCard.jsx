import { useState } from "react";
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
	listingId,
	creator,
	listingPhotoPaths,
	city,
	province,
	country,
	category,
	type,
	price,
	startDate,
	endDate,
	totalPrice,
	booking,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goToPrevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
	};

	const goToNextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % listingPhotoPaths.length);
	};

	const user = useSelector((state) => state.user);
	const wishList = user?.wishList || [];
	const isLiked = wishList?.find((item) => item?._id === listingId);

	const patchWishList = async () => {
		if (user?._id !== creator._id) {
			const response = await fetch(`http://localhost:3001/users/${user?._id}/${listingId}`, {
				method: "PATCH",
				header: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			dispatch(setWishList(data.wishList));
		}
	};

	return (
		<div className="relative cursor-pointer p-2 rounded-lg hover:shadow-md transition" onClick={() => navigate(`/properties/${listingId}`)}>
			{/* Slider */}
			<div className="w-[300px] overflow-hidden rounded-lg mb-2">
				<div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
					{listingPhotoPaths?.map((photo, index) => (
						<div key={index} className="relative flex-0 w-full h-[270px] flex items-center">
							<img
								src={`http://localhost:3001/${photo?.replace("public", "")}`}
								alt={`photo ${index + 1}`}
								className="w-full h-full object-cover brightness-90"
							/>
							<div
								className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 rounded-full bg-white/70 hover:bg-white flex items-center justify-center cursor-pointer z-10"
								onClick={(e) => {
									e.stopPropagation();
									goToPrevSlide();
								}}
							>
								<ArrowBackIosNew sx={{ fontSize: "15px" }} />
							</div>
							<div
								className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 rounded-full bg-white/70 hover:bg-white flex items-center justify-center cursor-pointer z-10"
								onClick={(e) => {
									e.stopPropagation();
									goToNextSlide();
								}}
							>
								<ArrowForwardIos sx={{ fontSize: "15px" }} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Info */}
			<h3 className="text-[18px]">
				{city}, {province}, {country}
			</h3>
			<p className="text-[16px]">{category}</p>

			{!booking ? (
				<>
					<p className="text-[16px]">{type}</p>
					<p className="text-[16px]">
						<span className="font-bold text-[18px]">${price}</span> per night
					</p>
				</>
			) : (
				<>
					<p className="text-[16px]">
						{startDate} - {endDate}
					</p>
					<p className="text-[16px]">
						<span className="font-bold text-[18px]">${totalPrice}</span> total
					</p>
				</>
			)}

			{/* Favorite */}
			<button
				className="absolute top-5 right-5 bg-none border-none cursor-pointer text-[20px] z-10"
				onClick={(e) => {
					e.stopPropagation();
					patchWishList();
				}}
				disabled={!user}
			>
				{isLiked ? <Favorite sx={{ color: "red" }} /> : <Favorite sx={{ color: "white" }} />}
			</button>
		</div>
	);
};

export default ListingCard;
