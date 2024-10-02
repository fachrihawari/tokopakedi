import GoogleLogin from '@/components/GoogleLogin';
import TokoPakEdiLogo from '@/components/TokoPakEdiLogo';
import { register } from '@/lib/actions/users';
import { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

export const generateMetadata = async (_: {}, parentPromise: ResolvingMetadata) => {
  const parent = await parentPromise;
  return {
    title: 'Register | ' + parent.title?.absolute,
    description: 'Register a new account',
  }
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <TokoPakEdiLogo size='large' />
        </div>
        <form action={register}>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pl-10"
                placeholder="Full Name"
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pl-10"
                placeholder="Email"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pl-10"
                placeholder="Password"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pl-10"
                placeholder="Confirm Password"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
          >
            Register
          </button>
        </form>
        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or register with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="mt-6">
          <GoogleLogin />
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
