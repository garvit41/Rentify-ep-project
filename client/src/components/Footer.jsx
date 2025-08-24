import { LocationOn, LocalPhone, Email } from "@mui/icons-material";

const Footer = () => {
	return (
		<div className="flex justify-between items-start gap-12 px-5 lg:px-8 py-6">
			{/* Left */}
			<div className="max-w-[400px] flex flex-col">
				<a href="/">
					<img src="/assets/logo.png" alt="logo" className="max-w-[150px] mb-5" />
				</a>
				{/* Example Socials (optional) */}
				{/* <div className="flex gap-6 mt-5">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-110">
            <YourIcon />
          </div>
        </div> */}
			</div>

			{/* Center */}
			<div className="hidden md:flex flex-col">
				<h3 className="font-bold text-lg">Useful Links</h3>
				<ul className="mt-5 list-none cursor-pointer space-y-2">
					<li className="hover:text-pink-500 transition">About Us</li>
					<li className="hover:text-pink-500 transition">Terms and Conditions</li>
					<li className="hover:text-pink-500 transition">Return and Refund Policy</li>
				</ul>
			</div>

			{/* Right */}
			<div className="hidden sm:flex flex-col max-w-[350px]">
				<h3 className="mb-5 font-bold text-lg">Contact</h3>
				<div className="flex items-center mb-3">
					<LocalPhone />
					<p className="ml-5">+1 234 567 890</p>
				</div>
				<div className="flex items-center mb-3">
					<Email />
					<p className="ml-5">dreamnest@support.com</p>
				</div>
				<img src="/assets/payment.png" alt="payment" className="mt-3" />
			</div>
		</div>
	);
};

export default Footer;
