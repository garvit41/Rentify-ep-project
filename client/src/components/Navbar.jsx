// import { IconButton } from "@mui/material";
// import { Search, Person, Menu } from "@mui/icons-material";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { setLogout } from "../redux/state";

// const Navbar = () => {
// 	const [dropdownMenu, setDropdownMenu] = useState(false);
// 	const [search, setSearch] = useState("");

// 	const user = useSelector((state) => state.user);
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	return (
// 		<div className="navbar">
// 			{/* 👇 Logo */}
// 			<Link to="/">
// 				<img src="/logo.png" alt="logo" className="logo" />
// 			</Link>

// 			{/* 👇 Search Bar */}
// 			<div className="search-bar">
// 				<input type="text" placeholder="Search ..." value={search} onChange={(e) => setSearch(e.target.value)} />
// 				<IconButton disabled={!search} onClick={() => navigate(`/properties/search/${search}`)}>
// 					<Search sx={{ color: "#ff4d6d" }} />
// 				</IconButton>
// 			</div>

// 			{/* 👇 Right Section */}
// 			<div className="right-section">
// 				{user ? <Link to="/create-listing">Become A Host</Link> : <Link to="/login">Become A Host</Link>}

// 				<button onClick={() => setDropdownMenu((prev) => !prev)} className="menu-btn">
// 					<Menu sx={{ color: "#444" }} />
// 					{!user ? (
// 						<Person sx={{ color: "#444" }} />
// 					) : (
// 						<img
// 							src={
// 								user?.profileImagePath
// 									? `http://localhost:3001/${user.profileImagePath.replace("public", "")}`
// 									: "/default-avatar.png"
// 							}
// 							alt="profile"
// 							style={{
// 								objectFit: "cover",
// 								borderRadius: "50%",
// 								width: "30px",
// 								height: "30px",
// 							}}
// 						/>
// 					)}
// 				</button>

// 				{/* 👇 Dropdown Menu */}
// 				{dropdownMenu && !user && (
// 					<div className="dropdown">
// 						<Link to="/login">Log In</Link>
// 						<Link to="/register">Sign Up</Link>
// 					</div>
// 				)}

// 				{dropdownMenu && user && (
// 					<div className="dropdown">
// 						<Link to={`/${user._id}/trips`}>Trip List</Link>
// 						<Link to={`/${user._id}/wishList`}>Wish List</Link>
// 						<Link to={`/${user._id}/properties`}>Property List</Link>
// 						<Link to={`/${user._id}/reservations`}>Reservation List</Link>
// 						<Link to="/create-listing">Become A Host</Link>
// 						<Link to="/login" onClick={() => dispatch(setLogout())}>
// 							Log Out
// 						</Link>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Navbar;

import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
	const [dropdownMenu, setDropdownMenu] = useState(false);
	const [search, setSearch] = useState("");

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="flex justify-between items-center px-5 sm:px-20 py-2 relative">
			{/* 👇 Logo */}
			<Link to="/">
				<img src="/logo.png" alt="logo" className="w-[100px] cursor-pointer" />
			</Link>
			{/* 👇 Search Bar */}
			<div className="hidden lg:flex items-center gap-10 border border-gray-400 rounded-full h-[50px] px-5 hover:shadow-md transition">
				<input
					type="text"
					placeholder="Search ..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="outline-none border-none"
				/>
				<IconButton disabled={!search} onClick={() => navigate(`/properties/search/${search}`)}>
					<Search sx={{ color: "#ff4d6d" }} />
				</IconButton>
			</div>

			{/* 👇 Right Section */}
			<div className="flex items-center gap-5">
				{user ? (
					<Link to="/create-listing" className="hidden sm:block text-blue-600 font-bold hover:text-pink-500 transition">
						Become A Host
					</Link>
				) : (
					<Link to="/login" className="hidden sm:block text-blue-600 font-bold hover:text-pink-500 transition">
						Become A Host
					</Link>
				)}

				{/* Menu Button */}
				<button
					onClick={() => setDropdownMenu((prev) => !prev)}
					className="flex items-center gap-2 border border-gray-400 rounded-full h-[50px] px-3 bg-white hover:shadow-md transition"
				>
					<Menu sx={{ color: "#444" }} />
					{!user ? (
						<Person sx={{ color: "#444" }} />
					) : (
						<img
							src={
								user?.profileImagePath
									? `http://localhost:3001/${user.profileImagePath.replace("public", "")}`
									: "/default-avatar.png"
							}
							alt="profile"
							className="w-[30px] h-[30px] rounded-full object-cover"
						/>
					)}
				</button>

				{/* 👇 Dropdown Menu */}
				{dropdownMenu && !user && (
					<div className="absolute right-5 sm:right-20 top-20 flex flex-col w-[200px] bg-white rounded-2xl border border-gray-200 shadow-md z-[9999] py-2">
						<Link to="/login" className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Log In
						</Link>
						<Link to="/register" className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Sign Up
						</Link>
					</div>
				)}

				{dropdownMenu && user && (
					<div className="absolute right-5 sm:right-20 top-20 flex flex-col w-[200px] bg-white rounded-2xl border border-gray-200 shadow-md z-[9999] py-2">
						<Link to={`/${user._id}/trips`} className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Trip List
						</Link>
						<Link to={`/${user._id}/wishList`} className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Wish List
						</Link>
						<Link to={`/${user._id}/properties`} className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Property List
						</Link>
						<Link to={`/${user._id}/reservations`} className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Reservation List
						</Link>
						<Link to="/create-listing" className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100">
							Become A Host
						</Link>
						<Link
							to="/login"
							onClick={() => dispatch(setLogout())}
							className="px-4 py-2 text-blue-600 font-bold hover:text-pink-500 hover:bg-gray-100"
						>
							Log Out
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
