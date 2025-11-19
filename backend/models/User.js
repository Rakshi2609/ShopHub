import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      minlength: 6,
      select: false
    },
    googleId: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'seller'],
      default: 'user'
    },
    isSeller: {
      type: Boolean,
      default: false
    },
    sellerInfo: {
      businessName: String,
      businessDescription: String,
      rating: {
        type: Number,
        default: 0
      },
      totalSales: {
        type: Number,
        default: 0
      }
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    phone: {
      type: String,
      default: ''
    },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
