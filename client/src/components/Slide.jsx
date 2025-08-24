const Slide = () => {
	return (
		<div
			className="w-screen h-[80vh] bg-center bg-top bg-cover flex items-center justify-center"
			style={{
				backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/slide.jpg')",
			}}
		>
			<h1 className="text-white text-4xl text-center p-10">
				Welcome Home! Anywhere you roam <br /> Stay in the moment. Make your memories
			</h1>
		</div>
	);
};

export default Slide;
