import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../redux/slices/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signInWithPopup 
} from 'firebase/auth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      toast.success('Verification email sent! Please check your inbox.');

      // Register in backend
      await dispatch(register({ name, email, password })).unwrap();
      toast.success('Registration successful! Please verify your email before logging in.');
      navigate('/login');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email already in use');
      } else if (err.code === 'auth/weak-password') {
        toast.error('Password is too weak');
      } else {
        toast.error(err.message || 'Registration failed');
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if email is verified
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast.success('Verification email sent! Please verify your email.');
        await auth.signOut();
        return;
      }

      // Register/Login with backend
      try {
        await dispatch(register({
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          password: user.uid,
          googleId: user.uid
        })).unwrap();
        toast.success('Signed up with Google successfully!');
        navigate(redirect);
      } catch (error) {
        // If user exists, try to login
        if (error.includes('already exists') || error.includes('User already')) {
          await dispatch(login({
            email: user.email,
            password: user.uid
          })).unwrap();
          toast.success('Logged in with Google successfully!');
          navigate(redirect);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Google sign-up failed');
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
        
        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full mb-6 flex items-center justify-center gap-3 btn btn-outline py-3 hover:bg-gray-50"
        >
          <FcGoogle size={24} />
          <span>Sign up with Google</span>
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
            <label className="block font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              minLength={6}
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mb-4"
          >
            {loading ? <Loader /> : 'Register'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="text-primary-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
