import { Link } from "react-router-dom";

function CategorySection() {
  const categories = [
    {
      name: "FRESH FRUITS",
      emoji: "🍎",
      color: "bg-green-200/60",
    },
  ];

  return (
    <section
      className="py-20 px-4 bg-green-50 bg-opacity-90 text-center"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cutcube.png')",
        backgroundBlendMode: "overlay",
      }}
    >
      <h2 className="text-4xl font-bold text-green-800 mb-10 tracking-wide drop-shadow-md">
        🍃 Explore Our Farm Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-3xl mx-auto">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to="/products"
            className="no-underline"
          >
            <div
              className={`${cat.color} p-10 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out`}
            >
              <div className="text-7xl mb-4 animate-bounce">{cat.emoji}</div>
              <h3 className="text-2xl font-bold text-green-900 tracking-wide">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
