import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authRegister(data);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError('root', { message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bb-black flex items-center justify-center px-4 pt-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl text-bb-red mb-1">JOIN BINGE BAY</h1>
          <p className="text-bb-muted text-sm">Create your free account</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {errors.root && (
              <div className="bg-bb-red/10 border border-bb-red/30 text-bb-red text-sm px-4 py-3 rounded-xl">
                {errors.root.message}
              </div>
            )}

            <div>
              <label className="text-bb-muted text-sm mb-1.5 block">Username</label>
              <input
                {...register('username', {
                  required: 'Username required',
                  minLength: { value: 3, message: 'Min 3 characters' }
                })}
                className="w-full bg-bb-dark border border-bb-border text-bb-text px-4 py-3 rounded-xl focus:outline-none focus:border-bb-red transition-colors text-sm"
                placeholder="moviebuff42"
              />
              {errors.username && (
                <p className="text-bb-red text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="text-bb-muted text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
                className="w-full bg-bb-dark border border-bb-border text-bb-text px-4 py-3 rounded-xl focus:outline-none focus:border-bb-red transition-colors text-sm"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-bb-red text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-bb-muted text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password required',
                    minLength: { value: 6, message: 'Min 6 characters' }
                  })}
                  className="w-full bg-bb-dark border border-bb-border text-bb-text px-4 py-3 pr-12 rounded-xl focus:outline-none focus:border-bb-red transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bb-muted hover:text-bb-text"
                >
                  {showPass
                    ? <EyeSlashIcon className="w-4 h-4" />
                    : <EyeIcon className="w-4 h-4" />
                  }
                </button>
              </div>
              {errors.password && (
                <p className="text-bb-red text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-bb-red hover:bg-bb-red-hover text-white py-3 rounded-xl font-medium transition-colors text-sm disabled:opacity-60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </motion.button>
          </form>

          <p className="text-center text-bb-muted text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-bb-red hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;