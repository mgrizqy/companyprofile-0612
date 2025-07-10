import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto max-w-screen-xl px-4 text-center">
        <p className="font-oswald text-2xl uppercase tracking-wider">Stronger Together, Be Part of Us!</p>
        <div className="mt-6 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">
            © 2025 Gold's Gym. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/about" className="text-sm text-gray-300 hover:text-white">About Us</Link>
            <Link href="/services" className="text-sm text-gray-300 hover:text-white">Services</Link>
            <Link href="/blog" className="text-sm text-gray-300 hover:text-white">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}