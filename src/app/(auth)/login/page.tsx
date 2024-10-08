import TokoPakEdiLogo from '@/components/TokoPakEdiLogo';
import { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { login } from '@/lib/actions/users';
import GoogleLogin from '@/components/GoogleLogin';

export const generateMetadata = async (_: {}, parentPromise: ResolvingMetadata) => {
  const parent = await parentPromise;
  return {
    title: 'Login | ' + parent.title?.absolute,
    description: 'Login to your account',
  }
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <TokoPakEdiLogo size='large' />
        </div>
        <form action={login}>
          <div className="mb-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pl-10"
                placeholder="Email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pl-10"
                placeholder="Password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or login with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="mt-6">
          <GoogleLogin />
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Don&#39;t have an account?{' '}
          <Link href="/register" className="text-green-600 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
