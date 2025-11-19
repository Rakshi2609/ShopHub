// Sample Product Data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.5,
        image: '🎧',
        description: 'Premium wireless headphones with noise cancellation, long battery life, and superior sound quality. Perfect for music lovers and professionals.',
        features: ['Bluetooth 5.0', 'Active Noise Cancellation', '30-hour battery life', 'Premium sound quality']
    },
    {
        id: 2,
        name: 'Smart Watch',
        category: 'electronics',
        price: 199.99,
        rating: 4.8,
        image: '⌚',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications. Stay connected and healthy.',
        features: ['Heart rate monitor', 'GPS tracking', 'Water resistant', 'Multiple sport modes']
    },
    {
        id: 3,
        name: 'Designer Backpack',
        category: 'fashion',
        price: 59.99,
        oldPrice: 89.99,
        rating: 4.3,
        image: '🎒',
        description: 'Stylish and functional backpack with multiple compartments. Perfect for travel, work, or everyday use.',
        features: ['Water-resistant material', 'Laptop compartment', 'USB charging port', 'Ergonomic design']
    },
    {
        id: 4,
        name: 'Running Shoes',
        category: 'sports',
        price: 89.99,
        rating: 4.6,
        image: '👟',
        description: 'Comfortable running shoes designed for performance. Lightweight, breathable, and durable.',
        features: ['Breathable mesh', 'Cushioned sole', 'Lightweight design', 'Excellent grip']
    },
    {
        id: 5,
        name: 'Coffee Maker',
        category: 'home',
        price: 129.99,
        rating: 4.4,
        image: '☕',
        description: 'Professional-grade coffee maker for the perfect brew every time. Programmable settings and easy to clean.',
        features: ['Programmable timer', '12-cup capacity', 'Auto shut-off', 'Reusable filter']
    },
    {
        id: 6,
        name: 'Yoga Mat',
        category: 'sports',
        price: 34.99,
        oldPrice: 49.99,
        rating: 4.7,
        image: '🧘',
        description: 'Premium yoga mat with excellent grip and cushioning. Perfect for all types of yoga and fitness exercises.',
        features: ['Non-slip surface', 'Extra thick padding', 'Eco-friendly material', 'Easy to clean']
    },
    {
        id: 7,
        name: 'Bluetooth Speaker',
        category: 'electronics',
        price: 49.99,
        rating: 4.5,
        image: '🔊',
        description: 'Portable Bluetooth speaker with powerful sound and long battery life. Perfect for outdoor adventures.',
        features: ['360° sound', 'Waterproof', '12-hour battery', 'Wireless connectivity']
    },
    {
        id: 8,
        name: 'Sunglasses',
        category: 'fashion',
        price: 69.99,
        oldPrice: 99.99,
        rating: 4.2,
        image: '🕶️',
        description: 'Stylish sunglasses with UV protection. Perfect for any outdoor activity or casual wear.',
        features: ['UV400 protection', 'Polarized lenses', 'Durable frame', 'Stylish design']
    },
    {
        id: 9,
        name: 'Kitchen Knife Set',
        category: 'home',
        price: 149.99,
        rating: 4.9,
        image: '🔪',
        description: 'Professional kitchen knife set with premium stainless steel blades. Includes 8 essential knives and a storage block.',
        features: ['High-carbon stainless steel', 'Ergonomic handles', 'Sharp edge retention', 'Wooden storage block']
    },
    {
        id: 10,
        name: 'Fitness Tracker',
        category: 'sports',
        price: 79.99,
        rating: 4.4,
        image: '📱',
        description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and activity recognition.',
        features: ['24/7 heart rate tracking', 'Sleep monitoring', 'Activity auto-detection', 'Long battery life']
    },
    {
        id: 11,
        name: 'Desk Lamp',
        category: 'home',
        price: 39.99,
        oldPrice: 59.99,
        rating: 4.3,
        image: '💡',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for reading and working.',
        features: ['Adjustable brightness', 'Color temperature control', 'USB charging port', 'Eye-friendly LED']
    },
    {
        id: 12,
        name: 'Travel Pillow',
        category: 'home',
        price: 24.99,
        rating: 4.6,
        image: '🛋️',
        description: 'Comfortable memory foam travel pillow for neck support during long journeys.',
        features: ['Memory foam', 'Washable cover', 'Compact design', 'Adjustable strap']
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return `
            <div class="cart-item">
                <div class="cart-item-image">${product.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Add to cart
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    
    // Show cart sidebar
    showCart();
    
    // Show notification
    showNotification('Product added to cart!');
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showNotification('Product removed from cart');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Show cart
function showCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
}

// Hide cart
function hideCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

// Create product card HTML
function createProductCard(product) {
    const stars = '⭐'.repeat(Math.floor(product.rating));
    const badge = product.oldPrice ? `<span class="product-badge">Sale</span>` : '';
    
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                ${badge}
                ${product.image}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${stars} (${product.rating})</div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// View product detail
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Load featured products on home page
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 6);
    container.innerHTML = featuredProducts.map(createProductCard).join('');
}

// Load all products on products page
function loadProducts() {
    const container = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    
    if (!container) return;
    
    let filteredProducts = [...products];
    
    // Apply category filter
    const categoryFilters = document.querySelectorAll('.category-filter:checked');
    if (categoryFilters.length > 0) {
        const categories = Array.from(categoryFilters).map(cb => cb.value);
        if (!categories.includes('all')) {
            filteredProducts = filteredProducts.filter(p => categories.includes(p.category));
        }
    }
    
    // Apply price filter
    const priceFilter = document.querySelector('input[name="price"]:checked');
    if (priceFilter && priceFilter.value !== 'all') {
        const [min, max] = priceFilter.value.split('-').map(v => v === '+' ? Infinity : parseFloat(v));
        filteredProducts = filteredProducts.filter(p => p.price >= min && (max === Infinity || p.price <= max));
    }
    
    // Apply sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }
    
    container.innerHTML = filteredProducts.map(createProductCard).join('');
    if (productCount) {
        productCount.textContent = filteredProducts.length;
    }
}

// Load product detail
function loadProductDetail() {
    const container = document.getElementById('productDetailContainer');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        container.innerHTML = '<p>Product not found</p>';
        return;
    }
    
    // Update breadcrumb
    const breadcrumbName = document.getElementById('productName');
    if (breadcrumbName) breadcrumbName.textContent = product.name;
    
    const stars = '⭐'.repeat(Math.floor(product.rating));
    
    container.innerHTML = `
        <div class="product-detail-image">${product.image}</div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-rating">${stars} (${product.rating})</div>
            <div class="product-detail-price">$${product.price.toFixed(2)}
                ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-detail-description">
                <p>${product.description}</p>
            </div>
            <div class="product-detail-actions">
                <div class="quantity-selector">
                    <button onclick="changeDetailQuantity(-1)">-</button>
                    <input type="number" id="detailQuantity" value="1" min="1">
                    <button onclick="changeDetailQuantity(1)">+</button>
                </div>
                <button class="btn btn-primary" onclick="addToCartFromDetail(${product.id})">
                    Add to Cart
                </button>
            </div>
            <div class="product-detail-features">
                <h3>Features:</h3>
                <ul class="product-features">
                    ${product.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Change detail quantity
function changeDetailQuantity(change) {
    const input = document.getElementById('detailQuantity');
    if (input) {
        let value = parseInt(input.value) + change;
        if (value < 1) value = 1;
        input.value = value;
    }
}

// Add to cart from detail page
function addToCartFromDetail(productId) {
    const input = document.getElementById('detailQuantity');
    const quantity = input ? parseInt(input.value) : 1;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showCart();
    showNotification(`${quantity} item(s) added to cart!`);
}

// Load related products
function loadRelatedProducts(category, currentId) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;
    
    const relatedProducts = products
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
    
    container.innerHTML = relatedProducts.map(createProductCard).join('');
}

// Load checkout summary
function loadCheckoutSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (!summaryItems) return;
    
    if (cart.length === 0) {
        summaryItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    let subtotal = 0;
    
    summaryItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="summary-item">
                <div class="summary-item-image">${product.image}</div>
                <div class="summary-item-details">
                    <div>${product.name}</div>
                    <div>Qty: ${item.quantity} × $${product.price.toFixed(2)}</div>
                    <div><strong>$${itemTotal.toFixed(2)}</strong></div>
                </div>
            </div>
        `;
    }).join('');
    
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on all pages
    updateCartCount();
    updateCartDisplay();
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cart icon click
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            showCart();
        });
    }
    
    // Close cart
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (closeCart) {
        closeCart.addEventListener('click', hideCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', hideCart);
    }
    
    // Load page-specific content
    loadFeaturedProducts();
    loadProducts();
    loadProductDetail();
    loadCheckoutSummary();
    
    // Product filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', loadProducts);
    });
    
    const priceFilters = document.querySelectorAll('input[name="price"]');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', loadProducts);
    });
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', loadProducts);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Order placed successfully! Thank you for your purchase.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});
