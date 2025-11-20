import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import API_URL from '../../config/api';

const SellerAddProductPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    costPrice: '',
    profitMargin: 20,
    category: 'Electronics',
    brand: '',
    stock: '',
    isFeatured: false
  });
  
  const [searchedImages, setSearchedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports',
    'Beauty', 'Toys', 'Automotive', 'Health', 'Other'
  ];

  const calculateFinalPrice = (cost, margin) => {
    const costNum = parseFloat(cost) || 0;
    const marginNum = parseFloat(margin) || 0;
    return (costNum + (costNum * marginNum / 100)).toFixed(2);
  };

  const handleCostChange = (cost) => {
    setFormData(prev => ({
      ...prev,
      costPrice: cost,
      price: calculateFinalPrice(cost, prev.profitMargin)
    }));
  };

  const handleMarginChange = (margin) => {
    setFormData(prev => ({
      ...prev,
      profitMargin: margin,
      price: calculateFinalPrice(prev.costPrice, margin)
    }));
  };

  const searchImages = async (query = imageSearchQuery || formData.name) => {
    if (!query.trim()) {
      toast.error('Please enter a product name first');
      return;
    }

    setImageLoading(true);
    try {
      const PEXELS_API_KEY = 'yWUYUSKSfT3K5WepQOeMk6DoPqcUQCMgHi0geQJgY9aCVtzfMoUUPfQ4';
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`,
        {
          headers: {
            Authorization: PEXELS_API_KEY
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      
      if (data.photos && data.photos.length > 0) {
        const images = data.photos.map(photo => ({
          id: photo.id,
          url: photo.src.medium,
          thumb: photo.src.small
        }));
        
        setSearchedImages(images);
        toast.success(`Found ${images.length} images for "${query}"`);
      } else {
        toast.error('No images found for this search');
        setSearchedImages([]);
      }
    } catch (error) {
      toast.error('Failed to load images. Please try again.');
      console.error('Image search error:', error);
    } finally {
      setImageLoading(false);
    }
  };

  const toggleImageSelection = (image) => {
    const isSelected = selectedImages.find(img => img.id === image.id);
    if (isSelected) {
      setSelectedImages(selectedImages.filter(img => img.id !== image.id));
    } else {
      if (selectedImages.length >= 5) {
        toast.error('Maximum 5 images allowed');
        return;
      }
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: selectedImages.map(img => ({ url: img.url })),
        seller: userInfo._id
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.post(`${API_URL}/api/products`, productData, config);
      
      toast.success('Product added successfully!');
      navigate('/seller/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <button
            onClick={() => navigate('/seller/dashboard')}
            className="btn btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Product Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., iPhone 15 Pro Max"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Brand *</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="input"
                  placeholder="e.g., Apple"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input"
                rows="4"
                placeholder="Describe your product..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="input"
                  placeholder="Available quantity"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Pricing & Profit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2">Cost Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="input"
                  placeholder="Your cost"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">What you paid</p>
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Profit Margin (%)</label>
                <input
                  type="number"
                  step="1"
                  value={formData.profitMargin}
                  onChange={(e) => handleMarginChange(e.target.value)}
                  className="input"
                  placeholder="20"
                />
                <p className="text-xs text-gray-500 mt-1">Your profit %</p>
              </div>
              
              <div>
                <label className="block font-semibold mb-2">Selling Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input bg-gray-50"
                  placeholder="Auto-calculated"
                  readOnly
                />
                <p className="text-xs text-green-600 mt-1">
                  Profit: ${(formData.price - formData.costPrice).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="mr-2"
                />
                <span className="font-semibold">Featured Product (Show on homepage)</span>
              </label>
            </div>
          </div>

          {/* Image Search Section */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Product Images</h2>
            
            <div className="mb-4">
              <label className="block font-semibold mb-2">Search Images</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageSearchQuery || formData.name}
                  onChange={(e) => setImageSearchQuery(e.target.value)}
                  className="input flex-1"
                  placeholder="Search for product images..."
                />
                <button
                  type="button"
                  onClick={() => searchImages()}
                  disabled={imageLoading}
                  className="btn btn-primary"
                >
                  {imageLoading ? 'Searching...' : 'Search Images'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Auto-fetch images from the web. Select up to 5 images.
              </p>
            </div>

            {/* Selected Images */}
            {selectedImages.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Selected Images ({selectedImages.length}/5)</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {selectedImages.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.thumb}
                        alt="Selected"
                        className="w-full h-24 object-cover rounded-lg border-2 border-primary-600"
                      />
                      <button
                        type="button"
                        onClick={() => toggleImageSelection(image)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Search Results */}
            {searchedImages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Search Results - Click to Select</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-h-96 overflow-y-auto">
                  {searchedImages.map((image) => {
                    const isSelected = selectedImages.find(img => img.id === image.id);
                    return (
                      <div
                        key={image.id}
                        onClick={() => toggleImageSelection(image)}
                        className={`cursor-pointer rounded-lg overflow-hidden ${
                          isSelected ? 'ring-4 ring-primary-600' : 'hover:ring-2 ring-gray-300'
                        }`}
                      >
                        <img
                          src={image.thumb}
                          alt="Product"
                          className="w-full h-24 object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || selectedImages.length === 0}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/seller/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerAddProductPage;
