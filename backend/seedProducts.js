import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const products = [
  {
    name: 'Apple iPhone 15 Pro',
    images: [{ url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500' }],
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 6.1-inch Super Retina XDR display.',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    stock: 25,
    rating: 4.8,
    numReviews: 128,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    images: [{ url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500' }],
    description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    stock: 40,
    rating: 4.9,
    numReviews: 215,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'MacBook Pro 14" M3',
    images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500' }],
    description: 'Supercharged by M3 chip. 14-inch Liquid Retina XDR display, 8GB RAM, 512GB SSD. Perfect for professionals.',
    brand: 'Apple',
    category: 'Electronics',
    price: 1599.99,
    stock: 15,
    rating: 4.9,
    numReviews: 89,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    images: [{ url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500' }],
    description: 'Premium Android phone with S Pen, 200MP camera, and Galaxy AI features. 6.8-inch Dynamic AMOLED display.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 1199.99,
    stock: 30,
    rating: 4.7,
    numReviews: 156,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Canon EOS R6 Mark II',
    images: [{ url: 'https://images.unsplash.com/photo-1606980668712-e96ab0bb8c1f?w=500' }],
    description: 'Professional mirrorless camera with 24.2MP full-frame sensor, 40fps continuous shooting, and advanced autofocus.',
    brand: 'Canon',
    category: 'Electronics',
    price: 2499.99,
    stock: 12,
    rating: 4.8,
    numReviews: 67,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Nike Air Max 270',
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' }],
    description: 'Comfortable lifestyle sneakers with large visible Air unit. Perfect for everyday wear and casual activities.',
    brand: 'Nike',
    category: 'Clothing',
    price: 149.99,
    stock: 100,
    rating: 4.6,
    numReviews: 342,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Amazon Echo Dot (5th Gen)',
    images: [{ url: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=500' }],
    description: 'Smart speaker with Alexa, improved audio, and temperature sensor. Control your smart home with voice commands.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 49.99,
    stock: 200,
    rating: 4.5,
    numReviews: 892,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Logitech MX Master 3S',
    images: [{ url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' }],
    description: 'Advanced wireless mouse with quiet clicks, 8K DPI sensor, and customizable buttons. Works on any surface.',
    brand: 'Logitech',
    category: 'Electronics',
    price: 99.99,
    stock: 75,
    rating: 4.8,
    numReviews: 234,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'LG C3 OLED 55" TV',
    images: [{ url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500' }],
    description: '4K OLED TV with perfect blacks, vibrant colors, and gaming features. Includes webOS and AI ThinQ.',
    brand: 'LG',
    category: 'Electronics',
    price: 1299.99,
    stock: 20,
    rating: 4.9,
    numReviews: 145,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Adidas Ultraboost 23',
    images: [{ url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500' }],
    description: 'Premium running shoes with Boost cushioning and Primeknit upper. Maximum energy return for runners.',
    brand: 'Adidas',
    category: 'Sports',
    price: 189.99,
    stock: 85,
    rating: 4.7,
    numReviews: 278,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'iPad Air (5th Gen)',
    images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500' }],
    description: 'Powerful tablet with M1 chip and 10.9-inch Liquid Retina display. Perfect for creativity and productivity.',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    stock: 45,
    rating: 4.8,
    numReviews: 189,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Kindle Paperwhite (11th Gen)',
    images: [{ url: 'https://images.unsplash.com/photo-1592422746054-d0c9c4b4ed3a?w=500' }],
    description: 'Waterproof e-reader with 6.8-inch glare-free display and adjustable warm light. Holds thousands of books.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 139.99,
    stock: 150,
    rating: 4.7,
    numReviews: 567,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'The Great Gatsby Book',
    images: [{ url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' }],
    description: 'Classic American novel by F. Scott Fitzgerald. A timeless story of love, wealth, and tragedy in the Jazz Age.',
    brand: 'Scribner',
    category: 'Books',
    price: 14.99,
    stock: 120,
    rating: 4.8,
    numReviews: 1024,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Coffee Maker Deluxe',
    images: [{ url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500' }],
    description: 'Programmable coffee maker with thermal carafe. Brews up to 12 cups of delicious coffee.',
    brand: 'Cuisinart',
    category: 'Home & Kitchen',
    price: 89.99,
    stock: 60,
    rating: 4.6,
    numReviews: 234,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Luxury Skincare Set',
    images: [{ url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500' }],
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Natural ingredients for glowing skin.',
    brand: 'Glow Beauty',
    category: 'Beauty',
    price: 129.99,
    stock: 45,
    rating: 4.7,
    numReviews: 189,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'PlayStation 5 Console',
    images: [{ url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500' }],
    description: 'Next-gen gaming console with 4K graphics, ultra-fast SSD, and DualSense controller. Includes God of War Ragnarok.',
    brand: 'Sony',
    category: 'Electronics',
    price: 499.99,
    stock: 18,
    rating: 4.9,
    numReviews: 445,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Yoga Mat Premium',
    images: [{ url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500' }],
    description: 'Extra thick non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and floor exercises.',
    brand: 'Manduka',
    category: 'Sports',
    price: 79.99,
    stock: 95,
    rating: 4.6,
    numReviews: 312,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    images: [{ url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500' }],
    description: 'Multi-use programmable pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer.',
    brand: 'Instant Pot',
    category: 'Home & Kitchen',
    price: 119.99,
    stock: 55,
    rating: 4.8,
    numReviews: 678,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    images: [{ url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500' }],
    description: 'Iconic starship building set with 7,541 pieces. Includes minifigures of Han Solo, Chewbacca, and more.',
    brand: 'LEGO',
    category: 'Toys',
    price: 849.99,
    stock: 12,
    rating: 4.9,
    numReviews: 234,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    images: [{ url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500' }],
    description: 'Cordless vacuum with laser dust detection and LCD screen. Powerful suction and whole-machine HEPA filtration.',
    brand: 'Dyson',
    category: 'Home & Kitchen',
    price: 649.99,
    stock: 22,
    rating: 4.7,
    numReviews: 189,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'The Art of War Book',
    images: [{ url: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500' }],
    description: 'Ancient Chinese military treatise by Sun Tzu. Timeless strategies applicable to business and life.',
    brand: 'Penguin Classics',
    category: 'Books',
    price: 12.99,
    stock: 200,
    rating: 4.7,
    numReviews: 892,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Wireless Gaming Mouse RGB',
    images: [{ url: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=500' }],
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and 20,000 DPI sensor.',
    brand: 'Razer',
    category: 'Electronics',
    price: 89.99,
    stock: 67,
    rating: 4.6,
    numReviews: 445,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Leather Jacket Classic',
    images: [{ url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' }],
    description: 'Premium genuine leather jacket with quilted lining. Timeless style for any season.',
    brand: 'Schott NYC',
    category: 'Clothing',
    price: 599.99,
    stock: 28,
    rating: 4.8,
    numReviews: 156,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Resistance Bands Set',
    images: [{ url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500' }],
    description: '5-piece resistance band set with handles, door anchor, and carrying bag. Perfect for home workouts.',
    brand: 'TheraBand',
    category: 'Sports',
    price: 29.99,
    stock: 150,
    rating: 4.5,
    numReviews: 567,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Mechanical Keyboard RGB',
    images: [{ url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500' }],
    description: 'Premium mechanical gaming keyboard with Cherry MX switches and per-key RGB lighting.',
    brand: 'Corsair',
    category: 'Electronics',
    price: 179.99,
    stock: 42,
    rating: 4.8,
    numReviews: 334,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Electric Toothbrush Pro',
    images: [{ url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500' }],
    description: 'Sonic electric toothbrush with pressure sensor, timer, and 5 brushing modes. Includes travel case.',
    brand: 'Oral-B',
    category: 'Health',
    price: 149.99,
    stock: 78,
    rating: 4.7,
    numReviews: 423,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Car Phone Mount Magnetic',
    images: [{ url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500' }],
    description: 'Strong magnetic phone holder for car dashboard or windshield. 360° rotation and one-hand operation.',
    brand: 'iOttie',
    category: 'Automotive',
    price: 24.99,
    stock: 125,
    rating: 4.6,
    numReviews: 678,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Stainless Steel Water Bottle',
    images: [{ url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500' }],
    description: 'Insulated water bottle keeps drinks cold for 24h or hot for 12h. BPA-free, leak-proof design.',
    brand: 'Hydro Flask',
    category: 'Sports',
    price: 44.99,
    stock: 110,
    rating: 4.7,
    numReviews: 512,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Wireless Earbuds Pro',
    images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' }],
    description: 'True wireless earbuds with active noise cancellation, transparency mode, and 30-hour battery life.',
    brand: 'Apple',
    category: 'Electronics',
    price: 249.99,
    stock: 65,
    rating: 4.8,
    numReviews: 789,
    isFeatured: true,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Dumbbell Set Adjustable',
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500' }],
    description: 'Adjustable dumbbell set from 5-52.5 lbs. Space-saving design replaces 15 sets of weights.',
    brand: 'Bowflex',
    category: 'Sports',
    price: 349.99,
    stock: 32,
    rating: 4.8,
    numReviews: 234,
    seller: '691ec7bec7fe2fd03eb81f58'
  },
  {
    name: 'Smart Watch Fitness Tracker',
    images: [{ url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500' }],
    description: 'Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, and 7-day battery life.',
    brand: 'Fitbit',
    category: 'Electronics',
    price: 199.99,
    stock: 58,
    rating: 4.6,
    numReviews: 445,
    seller: '691ec7bec7fe2fd03eb81f58'
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    
    console.log('✅ Sample products added successfully!');
    console.log(`📦 Total products: ${products.length}`);
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

importData();
