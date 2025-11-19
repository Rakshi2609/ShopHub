# E-Commerce Platform (MERN Stack)

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. This project includes product listings, shopping cart, checkout, payment integration with Stripe, product reviews, admin dashboard, and order tracking.

## 🚀 Features

- **User Authentication**: Register, login, and profile management with JWT
- **Product Catalog**: Browse products with search, filters, and pagination
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Multi-step checkout with shipping and payment
- **Payment Integration**: Stripe payment gateway integration
- **Product Reviews**: Users can rate and review products
- **Order Tracking**: View order status and history
- **Admin Dashboard**: 
  - Manage products (CRUD operations)
  - Manage orders and update status
  - View users and statistics
  - Revenue analytics
- **Responsive Design**: Mobile-first approach using Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Stripe Elements** - Payment UI
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting
- **Multer** - File uploads

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe account
- Cloudinary account (optional, for image uploads)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the Stripe publishable key in `src/pages/CheckoutPage.jsx`:
```javascript
const stripePromise = loadStripe('your_stripe_publishable_key');
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
ecommerce-platform/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   └── orderSlice.js
│   │   │   └── store.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Create product review (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent (Protected)

## 🎨 Features in Detail

### Product Management
- Create, read, update, and delete products
- Upload multiple product images
- Categorize products
- Set discount prices
- Track inventory/stock

### Shopping Experience
- Advanced product filtering (category, price range)
- Product search functionality
- Product reviews and ratings
- Responsive image carousel
- Real-time cart updates

### Order Processing
- Multi-step checkout process
- Shipping address management
- Multiple payment methods (Stripe, COD)
- Order status tracking
- Email notifications (can be added)

### Admin Features
- Dashboard with statistics
- Revenue analytics with charts
- Product management interface
- Order management and status updates
- User management

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Role-based access control (User/Admin)
- Input validation
- CORS configuration

## 🚀 Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)
1. Set environment variables
2. Deploy the backend folder
3. Update FRONTEND_URL in production

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update API endpoints if needed

## 📝 Environment Variables

Make sure to set all required environment variables in your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- Stripe for payment processing
- Cloudinary for image hosting
- MongoDB Atlas for database hosting
- Tailwind CSS for styling

---

**Perfect for your resume!** This is an industry-level, full-stack e-commerce application demonstrating modern web development practices.
