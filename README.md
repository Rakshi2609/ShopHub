# ShopHub - Dropshipping E-Commerce Platform

ShopHub is a modern, responsive dropshipping website that provides a seamless online shopping experience. Built with HTML, CSS, and JavaScript, this platform offers a complete e-commerce solution for selling products from various categories.

## Features

### 🛍️ Core E-Commerce Functionality
- **Product Catalog**: Browse through a diverse collection of products across multiple categories
- **Product Details**: Detailed product pages with descriptions, features, and pricing
- **Shopping Cart**: Dynamic cart system with add, remove, and quantity management
- **Checkout Process**: Streamlined checkout with shipping and payment information forms
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with smooth animations
- **Easy Navigation**: Intuitive menu system with category filters
- **Product Filtering**: Filter products by category and price range
- **Product Sorting**: Sort products by price or name
- **Cart Sidebar**: Slide-out cart for quick access and updates

### 📄 Pages Included
1. **Home Page** (`index.html`)
   - Hero section with call-to-action
   - Featured products showcase
   - Key features highlights
   - Newsletter subscription

2. **Products Page** (`products.html`)
   - Full product catalog
   - Category and price filters
   - Sorting options
   - Product grid layout

3. **Product Detail Page** (`product-detail.html`)
   - Detailed product information
   - Product features list
   - Quantity selector
   - Related products section

4. **About Page** (`about.html`)
   - Company story and mission
   - Core values
   - Statistics and achievements

5. **Contact Page** (`contact.html`)
   - Contact form
   - Business information
   - FAQ section

6. **Checkout Page** (`checkout.html`)
   - Shipping information form
   - Payment method selection
   - Order summary
   - Secure checkout process

## Technologies Used

- **HTML5**: Semantic markup for better SEO and accessibility
- **CSS3**: Modern styling with Grid and Flexbox layouts
- **JavaScript (ES6+)**: Interactive functionality and dynamic content
- **Font Awesome**: Icon library for enhanced UI
- **LocalStorage**: Client-side cart data persistence

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rakshi2609/ShopHub.git
```

2. Navigate to the project directory:
```bash
cd ShopHub
```

3. Open `index.html` in your web browser:
```bash
open index.html
```
or simply double-click the `index.html` file

### File Structure
```
ShopHub/
├── index.html              # Home page
├── products.html           # Products catalog page
├── product-detail.html     # Individual product details
├── about.html              # About us page
├── contact.html            # Contact page
├── checkout.html           # Checkout page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
└── README.md              # Project documentation
```

## Features in Detail

### Shopping Cart
- Add products to cart from product listings or detail pages
- Update quantities directly in the cart
- Remove items from cart
- Cart data persists using browser localStorage
- Real-time cart total calculation

### Product Management
- 12 sample products across 4 categories (Electronics, Fashion, Home & Garden, Sports)
- Product attributes include name, category, price, ratings, descriptions, and features
- Sale/discount badge display for products on sale

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements

## Customization

### Adding Products
Edit the `products` array in `script.js`:
```javascript
const products = [
    {
        id: 1,
        name: 'Product Name',
        category: 'category',
        price: 99.99,
        oldPrice: 149.99,  // Optional
        rating: 4.5,
        image: '🎧',
        description: 'Product description',
        features: ['Feature 1', 'Feature 2']
    },
    // Add more products...
];
```

### Changing Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --dark-color: #2c3e50;
    /* ... other variables */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential features for future development:
- Backend integration for real product management
- User authentication and accounts
- Order history tracking
- Product reviews and ratings
- Wishlist functionality
- Multiple payment gateway integration
- Admin dashboard
- Email notifications
- Search functionality
- Product image galleries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@shophub.com
- Website: [ShopHub](https://github.com/Rakshi2609/ShopHub)

---

Built with ❤️ for modern e-commerce