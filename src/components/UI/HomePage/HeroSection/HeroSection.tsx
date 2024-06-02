import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="bg-gray-200 py-20 px-4 md:px-8 lg:px-16"
      style={{
        backgroundImage: "url('/path/to/background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Find what you lost, reunite what you found!
        </h1>
        <div className="space-x-4">
          <button className="bg-black text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
            <Link href="/submitLostItem">Report a Lost Item</Link>
          </button>
          <button className="bg-white text-black border border-black py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
            <Link href="/submitFoundItem">Report a Found Item</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
