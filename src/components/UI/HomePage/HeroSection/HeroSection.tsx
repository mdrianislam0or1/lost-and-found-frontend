import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="bg-gray-200 py-20 bg-fixed px-4 md:px-8 lg:px-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563430862227-8fe668221256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
