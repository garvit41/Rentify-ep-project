import { categories } from "../data";
import { Link } from "react-router-dom";

const Categories = () => {
	return (
		<div className="flex flex-col items-center text-center bg-gray-100 px-5 sm:px-20 py-12">
			<h1 className="text-blue-600 text-4xl font-extrabold mb-4">Explore Top Categories</h1>

			<p className="max-w-2xl text-lg text-gray-700">
				Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the
				comforts of home, and create unforgettable memories in your dream destination.
			</p>

			<div className="flex flex-wrap justify-center gap-5 py-12">
				{categories?.slice(1, 7).map((category, index) => (
					<Link to={`/properties/category/${category.label}`} key={index}>
						<div className="relative flex justify-center items-center w-[250px] h-[200px] cursor-pointer overflow-hidden rounded-xl shadow-md group">
							{/* Background Image */}
							<img src={category.img} alt={category.label} className="absolute w-full h-full object-cover" />

							{/* Overlay */}
							<div className="absolute w-full h-full bg-black/55 transition-all duration-300 ease-in-out group-hover:w-[80%] group-hover:h-[80%] rounded-lg"></div>

							{/* Text */}
							<div className="relative text-white flex flex-col items-center">
								<div className="text-4xl mb-1">{category.icon}</div>
								<p className="font-semibold">{category.label}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Categories;
