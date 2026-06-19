'use client';

import Link from 'next/link';

import { useAuthStore } from '@/entities/session/useAuthStore';
import Logo from '@/shared/ui/Logo';

export default function Navigation() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          
          <Logo />

          <ul className="hidden lg:flex gap-8 items-center text-gray-600 font-medium">
            <li className="hover:text-blue-600 transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-600 transition-colors">
              <Link href="/about">About Us</Link>
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-pointer">
              Destinations
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-pointer">
              Add your property
            </li>
          </ul>

          {/* استفاده از Link به جای Button و Modal */}
          {isAuthenticated ? (
            <Link 
              href="/my-reservations"
              className="px-6 py-2.5 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              My Reservations
            </Link>
          ) : (
            <Link 
              href="/sign-in"
              className="px-6 py-2.5 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              Sign In
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
}
