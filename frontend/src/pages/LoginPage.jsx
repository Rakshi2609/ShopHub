import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/slices/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Firebase first
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        toast.error('Please verify your email before logging in. Check your inbox.');
        await auth.signOut();
        return;
      }

      // Login with backend
      await dispatch(login({ email, password })).unwrap();
      toast.success('Login successful!');
      navigate(redirect);
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        toast.error('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later.');
      } else {
        toast.error(err.message || 'Login failed');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if email is verified (Google emails are auto-verified)
      if (!user.emailVerified && user.providerData[0].providerId !== 'google.com') {
        toast.error('Please verify your email before logging in');
        await auth.signOut();
        return;
      }

      // Login with backend
      try {
        await dispatch(login({ 
          email: user.email, 
          password: user.uid 
        })).unwrap();
        toast.success('Logged in with Google successfully!');
        navigate(redirect);
      } catch (error) {
        // If user doesn't exist, register them
        if (error.response?.status === 401 || error.includes('Invalid')) {
          await dispatch(register({
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            password: user.uid,
            googleId: user.uid
          })).unwrap();
          toast.success('Account created and logged in with Google!');
          navigate(redirect);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Google sign-in failed');
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        
        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mb-6 flex items-center justify-center gap-3 btn btn-outline py-3 hover:bg-gray-50"
        >
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>
        
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mb-4"
          >
            {loading ? <Loader /> : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="text-primary-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
