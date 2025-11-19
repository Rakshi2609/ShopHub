# Firebase Setup Guide

## What's Been Added

✅ **Firebase Authentication Integration**
- Email verification on registration
- Google Sign-in/Sign-up
- Enhanced security with Firebase Auth

## Features Implemented

### 1. **Email Verification**
- When users register with email/password, they receive a verification email
- Users must verify their email before they can log in
- Prevents fake accounts and ensures valid email addresses

### 2. **Google Authentication**
- One-click sign-up with Google account
- Auto-verified for Google users
- Seamless integration with backend

### 3. **Enhanced Security**
- Firebase handles authentication
- Password strength validation
- Rate limiting on failed login attempts

## Setup Instructions

### 1. Install Firebase in Frontend
```bash
cd frontend
npm install firebase
```

### 2. Firebase Configuration
The Firebase config is already set up in `frontend/src/config/firebase.js` with your credentials:
- **Project ID**: pixelpal-ai
- **Auth Domain**: pixelpal-ai.firebaseapp.com

### 3. Enable Authentication Methods in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **pixelpal-ai**
3. Navigate to **Authentication** → **Sign-in method**
4. Enable the following providers:
   - ✅ **Email/Password** - Enable this
   - ✅ **Google** - Enable this and configure OAuth consent screen

### 4. Configure Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains:
- Add `localhost` (already enabled by default)
- Add your production domain when deploying

### 5. Email Templates (Optional)

Customize email verification templates:
1. Go to Authentication → Templates
2. Edit "Email address verification" template
3. Customize subject and message

## Backend Setup

### 1. Create .env file
Copy `.env.example` to `.env` in the backend folder:
```bash
cd backend
cp .env.example .env
```

### 2. Configure Environment Variables
Edit the `.env` file and add:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
# OR use MongoDB Atlas
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Stripe Keys (Get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloudinary (Already configured)
CLOUDINARY_CLOUD_NAME=da7nyxwnb
CLOUDINARY_API_KEY=697789294546783
CLOUDINARY_API_SECRET=nMxOEry6BBO4ehDZPjEEpD689Lk

FRONTEND_URL=http://localhost:5173
```

## How to Use

### User Registration Flow

1. **Email/Password Registration:**
   - User fills registration form
   - Firebase creates account and sends verification email
   - User checks email and clicks verification link
   - User can now log in
   - Backend creates user record

2. **Google Sign-up:**
   - User clicks "Sign up with Google"
   - Selects Google account
   - Automatically verified (Google emails are trusted)
   - Backend creates user record
   - User is logged in immediately

### User Login Flow

1. **Email/Password Login:**
   - User enters credentials
   - Firebase verifies credentials
   - Checks if email is verified
   - If verified, logs in with backend
   - Receives JWT token

2. **Google Sign-in:**
   - User clicks "Sign in with Google"
   - Selects Google account
   - Backend checks if user exists
   - If exists: logs in
   - If not: auto-registers and logs in

## Testing

### Test Email Verification

1. Register with a real email address
2. Check your inbox/spam for verification email
3. Click verification link
4. Try logging in (should work)
5. Try logging in without verifying (should fail with message)

### Test Google Sign-in

1. Click "Sign in with Google" on login page
2. Select your Google account
3. Should automatically create account and log you in

## Files Modified/Created

### Frontend:
- ✅ `frontend/src/config/firebase.js` - Firebase configuration
- ✅ `frontend/src/pages/LoginPage.jsx` - Added Google Sign-in
- ✅ `frontend/src/pages/RegisterPage.jsx` - Added email verification & Google Sign-up
- ✅ `frontend/package.json` - Added firebase dependency

### Backend:
- ℹ️ No changes needed - existing endpoints work with Firebase

## Error Handling

The integration includes comprehensive error handling:
- Invalid email format
- Weak passwords
- Email already in use
- Too many failed login attempts
- Unverified email attempts
- Google sign-in failures

## Production Deployment

### Before deploying:

1. **Update Firebase authorized domains:**
   - Add your production domain in Firebase Console

2. **Environment variables:**
   - Set all production env vars on your hosting platform
   - Use production Stripe keys
   - Use production MongoDB URI

3. **Update CORS:**
   - Update `FRONTEND_URL` in backend `.env`

## Troubleshooting

### Email verification not working?
- Check spam folder
- Ensure Email/Password provider is enabled in Firebase Console
- Check Firebase Authentication logs

### Google Sign-in popup blocked?
- Enable popups in browser
- Try incognito mode
- Check Firebase Console for errors

### "Firebase not defined" error?
- Run `npm install` in frontend folder
- Restart development server

## Next Steps

1. Install dependencies:
```bash
npm run install-all
```

2. Start the application:
```bash
npm run dev
```

3. Test authentication features!

---

**Your e-commerce platform now has enterprise-level authentication! 🚀**
