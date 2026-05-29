import Link from 'next/link';

import Logo from '../home/Logo';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container-main">
        <div className="flex justify-between h-14">
          <Logo />

          <ul className="hidden lg:flex gap-9 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>Destinations</li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>

            <li>Add your property</li>
          </ul>
          <button className="btn-primary">Sign In</button>
        </div>
      </div>
    </nav>
  );
}
