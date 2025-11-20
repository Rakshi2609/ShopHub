# 🛍️ ShopHub - Dropshipping Marketplace

A modern, full-stack dropshipping marketplace built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. ShopHub empowers users to both buy and sell products without inventory - a complete dual-role e-commerce platform.

## ✨ Key Features

### 🛒 For Buyers
- **Smart Shopping**: Browse 30+ products with real images from Pexels API
- **Intelligent Checkout**: Auto-fill city, state, and country using OpenStreetMap
- **Secure Payments**: Stripe integration + Cash on Delivery
- **Order Tracking**: Real-time order status and history
- **Google Sign-In**: Fast authentication with Firebase OAuth

### 💼 For Sellers
- **Become a Seller**: Upgrade any user account to seller status
- **Product Management**: Add products with auto-fetched images from Pexels
- **Sales Dashboard**: Track total sales and revenue
- **Smart Pricing**: Built-in pricing calculator
- **No Inventory**: True dropshipping model

### 👨‍💼 Admin Panel
- **Product Management**: Full CRUD operations
- **Order Management**: Update status and track deliveries
- **User Management**: View and manage all users
- **Analytics Dashboard**: Revenue charts and statistics

### 🔐 Security & Auth
- **Dual Authentication**: JWT + Firebase (Google OAuth)
- **Profile Protection**: Email locked, password change for non-Google users
- **Role-based Access**: User, Seller, Admin roles

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library with lazy loading
- **Vite 5.0.8** - Lightning-fast build tool
- **Redux Toolkit 2.0.1** - State management
- **React Router v6.20.1** - Client-side routing
- **Tailwind CSS 3.4.0** - Utility-first styling
- **Firebase 10.7.1** - Google OAuth authentication
- **Stripe Elements** - Secure payment UI
- **Pexels API** - Real product images
- **OpenStreetMap Nominatim** - Location auto-fill
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - Token-based auth
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting
- **Multer** - File upload handling

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Stripe Account** (for payments)
- **Pexels API Key** (free at [pexels.com/api](https://www.pexels.com/api))
- **Firebase Project** (for Google OAuth)
- **Cloudinary Account** (optional, for custom image uploads)

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
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

4. Seed the database with sample products (optional):
```bash
node seedProducts.js
```

5. Start the backend server:
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

3. Configure Firebase:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Google Authentication
   - Copy your Firebase config to `src/config/firebase.js`:
   
```javascript
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};
```

4. Add Pexels API Key:
   - Get free API key from [pexels.com/api](https://www.pexels.com/api)
   - Update in `src/pages/seller/SellerAddProductPage.jsx`:
   
```javascript
const PEXELS_API_KEY = 'your_pexels_api_key';
```

5. Update Stripe Publishable Key in `src/pages/CheckoutPage.jsx`:
```javascript
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');
```

6. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Quick Start (Both Servers)
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

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

## 🚀 Deployment Guide

### Option 1: Vercel + MongoDB Atlas (Recommended - Free)

#### Backend Deployment (Vercel)
1. **Create MongoDB Atlas Cluster** (Free Tier)
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string
   - Whitelist all IPs (0.0.0.0/0) for serverless

2. **Deploy Backend to Vercel**
   ```bash
   cd backend
   npm install -g vercel
   vercel
   ```
   - Set environment variables in Vercel dashboard
   - Add `vercel.json` in backend folder:
   ```json
   {
     "version": 2,
     "builds": [{ "src": "server.js", "use": "@vercel/node" }],
     "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
   }
   ```

3. **Environment Variables** (Vercel Dashboard):
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/shophub
   JWT_SECRET=your_production_secret
   STRIPE_SECRET_KEY=sk_live_your_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

#### Frontend Deployment (Vercel)
1. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

2. **Update API URL**
   - In `vite.config.js`, update proxy target to your backend URL
   - Or use environment variable:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

3. **Build & Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Option 2: Render (Free Tier)

#### Backend on Render
1. Go to [render.com](https://render.com)
2. Create **New Web Service**
3. Connect GitHub repository
4. Settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - Environment: Node
   - Add all environment variables

#### Frontend on Render (Static Site)
1. Create **New Static Site**
2. Settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
3. Add environment variable:
   - `VITE_API_URL` = your backend URL

### Option 3: Railway (Easy Setup)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy Backend
cd backend
railway init
railway up

# Deploy Frontend
cd ../frontend
railway init
railway up
```

### Option 4: Traditional Hosting (VPS)

#### Using DigitalOcean, AWS EC2, Linode, etc.

1. **SSH into your server**
2. **Install dependencies**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y mongodb
   sudo npm install -g pm2
   ```

3. **Clone repository**:
   ```bash
   git clone https://github.com/Rakshi2609/ShopHub.git
   cd ShopHub
   ```

4. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create .env file with production values
   pm2 start server.js --name shophub-api
   pm2 startup
   pm2 save
   ```

5. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```

6. **Setup Nginx** (reverse proxy):
   ```bash
   sudo apt install nginx
   ```

   Create `/etc/nginx/sites-available/shophub`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # Frontend
       location / {
           root /path/to/ShopHub/frontend/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/shophub /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **SSL Certificate** (Let's Encrypt):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 5: Netlify + Heroku

#### Backend on Heroku
```bash
cd backend
heroku create shophub-api
git push heroku main
heroku config:set NODE_ENV=production MONGO_URI=... JWT_SECRET=...
```

#### Frontend on Netlify
1. Build: `npm run build`
2. Drag `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. Or use CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Post-Deployment Checklist

✅ Update CORS settings in backend for your frontend URL
✅ Set all environment variables in production
✅ Update Firebase authorized domains
✅ Update Stripe webhook endpoints (if using webhooks)
✅ Test Google Sign-In with production URL
✅ Verify Pexels API calls work
✅ Test payment flow end-to-end
✅ Monitor application logs

### Performance Tips

- Enable GZIP compression
- Use CDN for static assets (Cloudinary, AWS S3)
- Enable HTTP/2
- Set proper cache headers
- Use PM2 cluster mode for Node.js
- Add database indexes for MongoDB queries

## 📝 Environment Variables

Make sure to set all required environment variables in your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🎯 Project Highlights

- ✅ **31 Seeded Products** with real images
- ✅ **Dual-Role System** - Users can buy AND sell
- ✅ **Smart Location** - Auto-fill on Enter key
- ✅ **Sales Tracking** - Updates on payment
- ✅ **Image Search** - Real Pexels API integration
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Profile Management** - Email protection, password security
- ✅ **404 Page** - Custom error handling
- ✅ **Dropshipping Theme** - Complete marketplace UI

## 🐛 Known Issues & Solutions

**Issue**: CORS errors in production
**Solution**: Update `FRONTEND_URL` in backend .env

**Issue**: Google Sign-In fails
**Solution**: Add production URL to Firebase authorized domains

**Issue**: Images not loading
**Solution**: Verify Pexels API key and rate limits

**Issue**: Payment fails in production
**Solution**: Use Stripe live keys, not test keys

## 📸 Screenshots

(Add your screenshots here)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

ISC License - feel free to use for learning and portfolio projects

## 👨‍💻 Author

**Rakshith** - [LinkedIn](https://www.linkedin.com/in/rakshith-ganjimut/)

## 🙏 Acknowledgments

- **Pexels** - Free stock photos API
- **Stripe** - Payment processing
- **Firebase** - Google OAuth authentication
- **OpenStreetMap** - Geocoding API
- **Cloudinary** - Image hosting
- **MongoDB Atlas** - Cloud database
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via LinkedIn

---

**🌟 Star this repo if you find it helpful!**

Built with ❤️ by Rakshith & AI
