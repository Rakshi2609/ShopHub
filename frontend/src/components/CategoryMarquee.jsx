import { Link } from 'react-router-dom';

const CategoryMarquee = () => {
  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports',
    'Beauty', 'Toys', 'Automotive', 'Health', 'Other'
  ];

  return (
    <div className="bg-gradient-to-r from-primary-600 to-orange-500 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-2">
        <span className="inline-block">
          {[...categories, ...categories, ...categories].map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category}`}
              className="inline-block mx-6 text-white hover:text-yellow-300 transition-colors font-semibold text-sm"
            >
              🏷️ {category}
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
};

export default CategoryMarquee;
